import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ScreenTimeSVG from "../assets/undraw_screenTimeEdited.svg";
import ExamSVG from "../assets/undraw_exams_re_4ios.svg";
import { Link } from "react-router-dom";
import { Spinner2 } from "../components/Spinner";
// import Waves from "../components/Waves";
import PostAdder from "../components/PostAdder";
import dayjs from "dayjs";

import { scrollToBottom } from "../functions/functions";

import { getDocs, collection } from "firebase/firestore";
import { db as FSdb } from "../services/firebase-config";
import { useUserContext } from "../context/UserContext";

import { Link as LinkAnchor, Fade, CircularProgress } from "@mui/material";
import { getTimeDifferenceShort } from "../functions/functions";
import InfoRedirect from "../components/InfoRedirect";

function generatePostLinks(posts, whereTo) {
  return posts.map((post) => (
    <Link
      key={post.id}
      to={`/${whereTo}/${post.id}`}
      style={{ textDecoration: "none" }}
    >
      <div className={`post ${whereTo == "posts" && "posted"}`}>
        <p className="heading">{post.title}</p>
        <p className="timing">
          {dayjs(post.releaseDate).format("DD MMM, YYYY")}
        </p>
      </div>
    </Link>
  ));
}

const OwnPage = () => {
  const { user: currentUser, loading } = useUserContext();
  const [userPosts, setUserPosts] = useState();
  const [postAdderState, setPostAdderState] = useState(false);
  const ClosePostAdder = () => {
    setPostAdderState(false);
  };
  const OpenPostAdder = () => {
    setPostAdderState(true);
  };

  async function getFSData() {
    const userID = currentUser.uid;
    try {
      // TODO: also get from users/posted
      await getDocs(collection(FSdb, `/users/${userID}/posts`)).then(
        (querySnapshot) => {
          const postsData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setUserPosts(postsData);
          scrollToBottom(105);
        }
      );
    } catch (error) {
      alert("Error getting data");
    }
  }

  useEffect(() => {
    if (currentUser) {
      getFSData();
    }

    // !loading && !currentUser && scrollToBottom(105);
  }, [currentUser, loading]);

  return (
    <div
      style={{ background: "whitesmoke", height: "100%", minHeight: "100vh" }}
    >
      <Wrapper>
        <span className="stylishBg">
          {/* <div></div> */}
          {/* <Fade in={ExamSVG}> */}
          <img
            src={ExamSVG}
            alt="ExamSVG"
            className="ExamSVG imgLoad"
            onLoad={(e) => {
              e.target.classList.add("imgLoaded");
            }}
          />
          {/* </Fade> */}
          {/* <Fade in={ScreenTimeSVG} className="ScreenTimeSVG"> */}
          <img
            src={ScreenTimeSVG}
            alt="ScreenTimeSVG"
            className="ScreenTimeSVG imgLoad"
            onLoad={(e) => {
              e.target.classList.add("imgLoaded");
            }}
          />
          {/* </Fade> */}
        </span>
        {userPosts ? (
          <section className="postSection">
            <p className="header">
              Your Posts{" "}
              <InfoRedirect
                hash={10.1}
                states={{ tabIndex: 3 }}
                coloring="white"
              />
            </p>
            <div className="posts">
              {generatePostLinks(userPosts, "me/post")}
              {/* change to posted */}
              {/* {generatePostLinks(userPosts, "posts")}
              {currentUser.uid == "L1uljY8hgdZ9wnLovjJJuCr2sN63" && (
                // TODO: remove this
                <div className="post" onClick={OpenPostAdder}>
                  <span className="material-symbols-outlined addPostBtn">
                    add
                  </span>
                  <p>
                    Add Post <br /> {userPosts.length}/3
                  </p>
                </div>
              )} */}
              {userPosts.length < 3 && (
                <div className="post addPost" onClick={OpenPostAdder}>
                  <span className="material-symbols-outlined addPostBtn">
                    add
                  </span>
                  <p>
                    Add Post <br /> {userPosts.length}/3
                  </p>
                </div>
              )}
              <PostAdder
                open={postAdderState}
                handleClose={ClosePostAdder}
                info={{ uid: currentUser.uid, posts: userPosts }}
              />
            </div>
          </section>
        ) : (
          <section className="postSection loading">
            {!loading && !currentUser ? (
              <div style={{ textAlign: "center" }}>
                <h1>Invalid User, Beep Boop</h1>
                <a
                  href="/account"
                  style={{
                    letterSpacing: "2px",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  <h4>LOG IN</h4>
                </a>
              </div>
            ) : (
              // <Spinner2 />
              <CircularProgress size={"4rem"} sx={{ color: "white" }} />
            )}
          </section>
        )}
        <div className="semiHeroText">
          <section className="left">
            <h2>Posts are containers for your messages.</h2>
            <h3>
              A post incorporates functionalities such as a live diary,
              correspondence in the form of letters, links, and additional
              features.
            </h3>
            {currentUser && (
              <div className="link">
                <a
                  href={`user/${currentUser.uid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View your page
                </a>
                <span className="material-symbols-outlined">open_in_new</span>
              </div>
            )}
          </section>
          <section>
            <h3>Future Messages, Forever.</h3>
          </section>
        </div>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  height: 100%;
  color: white;
  position: relative;
  /* padding-bottom: 2rem; */
  overflow: hidden;
  .postSection {
    text-align: left;
    padding-top: 1rem;
    z-index: 1;
    height: 450px;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header {
    font-size: 2rem;
    text-align: left;
  }
  .stylishBg {
    background-color: black;
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 20rem;
    left: 0;
    top: 0;

    display: flex;
    justify-content: space-between;

    img {
      filter: saturate(0);
      opacity: 0.5;
      user-select: none;
    }
    img:hover {
      filter: saturate(1);
      opacity: 0.8;
      transition: 3s;
    }

    .ExamsSVG {
      transform: translateY(90px);
      width: 250px;
    }

    .ScreenTimeSVG {
      position: absolute;
      right: 0;
      bottom: 0;
      height: 25rem;
      transform: translateY(3px);
    }
  }

  .posts {
    display: flex;
    /* grid-template-columns: 1fr 1fr 1fr; */
    align-items: center;
    /* justify-content: center; */
    gap: 2rem;
    min-width: 50rem;
    max-width: 90vw;
    overflow-y: scroll;
    max-height: 20rem;
    flex-wrap: wrap;
    padding-bottom: 2rem;
  }

  .posts::-webkit-scrollbar {
    display: none;
  }

  .posts {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .post {
    width: 15rem;
    height: 17rem;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    border-radius: 10px;
    color: black;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    .heading {
      font-size: 1.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 95%;
    }
    .timing {
      letter-spacing: 1px;
      font-size: 1rem;
    }

    .count {
      font-size: 0.75rem;
    }
  }

  .post:hover {
    cursor: pointer;
    background-color: whitesmoke;
  }

  .posted {
    background-color: #eee;
  }

  .addPostBtn {
    font-size: 2rem;
  }
  .addPostBtn:hover {
    transform: rotate(90deg);
    transition: 0.3s;
  }

  .semiHeroText {
    position: relative;
    padding-top: 4rem;
    border-top: 2px solid rgba(0, 0, 0, 0.1);
    /* border-radius: 10px; */
    color: gray;
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 2rem;
    section {
      width: 600px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;
    }
    .left {
      border: 2px solid rgba(0, 0, 0, 0.1);

      border-radius: 10px;
      padding: 1rem 1rem 2rem 2rem;
    }
    section:last-of-type {
      align-items: center;
      justify-content: end;
    }
    .link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    a {
      color: black;
    }

    .material-symbols-outlined {
      font-size: 1rem;
    }
  }

  .ExamSVG {
    position: absolute;
    bottom: 0;
    left: 2px;
    width: 350px;
    filter: saturate(0);
    user-select: none;
    /* transform: scaleX(-1) rotate(10deg); */
    transform: scaleX(-1);
  }

  .ExamSVG:hover {
    filter: saturate(1);
    transition: 3s;
  }

  .randomAssText {
    position: fixed;
    bottom: 10rem;

    font-family: "Poppins";
    font-size: 4rem;

    color: black;
    /*background: linear-gradient(
      to right,
      #7953cd 20%,
      #00affa 30%,
      #0190cd 70%,
      #764ada 80%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    background-size: 500% auto;
    animation: textShine 5s ease-in-out infinite alternate; */
  }

  @keyframes textShine {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }

  .waves {
    width: 100%;
    position: fixed;
    bottom: 0;
    overflow: hidden;
  }

  @media screen and (max-width: 1200px) {
    .semiHeroText {
      /* padding-top: 1rem; */
      margin-top: 4rem;
      flex-direction: column;
    }
    img {
      display: none;
    }
  }

  @media screen and (max-width: 1000px) {
    .posts {
      gap: 1rem;
      /* max-width: 80vw; */
      min-width: 90vw;

      width: 10vw;
      flex-wrap: wrap;
    }

    .postSection {
      padding: 2rem;
    }

    .post {
      width: 15em;
      height: 5rem;
      display: flex;
      justify-content: left;
      align-items: start;
      padding: 1rem;
      /* align-items: center;
      justify-content: center; */
      p {
        margin: 0.5rem;
      }
      .heading {
        font-size: 1.25rem;
        width: max-content;
        max-width: 90%;
        text-align: left;
      }
      .timing {
        letter-spacing: 0;
        font-size: 1rem;
      }
    }

    .addPost {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stylishBg {
      height: 20rem;
    }

    .semiHeroText {
      section {
        width: auto;
        margin: 0 2rem;
      }
    }
  }
`;

export default OwnPage;
