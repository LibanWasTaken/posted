import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getTimeDifferenceShort } from "../functions/functions";

import {
  addDoc,
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  orderBy,
  onSnapshot,
  limit,
  deleteDoc,
  where,
} from "firebase/firestore";
import { db } from "../services/firebase-config";
import dayjs from "dayjs";

import {
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
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import PropTypes from "prop-types";

// Icons
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [userChatsList, setUserChatsList] = useState([]);
  const [loadingChatList, setLoadingChatList] = useState(true);
  const [chatUserIDs, setChatUserIDS] = useState("Uhh");
  const [chatIDsValidity, setChatIDsValidity] = useState();
  const [chatMsgValue, setChatMsgValue] = useState();

  const [openDeletionModal, setOpenDeletionModal] = useState(false);
  const handleClickOpenDeletionModal = () => {
    setOpenDeletionModal(true);
  };
  const handleCloseDeletionModal = () => {
    setOpenDeletionModal(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openChatMenu = Boolean(anchorEl);
  const handleClickChatMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseChatMenu = () => {
    setAnchorEl(null);
  };

  //   TODO: check if currentUser, check if any of the id, notification, check if there the chatID (url) == one of the normal ids, if chats array.length > 25 show a load more above the .chat, maybe show that "sending message" by making chat bg gray (add transition?), also add a grow/fade

  async function getChatIDs(id) {
    setCheckingIDs(true);
    const userDocRef = doc(db, "messages", id);
    try {
      const docSnapshot = await getDoc(userDocRef);
      const chatIDsReceived = docSnapshot.data();
      setChatUserIDS(chatIDsReceived.uids);
      if (chatIDsReceived.uids.includes(currentUser.uid)) {
        setChatIDsValidity(true);
        console.log("UserID valid");
      } else {
        setChatIDsValidity(false);
        console.log("UserID invalid");
      }
      setCheckingIDs(false);
      console.log("done");
    } catch (error) {
      console.log("Error getting document:", error);
      alert("Error getting document");
    }
  }

  async function getUsersChatIDs(id) {
    setLoadingChatList(true);
    console.log("uhh");
    try {
      await getDocs(
        query(collection(db, "users", id, "chats"), orderBy("lastTs", "desc"))
      ).then((querySnapshot) => {
        const chatsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserChatsList(chatsData);
        console.log(chatsData);
      });
    } catch (error) {
      console.log("Error getting document:", error);
      alert("Error getting document");
    }
    setLoadingChatList(false);
  }

  async function getChatHistory(id) {
    setLoadingChat(true);
    const queryRecieved = query(
      collection(db, "messages", id, "chat"),
      orderBy("ts", "asc")
      // limit(25)
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

  async function deleteCollection(db, collectionPath, batchSize) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy("__name__").limit(batchSize);

    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, resolve).catch(reject);
    });
  }

  async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return;
    }

    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      deleteQueryBatch(db, query, resolve);
    });
  }

  async function handleDelete(chatID, uidArr) {
    const chatRef = db.collection("chats").doc(chatID);
    chatRef
      .delete()
      .then(() => {
        console.log("Chat document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing chat document: ", error);
      });

    const chatMessagesRef = db
      .collection("chats")
      .doc(chatID)
      .collection("chat");
    chatMessagesRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });

    uidArr.forEach((uid) => {
      const userChatRef = db
        .collection("users")
        .doc(uid)
        .collection("chats")
        .doc(chatID);
      userChatRef
        .delete()
        .then(() => {
          console.log(`Chat removed from user ${uid}`);
        })
        .catch((error) => {
          console.error("Error removing chat from user: ", error);
        });
    });
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
      } finally {
        setChatMsgValue("");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          getUsersChatIDs(currentUser.uid);
        }
        if (chatID && currentUser) {
          console.log("uhh");

          !userChatsList && getUsersChatIDs(currentUser.uid);
          getChatIDs(chatID);
          getChatHistory(chatID);

          const colRef = query(
            collection(db, "messages", chatID, "chat"),
            orderBy("ts", "asc")
            // limit(25)
          );
          const unsubscribe = onSnapshot(colRef, (snapshot) => {
            const updatedChat = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            // console.log(updatedChat);
            updatedChat && setChat([...updatedChat]);
          });

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
    return chats.map((chat) => {
      // chat
      return (
        <Link
          to={`/messages/${chat.id}`}
          style={{ color: "black", textDecoration: "none" }}
          key={chat.id}
        >
          <ListItemButton alignItems="flex-start">
            {/* <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
          </ListItemAvatar> */}
            <ListItemText
              primary={chat.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {getTimeDifferenceShort(chat.lastTs)}
                  </Typography>
                  {` — ${chat.lastTxt}`}
                </React.Fragment>
              }
            />
          </ListItemButton>
          <Divider component="li" />
        </Link>
      );
    });
  }

  function createChatName(userIDarr, ownID) {
    if (userIDarr && ownID) {
      const filteredArray = userIDarr.filter((item) => item !== ownID);
      const result = filteredArray.join(", ");
      return result;
    } else {
      return "Uhh";
    }
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
      {/* <h1>Messages</h1> */}
      {loadingUser || checkingIDs ? (
        <CircularProgress sx={{ fontSize: "5rem" }} />
      ) : currentUser && chatIDsValidity ? (
        <>
          <Box sx={{}}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="All Messages" />
              <Tab disabled label="Following" />
              <Tab label="Stranger" />
            </Tabs>
          </Box>

          {tabValue == 0 && (
            <div className="tab">
              <div className="list">
                <h3
                  style={{
                    padding: "0.25rem 0rem 1rem 1rem",
                    borderBottom: "1px solid gray",
                  }}
                >
                  Chats
                </h3>
                <List
                  sx={
                    {
                      // padding: "0",
                      // maxHeight: "85%",
                      // overflow: "scroll",
                    }
                  }
                  className="theList"
                >
                  {loadingChatList ? (
                    <CircularProgress sx={{ p: "3rem" }} />
                  ) : (
                    renderChatList(userChatsList)
                  )}
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
                      John Smith {createChatName(chatUserIDs, currentUser.uid)}
                    </span>
                    <IconButton
                      size="large"
                      sx={{ marginRight: "1rem" }}
                      onClick={handleClickChatMenu}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={openChatMenu}
                      onClose={handleCloseChatMenu}
                      onClick={handleCloseChatMenu}
                      // hideBackdrop
                      // disableScrollLock
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter:
                            "drop-shadow(rgba(0, 0, 0, 0.16) 0px 0px 2px)",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{
                        horizontal: "right",
                        vertical: "top",
                      }}
                      anchorOrigin={{
                        horizontal: "right",
                        vertical: "bottom",
                      }}
                    >
                      <MenuItem onClick={handleClickOpenDeletionModal}>
                        <ListItemIcon>
                          <DeleteIcon />
                        </ListItemIcon>
                        Delete Chat
                      </MenuItem>
                      {/* <Divider sx={{ marginTop: 1 }} /> */}
                    </Menu>
                    <Dialog
                      open={openDeletionModal}
                      onClose={handleCloseDeletionModal}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Delete the whole chat history?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          This is irreversible.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseDeletionModal}>
                          cancel
                        </Button>
                        <Button
                          onClick={() => {
                            handleDelete(chatID, chatUserIDs);
                          }}
                          autoFocus
                        >
                          delete
                        </Button>
                      </DialogActions>
                    </Dialog>
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
                    <IconButton size="large" onClick={handleSubmit}>
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
  /* margin-bottom: 2rem; */
  /* overflow-x: hidden; */

  .tab {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    width: 80vw;
    /* padding: 2rem; */
    display: flex;
    align-items: center;
    justify-content: center;
    /* align-items: center; */
    /* justify-content: space-between; */
    height: 50rem;

    .list {
      background-color: #fafafa;
      flex: 2;
      height: 100%;
      overflow-y: auto;
      border-right: 1px solid #ccc;
      min-width: 11rem;
      flex-direction: column;
      /* overflow: hidden; */
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
          align-self: flex;
          text-align: left;
          background-color: rgba(0, 0, 0, 0.05);
          border-bottom-left-radius: 0;
        }

        .user {
          text-align: left;
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

  /* @media screen and (max-width: 1000px) {
    .tab {
      flex-direction: column-reverse;
      align-items: normal;
    }

    .list {
      overflow-y: hidden;
    }

    .theList {
      display: flex;
      flex-direction: row;
      width: 100%;
      padding: 0;
      overflow-y: hidden;
    }
  } */
`;

export default Messages;
