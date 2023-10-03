import React, { useState, useEffect } from "react"; // Import useState
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { doc, updateDoc } from "firebase/firestore";
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

export default function DisablePost({
  open,
  handleClose,
  postID = "",
  userID = "",
  isDisabled = false,
}) {
  const [postIDValue, setPostIDValue] = useState("");
  const [disabling, setDisabling] = useState(false);

  function refreshPage() {
    window.location.reload();
  }

  async function handleDisable() {
    if (postIDValue === postID) {
      setDisabling(true);
      const fieldName = "disabled";
      const docRef = doc(db, "posts", postID);
      if (isDisabled) {
        await updateDoc(docRef, {
          [fieldName]: false,
        });
        console.log("Enabled post:", postID, "from user:", userID);
      } else {
        await updateDoc(docRef, {
          [fieldName]: true,
        });
        console.log("Disabled post:", postID, "from user:", userID);
      }
      refreshPage();
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isDisabled ? "Enabling" : "Disabling"}</DialogTitle>
        <DialogContent sx={{ m: 5, overflow: "hidden" }}>
          <DialogContentText sx={{ marginBottom: 0 }}>
            Can be switched later.
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
            onClick={handleDisable}
            disabled={postIDValue !== postID || disabling}
          >
            {isDisabled ? "Enable" : "Disable"}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
