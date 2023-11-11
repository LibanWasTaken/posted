import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Spinner1 } from "../../components/Spinner";
import { scrollToBottom } from "../../functions/functions";

import Viewer from "../../components/Editor/Viewer";
import Diary from "../../components/Diaries/DiaryMui";
import { useUserContext } from "../../context/UserContext";
import DeletePost from "../../components/modals/DeletePost";

import dayjs from "dayjs";
import { db } from "../../services/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Tooltip, Button } from "@mui/material";

function LinkList({ links }) {
  return (
    <div className="links">
      {links.map((link, index) => (
        <Tooltip title={link.secondary} placement="bottom" arrow>
          <a href={link.secondary} target="_blank">
            <p key={index} className="link">
              {link.primary}
            </p>
          </a>
        </Tooltip>
      ))}
    </div>
  );
}

export default function SinglePostPage() {
  const { user: currentUser, loading: loadingUser } = useUserContext();
  const { id } = useParams();
  const [postData, setPostData] = useState();
  const [userData, setUserData] = useState();
  const [postAdmin, setPostAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hearted, setHearted] = useState(false);
  const [hearting, setHearting] = useState(false);
  const [inValidPost, setInValidPost] = useState(false);
  const [settingsEnabled, setSettingsEnabled] = useState(false);
  let scrollPosition;

  async function getFSData() {
    try {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      const postDataReceived = docSnap.data();
      // console.log(postDataReceived);
      if (postDataReceived == undefined) {
        setInValidPost(true);
        setLoading(false);
      } else {
        setPostData(postDataReceived);
        !userData && getUserData(postDataReceived.user);
      }
    } catch (error) {
      console.error("Error fetching post data:", error);
      alert("Error fetching post data.");
    }
  }

  async function getUserData(uid) {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const userDataReceived = docSnap.data();
      // console.log(userDataReceived);
      if (userDataReceived == undefined) {
        setInValidPost(true);
        setLoading(false);
      } else {
        setUserData(userDataReceived);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Error fetching user data.");
    }
  }
  useEffect(() => {
    getFSData();
  }, []);

  useEffect(() => {
    if (currentUser && postData) {
      if (postData.likes) {
        const isCurrentUserLiked = postData.likes.includes(currentUser.uid);
        setHearted(isCurrentUserLiked);
        // console.log(isCurrentUserLiked);
      }
      if (!postAdmin && currentUser.uid == postData.user) {
        setPostAdmin(true);
      }
    }
  }, [currentUser, postData]);

  // TODO: change releaseDate to .valueOf() integer values
  // .collection("posts")
  // .orderBy("releaseDate", "desc")

  async function handleHeart() {
    try {
      setHearting(true);
      const docRef = doc(db, "posts", id); // TODO: change to posted
      const docSnap = await getDoc(docRef);
      const postDataReceived = docSnap.data();
      let postDataLikes = postDataReceived.likes || [];
      const uid = currentUser.uid;

      if (hearted) {
        postDataLikes = postDataLikes.filter((userId) => userId !== uid);
      } else {
        postDataLikes.push(uid);
      }

      const postRef = doc(db, "posts", id); // TODO: change to posted
      await updateDoc(postRef, {
        likes: postDataLikes,
      });

      setHearted(!hearted);
      setHearting(false);

      // console.log(hearted ? "Disliked" : "Liked");
    } catch (error) {
      console.error("Error handling like/dislike", error);
      setHearting(false);
    }
  }

  function handleSettings() {
    setSettingsEnabled(true);
    setTimeout(() => {
      scrollToBottom();
      scrollPosition = window.scrollY;

      // Disable scrolling
      document.body.style.overflow = "hidden";
    }, 10);
  }

  const [diaryOpenMUI, setDiaryOpenMUI] = useState(false);
  const [deletePostOpen, setDeletePostOpen] = useState(false);
  const handleDiaryCloseMUI = () => setDiaryOpenMUI(false);
  const handleDiaryOpenMUI = () => setDiaryOpenMUI(true);
  const handleDeletePostOpen = () => setDeletePostOpen(true);
  const handleDeletePostClose = () => setDeletePostOpen(false);

  return (
    <Wrapper>
      {loading ? (
        <div className="error">
          <Spinner1 />
        </div>
      ) : inValidPost ? (
        <div className="error">
          <h1>Post Not Found</h1>
          <a href="/">
            <button className="classicBtn">Go home</button>
          </a>
        </div>
      ) : (
        <section className="Container">
          <div className="postContainer">
            <section className="info">
              {/* <div style={{ display: "flex", gap: "5rem", alignItems: "center" }}> */}
              <div>
                <div>
                  <p className="title">{postData.title}</p>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Tooltip
                      title={dayjs(postData.releaseDate).format("HH:mm:ss")}
                      placement="right"
                      arrow
                    >
                      <h2 className="releaseDate">
                        {dayjs(postData.releaseDate).format("DD MMM, YYYY")}
                      </h2>
                    </Tooltip>
                  </span>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <h4 className="description">
                  {postData.description && postData.description}
                </h4>
                <p className="username">
                  {postData.anonymity ? (
                    "- Anonymous"
                  ) : (
                    <a href={`/user/${postData.user}`}>
                      - {userData.displayName || "This Guy"}
                    </a>
                  )}
                </p>{" "}
              </div>

              <div className="buttons">
                <span
                  class="buttonIcon material-symbols-outlined"
                  onClick={handleDiaryOpenMUI}
                >
                  book_5
                </span>
                {/* TODO: render even if no user, when click, say log in */}

                {/* <span
                  className="buttonIcon material-symbols-outlined"
                  onClick={() => {
                    scrollToBottom();
                  }}
                >
                  keyboard_double_arrow_down
                </span> */}
                {currentUser && postData && (
                  <Tooltip
                    title={postData.likes ? postData.likes.length : "uhh"}
                    placement="top"
                    arrow
                  >
                    <span
                      className={`heart material-symbols-outlined ${
                        hearted && "hearted"
                      } ${hearting && "liking"}`}
                      onClick={handleHeart}
                    >
                      {hearted ? "heart_check" : "favorite"}
                    </span>
                  </Tooltip>
                )}
                {postAdmin && (
                  <span
                    class="buttonIcon material-symbols-outlined settings"
                    onClick={handleSettings}
                  >
                    settings
                  </span>
                )}
              </div>
            </section>

            <section className="post">
              <div className="letter">
                {postData.letter && <Viewer state={postData.letter} />}
              </div>
              {postData.links && <LinkList links={postData.links} />}
            </section>
            {/* TODO: {postData.diary && } */}
            {true && (
              <Diary
                open={diaryOpenMUI}
                handleClose={handleDiaryCloseMUI}
                // info={id}
                editable={false}
              />
            )}
          </div>
          {settingsEnabled && (
            <div className="settingsContainer">
              <div className="title">
                <span
                  className="buttonIcon material-symbols-outlined"
                  onClick={() => {
                    scrollToBottom(0.1, 1000);
                    setTimeout(() => {
                      setSettingsEnabled(false);
                      document.body.style.overflow = "auto";
                    }, 1000);
                  }}
                >
                  keyboard_double_arrow_up
                </span>
                <h1>Settings</h1>
              </div>
              <div className="form">
                <p>Change this</p>
                <p>Also Change this</p>
                <p>what about this Change this</p>
                <button className="deleteBtn" onClick={handleDeletePostOpen}>
                  delete post
                </button>
              </div>

              <DeletePost
                open={deletePostOpen}
                handleClose={handleDeletePostClose}
                postID={id}
                userID={currentUser.uid}
                fromDB="posts" // TODO: change to posted
              />
            </div>
          )}
        </section>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  margin: 1rem 2rem;

  .buttonIcon {
    background-color: whitesmoke;
    padding: 1rem;
    border-radius: 50%;
    cursor: pointer;
  }
  .buttonIcon:hover {
    background-color: #eee;
  }
  .buttonIcon:active {
    background-color: #ddd;
  }

  .postContainer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 100%;
    /* width: 95vw; */
    section {
      padding: 1rem 2rem;
      /* border-radius: 10px; */
      width: 90%;
    }

    .info {
      width: 95%;
      border-bottom: 1px solid whitesmoke;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        user-select: none;

        .settings:hover {
          transition: 0.3s;
          transform: rotate(60deg);
        }
        .heart {
          background-color: white;
          cursor: pointer;
          border-radius: 50%;
          fill: black;
          padding: 1rem;
          transition: 0.5s ease-in-out;

          /* color: white; */
        }
        .hearted {
          /* transition: 0.3s ease-in-out; */
          background-color: black;
          color: white;
        }
        .liking {
          background-color: #eee;
          pointer-events: none;
        }
      }
      p {
        padding: 0;
        margin: 0;
      }
      .title {
        font-size: 3.5rem;
        padding: 0;
        margin: 0;
      }
      .releaseDate {
        padding: 0;
        /* margin: 0 0 2rem 0; */
        margin: 0;
      }
      .description {
        padding: 0;
        margin: 0 0 0.5rem 0;
      }

      .username {
        a {
          text-decoration: none;
          color: black;
        }
      }
    }

    .post {
      /* border: 1px solid #ddd; */
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .letter {
        /* width: 50%; */
        /* border: 1px solid red; */
      }

      .links {
        /* border: 1px solid red; */
        max-height: 3rem;
        overflow-x: scroll;
        padding: 0.5rem;
        padding-bottom: 1rem;
        display: flex;
        gap: 1rem;
        grid-template-columns: 1fr 1fr 1fr;

        a {
          text-decoration: none;
          color: black;
          margin: 0;
        }
        .link {
          cursor: pointer;
          width: 10rem;
          height: 3rem;
          margin: 0;
          text-align: center;

          /* padding: 1rem 1rem; */
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: whitesmoke;
        }
      }
    }
  }

  .settingsContainer {
    width: 95%;
    padding: 1rem;
    height: 85vh;
    margin-top: 250vh;
    margin-bottom: 2rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    .title {
      display: flex;
      margin: 0 2rem;
      align-items: center;
      gap: 2rem;
      border-bottom: 1px solid #ddd;
      padding-bottom: 1rem;
      margin-bottom: 2rem;
    }

    .form {
      /* display: flex;
      /* align-items: center;
      flex-direction: column;
      justify-content: space-around;
      height: 50%; */
    }

    .deleteBtn {
      margin: 0 1rem;
      padding: 1rem;
      outline: none;
      border: none;
      cursor: pointer;
      background: none;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: 0.3s;
    }
    .deleteBtn {
      background-color: tomato;
      color: white;
    }
    .deleteBtn:hover {
      background-color: #dd573f;
    }
  }

  .error {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 100vw;
    height: 50vh;
  }
`;
