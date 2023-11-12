import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { db } from "../services/firebase-config";
import { addDoc, collection, query, getDocs } from "firebase/firestore";

import { Button, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Spinner1 } from "./Spinner";

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

const Comments = ({ postID }) => {
  const [commentValue, setCommentValue] = useState();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState();

  async function getFSData() {
    setLoading(true);
    // TODO: Limit
    const queryRecieved = query(collection(db, `/posts/${postID}/comments/`));
    const querySnapshot = await getDocs(queryRecieved);
    const commentsDocs = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(commentsDocs);
    setComments(commentsDocs);
    // setLastPost(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setLoading(false);
  }
  useEffect(() => {
    getFSData();
  }, []);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    console.log(id, value);
    setCommentValue(value);
  };

  const handleSubmit = async () => {
    if (commentValue) {
      try {
        // Add a new document with a generated ID
        const docRef = await addDoc(
          collection(db, "posts", postID, "comments"), //TODO: change to posted
          {
            comment: commentValue,
            timestamp: String(dayjs().valueOf()),
          }
        );

        console.log("Document written with ID:", docRef.id);
        getFSData();
      } catch (e) {
        console.error("Error adding document:", e);
      }
    }
  };

  function generateComments(comments) {
    return comments.map((comment) => (
      <div className="comment" key={comment.id}>
        <div className="content">
          <span className="img material-symbols-outlined">person</span>
          <div>
            <p className="text">{comment.comment}</p>
            <p className="user">John Smith</p>
          </div>
        </div>
        <div className="content">
          <p>
            {new Date(Number(comment.timestamp)).toLocaleTimeString()} -{" "}
            {new Date(Number(comment.timestamp)).toLocaleDateString()}
          </p>
          <button>
            <span className="material-symbols-outlined">thumb_up</span>
          </button>
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
          <button className="sort">Sort by x</button>
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
                label="Comment.."
                type="text"
                variant="standard"
                value={commentValue}
                fullWidth
                onChange={handleInputChange}
              />
              <Button
                sx={{
                  letterSpacing: 1,
                  fontWeight: 400,
                  //   backgroundColor: "white",
                  p: 2,
                }}
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
  margin: 1rem 0;
  padding: 1rem 2rem;
  /* border: 5px solid whitesmoke;
      border-radius: 10px; */
  background-color: whitesmoke;
  width: 95%;
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
    background-color: white;
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
        font-style: italic;
        /* padding-left: 1rem; */
        font-size: 0.9rem;
      }
      .content {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }
  }

  .loading {
    text-align: center;
    margin: 1rem;
  }
`;

export default Comments;
