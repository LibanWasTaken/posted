import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { doc, deleteDoc } from "firebase/firestore";

import { db } from "../../services/firebase-config";

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

export default function DeletePost({
  open,
  handleClose,
  postID = "",
  userID = "",
}) {
  const [postIDValue, setPostIDValue] = useState("");
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();
  function redirect() {
    // Use the history.push method to navigate to the desired URL
    navigate(`/me`);
  }

  async function handleDelete() {
    if (postIDValue === postID) {
      setDeleting(true);
      console.log("Deleting post:", postID, "from user:", userID);

      const postDocRef = doc(db, "posts", postID);
      try {
        await deleteDoc(postDocRef);
        console.log("Document successfully deleted from posts");
      } catch (error) {
        console.error("Error deleting document from posts: ", error);
      }
    }

    const userPostDocRef = doc(db, `users/${userID}/posts`, postID);
    try {
      await deleteDoc(userPostDocRef);
      console.log("Document successfully deleted from user!");
      redirect();
    } catch (error) {
      console.error("Error deleting document from user: ", error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Deletion</DialogTitle>
        <DialogContent sx={{ m: 5, overflow: "hidden" }}>
          <DialogContentText sx={{ marginBottom: 0 }}>
            This is irreversible.
          </DialogContentText>
          <DialogContentText sx={{ marginBottom: 5 }}>
            Enter post ID: {postID}
          </DialogContentText>

          <TextField
            sx={{ m: 1, width: "40ch" }}
            margin="normal"
            id="name"
            label="Post ID"
            type="text"
            variant="standard"
            value={postIDValue}
            onChange={(e) => setPostIDValue(e.target.value)}
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
            onClick={handleDelete}
            disabled={postIDValue !== postID || deleting}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
