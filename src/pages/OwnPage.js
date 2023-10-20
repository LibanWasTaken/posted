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

import {
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db as FSdb } from "../services/firebase-config";
import { useUserContext } from "../context/UserContext";

function generatePostLinks(posts) {
  // console.log();
  return posts.map((post) => (
    <Link
      key={post.id} // Make sure to provide a unique key for each mapped element
      to={`/me/post/${post.id}`}
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

  // const slideData = [
  //   {
  //     index: 0,
  //     headline: "New Fashion Apparel",
  //     button: "Shop now",
  //     src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
  //   },
  //   {
  //     index: 1,
  //     headline: "In The Wilderness",
  //     button: "Book travel",
  //     src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg",
  //   },
  //   {
  //     index: 2,
  //     headline: "For Your Current Mood",
  //     button: "Listen",
  //     src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg",
  //   },
  //   {
  //     index: 3,
  //     headline: "Focus On The Writing",
  //     button: "Get Focused",
  //     src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg",
  //   },
  // ];

  async function getFSData() {
    const userID = currentUser.uid;
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
  }

  async function addPostToUserDoc(postID, uid) {
    try {
      console.log("its happening");

      const userPostsRef = doc(FSdb, `users/${uid}/posts`, postID);
      const docSnap = await getDoc(userPostsRef);

      if (docSnap.exists()) {
        await setDoc(userPostsRef, { postID }, { merge: true });
        console.log("Document updated in user's collection with ID: ", postID);
      } else {
        console.log("No such document! Creating one");
        await setDoc(userPostsRef, { postID });
        console.log("Document created in user's collection with ID: ", postID);
      }
    } catch (e) {
      console.error("Error adding collection: ", e);
    }
  }

  useEffect(() => {
    if (currentUser) {
      getFSData();
    }

    // !loading && !currentUser && scrollToBottom(105);
  }, [currentUser, loading]);

  return (
    <div style={{ background: "whitesmoke", height: "975px" }}>
      <Wrapper>
        <span className="stylishBg">
          {/* <div></div> */}
          <img
            src={ExamSVG}
            alt="ExamSVG"
            className="ExamSVG imgLoad"
            onLoad={(e) => {
              e.target.classList.add("imgLoaded");
            }}
          />

          <img
            src={ScreenTimeSVG}
            alt="ScreenTimeSVG"
            className="ScreenTimeSVG imgLoad"
            onLoad={(e) => {
              e.target.classList.add("imgLoaded");
            }}
          />
        </span>
        {userPosts ? (
          <section className="postSection">
            <p className="header">Your Posts</p>
            <div className="posts">
              {generatePostLinks(userPosts)}
              {userPosts.length < 3 && (
                <div className="post" onClick={OpenPostAdder}>
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
                <h4 style={{ letterSpacing: "2px" }}>LOG IN</h4>
              </div>
            ) : (
              <Spinner2 />
            )}
          </section>
        )}
        <div className="semiHeroText">
          <section>
            <h2>Lorem ipsum dolor sit amet.</h2>
            <h3>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic ipsa
              quae temporibus perferendis eos alias.
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
            <h3>perferendis eos alias.</h3>
          </section>
        </div>
        {/* <img
          src={ExamSVG}
          alt="ExamSVG"
          className="ExamSVG imgLoad"
          onLoad={(e) => {
            e.target.classList.add("imgLoaded");
          }}
        /> */}

        {/* <h1 className="randomAssText">
        Lorem ipsum dolor sit amet,
        <br /> Jesnly fomer.
      </h1> */}
        {/* <SliderComponent heading="Example Slider" slides={slideData} /> */}
        {/* <div className="waves">
          <Waves />
        </div> */}
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
  .postSection {
    text-align: left;
    z-index: 1;
    height: 450px;
    /* border: 1px solid red; */
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
    /* overflow: hidden; */
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
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

  .addPostBtn {
    font-size: 2rem;
  }
  .addPostBtn:hover {
    transform: rotate(90deg);
    transition: 0.3s;
  }

  .semiHeroText {
    position: relative;
    padding-top: 5rem;
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
      gap: 2rem;
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

  @media screen and (max-width: 1200px) {
    .semiHeroText {
      padding-top: 1rem;
    }
    img {
      display: none;
    }
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
`;

export default OwnPage;
