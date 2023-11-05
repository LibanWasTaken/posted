import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Spinner1 } from "../../components/Spinner";
import { scrollToBottom } from "../../functions/functions";

import Viewer from "../../components/Editor/Viewer";

import dayjs from "dayjs";
import { db } from "../../services/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { Tooltip, Button } from "@mui/material";

function LinkList({ links }) {
  return (
    <div className="links">
      {links.map((link, index) => (
        <Tooltip title={link.secondary} placement="right" arrow>
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
  const [loading, setLoading] = useState(true);
  const [inValidPost, setInValidPost] = useState(false);

  async function getFSData() {
    try {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      const postDataReceived = docSnap.data();
      console.log(postDataReceived);
      if (postDataReceived == undefined) {
        setInValidPost(true);
        setLoading(false);
      } else {
        setPostData(postDataReceived);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    getFSData();

    if (postData) {
      console.log(postData.releaseDate);
      console.log(dayjs(postData.timestamp).format("DD/MM/YYYY"));
      // console.log(dayjs("Tue, 04 May 2055 18:00:00 GMT").valueOf());
      console.log(dayjs("Wed, 05 May 2055 18:00:00 GMT").valueOf());
    }
  }, []);

  // TODO: change releaseDate to .valueOf() integer values
  // .collection("posts")
  // .orderBy("releaseDate", "desc")

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
              <h3>{dayjs(postData.releaseDate).format("DD MMM, YYYY")}</h3>
              <p>- {postData.user}</p>
            </div>

            <span
              className="scrollBottomBtn material-symbols-outlined"
              onClick={() => {
                scrollToBottom();
              }}
            >
              keyboard_double_arrow_down
            </span>
          </section>

          <section className="post">
            <div className="letter">
              {postData.letter && <Viewer state={postData.letter} />}
            </div>
            <div className="diary">
              <button className="classicBtn">Diary</button>
            </div>
            {postData.links && <LinkList links={postData.links} />}
          </section>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  margin: 2rem;
  .postContainer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 100%;
    section {
      padding: 1rem 2rem;
      border-radius: 10px;
      width: 90%;
    }

    .scrollBottomBtn {
      background-color: whitesmoke;
      padding: 1rem;
      margin: 1rem;
      border-radius: 50%;

      cursor: pointer;
    }

    .info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 4rem;
        padding: 0;
        margin: 0;
      }
      h3 {
        padding: 0;
        margin: 0 0 2rem 0;
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
        border: 1px solid red;
        padding: 1rem;
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
