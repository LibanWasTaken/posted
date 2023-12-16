import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import { db } from "../services/firebase-config";
import { updateDoc, doc } from "firebase/firestore";

import Tooltip from "@mui/material/Tooltip";

dayjs.extend(utc);
dayjs.extend(duration);

const CountDown = (props) => {
  const [open, setOpen] = useState(false);
  const [delaying, setDelaying] = useState(false);
  const [warn, setWarn] = useState(false);
  const postID = props.info.postID;
  const releaseDate = props.info.releaseDate;
  const disabled = props.info.disabled;
  const preset = props.info.preset;
  const warnDuration = props.info.warnDuration;
  const navigate = useNavigate();

  function redirect() {
    navigate(`/me`);
  }

  const targetDate = dayjs(releaseDate);
  const newDate = dayjs(releaseDate).add(1, "month");

  async function handleDelay() {
    setDelaying(true);
    try {
      const postRef = doc(db, "posts", postID);
      await updateDoc(postRef, { releaseDate: newDate.valueOf() });
      console.log("Document successfully updated");

      window.location.reload();
    } catch (error) {
      alert("Error Delaying");
      console.error("Error updating document:", error);
      setDelaying(false);
    }
  }

  function handleClose() {
    setOpen(false);
  }
  function handleOpen() {
    setOpen(true);
  }

  const formatNumberWithTwoSignificantFigures = (number) => {
    return number.toLocaleString(undefined, { minimumIntegerDigits: 2 });
  };

  const calculateTimeRemaining = () => {
    const now = dayjs.utc();
    const timeRemaining = targetDate.diff(now);
    const timeRemainingInDays = targetDate.diff(now, "days");
    const duration = dayjs.duration(timeRemaining);
    return {
      years: formatNumberWithTwoSignificantFigures(duration.years()),
      months: formatNumberWithTwoSignificantFigures(duration.months()),
      days: formatNumberWithTwoSignificantFigures(duration.days()),
      hours: formatNumberWithTwoSignificantFigures(duration.hours()),
      minutes: formatNumberWithTwoSignificantFigures(duration.minutes()),
      seconds: formatNumberWithTwoSignificantFigures(duration.seconds()),
      inDays: Number(timeRemainingInDays),
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  useEffect(() => {
    if (!warn) {
      if (timeRemaining.inDays <= warnDuration) setWarn(true);
    }
    // TODO: enable && not disabled?
    // if (timeRemaining && !disabled && timeRemaining.seconds < 0) {
    //   redirect();
    // }
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function WarningSign() {
    return (
      <Tooltip
        title="The remaining time is now less than the configured warning duration. Simultaneously, a notification email should have been dispatched.
      "
        placement="bottom"
        arrow
      >
        <span className="material-symbols-outlined exclamation">error</span>
      </Tooltip>
    );
  }
  return (
    <Wrapper>
      {open ? (
        <section className="section full">
          {warn && <WarningSign />}
          {/* <span class="material-symbols-outlined exclamation">error</span> */}

          <div className="close">
            <span
              className="material-symbols-outlined closeBtn"
              onClick={handleClose}
            >
              close_fullscreen
            </span>
          </div>
          <h1>{disabled && "Not "}Posting in</h1>
          <div className="countdown">
            {timeRemaining.years > 0 && (
              <div className="item">
                <span className="number">{timeRemaining.years}</span>
                <span className="label">
                  {timeRemaining.years === 1 ? "year" : "years"}
                </span>
              </div>
            )}
            {timeRemaining.months > 0 && (
              <div className="item">
                <span className="number">{timeRemaining.months}</span>
                <span className="label">months</span>
              </div>
            )}
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
          <div className="delay">
            <p>{targetDate.format("DD/MM/YYYY")}</p>
            <button
              className={`classicBtn ${
                delaying && "disabledClassicBtn loadingClassicBtn "
              }`}
              onClick={handleDelay}
            >
              Delay To
            </button>
            <p>{newDate.format("DD/MM/YYYY")}</p>
          </div>
        </section>
      ) : (
        <section className="small">
          {warn && <WarningSign />}

          <p className={disabled && "crossed"}>
            {timeRemaining.years > 0 && <span>{timeRemaining.years}:</span>}
            {timeRemaining.months > 0 && <span>{timeRemaining.months}:</span>}
            {timeRemaining.days}:{timeRemaining.hours}:{timeRemaining.minutes}:
            {timeRemaining.seconds}
          </p>

          <span
            className="material-symbols-outlined openBtn"
            onClick={handleOpen}
          >
            open_in_full
          </span>
        </section>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  width: 90%;
  position: relative;

  .exclamation {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 3rem;
    color: black;
    border-radius: 50%;
  }

  .delay {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .closeBtn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    padding: 5px;
    border-radius: 50%;
  }
  .closeBtn:hover,
  .openBtn:hover {
    background-color: rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transform: rotate(180deg);
    transition: 0.3s;
  }

  section {
    background-color: #eee;
    box-shadow: rgba(0, 0, 0, 0.15) 0 0 3px;
  }

  .full {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding: 2rem;

    h1 {
      font-size: 2rem;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin: 0 0 1rem 0;
    }
    h2 {
      font-size: 1.5rem;
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
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      letter-spacing: 1px;
      background-color: rgba(255, 255, 255, 1);
      /* color: white; */
      width: 4.5rem;
      padding: 1rem;
      .number {
        font-size: 3rem;
        margin-bottom: 10px;
      }
      .label {
        /* text-shadow: 0 0 5px rgba(0, 0, 0, 0.5); */
        font-size: 1rem;
      }
    }

    @keyframes pulse {
      0% {
        background-color: rgba(255, 255, 255, 0.5);
      }
      100% {
        background-color: rgba(255, 255, 255, 1);
      }
    }

    .item:last-child {
      /* animation: pulse 1s infinite ease-in-out; */
    }
  }

  .small {
    /* position: absolute;
    top: 8rem;
    right: 1rem; */
    padding: 0.5rem 1.5rem;
    border-radius: 10px;
    font-size: 1.5rem;
    letter-spacing: 1px;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      margin: 10px 10px 10px 0;
      font-family: monospace;
    }

    .exclamation {
      top: auto;
    }
  }

  .crossed {
    text-decoration: line-through;
  }

  .openBtn {
    font-size: 1.5rem;
    padding: 5px;
    border-radius: 50%;
  }
`;

export default CountDown;
