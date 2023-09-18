import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import DiaryMui from "../components/Diaries/DiaryMui";
import DiaryII from "../components/Diaries/DiaryII";
import Editor from "../components/Editor/Editor";
import LinkAdder from "../components/LinkAdder";
// import bbEditor from "../components/BigBoyEditor/bbEditor";
import CountDown from "../components/CountDown";

const OwnPostPage = () => {
  const { id } = useParams();
  console.log(id);

  const [accountEmpty, setAccountEmpty] = useState(true);
  const [diaryOpen, setDiaryOpen] = useState(false);
  const [diaryOpenMUI, setDiaryOpenMUI] = useState(false);
  const [linkAdderOpen, setLinkAdderOpen] = useState(false);
  const [info, setInfo] = useState("blabla");

  // TODO: if counter hits 00000 refresh page

  const handleDiaryOpen = () => {
    setDiaryOpen(true);
  };
  const handleDiaryClose = () => {
    setDiaryOpen(false);
  };

  const handleLinkAdderOpen = () => {
    setLinkAdderOpen(true);
  };
  const handleLinkAdderClose = () => {
    setLinkAdderOpen(false);
  };

  const handleDiaryCloseMUI = () => {
    setDiaryOpenMUI(false);
  };
  const handleDiaryOpenMUI = () => {
    setDiaryOpenMUI(true);
  };

  return (
    <Wrapper>
      {!accountEmpty ? (
        <section className="headMsg">
          <h1>There's nothing yet</h1>
          <h2>Leave something:</h2>
        </section>
      ) : (
        <CountDown />
      )}
      <div className="textEditor">
        <Editor initialConfig={{ editable: true }} />
      </div>
      <div className="components">
        <button className="add diary" onClick={handleDiaryOpen}>
          <span className="material-symbols-outlined">add_notes</span>
        </button>
        <button className="add link" onClick={handleLinkAdderOpen}>
          <span className="material-symbols-outlined">add_link</span>
        </button>
        <button className="add etc" onClick={handleDiaryOpenMUI}>
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
      <DiaryII isOpen={diaryOpen} onClose={handleDiaryClose} />
      <LinkAdder open={linkAdderOpen} handleClose={handleLinkAdderClose} />
      <DiaryMui
        open={diaryOpenMUI}
        handleClose={handleDiaryCloseMUI}
        info={info}
      />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .textEditor {
    margin: 2rem 0;
  }

  .components {
    margin-top: 4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    .add {
      outline: none;
      border: none;
      margin: 0 2rem;
      background-color: black;
      border-radius: 50%;
      padding: 2rem;

      .material-symbols-outlined {
        font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
        font-size: 2rem;
      }
      color: white;
    }
    .diary {
      /* box-shadow: rgba(0, 255, 0, 1) 0px 0px 5px; */
    }
    .link {
      /* box-shadow: rgba(255, 0, 0, 1) 0px 0px 5px; */
    }
    .etc {
      /* box-shadow: rgba(255, 0, 0, 1) 0px 0px 5px; */
    }
    .add:hover {
      cursor: pointer;
      transition: 0.3s;
      /* padding: 1.5rem 2.7rem; */
      color: black;
      background-color: whitesmoke;
      box-shadow: rgba(149, 157, 165, 0.5) 0px 8px 24px;
    }
  }
`;
export default OwnPostPage;
