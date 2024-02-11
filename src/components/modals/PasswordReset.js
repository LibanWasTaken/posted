import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import ReCAPTCHA from "react-google-recaptcha";

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
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const navigate = useNavigate();
  function redirect(customH1Message) {
    navigate(`/message`, { state: { customH1Message } });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const isEmailValid = isValidEmail(userMail);

  function handleSendMail() {
    setSending(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, userMail)
      .then(() => {
        console.log("Password reset email sent!");
        redirect("Password reset email sent");
      })
      .catch((error) => {
        alert("Error sending password reset email");
      });
  }

  function captchaCheck(value) {
    if (value) {
      console.log("User passed reCAPTCHA!");
      setCaptchaSuccess(true);
    } else {
      console.log("User did not pass reCAPTCHA.");
      setCaptchaSuccess(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Password Reset</DialogTitle>
        <DialogContent sx={{ m: 3, overflow: "hidden" }}>
          <DialogContentText sx={{ marginBottom: 0 }}>
            {isEmailValid
              ? `Send password resetting mail to ${userMail}?`
              : `${userMail} is not a valid email address`}
          </DialogContentText>
          {isEmailValid && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
                position: "relative",
                marginTop: 4,
              }}
            >
              <CircularProgress
                sx={{
                  position: "absolute",
                  left: "45%",
                  zIndex: 0,
                }}
              />
              <Box sx={{ zIndex: 1, minWidth: 300, minHeight: 80 }}>
                <ReCAPTCHA
                  sitekey="6Ldc4VspAAAAAFzMSR02QEvXimxAnXECuVoHKgJo" // TODO: hide?
                  onChange={captchaCheck}
                  // https://www.google.com/recaptcha/admin/site/693887324/setup
                />
              </Box>
            </Box>
          )}
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
            disabled={sending || !isEmailValid || !captchaSuccess}
          >
            SEND
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
