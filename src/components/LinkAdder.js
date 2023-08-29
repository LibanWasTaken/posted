import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

export default function LinkAdder({ open, handleClose, info }) {
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Links</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: 1 }}>
            Add sites like Drive, Dropbox, Mega, iCloud, OneDrive, Docs, etc:
          </DialogContentText>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary="Drive"
                  secondary="http://localhost:3000/me#simple-list"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="https://youtube.com">
                <ListItemText primary="Spam" />
              </ListItemButton>
            </ListItem>
          </List>
          <div>
            <TextField
              sx={{ m: 1 }}
              required
              autoFocus
              margin="dense"
              id="name"
              label="URL"
              type="url"
              variant="standard"
            />
            <TextField
              sx={{ m: 1 }}
              margin="dense"
              id="name"
              label="Title"
              type="text"
              variant="standard"
            />
          </div>
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
            onClick={handleClose}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
