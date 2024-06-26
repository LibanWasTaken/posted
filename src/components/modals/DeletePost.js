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
import { LinearProgress } from "@mui/material";

import {
  doc,
  getDocs,
  getDoc,
  deleteDoc,
  collection,
  setDoc,
  addDoc,
} from "firebase/firestore";

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
  fromDB = "posts",
}) {
  const [postIDValue, setPostIDValue] = useState("");
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();
  function redirect() {
    navigate(`/me`);
  }

  // FIXME: IT DOESNT DELETE SUB COLLECTIONS
  async function handleDelete() {
    setDeleting(true);
    if (postIDValue === postID) {
      try {
        await deleteDoc(doc(db, fromDB, postID));
        console.log("successfully deleted");

        await deleteDoc(doc(db, `users/${userID}/${fromDB}`, postID));
        console.log("deleted from user posts");

        const newDocRef = await addDoc(collection(db, "bin"), {
          type: "post",
          id: postID,
        });
        console.log("added to bin");
        redirect();
      } catch (error) {
        console.error(error);
        setDeleting(false);
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{deleting ? "Deleting" : "Deletion"}</DialogTitle>
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
            disabled={deleting}
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
        {deleting && <LinearProgress />}
      </Dialog>
    </ThemeProvider>
  );
}
