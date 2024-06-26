import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import { db } from "../services/firebase-config";
import { updateDoc, doc } from "firebase/firestore";

import Tooltip from "@mui/material/Tooltip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircularProgress from "@mui/material/CircularProgress";
import { Button as MuiButton } from "@mui/material";

dayjs.extend(utc);
dayjs.extend(duration);

const CountDown = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [newerDate, setNewerDate] = useState();
  const [delaying, setDelaying] = useState(false);
  const [warn, setWarn] = useState(false);
  const {
    postID,
    releaseDate,
    disabled,
    warnDuration,
    preset,
    delayDuration,
    scheduleFormat,
    scheduleType,
  } = props.info;
  const targetDate = dayjs(releaseDate);
  const newDate = dayjs(releaseDate).add(1, "month");

  const obj = {
    postID: "tHW6houShrlbw9NoT9CK",
    disabled: undefined,
    preset: { timePeriod: "Month", day: 1 },
    releaseDate: 1714123080000,
    delayDuration: "Week",
    scheduleFormat: "Preset",
    scheduleType: "Recurring",
    warnDuration: undefined, // back end, if null = 3days
  };

  // if (scheduleType == "Recurring") {
  //   if (scheduleFormat == "Preset") {
  //     if (preset.timePeriod == "Week") {
  //       // delay to the the preset.day of that week
  //     }
  //     if (preset.timePeriod == "Month") {
  //       if (preset.day > 28) {
  //         // if prest.day is like 31, check if the next month has it, if not delay to the last day of that month, or the preset.day of that month - https://day.js.org/docs/en/manipulate/end-of
  //       } else {
  //         const nextMonthFirstDay = dayjs()
  //           .add(1, "month")
  //           .startOf("month")
  //           .add(0, "day")
  //           .format("DD/MM/YYYY");
  //         // setNewerDate(nextMonthFirstDay);
  //       }
  //     }
  //   } else {
  //     // specified
  //     return;
  //     // delay by preset.delayDuration
  //   }
  // } else {
  //   return;
  //   // normal one time release TODO: change Delay button to disable. if time already passed and then its enables, keep the inital release dat as a secondary date? or make it so that it cannot be enabled unless date is extended
  // }

  function redirect() {
    navigate(`/me`);
  }

  async function handleDelay() {
    setDelaying(true);
    console.log("Old date:", dayjs(releaseDate).format("DD/MM/YYYY"));
    console.log("New date:", dayjs(newDate).format("DD/MM/YYYY"));
    const blabla = dayjs()
      .add(1, "month")
      .startOf("month")
      .add(0, "day")
      .format("DD/MM/YYYY");
    console.log(blabla);
  }
  // async function handleDelay() {
  //   setDelaying(true);
  //   try {
  //     const postRef = doc(db, "posts", postID);
  //     await updateDoc(postRef, { releaseDate: newDate.valueOf() });
  //     console.log("Document successfully updated");

  //     window.location.reload();
  //   } catch (error) {
  //     alert("Error Delaying");
  //     console.error("Error updating document:", error);
  //     setDelaying(false);
  //   }
  // }

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

  // console.log("hellooo?????????");
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
              className={`delayBtn classicBtn ${
                delaying && "disabledClassicBtn loadingClassicBtn "
              }`}
              onClick={handleDelay}
            >
              Delay To <ArrowForwardIcon />
            </button>
            {/* <MuiButton
              sx={{
                p: 3,
                letterSpacing: 1,
                borderRadius: 0,
                boxShadow: 0,
                transition: "gap 1s",
                // "&:hover": {
                //   gap: 1,
                // },
                // "&:active": {
                //   bgcolor: "white",
                // },
              }}
              variant="contained"
              onClick={handleDelay}
              disabled={delaying}
              endIcon={delaying ? <CircularProgress /> : <ArrowForwardIcon />}
            >
              DELAY TO
            </MuiButton> */}
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
    /* gap: 2rem; */
    .delayBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      z-index: 1;
    }
    p {
      background-color: white;
      padding: 1rem;
      box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
        rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    }
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
    transition: 0.3s;
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
    gap: 1rem;
    .item {
      /* margin: 0.5rem; */
      /* border-radius: 10px; */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      letter-spacing: 1px;
      background-color: rgba(255, 255, 255, 1);
      /* color: white; */
      width: 7rem;
      height: 8rem;
      /* padding: 1rem 1.25rem; */
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
