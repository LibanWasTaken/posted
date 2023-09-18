import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ScreenTimeSVG from "../assets/undraw_screenTimeEdited.svg";
import { Link } from "react-router-dom";
import { Spinner2 } from "../components/Spinner";
// import SliderComponent from "../components/Slider";
import Waves from "../components/Waves";
import PostAdder from "../components/PostAdder";

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
  return posts.map((post) => (
    <Link
      key={post.id} // Make sure to provide a unique key for each mapped element
      to={`/me/post/${post.id}`}
      style={{ textDecoration: "none" }}
    >
      <div className="post">
        <p className="heading">{post.title}</p>
        <p className="timing">14:02:52</p>
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
        // console.log(postsData);
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

  const addNewPostFS = async (e) => {
    e.preventDefault();
    console.log("pressed");

    try {
      const userID = currentUser.uid;

      // Adding to post collection
      const newDocRef = await addDoc(collection(FSdb, "posts"), {
        user: userID,
        title: "bipbap",
      });
      const newDocID = newDocRef.id;
      console.log("Document added with ID: ", newDocID);

      // Adding to user docs
      addPostToUserDoc(newDocID, userID);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    if (currentUser) {
      // console.log(currentUser);
      getFSData();
    }
  }, [currentUser]);

  return (
    <Wrapper>
      <span className="stylishBg">
        <div></div>
        {/* <img src={ReadingSVG} alt="ExamsSVG" className="ExamsSVG" /> */}
        <img
          src={ScreenTimeSVG}
          alt="ScreenTimeSVG"
          className="ScreenTimeSVG"
        />
      </span>
      {userPosts ? (
        <section className="postSection">
          <p className="header">Your Posts</p>
          <div className="posts">
            {generatePostLinks(userPosts)}
            {/* <Link
              to="/me/post/idshouldbethere"
              style={{ textDecoration: "none" }}
            >
              <div className="post">
                <p className="heading">Something</p>
                <p className="timing">14:02:52</p>
              </div>
            </Link>
            <div className="post">
              <p className="heading">Sum Else</p>
              <p className="timing">01:17:23</p>
            </div> */}
            <div className="post" onClick={OpenPostAdder}>
              <span className="material-symbols-outlined addPostBtn">add</span>
              <p>
                Add Post <br /> {userPosts.length}/3
              </p>
            </div>
            <PostAdder
              open={postAdderState}
              handleClose={ClosePostAdder}
              info={{ uid: currentUser.uid, posts: userPosts }}
            />
          </div>
        </section>
      ) : (
        <section className="postSection loading">
          {/* <p className="header">Loading...</p> */}
          <Spinner2 />
        </section>
      )}

      <h1 className="randomAssText">
        Lorem ipsum dolor sit amet,
        <br /> Jesnly fomer.
      </h1>
      {/* <SliderComponent heading="Example Slider" slides={slideData} /> */}
      <div className="waves">
        <Waves />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  color: white;

  .postSection {
    text-align: left;
    z-index: 1;
  }

  .loading {
    margin-top: 5rem;
    text-align: center;
  }

  .header {
    font-size: 2rem;
    text-align: left;
  }
  .stylishBg {
    background-color: black;
    position: absolute;
    width: 100vw;
    height: 20rem;
    top: 105px;
    left: 0;
    /* z-index: 0; */

    display: flex;
    justify-content: space-between;

    img {
      filter: saturate(0);
      opacity: 0.5;
    }

    .ExamsSVG {
      transform: translateY(90px);
      width: 250px;
    }

    .ScreenTimeSVG {
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
