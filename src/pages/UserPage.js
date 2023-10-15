import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Spinner2 } from "../components/Spinner";
import {
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebase-config";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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

const UserPage = () => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [userExists, setUserExists] = useState();
  const [openPrivateModal, setOpenPrivateModal] = useState(false);
  const handleOpenPrivateModal = () => {
    setOpenPrivateModal(true);
  };

  const handleClosePrivateModal = () => {
    setOpenPrivateModal(false);
  };

  const userDocRef = doc(db, "users", uid);

  const fetchUserDoc = async () => {
    try {
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        console.log("Document data:", docSnapshot.data());
        setLoading(false);
        setUser(docSnapshot.data());
        setUserExists(true);
      } else {
        setLoading(false);
        setUserExists(false);
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting document:", error);
    }
  };

  useEffect(() => {
    fetchUserDoc();
  }, []);

  function PrivatePostModal({ open, handleClose, postID = "xxx" }) {
    const [postIDValue, setPostIDValue] = useState("");
    const navigate = useNavigate();

    function handleCheck() {
      if (postIDValue === postID) {
        navigate(`/posts/${postID}`);
      }
    }

    return (
      <ThemeProvider theme={theme}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Deletion</DialogTitle>
          <DialogContent sx={{ m: 4, overflow: "hidden" }}>
            <DialogContentText sx={{ marginBottom: 5 }}>
              Enter post ID:
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
              onClick={handleCheck}
              disabled={postIDValue !== postID}
            >
              Enter
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  }

  return (
    <Wrapper>
      <h1>UserPage</h1>
      {loading ? (
        <Spinner2 />
      ) : userExists ? (
        <div className="section">
          <h1>Yo this is {user.displayName}</h1>
          <div className="posts">
            <div className="post"></div>
            <div className="post"></div>
            <div className="post" onClick={handleOpenPrivateModal}>
              if its private, do a modal asking for post id
            </div>
          </div>
        </div>
      ) : (
        <h1>no user</h1>
      )}
      <PrivatePostModal
        open={openPrivateModal}
        handleClose={handleClosePrivateModal}
      />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;

  .posts {
    border: 1px solid red;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .post {
      border: 1px solid lime;
      width: 20rem;
      height: 15rem;
    }

    .post:last-of-type {
      cursor: pointer;
    }
  }
`;

export default UserPage;
