import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, getDocs } from "firebase/firestore";
import { db } from "../services/firebase-config";

const PostSidebar = () => {
  //   const { user: currentUser, loading } = useUserContext();
  const { id } = useParams();
  const [postData, setPostData] = useState();
  const [otherPostData, setOtherPostData] = useState();

  async function getOtherPostsData() {
    // const userID = currentUser.uid;
    // // TODO: also get from users/posted
    // await getDocs(collection(db, `/users/${userID}/posts`)).then(
    //   (querySnapshot) => {
    //     const postsData = querySnapshot.docs.map((doc) => ({
    //       ...doc.data(),
    //       id: doc.id,
    //     }));
    //     setOtherPostData(postsData);
    //   }
    // );
  }

  return (
    <Wrapper>
      <div className="sidebar">
        <span className="box1"></span>
        <span className="box2"></span>
        <section>
          <p className="title">Post Addons</p>
          <div className="components">
            <button className="add diary" onClick={null}>
              {/* <button className="add diary" onClick={handleDiaryOpenMUI}> */}
              <p>Diary</p>
              <span className="icon material-symbols-outlined">add_notes</span>
            </button>
            <button className="add link" onClick={null}>
              {/* <button className="add link" onClick={handleLinkAdderOpen}> */}
              <p>Links</p>
              <span className="icon material-symbols-outlined">add_link</span>
            </button>
            <button
              className="add etc"
              onClick={() => {
                // setTabValue(3);
              }}
            >
              <p>Settings</p>
              <span className="icon material-symbols-outlined">settings</span>
            </button>
          </div>
        </section>
        <section>
          <p className="title">Other Posts</p>
          <div className="components">
            <button className="add diary" onClick={null}>
              {/* <button className="add diary" onClick={handleDiaryOpenMUI}> */}
              <p>Diary</p>
              <span className="icon material-symbols-outlined">add_notes</span>
            </button>
            <button className="add link" onClick={null}>
              {/* <button className="add link" onClick={handleLinkAdderOpen}> */}
              <p>Links</p>
              <span className="icon material-symbols-outlined">add_link</span>
            </button>
            <button
              className="add etc"
              onClick={() => {
                // setTabValue(3);
              }}
            >
              <p>Settings</p>
              <span className="icon material-symbols-outlined">settings</span>
            </button>
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .sidebar {
    display: flex;
    gap: 4rem;
    flex-direction: column;

    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
    /* width: 15vw; */
    width: 290px;
    min-height: 100vh;
    height: 100%;
    overflow: hidden;
    color: white;
    padding-top: 4rem;

    section {
      z-index: 1;
    }

    .title {
      letter-spacing: 1px;
      text-align: left;
      padding-left: 10%;
    }
    .box1 {
      padding: 20rem;
      background: rgb(15, 15, 15);
      position: absolute;
      top: 450px;
      left: 0;
      transform: rotate(45deg);
      z-index: 0;
      pointer-events: none;
    }
    .box2 {
      padding: 30rem;
      background: rgba(45, 45, 45, 0.5);
      position: absolute;
      top: 550px;
      left: -500px;
      transform: rotate(45deg);
      z-index: 0;
      pointer-events: none;
    }
  }

  .components {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.75rem;
    .add {
      outline: none;
      border: none;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.15);

      padding: 0px 15px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 90%;
      p {
        font-size: 1rem;
        font-family: "Raleway";
      }

      .icon {
        font-size: 1.5rem;
        opacity: 0.8;
        padding-right: 10px;
      }
    }
    .add:hover {
      cursor: pointer;
      transition: 0.3s;
      /* padding: 1.5rem 2.7rem; */
      /* color: black; */
      background-color: rgba(255, 255, 255, 0.25);
    }
  }

  @media screen and (max-width: 1000px) {
    padding-left: 0;
    padding-top: 7rem;

    .sidebar {
      align-items: center;
      justify-content: space-around;
      flex-direction: row;
      width: 100vw;
      min-height: 0;
      height: 4rem;
      padding-top: 0;

      .components {
        flex-direction: row;
        .add {
          background-color: black;
        }
        p {
          display: none;
        }
      }

      .title {
        display: none;
      }
      .box1 {
        display: none;
      }
      .box2 {
        display: none;
      }
    }
  }

  .tabs {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    flex-direction: row;
    margin-bottom: 1rem;
  }

  .postForm {
    width: 90%;
    background-color: white;
    border-radius: 10px;
    /* margin-top: 2rem; */
  }

  .buttons {
    background-color: #eee;

    border-radius: 10px;
    margin: 5rem;
    text-align: center;
    .classicBtn {
      margin: 1rem;
    }
    .classicBtn:hover {
      margin: 1rem;
      letter-spacing: 2px;
      padding: 1.5rem 2.5rem;
    }
  }

  .changeStateBtnsDiasbled {
    opacity: 0.8;
    pointer-events: none;
  }

  .changeStateBtns {
    margin: 2rem 0;
    .changeStateBtn {
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
    .delete {
      background-color: tomato;
      color: white;
    }
    .delete:hover {
      background-color: #dd573f;
    }

    .disable {
      color: tomato;
      /* text-decoration: underline; */
      border: 1px solid tomato;
    }

    .disable:hover {
      /* color: red;
      border: 1px solid red; */
      text-shadow: 0 0 1px red;
    }
  }
`;

const Content = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-direction: column;
  background-color: whitesmoke;
  height: 60vh;
  overflow: hidden;
`;
export default PostSidebar;
