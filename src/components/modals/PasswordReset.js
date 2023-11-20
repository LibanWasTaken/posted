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

import { getAuth, sendPasswordResetEmail } from "firebase/auth";

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

export default function PasswordReset({
  open,
  handleClose,
  userMail = "",
  userID = "",
}) {
  const [postIDValue, setPostIDValue] = useState("");
  const [sending, setSending] = useState(false);

  const navigate = useNavigate();
  function redirect(customH1Message) {
    navigate(`/message`, { state: { customH1Message } });
  }

  function handleSendMail() {
    setSending(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, userMail)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log("Password reset email sent!");
        redirect("Password reset email sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        alert("Error sending password reset email");
        // ..
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Password Reset</DialogTitle>
        <DialogContent sx={{ m: 5, overflow: "hidden" }}>
          <DialogContentText sx={{ marginBottom: 0 }}>
            Send password resetting mail?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ letterSpacing: 1, fontWeight: 400 }}
            onClick={handleClose}
            disabled={sending}
          >
            Cancel
          </Button>
          <Button
            sx={{ letterSpacing: 1, fontWeight: 400 }}
            onClick={handleSendMail}
            disabled={sending}
          >
            SEND
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
