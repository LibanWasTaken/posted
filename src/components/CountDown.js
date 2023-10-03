import { React, useState, useEffect } from "react";

import styled from "styled-components";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";

dayjs.extend(utc);
dayjs.extend(duration);

const CountDown = (props) => {
  const [delayDisabled, setDelayDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const releaseDate = props.info.releaseDate;
  const disabled = props.info.disabled;

  // const targetDate = dayjs.utc("2023-09-30T00:01:00Z");
  const targetDate = dayjs(releaseDate);

  function handleDelay() {
    setDelayDisabled(true);
    // import the function
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
    const duration = dayjs.duration(timeRemaining);
    // console.log(releaseDate, duration);
    return {
      years: formatNumberWithTwoSignificantFigures(duration.years()),
      months: formatNumberWithTwoSignificantFigures(duration.months()),
      days: formatNumberWithTwoSignificantFigures(duration.days()),
      hours: formatNumberWithTwoSignificantFigures(duration.hours()),
      minutes: formatNumberWithTwoSignificantFigures(duration.minutes()),
      seconds: formatNumberWithTwoSignificantFigures(duration.seconds()),
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
      // TODO: if second < -1, refresh page?
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Wrapper>
      {open ? (
        <section className="section full">
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
          <button
            className={`classicBtn ${delayDisabled && "disabledClassicBtn"}`}
            onClick={handleDelay}
          >
            Delay
          </button>
        </section>
      ) : (
        <section className="small">
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
