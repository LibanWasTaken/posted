import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner2 } from "../components/Spinner";
import {
  getDoc,
  getDocs,
  collection,
  doc,
  updateDoc,
  setDoc,
  addDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../services/firebase-config";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useUserContext } from "../context/UserContext";
import Pendulum from "../assets/pendulum.svg";
import { sendNotification } from "../functions/functions";

import {
  createTheme,
  ThemeProvider,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Avatar,
  LinearProgress,
  CircularProgress,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material/";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MessageIcon from "@mui/icons-material/Message";
import FlagIcon from "@mui/icons-material/Flag";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Raleway",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  //   palette: {
  //     mode: "dark",
  //   },
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#fff",
    },
  },
});

const themeInverse = createTheme({
  typography: {
    fontFamily: [
      "Raleway",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  //   palette: {
  //     mode: "dark",
  //   },
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#000",
    },
  },
});

const UserPage = () => {
  const { uid } = useParams();
  const { user: currentUser, loading: loadingUser } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [user, setUser] = useState();
  const [userPosts, setUserPosts] = useState();
  const [userExists, setUserExists] = useState();

  const [followingList, setFollowingList] = useState([]);
  const [followingCall, setFollowingCall] = useState(false);
  const [following, setFollowing] = useState(false);
  const [openPrivateModal, setOpenPrivateModal] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [msgProgressing, setMsgProgressing] = useState(false);
  const [privateID, setPrivateID] = useState();
  const navigate = useNavigate();

  const fetchUserDoc = async () => {
    const userDocRef = doc(db, "users", uid);
    try {
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        console.log(docSnapshot.data());
        const userData = docSnapshot.data();
        setLoading(false);
        setUser(userData);
        userData.followers
          ? setFollowingList(userData.followers)
          : setFollowingList([]);
        setUserExists(true);
      } else {
        setLoading(false);
        setUserExists(false);
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting user docs:", error); //TODO: remove these
      alert("Error getting user docs");
      // navigate("/error-getting-info"); TODO: do these?
    }
  };

  async function getPostsData() {
    try {
      const querySnapshot = await getDocs(
        collection(db, `/users/${uid}/posts`)
      );
      const postsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUserPosts(postsData);
      setLoadingPosts(false);
    } catch (error) {
      console.log("Error getting posts data:", error);
      alert("Error getting posts data");
    }
  }

  // async function handleFollow(currentUid) {
  //   // TODO: https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
  //   try {
  //     setFollowingCall(true);
  //     if (currentUid && uid && currentUid !== uid) {
  //       // Create a copy of the array to avoid mutating state directly
  //       let updatedFollowingList = [...followingList];
  //       console.log(followingList);
  //       console.log(updatedFollowingList);
  //       if (following) {
  //         // Unfollow
  //         updatedFollowingList = updatedFollowingList.filter(
  //           (userId) => userId !== currentUid
  //         );
  //         setFollowing(false);
  //       } else {
  //         // Follow
  //         updatedFollowingList.push(currentUid);
  //         setFollowing(true);
  //         if (user && user.displayName) {
  //           sendNotification(
  //             currentUid,
  //             `New follower: ${user.displayName}`,
  //             `user/${uid}`
  //           );
  //         }
  //       }

  //       const userRef = doc(db, "users", uid);
  //       await updateDoc(userRef, { followers: updatedFollowingList });
  //       console.log(updatedFollowingList);

  //       // Update following array in the target user's document
  //       const targetUserRef = doc(db, "users", currentUid);
  //       const targetUserDoc = await getDoc(targetUserRef);
  //       const targetUserFollowingList = targetUserDoc.data().following || [];

  //       if (following) {
  //         // Unfollow
  //         const updatedTargetFollowingList = targetUserFollowingList.filter(
  //           (userId) => userId !== uid
  //         );
  //         await updateDoc(targetUserRef, {
  //           following: updatedTargetFollowingList,
  //         });
  //       } else {
  //         // Follow
  //         targetUserFollowingList.push(uid);
  //         await updateDoc(targetUserRef, {
  //           following: targetUserFollowingList,
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setFollowingCall(false);
  //   }
  // }

  async function handleFollow(currentUid, currentName) {
    try {
      setFollowingCall(true);
      if (currentUid && currentName && currentUid !== uid) {
        const userRef = doc(db, "users", uid);
        const currentUserRef = doc(db, "users", currentUid);

        if (following) {
          // Unfollow
          await updateDoc(userRef, {
            followers: arrayRemove(currentUid),
          });
          await updateDoc(currentUserRef, {
            following: arrayRemove(uid),
          });
          setFollowing(false);
        } else {
          // Follow
          await updateDoc(userRef, {
            followers: arrayUnion(currentUid),
          });
          await updateDoc(currentUserRef, {
            following: arrayUnion(uid),
          });
          setFollowing(true);
          if (user && user.displayName) {
            sendNotification(
              uid,
              `New follower: ${currentName}`,
              `user/${currentUid}`
            );
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFollowingCall(false);
    }
  }

  async function handleMessage(currUserID, postAdminUID) {
    setMsgProgressing(true);
    handleOpenMessageModal();

    try {
      const chatCollectionRef = collection(db, "users", postAdminUID, "chats");
      const chatDocs = await getDocs(chatCollectionRef);
      console.log(chatDocs);
      chatDocs.forEach((doc) => {
        const chatData = doc.data();
        if (chatData.uid === currUserID) {
          navigate(`/messages/${doc.id}`);
          return;
        }
      });

      // If currUserID is not found in any chat data
      setMsgProgressing(false);
      console.log("New");
    } catch (error) {
      console.error("Error handling message:", error);
    }
  }
  async function handleSendMessage(currUser, pageAdminUID, pageAdminName, msg) {
    try {
      const timestamp = Number(dayjs().valueOf());
      if (currUser && pageAdminUID && pageAdminName && msg) {
        const messageCollectionRef = collection(db, "messages");
        const messageDocRef = await addDoc(messageCollectionRef, {
          uids: [currUser.uid, pageAdminUID],
        });

        const generatedId = messageDocRef.id;
        console.log(generatedId, "messages new");

        const chatCollectionRef = collection(messageDocRef, "chat");
        const chatDocRef = await addDoc(chatCollectionRef, {
          msg: msg,
          ts: timestamp,
          uid: currUser.uid,
          displayName: currUser.displayName,
        });
        console.log(chatDocRef.id, "messages/chat new");

        await setDoc(doc(db, "users", pageAdminUID, "chats", generatedId), {
          name: currUser.displayName,
          lastTs: timestamp,
          lastTxt: msg,
          uid: currUser.uid,
        });
        console.log("user admin chat list");

        await setDoc(doc(db, "users", currUser.uid, "chats", generatedId), {
          name: pageAdminName,
          lastTs: timestamp,
          lastTxt: msg,
          uid: pageAdminUID,
        });
        console.log("current user chat list");

        const newMsg = `New Message from ${
          currUser.displayName
        }: "${msg.substring(0, 20)}"`;
        sendNotification(pageAdminUID, newMsg, `messages/${generatedId}`);
        navigate(`/messages/${generatedId}`);
      } else {
        throw new Error("Invalid Data");
      }
    } catch (error) {
      console.error("Error handling message:", error);
    } finally {
      setMsgProgressing(false);
    }
  }

  useEffect(() => {
    fetchUserDoc();
    getPostsData();
  }, []);
  useEffect(() => {
    if (user && user.followers && user.followers.includes(currentUser.uid)) {
      setFollowing(true);
    }
  }, [user, currentUser]);

  function generatePostLinks(posts) {
    // console.log(posts);
    return posts.map((post) => (
      <Link
        key={post.id}
        to={post.public && `/posts/${post.id}`}
        onClick={
          post.public
            ? undefined
            : () => {
                setPrivateID(post.id);
                handleOpenPrivateModal();
              }
        }
        style={{ textDecoration: "none" }}
      >
        <div className="post">
          <p className="heading">{post.title}</p>
          <p className="timing">
            {dayjs(post.releaseDate).format("DD MMM, YYYY")}
          </p>
        </div>
      </Link>
    ));
  }

  const handleOpenPrivateModal = () => {
    setOpenPrivateModal(true);
  };
  const handleClosePrivateModal = () => {
    setOpenPrivateModal(false);
  };
  function PrivatePostModal({ open, handleClose }) {
    const [postIDValue, setPostIDValue] = useState("");

    function handleCheck() {
      if (privateID) {
        navigate(`/posts/${privateID}`);
      }
    }

    return (
      <ThemeProvider theme={theme}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Verification</DialogTitle>
          <DialogContent sx={{ m: 1, overflow: "hidden" }}>
            <DialogContentText sx={{ marginBottom: 5 }}>
              Enter post ID:
            </DialogContentText>

            <TextField
              sx={{ m: 1, width: "40ch" }}
              margin="normal"
              id="name"
              label="Post ID"
              type="text"
              variant="standard"
              value={postIDValue}
              onChange={(e) => setPostIDValue(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ letterSpacing: 1, fontWeight: 400 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              sx={{ letterSpacing: 1, fontWeight: 400 }}
              onClick={handleCheck}
              disabled={postIDValue !== privateID}
            >
              Enter
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  }
  const handleOpenMessageModal = () => {
    setOpenMessageModal(true);
  };
  const handleCloseMessageModal = () => {
    setOpenMessageModal(false);
  };
  function MessageModal({ open, handleClose }) {
    const [msgValue, setMsgValue] = useState("");

    function handleCheck() {
      if (msgValue && user) {
        // TODO: check if messages (get the values in useEffect), if alredy then reidrect, else create new, both users..?
        setMsgProgressing(true);
        handleSendMessage(currentUser, uid, user.displayName, msgValue);
      }
    }

    return (
      <ThemeProvider theme={theme}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Message</DialogTitle>
          <DialogContent sx={{ m: 1, overflow: "hidden" }}>
            <DialogContentText sx={{ marginBottom: 5 }}>
              Enter your message:
            </DialogContentText>

            <TextField
              sx={{ m: 1, width: "40ch" }}
              margin="normal"
              id="name"
              label="Text"
              type="text"
              variant="standard"
              value={msgValue}
              disabled={msgProgressing}
              inputProps={{ maxLength: 200 }}
              multiline
              onChange={(e) => setMsgValue(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ letterSpacing: 1, fontWeight: 400 }}
              onClick={handleClose}
              disabled={msgProgressing}
            >
              Cancel
            </Button>
            <Button
              sx={{ letterSpacing: 1, fontWeight: 400 }}
              onClick={handleCheck}
              disabled={msgProgressing || !msgValue}
            >
              Send
            </Button>
          </DialogActions>
          {msgProgressing && <LinearProgress />}
        </Dialog>
      </ThemeProvider>
    );
  }

  return (
    <Wrapper>
      {loading ? (
        <Spinner2 />
      ) : userExists ? (
        <div className="section">
          <img src={Pendulum} alt="" className="pendulum" />
          {user.photoURL && (
            <Avatar
              alt="Remy Sharp"
              src={user.photoURL}
              sx={{ width: "15rem", height: "15rem" }}
            />
          )}

          <h1>{user.displayName}</h1>
          <p>userName</p>
          <div className="posts">
            {loadingPosts ? (
              <>Loading..</>
            ) : (
              <>{userPosts && generatePostLinks(userPosts)}</>
            )}
            {/* <div className="post" onClick={handleOpenPrivateModal}>
              if its private, do a modal asking for post id
            </div> */}
          </div>

          <div className="pageBreak"></div>

          {currentUser && uid !== currentUser.uid && (
            <ThemeProvider theme={themeInverse}>
              <div className="buttons">
                <Button
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                  }}
                  // className={followingCall && "loadingClassicBtn"}
                  // disabled={followingCall}
                  variant={following ? "contained" : "outlined"}
                  onClick={() => {
                    if (!followingCall) {
                      handleFollow(currentUser.uid, currentUser.displayName);
                    }
                  }}
                >
                  Follow{" "}
                  {followingCall ? (
                    <CircularProgress size={"1.5rem"} />
                  ) : (
                    <PersonAddIcon />
                  )}
                </Button>
                <Button
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                  }}
                  variant="outlined"
                  onClick={() => {
                    handleMessage(currentUser.uid, uid);
                  }}
                >
                  Message <MessageIcon />
                </Button>
                <Button
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                  }}
                  variant="outlined"
                >
                  Report <FlagIcon />
                </Button>
              </div>
            </ThemeProvider>
          )}

          <div className="info">
            Welcome to your personal haven within "Posted," where your messages
            become a digital legacy. Here, every post reflects your unique
            voice, and you hold the reins of access. Your messages are securely
            guarded, accessible only with your permission. Embrace the freedom
            to share thoughts, memories, and moments with trusted recipients,
            ensuring that your digital presence remains as private or as shared
            as you desire. Your space, your posts, your legacy—guarded by the
            assurance of utmost privacy.
            <br />
            <br />
            Your "Posted" page, a vault for cherished words. Personal posts,
            shared selectively. Secure, private, and timeless—your digital
            legacy begins here.
            <br />
            <br />
            In your "Posted" sanctuary, messages echo your essence. Safeguarded
            and selectively shared, each post carries the weight of your digital
            legacy.
          </div>
        </div>
      ) : (
        <h1>Cannot Find User</h1>
      )}
      <PrivatePostModal
        open={openPrivateModal}
        handleClose={handleClosePrivateModal}
      />
      <MessageModal
        open={openMessageModal}
        handleClose={handleCloseMessageModal}
      />
      {/* <Alert
        severity="error"
        sx={{
          position: "fixed",
          bottom: "1rem",
          left: "1rem",
          textAlign: "left",
        }}
      >
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert> */}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  padding-top: 3rem;
  background-color: black;
  color: white;
  min-height: 100vh;
  text-align: center;
  overflow-x: hidden;
  position: relative;

  .section {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
  }

  .pendulum {
    height: 10rem;
    position: absolute;
    top: -5px;
    right: 7rem;
    transform-origin: top center; /* Set the transformation origin to the top center of the element */
    animation: swing 1s infinite ease-in-out alternate; /* Adjust the duration and timing function as needed */
  }

  @keyframes swing {
    0% {
      transform: rotate(7deg);
    }
    100% {
      transform: rotate(-7deg); /* Adjust the angle of swing as needed */
    }
    /* 100% {
      transform: rotate(10deg);
    } */
  }

  .posts {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 1rem;
    width: 95vw;
    /* flex-direction: column; */
    margin-top: 3rem;
    .post {
      border: 1px solid white;
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: 1.5rem;
      width: 25rem;
      height: 5rem;
      font-size: 1.5rem;
      color: white;
      cursor: pointer;
      /* background-color: whitesmoke; */
      /* box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, */
      /* rgba(0, 0, 0, 0.3) 0px 1px 3px -1px; */
    }

    .heading {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .post:hover {
      transition: 0.3s;
      background-color: white;
      color: black;
      /* box-shadow: none; */
      /* height: 30rem; */
    }
  }

  .info {
    color: gray;
    text-align: left;
    width: 80vw;
  }

  .pageBreak {
    margin: 5rem 0 2rem 0;
    background-color: rgba(255, 255, 255, 0.15);
    width: 90vw;
    height: 1px;
  }

  .buttons {
    /* background-color: gray; */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5rem;
    margin: 2rem;
  }
`;

export default UserPage;
