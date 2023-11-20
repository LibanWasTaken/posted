import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

// import Editor from "../../components/Editor/Editor";
import { db } from "../../services/firebase-config";
import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";
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

export default function DiaryPage({ open, handleClose, pageInfo, getFSData }) {
  const { id: postID } = useParams();
  const formattedDate = dayjs().format("DD MMM, YYYY");
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });
  const [addingPage, setAddingPage] = useState(false);

  useEffect(() => {
    if (pageInfo) {
      setFormData({
        title: pageInfo.title,
        text: pageInfo.text,
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
        // TODO: update instead of add
        console.log("Page updated with ID:");
      } else {
        const docRef = await addDoc(collection(db, "posts", postID, "diary"), {
          title: formData.title,
          text: formData.text,
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

  return (
    <ThemeProvider theme={theme}>
      {/* TODO: make this the default */}

      {/* <Dialog open={open} onClose={handleClose} fullScreen> */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Page</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: 1 }}>
            Share your reflection of <strong> {formattedDate}</strong>
          </DialogContentText>
          {/* TODO: make this the default */}
          {/* <Editor /> */}
          <TextField
            sx={{ m: 1, marginBottom: 2 }}
            disabled={addingPage}
            id="title"
            label="Title"
            type="text"
            variant="standard"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            sx={{ m: 1, marginBottom: 50, width: "100ch" }}
            disabled={addingPage}
            id="text"
            label="Text"
            type="text"
            variant="standard"
            value={formData.text}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Tooltip
            title="Clear either the title or text"
            placement="left"
            arrow
          >
            <Box>
              <Button
                sx={{ letterSpacing: 1, p: 2, fontWeight: 500 }}
                disabled={formData.title && formData.text}
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
            disabled={addingPage || !formData.title || !formData.text}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
