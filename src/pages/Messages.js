import React, {
  useState,
  useEffect,
  useLayoutEffect,
  Fragment,
  useRef,
} from "react";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  addDoc,
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../services/firebase-config";
import dayjs from "dayjs";

import {
  Dialog,
  ListItemText,
  ListItem,
  ListItemButton,
  List,
  Divider,
  CircularProgress,
  Box,
  Tabs,
  Tab,
  ListItemAvatar,
  Avatar,
  Typography,
  TextField,
  Grow,
} from "@mui/material";

import PropTypes from "prop-types";

// Icons
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="tab"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Messages = () => {
  const { user: currentUser, loading: loadingUser } = useUserContext();
  const [loadingChat, setLoadingChat] = useState(false);
  const [checkingIDs, setCheckingIDs] = useState(true); // TODO: double renders

  const { chatID } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [chat, setChat] = useState();
  //   const [chatIDs, setChatIDs] = useState();
  const [chatIDsValidity, setChatIDsValidity] = useState();
  const [chatMsgValue, setChatMsgValue] = useState();

  //   TODO: check if currentUser, check if any of the id, notification, check if there the chatID (url) == one of the normal ids, if chats array.length > 25 show a load more above the .chat, maybe show that "sending message" by making chat bg gray (add transition?), also add a grow/fade

  async function getChatIDs(id) {
    setCheckingIDs(true);
    const userDocRef = doc(db, "messages", id);
    try {
      const docSnapshot = await getDoc(userDocRef);
      const chatIDsReceived = docSnapshot.data();
      if (chatIDsReceived.uids.includes(currentUser.uid)) {
        setChatIDsValidity(true);
        console.log("UserID valid");
      } else {
        setChatIDsValidity(false);
        console.log("UserID invalid");
      }
      setCheckingIDs(false);
    } catch (error) {
      console.log("Error getting document:", error);
      alert("Error getting document");
    }
  }

  async function getChatHistory(id) {
    setLoadingChat(true);
    const queryRecieved = query(
      collection(db, "messages", id, "chat"),
      orderBy("ts", "asc")
      //   limit(countPosts) TODO:
    );
    const querySnapshot = await getDocs(queryRecieved);
    const chatDocs = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    // console.log(chatDocs);
    setChat(chatDocs);
    setLoadingChat(false);
  }

  const handleSubmit = async () => {
    if (chatMsgValue) {
      const chatValueCurr = chatMsgValue;
      setChatMsgValue(); // TODO: empty
      console.log("Sending:", chatValueCurr);
      try {
        await addDoc(collection(db, "messages", chatID, "chat"), {
          msg: chatMsgValue,
          ts: Number(dayjs().valueOf()),
          uid: currentUser.uid,
        });

        // if (postAdminUID) {
        //   sendNotification(
        //     postAdminUID,
        //     `New comment: "${commentValueCurr.slice(0, 30)}"`,
        //     `posts/${postID}`
        //   );
        // }
      } catch (e) {
        console.error("Error adding document:", e);
      }
    }
  };

  useEffect(() => {
    console.log(currentUser);
    const fetchData = async () => {
      try {
        if (chatID && currentUser) {
          getChatIDs(chatID);
          getChatHistory(chatID);

          const colRef = query(
            collection(db, "messages", chatID, "chat"),
            orderBy("ts", "asc")
          );
          const unsubscribe = onSnapshot(colRef, (snapshot) => {
            const updatedChat = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            setChat((prev) => [...prev, ...updatedChat]);
          });

          // Cleanup the listener when the component unmounts
          return () => {
            unsubscribe();
          };
        } else if (!currentUser && !loadingUser) {
          setCheckingIDs(false);
          setChatIDsValidity(false);
        } else if (currentUser && !chat) {
          setCheckingIDs(false);
          setChatIDsValidity(true);
          setLoadingChat(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      // console.log("loadingUser", loadingUser);
      // console.log("currentUser", currentUser);
      // console.log("checkingIDs", checkingIDs);
    };

    fetchData();
  }, [chatID, currentUser, loadingUser]);

  function renderChat(chats, uid) {
    const timestampStyle = {
      position: "absolute",
      fontSize: "0.75rem",
      color: "#c5c5c5",
      bottom: "20%",
    };

    return chats.map((chat) => {
      const isUser = uid === chat.uid;
      const positionStyle = isUser ? { left: "-3.5rem" } : { right: "-3.5rem" };
      // console.log(chat.id);
      // console.log(chat);
      return (
        <div key={chat.id} className={`msg ${isUser ? "user" : "sender"}`}>
          {chat.msg}
          <span style={{ ...timestampStyle, ...positionStyle }}>
            {dayjs(chat.ts).format("h:mm a")}
          </span>
        </div>
      );
    });
  }

  function renderChatList(chats) {
    const timestampStyle = {
      position: "absolute",
      fontSize: "0.75rem",
      color: "#c5c5c5",
      bottom: "20%",
    };

    return chats.map((chat) => {
      return (
        <Link
          to={"/messages/ZbH1dTP9eo63HsTfcAtf"}
          style={{ color: "black", textDecoration: "none" }}
        >
          <ListItemButton alignItems="flex-start">
            {/* <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
          </ListItemAvatar> */}
            <ListItemText
              primary="Adam Sandler"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    04:57 pm
                  </Typography>
                  {
                    " — I'll be in your thiasda da sd a d asd a  sd asd a s asdnkjansdkjansdkajn  akjsdnakjsdnakjsdnakn knkjasnd akjnda kjdnaksndjjas…"
                  }
                </React.Fragment>
              }
            />
          </ListItemButton>
          <Divider component="li" />
        </Link>
      );
    });
  }

  const messagesRef = useRef();
  useEffect(() => {
    if (messagesRef && messagesRef.current) {
      messagesRef.current.scrollIntoView({
        // behavior: "smooth",
      });
    }
    // console.log(chat);
  }, [tabValue, chat]);
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  return (
    <Wrapper>
      <h1>Messages</h1>
      {loadingUser || checkingIDs ? (
        <CircularProgress sx={{ fontSize: "5rem" }} />
      ) : currentUser && chatIDsValidity ? (
        <>
          <Box sx={{}}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="All Messages" />
              <Tab disabled label="Following" />
              <Tab disabled label="Stranger" />
            </Tabs>
          </Box>

          {tabValue == 0 && (
            <div className="tab">
              <div className="list">
                <List sx={{ padding: "2rem 0" }}>
                  <Link
                    to={"/messages/ZbH1dTP9eo63HsTfcAtf"}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <ListItem button alignItems="flex-start">
                      {/* <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar> */}
                      <ListItemText
                        primary="Adam Sandler"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              04:57 pm
                            </Typography>
                            {
                              " — I'll be in your thiasda da sd a d asd a  sd asd a s asdnkjansdkjansdkajn  akjsdnakjsdnakjsdnakn knkjasnd akjnda kjdnaksndjjas…"
                            }
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </Link>
                  <ListItem button alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="John Smith"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Ali Connors
                          </Typography>
                          {
                            " — I'll be in your neighborhood doing errands this…"
                          }
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem button alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Adam Sandler"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            04:57 pm
                          </Typography>
                          {" — I'll be in your this…"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </List>
              </div>
              {loadingChat ? (
                <div className="chatBox empty">
                  <CircularProgress />
                </div>
              ) : chat ? (
                <div className="chatBox">
                  <div className="header">
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                        margin: "1rem",
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      John Smith
                    </span>
                    <IconButton size="large" sx={{ marginRight: "1rem" }}>
                      <MoreVertIcon />
                    </IconButton>
                  </div>
                  <div className="chat">
                    {/* <Grow on={chat}>{renderChat(chat, currentUser.uid)}</Grow> */}
                    {renderChat(chat, currentUser.uid)}
                    <div ref={messagesRef} style={{ margin: 0 }} />
                  </div>
                  <div className="input">
                    <TextField
                      id="outlined-multiline-flexible"
                      //   label="Message"
                      placeholder="Message"
                      type="text"
                      value={chatMsgValue}
                      onChange={(event) => {
                        const { id, value } = event.target;
                        setChatMsgValue(value);
                      }}
                      onKeyDown={(event) => {
                        const { key } = event;
                        if (key === "Enter") {
                          handleSubmit();
                          setChatMsgValue("");
                        }
                      }}
                      // multiline
                      // maxRows={4}
                      inputProps={{ maxLength: 1500 }}
                      fullWidth
                      sx={{
                        backgroundColor: "white",
                        outline: "none",
                        border: "none",
                      }}
                    />
                    <IconButton size="large">
                      {/* <DeleteIcon fontSize="inherit" /> */}
                      <SendIcon />
                    </IconButton>
                  </div>
                </div>
              ) : (
                <div className="chatBox empty">
                  <QuestionAnswerIcon sx={{ fontSize: "5rem" }} />
                  <h3>Select a conversation</h3>
                </div>
              )}
            </div>
          )}
          {tabValue == 1 && <div className="tab">Item Two</div>}
          {tabValue == 2 && <div className="tab">Item Three</div>}
        </>
      ) : (
        <>
          <ErrorTwoToneIcon
            sx={{
              fontSize: "20rem",
              opacity: 0.05,
              "&:hover": { transition: "1s", rotate: "360deg" },
            }}
          />
          <h2>Invalid User</h2>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  /* overflow-x: hidden; */

  .tab {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    width: 80vw;
    /* padding: 2rem; */
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    /* align-items: center; */
    /* justify-content: space-between; */
    height: 50rem;

    .list {
      background-color: #fafafa;
      flex: 2;
      height: 100%;
      overflow-y: auto;
      border-right: 1px solid #ccc;
      width: 20%;
      min-width: 11rem;
      flex-direction: column;

      p {
        margin: 0;
      }
    }
    .chatBox {
      flex: 8;
      height: 100%;
      background-color: whitesmoke;
      display: flex;
      /* align-items: center; */
      justify-content: space-between;
      flex-direction: column;
      overflow: hidden;
      .header {
        width: 100%;
        background-color: #fafafa;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* gap: 1rem;
        padding: 1rem; */
      }
      .chat {
        padding: 1rem;
        display: flex;
        height: 75%;
        /* align-items: center; */

        overflow-y: scroll;
        flex-direction: column;
        /*justify-content: end;
         flex-direction: column-reverse;
        overflow: auto; */
        .msg {
          padding: 10px 15px;
          width: fit-content;
          border-radius: 10px;
          margin: 2px;
          max-width: 80%;
          position: relative;
          line-height: 1.25rem;
        }
        .sender {
          text-align: left;
          align-self: flex-start;
          background-color: rgba(0, 0, 0, 0.05);
          border-bottom-left-radius: 0;
        }

        /* .sender::after {
          position: absolute;
          right: -3rem;
          bottom: 20%;
          content: "4:30 am";
          font-size: 0.75rem;
          color: #c5c5c5;
        } 
        .user::after {
          position: absolute;
          left: -3.5rem;
          bottom: 20%;
          content: "4:30 am";
          font-size: 0.75rem;
          color: #c5c5c5;
        }*/

        .user {
          text-align: right;
          align-self: flex-end;
          color: white;
          background-color: black;
          display: flex;
          justify-content: end;
          border-bottom-right-radius: 0;
        }
      }

      .input {
        margin: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        /* border-top: 1px solid gray;
        padding-top: 1rem; */
      }
    }

    .empty {
      display: flex;
      align-items: center;
      justify-content: center;
      color: gray;
    }
  }
`;

export default Messages;
