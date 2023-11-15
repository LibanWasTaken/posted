import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import NotesSVG from "../assets/undraw_add_notes_re_ln36.svg";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  addDoc,
  getDoc,
  setDoc,
  collection,
  doc,
  and,
} from "firebase/firestore";
import { db as FSdb } from "../services/firebase-config";
import { selectClasses } from "@mui/material";

dayjs.extend(utc);

const theme = createTheme({
  typography: {
    fontFamily: [
      "Raleway",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#fff",
    },
  },
});

// const today = dayjs();
const tomorrow = dayjs().add(1, "day");

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function PostAdder({ open, handleClose, info }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState("");
  const [hidden, setHidden] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleError = (newError) => {
    setError(newError);
    console.log(newError);
  };

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDateChange = (date) => {
    console.log(dayjs(date.toDate()).utc());
    console.log(dayjs(date.toDate()).utc().format());
    setSelectedDate(date);
  };

  const navigate = useNavigate();
  function redirect(postID) {
    navigate(`/me/post/${postID}`);
  }

  async function addPostToUserDoc(postID, uid, postObj) {
    try {
      console.log("its happening");

      const userPostsRef = doc(FSdb, `users/${uid}/posts`, postID);
      const docSnap = await getDoc(userPostsRef);

      if (docSnap.exists()) {
        await setDoc(userPostsRef, postObj, { merge: true });
        console.log("🟢Doc updated in user's collection, ID: ", postID);
        redirect(postID);
        console.log("redirecting");
      } else {
        console.log("No such document! Creating one");
        await setDoc(userPostsRef, postObj);
        console.log("🟢Doc updated in user's collection, ID: ", postID);
        redirect(postID);
        console.log("redirecting");
      }
    } catch (e) {
      console.error("Error adding collection: ", e);
    }
  }

  async function addPostToCollection(post) {
    try {
      const newDocRef = await addDoc(collection(FSdb, "posts"), post);
      const newDocID = newDocRef.id;
      console.log("Document added with ID: ", newDocID);
      return newDocID;
    } catch (e) {
      console.error("Error adding document to collection: ", e);
      return null;
    }
  }

  async function addNewPostFS(titleSet, dateSet) {
    console.log("pressed");

    const isTitleAlreadyExists = info.posts.some(
      (post) => post.title === titleSet
    );

    if (isTitleAlreadyExists) {
      console.log("copy");
      setDisabled(false);
      setErrorText(`"${titleSet}" already exists`);
      setHidden(false);
    } else {
      console.log("no copy");
      setDisabled(true);
      setHidden(true);

      try {
        // Adding to post collection
        const newPostObj = {
          user: info.uid,
          title: titleSet,
          releaseDate: dateSet,
          dateCreated: dayjs().valueOf(),
        };
        console.log("Adding To Collection", newPostObj);
        const newDocID = await addPostToCollection(newPostObj);

        if (newDocID) {
          // Adding to user docs
          addPostToUserDoc(newDocID, info.uid, newPostObj);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }

  function handleSubmit() {
    console.log(info);
    if (title && selectedDate && !error) {
      console.log("🟢Title:", title, "date:", selectedDate);
      setHidden(true);
      setDisabled(true);
      // add to db
      console.log("adding to db...");
      console.log(selectedDate.valueOf());
      addNewPostFS(title, selectedDate.valueOf());
    } else {
      console.log("🔴Title:", title, "date:", selectedDate);
      setErrorText("Title and Date needs to be set");
      setHidden(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Wrapper>
          <span
            className="closeBtn material-symbols-outlined"
            onClick={handleClose}
          >
            close
          </span>
          <div className="form">
            <div>
              <h1>Add a title for your post</h1>
              <p>These can be changed later</p>
            </div>
            <TextField
              disabled={disabled}
              label="Title"
              variant="standard"
              id="outlined-controlled"
              type="text"
              sx={{
                m: 1,
                width: "30ch",
                backgroundColor: "white",
              }}
              value={title}
              onChange={handleInputChange}
              inputProps={{ maxLength: 20, style: { fontSize: 25 } }}
              InputLabelProps={{ style: { fontSize: 25 } }}
            />
            <DatePicker
              disabled={disabled}
              label="Release On the"
              minDate={tomorrow}
              value={selectedDate}
              onChange={handleDateChange}
              onError={handleError}
              sx={{ m: 1, width: "30ch", backgroundColor: "white" }}
              // slotProps={{
              //   textField: {
              //     size: "medium",
              //     helperText: "12:01 am (UTC)",
              //   },
              // }}
              views={["year", "month", "day"]}
            />
            <MobileTimePicker
              defaultValue={dayjs("2022-04-17T00:00")}
              // orientation="landscape"
              disabled={disabled}
              value={selectedDate}
              onChange={handleDateChange}
              sx={{ m: 1, width: "20ch", backgroundColor: "white" }}
            />
            <p className={`errText ${hidden && "hidden"}`}>{errorText}</p>
            <button
              className={`classicBtn ${
                disabled && "disabledClassicBtn loadingClassicBtn"
              }`}
              onClick={handleSubmit}
            >
              add
            </button>
          </div>
          <div className="imgContainer">
            <img
              src={NotesSVG}
              alt="NotesSVG"
              className="NotesSVG imgLoad"
              onLoad={(e) => {
                e.target.classList.add("imgLoaded");
              }}
            />
          </div>
        </Wrapper>
      </Dialog>
    </ThemeProvider>
  );
}

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  overflow: hidden;

  .closeBtn {
    font-size: 2rem;
    position: absolute;
    top: 2rem;
    left: 2rem;
    padding: 5px;
    user-select: none;
  }
  .closeBtn:hover {
    cursor: pointer;
    transition: 0.3s;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    transform: rotate(90deg);
  }

  .form {
    font-family: "Raleway";
    position: relative;
    bottom: 2rem;
    width: 45rem;
    height: 40rem;
    margin-left: 10rem;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    z-index: 1;
    h1 {
      text-transform: uppercase;
    }
    .classicBtn {
      margin-top: 2rem;
      width: 8rem;
    }
  }

  .errText {
    color: rgb(200, 0, 0);
  }
  .hidden {
    visibility: hidden;
  }

  .imgContainer {
    height: 100vh;
    width: 20rem;
    background-color: black;
    display: flex;
    align-items: center;
  }

  .NotesSVG {
    transform: rotateY(180deg);
    /* position: relative;
    right: 15rem; */
    filter: saturate(0);
    position: absolute;
    right: 5rem;
    bottom: 0;
  }
  .NotesSVG:hover {
    transition: 2s;
    filter: saturate(1);
  }
`;
