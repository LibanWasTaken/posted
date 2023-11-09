import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Spinner1 } from "../../components/Spinner";
import { scrollToBottom } from "../../functions/functions";

import Viewer from "../../components/Editor/Viewer";
import Diary from "../../components/Diaries/DiaryMui";

import dayjs from "dayjs";
import { db } from "../../services/firebase-config";
import { doc, getDoc } from "firebase/firestore";
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
  const { id } = useParams();
  const [postData, setPostData] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [hearted, setHearted] = useState(false);
  const [inValidPost, setInValidPost] = useState(false);

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

    // if (postData) {
    //   console.log(postData.releaseDate);
    //   console.log(dayjs(postData.timestamp).format("DD/MM/YYYY"));
    //   // console.log(dayjs("Tue, 04 May 2055 18:00:00 GMT").valueOf());
    //   console.log(dayjs("Wed, 05 May 2055 18:00:00 GMT").valueOf());
    // }
  }, []);

  // TODO: change releaseDate to .valueOf() integer values
  // .collection("posts")
  // .orderBy("releaseDate", "desc")

  function handleHeart() {
    if (hearted) {
      setHearted(false);
    } else {
      setHearted(true);
    }
  }

  const [diaryOpenMUI, setDiaryOpenMUI] = useState(false);
  const handleDiaryCloseMUI = () => setDiaryOpenMUI(false);
  const handleDiaryOpenMUI = () => setDiaryOpenMUI(true);

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
        <div className="postContainer">
          <section className="info">
            <div>
              <p className="title">{postData.title}</p>
              <h2 className="releaseDate">
                {dayjs(postData.releaseDate).format("DD MMM, YYYY")}
              </h2>
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
              </p>
            </div>

            <div className="buttons">
              <span
                class="button material-symbols-outlined"
                onClick={handleDiaryOpenMUI}
              >
                book_5
              </span>
              <span
                className={`heart material-symbols-outlined ${
                  hearted && "hearted"
                }`}
                onClick={handleHeart}
              >
                {hearted ? "heart_check" : "favorite"}
              </span>
              <span
                className="button material-symbols-outlined"
                onClick={() => {
                  scrollToBottom();
                }}
              >
                keyboard_double_arrow_down
              </span>
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
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  margin: 2rem;

  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  }
  .postContainer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 100%;
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

        .button {
          background-color: whitesmoke;
          padding: 1rem;
          border-radius: 50%;
          cursor: pointer;
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
        .button:hover {
          background-color: #eee;
        }
        .button:active {
          background-color: #ddd;
        }
      }
      p {
        padding: 0;
        margin: 0;
      }
      .title {
        font-size: 4rem;
        padding: 0;
        margin: 0;
      }
      .releaseDate {
        padding: 0;
        margin: 0 0 2rem 0;
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
