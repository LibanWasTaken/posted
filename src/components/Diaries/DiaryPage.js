import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import {
  Tooltip,
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ExampleTheme from "../Editor/themes/ExampleTheme";

import { DiaryEditor } from "../../components/Editor/DiaryEditor";
import { db } from "../../services/firebase-config";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import dayjs from "dayjs";

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
  //   palette: {
  //     mode: "dark",
  //   },
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#fff",
    },
  },
});

export default function DiaryPage({
  open,
  handleClose,
  pageInfo,
  getFSData,
  editable = true,
}) {
  const { id: postID } = useParams();
  const longFormatDayjs = "dddd, DD MMMM, YYYY";
  const shortFormatDayjs = "DD/MM/YY";
  const formattedDate = dayjs().format(longFormatDayjs);
  const formattedDateShort = dayjs().format(shortFormatDayjs);
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });
  const [addingPage, setAddingPage] = useState(false);

  useEffect(() => {
    console.log(pageInfo);
    if (pageInfo) {
      setFormData({
        title: pageInfo.title,
        text: pageInfo.text,
        date: dayjs(pageInfo.timestamp).format(longFormatDayjs),
        dateShort: dayjs(pageInfo.timestamp).format(shortFormatDayjs),
      });
    } else {
      setFormData({
        title: "",
        text: "",
        date: "",
        date: "",
      });
    }
  }, [pageInfo]);

  async function handleDelete() {
    setAddingPage(true);
    const diaryPostDocRef = doc(db, `posts/${postID}/diary`, pageInfo.id);
    try {
      await deleteDoc(diaryPostDocRef);
      console.log("Page successfully deleted");
      getFSData();
      setFormData({
        title: "",
        text: "",
      });
      handleClose();
      setAddingPage(false);
    } catch (error) {
      console.error("Error deleting Page: ", error);
      alert("Error deleting Page");
      setAddingPage(false);
    }
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    setAddingPage(true);

    try {
      if (pageInfo) {
        const pageDocRef = doc(db, "posts", postID, "diary", pageInfo.id);
        await updateDoc(pageDocRef, {
          title: formData.title,
          // text: formData.text,
          text: message,
        });

        console.log("Page updated with ID:", pageInfo.id);
      } else {
        const docRef = await addDoc(collection(db, "posts", postID, "diary"), {
          title: formData.title,
          // text: formData.text,
          text: message,
          timestamp: Number(dayjs().valueOf()),
        });
        console.log("Page added with ID:", docRef.id);
      }

      getFSData();
      handleClose();
      setAddingPage(false);
    } catch (error) {
      setAddingPage(true);
      console.error("Error adding document:", error);
      alert("Error adding document:");
    }
  };

  const [message, setMessage] = useState("Hello World");
  const chooseMessage = (message) => {
    const emptyState =
      '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
    // if (message && message !== emptyState) {

    // }
    setMessage(message);
    // console.log(message);
  };
  return (
    <ThemeProvider theme={theme}>
      {/* TODO: make this the default */}
      <Dialog open={open} onClose={handleClose} fullScreen disableEscapeKeyDown>
        {/* <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg"> */}
        <DialogTitle sx={{ fontSize: "1.75rem", paddingBottom: 0 }}>
          {formData.date || formattedDate}
        </DialogTitle>
        <DialogTitle
          sx={{
            fontSize: "1rem",
            color: "gray",
            paddingTop: 0,
            paddingBottom: 2,
          }}
        >
          {formData.dateShort || formattedDateShort}
        </DialogTitle>
        <DialogContent sx={{ overflow: "hidden" }}>
          {/* <DialogContentText sx={{ marginBottom: 1 }}>
            {formattedDateShort}
          </DialogContentText> */}
          {/* <TitleStyle> */}
          <TextField
            sx={{
              m: 1,
              marginBottom: 2,
              marginLeft: 3,
              width: "25rem",
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
            }}
            disabled={addingPage || !editable}
            id="title"
            // label="Title"
            placeholder="Title"
            type="text"
            variant="standard"
            value={formData.title}
            onChange={handleInputChange}
            inputProps={{
              maxLength: 50,
              style: { textAlign: "left", fontSize: "1.25rem" },
            }}
          />
          <div className="fadingLine"></div>
          {/* </TitleStyle> */}

          <DiaryEditor chooseMessage={chooseMessage} text={formData.text} />

          {/* <TextField
            sx={{ m: 1, marginBottom: 2 }}
            disabled={addingPage || !editable}
            id="title"
            label="Title"
            type="text"
            variant="standard"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            sx={{ m: 1, marginBottom: 50, width: "100ch" }}
            disabled={addingPage || !editable}
            id="text"
            label="Text"
            type="text"
            variant="standard"
            value={formData.text}
            onChange={handleInputChange}
          /> */}
        </DialogContent>

        {editable && (
          <DialogActions sx={{ p: 2 }}>
            <Tooltip
              title="Clear either the title or text"
              placement="left"
              arrow
            >
              <Box>
                <Button
                  sx={{ letterSpacing: 1, p: 2, fontWeight: 500 }}
                  disabled={(formData.title && formData.text) || !pageInfo}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Box>
            </Tooltip>

            <Button
              sx={{ letterSpacing: 1, p: 2, fontWeight: 500 }}
              disabled={addingPage}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              sx={{ letterSpacing: 1, p: 2, fontWeight: 500 }}
              disabled={addingPage || !formData.title || !message}
              onClick={handleSubmit}
            >
              {pageInfo ? "Update" : "Add"}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </ThemeProvider>
  );
}

const TitleStyle = styled.section`
  /* display: flex; */
  position: relative;
  .fadingLine {
    padding: 0.75px 50px;
    background-image: linear-gradient(to right, gray, white);
    position: absolute;
    left: 400px;
    bottom: 16px;
  }
`;
