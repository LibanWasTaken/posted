import { React, useState, useEffect } from "react";
import styled from "styled-components";
import DiaryMui from "../components/Diaries/DiaryMui";
import DiaryII from "../components/Diaries/DiaryII";
import Editor from "../components/Editor/Editor";
import LinkAdder from "../components/LinkAdder";
// import bbEditor from "../components/BigBoyEditor/bbEditor";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";

dayjs.extend(utc);
dayjs.extend(duration);

const OwnPage = () => {
  const [accountEmpty, setAccountEmpty] = useState(true);
  const [diaryOpen, setDiaryOpen] = useState(false);
  const [diaryOpenMUI, setDiaryOpenMUI] = useState(false);
  const [linkAdderOpen, setLinkAdderOpen] = useState(false);
  const [info, setInfo] = useState("blabla");
  const [delayDisabled, setDelayDisabled] = useState(false);

  const targetDate = dayjs.utc("2023-09-09T00:01:00Z");

  // Calculate the initial time remaining
  const calculateTimeRemaining = () => {
    const now = dayjs.utc();
    const timeRemaining = targetDate.diff(now);
    const duration = dayjs.duration(timeRemaining);
    return {
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

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

  const handleDelay = () => {
    setDelayDisabled(true);
    // db
  };

  return (
    <Wrapper>
      {!accountEmpty ? (
        <section className="headMsg">
          <h1>There's nothing yet</h1>
          <h2>Leave something:</h2>
        </section>
      ) : (
        <section className="headMsg">
          <h1>Posting in</h1>
          <div className="countdown">
            <div className="item">
              <span className="number">{timeRemaining.days}</span>
              <span className="label">days</span>
            </div>
            <div className="item">
              <span className="number">{timeRemaining.hours}</span>
              <span className="label">hours</span>
            </div>
            <div className="item">
              <span className="number">{timeRemaining.minutes}</span>
              <span className="label">minutes</span>
            </div>
            <div className="item">
              <span className="number">{timeRemaining.seconds}</span>
              <span className="label">seconds</span>
            </div>
          </div>
          <button
            className={`classicBtn ${delayDisabled && "disabledClassicBtn"}`}
            onClick={handleDelay}
          >
            Delay
          </button>
        </section>
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

  .headMsg {
    /* height: 100vh; */
    /* position: absolute; */
    /* top: 7rem;
    right: 2rem; */
    h1 {
      font-size: 2rem;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    h2 {
      font-size: 1.5 rem;
    }
  }

  .countdown {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-bottom: 2rem;
    .item {
      margin: 0.5rem;
      /* border-radius: 10px; */
      display: flex;
      flex-direction: column;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      width: 4rem;
      padding: 1rem;
      .number {
        font-size: 3rem;
        margin-bottom: 10px;
      }
      .label {
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        font-size: 1rem;
      }
    }

    @keyframes pulse {
      0% {
        background-color: rgba(0, 0, 0, 0.65);
      }
      100% {
        background-color: rgba(0, 0, 0, 0.5);
      }
    }

    .item:last-child {
      animation: pulse 1s infinite ease-in-out;
    }
  }

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
export default OwnPage;
