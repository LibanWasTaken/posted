import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { db } from "../services/firebase-config";
import {
  addDoc,
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  orderBy,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { Spinner1 } from "./Spinner";
import { useUserContext } from "../context/UserContext";
import { sendNotification } from "../functions/functions";

import {
  Button,
  TextField,
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  IconButton,
  Link as MuiLink,
  LinearProgress,
  CircularProgress,
  Tooltip,
  Collapse,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SendIcon from "@mui/icons-material/Send";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SortIcon from "@mui/icons-material/Sort";
import DeleteIcon from "@mui/icons-material/Delete";

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

function useShowMore(initialState = false) {
  const [showAll, setShowAll] = useState(initialState);

  const handleShowMore = () => {
    setShowAll(true);
  };

  return [showAll, handleShowMore];
}

const Comments = ({ postID, postAdminUID }) => {
  const { user: currentUser, loading: loadingUser } = useUserContext();

  const [loading, setLoading] = useState(true);
  const [commentValue, setCommentValue] = useState();
  const [disableComment, setDisableComment] = useState(false);
  const [selectedComment, setSelectedComment] = useState();
  const [selectedCommentPreview, setSelectedCommentPreview] = useState();
  const [replyValue, setReplyValue] = useState();
  const [replySending, setReplySending] = useState(false);
  const [comments, setComments] = useState();
  const [sortTypeVotes, setSortTypeLikes] = useState(true);
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  const [userData, setUserData] = useState();

  async function getFSData() {
    setLoading(true);
    // TODO: Limit
    const queryRecieved = query(
      collection(db, `/posts/${postID}/comments/`),
      orderBy("timestamp", "desc")
    );
    // const queryReceived = query(
    //   collection(db, `/posts`),
    //   orderBy("releaseDate", sortType),
    //   limit(countPosts)
    // );
    const querySnapshot = await getDocs(queryRecieved);
    const commentsDocs = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    // console.log(commentsDocs);
    setComments(commentsDocs);
    // setLastPost(querySnapshot.docs[querySnapshot.docs.length - 1]);\
    setLoading(false);
  }

  useEffect(() => {
    getFSData();
    currentUser && getUserData(currentUser.uid);
  }, []);

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    // console.log(id, value);
    if (id == "comment") {
      setCommentValue(value);
    } else if (id == "reply") {
      setReplyValue(value);
    }
  };

  async function getUserData(uid) {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const userDataReceived = docSnap.data();
      // console.log(userDataReceived);
      if (userDataReceived == undefined) {
        setLoading(false);
      } else {
        setUserData(userDataReceived);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Error fetching user data.");
    }
  }

  const handleSubmit = async () => {
    if (commentValue) {
      const commentValueCurr = commentValue;
      setDisableComment(true);
      try {
        // Add a new document with a generated ID
        const docRef = await addDoc(
          collection(db, "posts", postID, "comments"), //TODO: change to posted
          {
            comment: commentValue,
            timestamp: Number(dayjs().valueOf()),
            userName: userData.displayName,
            uid: currentUser.uid,
          }
        );

        setCommentValue();
        setDisableComment(false);
        getFSData();
        if (postAdminUID) {
          sendNotification(
            postAdminUID,
            `New comment: "${commentValueCurr.slice(0, 30)}"`,
            `posts/${postID}`
          );
        }
      } catch (e) {
        console.error("Error adding document:", e);
        setDisableComment(false);
      }
    }
  };

  const handleReplySubmit = async () => {
    setReplySending(true);
    if (replyValue && selectedComment) {
      const replyValueCurr = replyValue;
      try {
        const replyRef = doc(db, "posts", postID, "comments", selectedComment);
        const replyObj = {
          reply: replyValueCurr,
          ts: Number(dayjs().valueOf()),
          userName: userData.displayName,
          uid: currentUser.uid,
        };

        if (selectedCommentPreview) {
          replyObj.preview = selectedCommentPreview;
        }

        await updateDoc(replyRef, {
          replies: arrayUnion(replyObj),
        });
        handleClosePopOver();
        setReplyValue();
        setSelectedCommentPreview();
        getFSData();

        // if (postAdminUID) {
        //   sendNotification(
        //     postAdminUID,
        //     `New comment: "${replyValueCurr.slice(0, 30)}"`,
        //     `posts/${postID}`
        //   );
        // }
        console.log("success adding document:", replyObj);
      } catch (e) {
        console.error("Error adding document:", e);
        setDisableComment(false);
      }
    }
    setReplySending(false);
  };

  function generateReplies(replies, commentID) {
    return replies.map((reply, index) => (
      <div
        className={"reply"}
        key={index}
        style={reply.preview && { marginLeft: "3.5rem" }}
      >
        <div className="text">
          <p>
            <span className="preview">{reply.preview && reply.preview}</span>
            {reply.reply}
          </p>
        </div>
        <div className="details">
          <MuiLink href={`/user/${reply.uid}`} underline="hover">
            {reply.userName}
          </MuiLink>
          <p className="time">
            {dayjs(reply.timestamp).format("MMM D, YYYY HH:mm")}
          </p>
          <IconButton
            className="show"
            aria-label="reply"
            disabled={!userData}
            size="small"
            onClick={(e) => {
              setSelectedComment(commentID);
              setSelectedCommentPreview(`${reply.reply.slice(0, 10)}.. `);
              setReplyValue(`@${reply.userName} `);
              handleClickPopover(e);
            }}
          >
            <ReplyIcon fontSize="small" />
          </IconButton>
          {reply.uid && currentUser && reply.uid == currentUser.uid && (
            <IconButton
              className="show"
              aria-label="reply"
              size="small"
              onClick={handleDeleteModalOpen}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </div>
      </div>
    ));
  }

  function generateComments(comments) {
    return comments.map((comment) => {
      // const [showAllReplies, handleShowMore] = useShowMore(false);

      return (
        <div className="container" key={comment.id} style={{ width: "95%" }}>
          <div className="comment">
            <div className="content">
              <span className="img material-symbols-outlined">person</span>
              <div>
                <p className="text">{comment.comment}</p>
                <div
                  style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <a
                    href={`/user/${comment.uid}`}
                    target="_blank"
                    className="userAnchor"
                    style={{
                      // textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <p className="user">{comment.userName || "John Smith"}</p>
                  </a>
                  <IconButton
                    className="show"
                    aria-label="reply"
                    disabled={!userData}
                    onClick={(e) => {
                      setSelectedComment(comment.id);
                      setReplyValue();
                      // setReplyValue(
                      //   `"${comment.comment.slice(0, 10)}.." @${
                      //     comment.userName
                      //   } `
                      // );
                      handleClickPopover(e);
                    }}
                  >
                    <ReplyIcon />
                  </IconButton>
                  {comment.uid &&
                    currentUser &&
                    comment.uid == currentUser.uid && (
                      <IconButton
                        className="show"
                        aria-label="reply"
                        // size="small"
                        onClick={handleDeleteModalOpen}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                </div>
              </div>
            </div>
            <div className="content">
              <p className="date">
                {dayjs(comment.timestamp).format("h:m:s a - MMM D, YYYY")}
              </p>
              <div className="vote">
                <IconButton
                  size="small"
                  sx={{ color: "black", bgcolor: "#f0efef" }}
                  disabled={!currentUser}
                >
                  <ArrowDropUpIcon />
                </IconButton>
                <p>15</p>
                <IconButton size="small" disabled={!currentUser}>
                  <ArrowDropDownIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="replies">
            {comment.replies && generateReplies(comment.replies, comment.id)}
            {/* 
            {comment.replies &&
              generateReplies(
                comment.replies.slice(
                  0,
                  showAllReplies ? comment.replies.length : 3
                )
              )} */}
            {/* {comment.replies && comment.replies.length > 3 && (
              <button>Show all</button>
            )} */}
          </div>
        </div>
      );
    });
  }

  function handleDelete() {
    alert("Feature not available yet :)");
    handleDeleteModalClose();
  }

  const [anchorElPopover, setAnchorElPopover] = useState(null);

  const handleClickPopover = (event) => {
    setAnchorElPopover(event.currentTarget);
  };
  const handleClosePopOver = () => {
    setAnchorElPopover(null);
  };
  const openPopover = Boolean(anchorElPopover);
  const popoverId = openPopover ? "simple-popover" : undefined;

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  function DeleteModal({ open, handleClose, userMail = "", userID = "" }) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent sx={{ m: 3, overflow: "hidden" }}>
          <DialogContentText sx={{ marginBottom: 0 }}>
            Confirm deleting the comment?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ m: 1 }}>
          <Button
            sx={{ letterSpacing: 1, fontWeight: 500 }}
            onClick={handleClose}
            // disabled={sending}
          >
            Cancel
          </Button>
          <Button
            sx={{
              letterSpacing: 1,
              fontWeight: 500,
              bgcolor: "#ddd",
            }}
            onClick={handleDelete}
            // disabled={sending || !isEmailValid || !captchaSuccess}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <div className="title">
          <div className="heading">
            <h3>Comments</h3>
            <p>{comments && "-"}</p>
            <p>{comments && comments.length}</p>
          </div>
          <div className="endBtns">
            <Tooltip
              title={`Sort by ${
                sortTypeVotes
                  ? `${sortOrderAsc ? "least" : "most"} voted`
                  : `${sortOrderAsc ? "oldest" : "newest"} first`
              }`}
            >
              <IconButton
                sx={{ m: 0.5 }}
                onClick={() => {
                  setSortOrderAsc(!sortOrderAsc);
                  console.log(sortOrderAsc);
                }}
              >
                <SwapVertIcon
                  sx={{
                    display: "inline-block",
                    transition: "transform 0.3s ease-in-out",
                    transform: !sortOrderAsc
                      ? "rotate(180deg) scaleX(-1)"
                      : "none",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title={`Sort by ${sortTypeVotes ? "Date" : "Votes"}`}>
              <IconButton
                sx={{
                  m: 0.5,
                }}
                onClick={() => {
                  setSortTypeLikes(!sortTypeVotes);
                  console.log(sortTypeVotes);
                }}
              >
                <SortIcon
                  sx={{
                    display: "inline-block",
                    transition: "transform 0.3s ease-in-out",
                    transform: !sortTypeVotes ? "scaleX(-1)" : "none",
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        {loading ? (
          <div className="loading">
            {/* <Spinner1 /> */}
            <CircularProgress />
          </div>
        ) : (
          <section>
            <div className="addComment">
              <TextField
                sx={{
                  m: 1,
                  marginBottom: 2,
                  //   backgroundColor: "white",
                  outline: "none",
                  border: "none",
                }}
                id="comment"
                label={!userData ? "Log in to comment" : "Comment"}
                placeholder="Join the discussion"
                type="text"
                variant="standard"
                value={commentValue}
                inputProps={{ maxLength: 1234 }}
                fullWidth
                // onKeyDown={handleEnterPress}
                disabled={!userData || disableComment}
                focused={commentValue}
                multiline
                onChange={handleInputChange}
              />
              <Button
                sx={{
                  letterSpacing: 1,
                  fontWeight: 400,
                  backgroundColor: "#eee",
                  p: 2,
                }}
                disabled={!commentValue || disableComment}
                onClick={handleSubmit}
                endIcon={
                  disableComment ? (
                    <CircularProgress size={"1rem"} />
                  ) : commentValue ? (
                    <SendIcon />
                  ) : (
                    <SendOutlinedIcon />
                  )
                }
              >
                Add
              </Button>
            </div>
            <div className="comments">
              {comments && comments.length > 0 ? (
                generateComments(comments)
              ) : (
                <p>nothing to show here</p>
              )}
            </div>
          </section>
        )}
        <Popover
          id={popoverId}
          open={openPopover}
          anchorEl={anchorElPopover}
          onClose={handleClosePopOver}
          elevation={2}
          anchorOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          // sx={{ m: 1 }}
        >
          <Box
            sx={{
              padding: "0.5rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              // gap: 1,
            }}
          >
            <TextField
              sx={{
                m: 1,
                marginBottom: 2,
                outline: "none",
                border: "none",
                width: "50ch",
              }}
              id="reply"
              label={!userData ? "Log in to Reply" : "Reply"}
              type="text"
              variant="standard"
              value={replyValue}
              inputProps={{ maxLength: 1234 }}
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !(!userData || disableComment)) {
                  console.log("ahoy?");
                  handleReplySubmit();
                }
              }}
              disabled={!userData || disableComment || replySending}
              // focused={replyValue}`
              // inputRef={(input) => input && input.focus()}`
              autoFocus
            />
            <IconButton
              aria-label="send"
              disabled={!replyValue || replySending}
              onClick={handleReplySubmit}
            >
              {replyValue ? <SendIcon /> : <SendOutlinedIcon />}
            </IconButton>
          </Box>
          {replySending && <LinearProgress />}
        </Popover>
        <DeleteModal
          open={deleteModalOpen}
          handleClose={handleDeleteModalClose}
          // userMail={loginEmail}
        />
      </ThemeProvider>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  margin: 2rem 0 0 0;
  padding: 1rem 2rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  /*     border-radius: 10px; */
  /* background-color: whitesmoke; */
  background-color: #f8f8f8;
  width: 95%;
  p {
    margin: 0;
  }
  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  }
  .title {
    .heading {
      display: flex;
      align-items: center;
      /* justify-content: center; */
      gap: 1rem;
      flex-direction: row;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-direction: row;
    border-bottom: 1px solid #ccc;
    padding: 0.5rem 0 1rem 1rem;
  }

  .addComment {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 2rem;
    margin: 2rem 1rem;
    background-color: #f2f2f2;
  }

  .comments {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 3rem;

    .container {
      border-bottom: 1px solid #ddd;
      margin: 0 0 0.5rem 0;
    }
    .comment {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-bottom: 0.5rem;
      .img {
        background-color: white;
        border-radius: 50%;
        padding: 10px;
      }
      .user {
        /* font-style: italic; */
        /* padding-left: 1rem; */
        /* margin: 0 0 1rem 0; */
        font-size: 0.9rem;
      }
      .content {
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 80%;
        /* justify-content: center; */
        .text {
          padding-top: 1rem;
        }
      }
      .userAnchor {
        text-decoration: none;
      }
      .userAnchor:hover {
        text-decoration: underline;
      }
      .date {
        color: gray;
      }
      .vote {
        /* cursor: pointer; */
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        /* font-family: serif; */
        /* gap: -50px; */
        p {
          margin: 0;
          padding: 0;
          text-align: center;
        }
      }
      .show {
        opacity: 0;
      }
    }

    .comment:hover {
      .show {
        opacity: 1;
      }
    }
    .replies {
      /* border: 1px solid red; */
      /* padding-bottom: 1rem; */
    }
    .reply {
      /* border: 1px solid red; */
      width: 70%;
      display: flex;
      /* align-items: center; */
      /* justify-content: center; */
      flex-direction: column;
      /* text-align: start; */
      margin-bottom: 1rem;
      margin-left: 1.5rem;
      padding-left: 1rem;
      border-left: 1px solid #ddd;
      .text {
        margin: 0.5rem 0;
      }
      .preview {
        color: #ccc;
      }
      .details {
        display: flex;
        align-items: center;
        justify-content: start;
        flex-direction: row;
        gap: 1rem;
        font-size: 0.9rem;

        .time {
          color: gray;
        }
      }
      .show {
        opacity: 0;
      }
    }
    .reply:hover {
      .show {
        opacity: 1;
      }
    }
  }
  .loading {
    text-align: center;
    margin: 2rem 0 1rem 0;
  }
`;

export default Comments;

// TODO:  srt them seriouly but akta reply te johon replyy click kore, use the "quto" of the og reply, but the id of the og comment
// TODO: make the quoted thing "disabled", seperate it alada in the db? render seperately if it exits. if the reply reply button is pressend andd the quote, naile dorkar nai
// console.log(comment);
// TODO: instead of deleating, remove the reply.msg, and make preview "message deleted"
// TODO: voting + replying, fake render it so that it doesnt reload
// TODO: sorting comments
// TODO: voting comments
// TODO: send notification if the @ is present == user.name, put it in the informations site
// TODO: multiline?
// TODO: sort -> asc, desc, by date comments
// TODO: comment.replies length > 3 = 0:3, if (len > 3), show all comments button render for replies and comments (10)
