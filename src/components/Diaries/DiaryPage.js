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
  Typography,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ExampleTheme from "../Editor/themes/ExampleTheme";

import { DiaryEditor } from "../../components/Editor/DiaryEditor";
import Viewer from "../../components/Editor/Viewer";

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
  viewer = false,
}) {
  const { id: postID } = useParams();
  const longFormatDayjs = "dddd, DD MMMM, YYYY";
  const shortFormatDayjs = "DD/MM/YY";
  const formattedDate = dayjs().format(longFormatDayjs);
  const formattedDateShort = dayjs().format(shortFormatDayjs);
  const [message, setMessage] = useState();
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });
  const [addingPage, setAddingPage] = useState(false);
  const emptyState =
    '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

  useEffect(() => {
    // console.log(pageInfo);
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

  const chooseMessage = (message) => {
    // console.log(message);
    if (message == emptyState) {
      // console.log("empty");
      setMessage(null);
    } else {
      setMessage(message);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
        // fullScreen={editable}
        // disableEscapeKeyDown={editable}
        // maxWidth="lg"
        fullScreen
        disableEscapeKeyDown={editable} // TODO: when its the use editin the page, make it escapable?
      >
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
          {viewer ? (
            <>
              <h2>{formData.title}</h2>
              <Viewer state={formData.text} />
            </>
          ) : (
            <>
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
              <DiaryEditor chooseMessage={chooseMessage} text={formData.text} />
            </>
          )}
        </DialogContent>

        {editable ? (
          <DialogActions sx={{ p: 2 }}>
            {pageInfo && (
              <Tooltip
                title="Clear either the title or text"
                placement="left"
                arrow
              >
                <Box>
                  <Button
                    sx={{ letterSpacing: 1, p: 2, fontWeight: 500 }}
                    disabled={(message && formData.title) || addingPage}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </Box>
              </Tooltip>
            )}

            <Button
              sx={{ letterSpacing: 1, p: 2, fontWeight: 500 }}
              disabled={addingPage}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              sx={{ letterSpacing: 1, p: 2, fontWeight: 500 }}
              disabled={
                addingPage ||
                !formData.title ||
                !message ||
                formData.text == message
              }
              onClick={handleSubmit}
            >
              {pageInfo ? "Update" : "Add"}
            </Button>
          </DialogActions>
        ) : (
          <DialogActions
            sx={{
              p: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "15px",
                  color: "#ccc",
                }}
              >
                press esc
              </Typography>
              <Button
                sx={{
                  letterSpacing: 1,
                  p: 2,
                  fontWeight: 500,
                  backgroundColor: "#f8f8f8",
                }}
                onClick={handleClose}
              >
                Close
              </Button>
            </Box>
          </DialogActions>
        )}
      </Dialog>
    </ThemeProvider>
  );
}
