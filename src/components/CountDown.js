import { React, useState, useEffect } from "react";

import styled from "styled-components";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";

dayjs.extend(utc);
dayjs.extend(duration);

const CountDown = () => {
  const [delayDisabled, setDelayDisabled] = useState(false);

  const targetDate = dayjs.utc("2023-09-30T00:01:00Z");

  function handleDelay() {
    setDelayDisabled(true);
    // db
  }

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
  return (
    <Wrapper>
      <section className="section">
        <div className="close">
          <span className="material-symbols-outlined">close</span>
        </div>
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
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  border-radius: 10px;
  padding: 2rem;

  .material-symbols-outlined {
    position: relative;
    left: 45vw;
    font-size: 2rem;
  }

  .section {
    width: 93vw;

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
`;

export default CountDown;
