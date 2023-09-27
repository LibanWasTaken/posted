import React, { useState, useEffect } from "react"; // Import useState
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
import ListItemText from "@mui/material/ListItemText";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../services/firebase-config";

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

const data = [
  { primary: "Youtube", secondary: "https://youtube.com" },
  { primary: "chess", secondary: "https://chess.com/play/online" },
  // ...
];

export default function LinkAdder({ open, handleClose, info }) {
  const [urlValue, setUrlValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [links, setLinks] = useState("");

  const fetchData = async () => {
    try {
      const docRef = doc(db, "posts", info);
      const docSnap = await getDoc(docRef);
      const userInfo = docSnap.data();
      console.log(userInfo);
      setLinks(userInfo.links);
      console.log(userInfo.links);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (info) {
      fetchData();
    }
  }, [info, open]);

  const handleAddLink = async () => {
    try {
      const docRef = doc(db, "posts", info);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      const existingLinks = userData.links || []; // Get existing links or initialize an empty array

      if (!titleValue || !urlValue) {
        throw new Error("Title or URL not valid!");
      }
      const newLink = {
        primary: titleValue,
        secondary: urlValue,
      };
      setTitleValue("");
      setUrlValue("");

      // Check if 'links' field already exists in Firestore document
      if (userData.links) {
        // If it exists, update the 'links' array with the new link
        await updateDoc(docRef, {
          links: arrayUnion(newLink),
        });
      } else {
        // If it doesn't exist, create the 'links' field with the new link
        await setDoc(docRef, { links: [newLink] }, { merge: true });
      }

      // Fetch the updated data after adding or updating the link
      fetchData();
    } catch (error) {
      console.error("Error adding/updating link:", error);
    }
  };

  const handleRemoveLink = async (titleToRemove, urlToRemove) => {
    try {
      const docRef = doc(db, "posts", info);
      const docSnap = await getDoc(docRef);
      const userInfo = docSnap.data();
      const existingLinks = userInfo.links || [];

      // Find the index of the link to remove based on matching title and URL
      const indexToRemove = existingLinks.findIndex(
        (link) =>
          link.primary === titleToRemove && link.secondary === urlToRemove
      );

      if (indexToRemove !== -1) {
        const updatedLinks = [...existingLinks]; // Create a copy of the existing links array
        updatedLinks.splice(indexToRemove, 1); // Remove the link at the found index

        // Update the 'links' field with the updated array
        await updateDoc(docRef, { links: updatedLinks });

        // Fetch the updated data after removing the link
        fetchData();
      }
    } catch (error) {
      console.error("Error removing link:", error);
    }
  };

  function ListItemComponents({ items }) {
    const handleClick = (url) => {
      window.open(url, "_blank");
    };

    return (
      <>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component="button"
              onClick={() => handleClick(item.secondary)}
            >
              <ListItemText primary={item.primary} secondary={item.secondary} />
            </ListItemButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleRemoveLink(item.primary, item.secondary)}
            >
              <span className="material-symbols-outlined">delete</span>
            </IconButton>
          </ListItem>
        ))}
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose}>
        {/* <img
        src="https://freepngimg.com/thumb/chain/11-2-chain-png-clipart.png"
        alt=""
        srcset=""
        style={{
          position: "absolute",
          objectFit: "contain",
          opacity: 0.1,
          transform: "rotate(-40deg)",
          pointerEvents: "none",
        }}
      /> */}
        <DialogTitle>Links</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: 1 }}>
            Add sites like Drive, Dropbox, Mega, iCloud, OneDrive, Docs, etc:
          </DialogContentText>
          <List>
            <ListItemComponents items={data} />
            {links && <ListItemComponents items={links} />}
          </List>
          <div>
            <TextField
              sx={{ m: 1 }}
              margin="dense"
              id="name"
              label="Title"
              type="text"
              variant="standard"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              autoFocus
            />
            <TextField
              sx={{ m: 1 }}
              margin="dense"
              id="name"
              label="URL"
              type="url"
              variant="standard"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
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
            onClick={handleAddLink}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

/* <img
          src="https://freepngimg.com/thumb/chain/11-2-chain-png-clipart.png"
          alt=""
          srcset=""
          style={{
            position: "absolute",
            objectFit: "contain",
            opacity: 0.1,
            transform: "rotate(-40deg)",
            pointerEvents: "none",
          }}
        /> */
