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
} from "firebase/firestore";
import { Spinner1 } from "./Spinner";
import { useUserContext } from "../context/UserContext";
import { sendNotification } from "../functions/functions";

import { Button, TextField } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const Comments = ({ postID, postAdminUID }) => {
  const { user: currentUser, loading: loadingUser } = useUserContext();

  const [commentValue, setCommentValue] = useState();
  const [loading, setLoading] = useState(true);
  const [disableComment, setDisableComment] = useState(false);
  const [comments, setComments] = useState();
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
    console.log(commentsDocs);
    setComments(commentsDocs);
    // setLastPost(querySnapshot.docs[querySnapshot.docs.length - 1]);\
    setLoading(false);
  }

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    console.log(id, value);
    setCommentValue(value);
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
        console.log(userDataReceived);
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

  useEffect(() => {
    getFSData();

    currentUser && getUserData(currentUser.uid);
  }, []);

  function generateComments(comments) {
    return comments.map((comment) => (
      <div className="comment" key={comment.id}>
        <div className="content">
          <span className="img material-symbols-outlined">person</span>
          <div>
            <p className="text">{comment.comment}</p>
            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              <a
                href={`/user/${comment.uid}`}
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <p className="user">{comment.userName || "John Smith"}</p>
              </a>
              <Button
                className="show"
                sx={{ height: "2rem" }}
                onClick={() => {
                  setCommentValue(
                    `"${comment.comment.slice(0, 15)}.." @${comment.userName} `
                  );
                }}
              >
                <p>Reply</p>
              </Button>
            </div>
          </div>
        </div>
        <div className="content">
          <p className="date">
            {dayjs(comment.timestamp).format("h:m:s a - DD/MM/YYYY")}
            {/* {new Date(Number(comment.timestamp)).toLocaleTimeString()} -{" "}
            {new Date(Number(comment.timestamp)).toLocaleDateString()} */}
          </p>
          <div className="vote">
            {/* <span className="material-symbols-outlined">thumb_up</span> */}
            <ArrowDropUpIcon />
            <p>15</p>
            <ArrowDropDownIcon />
          </div>
        </div>
      </div>
    ));
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
          <div className="sort">
            <span class="material-symbols-outlined">sort</span>
          </div>
        </div>
        {loading ? (
          <div className="loading">
            <Spinner1 />
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
                id="title"
                label={!userData ? "Log in to comment" : "Comment"}
                placeholder="Join the discussion"
                type="text"
                variant="standard"
                value={commentValue}
                // defaultValue={commentValue}
                inputProps={{ maxLength: 1234 }}
                fullWidth
                onChange={handleInputChange}
                onKeyDown={handleEnterPress}
                disabled={!userData || disableComment}
                focused={commentValue}
              />
              <Button
                sx={{
                  letterSpacing: 1,
                  fontWeight: 400,
                  backgroundColor: "#eee",
                  p: 2,
                }}
                disabled={!commentValue}
                onClick={handleSubmit}
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

  .sort {
    transform: scaleX(-1);
    padding: 10px;
    background-color: #eee;
    cursor: pointer;
  }

  .sort:hover {
    background-color: #ddd;
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
    .comment {
      margin: 1rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 95%;
      border-bottom: 1px solid #ddd;
      .img {
        background-color: white;
        border-radius: 50%;
        padding: 10px;
      }
      .user {
        /* font-style: italic; */
        /* padding-left: 1rem; */
        margin: 0 0 1rem 0;
        font-size: 0.9rem;
      }
      .content {
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 80%;
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
        fill: black;
        gap: -50px;
        p {
          margin: 0;
          padding: 0;
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
  }

  .loading {
    text-align: center;
    margin: 1rem;
  }
`;

export default Comments;
