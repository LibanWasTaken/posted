import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { createTheme, ThemeProvider } from "@mui/material/styles";

// import Editor from "../../components/Editor/Editor";
import { db } from "../../services/firebase-config";
import { addDoc, collection } from "firebase/firestore";
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

export default function DiaryPage({ open, handleClose, info }) {
  const currentDate = new Date(); // Get the current date
  const { id: postID } = useParams(); // TODO: tip, rename

  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Add a new document with a generated ID
      const docRef = await addDoc(collection(db, "posts", postID, "diary"), {
        title: formData.title,
        text: formData.text,
        timestamp: String(dayjs().valueOf()), // TODO: Change all to this .valueOf()
      });

      console.log("Document written with ID:", docRef.id);
    } catch (e) {
      console.error("Error adding document:", e);
    }

    // Add any additional logic if needed
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
        <DialogTitle>Page</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: 1 }}>
            Share the reflection of your {formattedDate}
          </DialogContentText>
          {/* <Editor /> // TODO: make this the default*/}

          <TextField
            sx={{ m: 1, marginBottom: 2 }}
            id="title"
            label="Title"
            type="text"
            variant="standard"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            sx={{ m: 1, marginBottom: 2 }}
            id="text"
            label="Text"
            type="text"
            variant="standard"
            value={formData.text}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ letterSpacing: 1, fontWeight: 400 }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{ letterSpacing: 1, fontWeight: 400 }}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
