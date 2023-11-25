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

import { doc, getDocs, deleteDoc, collection } from "firebase/firestore";

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
    // Use the history.push method to navigate to the desired URL
    navigate(`/me`);
  }

  async function recursiveDelete(docRef) {
    try {
      // Delete the main document
      await deleteDoc(docRef);
      console.log("Document successfully deleted");

      // Get all subcollections
      const subcollectionsQuerySnapshot = await getDocs(collection(docRef));

      // Recursively delete each subcollection
      await Promise.all(
        subcollectionsQuerySnapshot.docs.map(async (subDoc) => {
          await recursiveDelete(subDoc.ref);
        })
      );
    } catch (error) {
      console.error("Error deleting document and subcollections: ", error);
      throw error; // Propagate the error to the calling function if needed
    }
  }

  // FIXME: FIXME: FIXME: IT DOESNT DELETE SUB COLLECTIONS - https://stackoverflow.com/questions/49286764/delete-a-document-with-all-subcollections-and-nested-subcollections-in-firestore
  async function handleDelete() {
    if (postIDValue === postID) {
      setDeleting(true);
      console.log("Deleting post:", postID, "from user:", userID);

      const postDocRef = doc(db, fromDB, postID);
      try {
        await recursiveDelete(postDocRef);
        console.log("Document and subcollections successfully deleted");
      } catch (error) {
        console.error("Error deleting document from posts: ", error);
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
