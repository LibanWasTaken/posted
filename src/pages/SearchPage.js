import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { TextField, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { db } from "../services/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Spinner1 } from "../components/Spinner";

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
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#fff",
    },
  },
});

const Search = () => {
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [userToFind, setUserToFind] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsPosts, setSearchResultsPosts] = useState([]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setUserToFind(value);
  };

  async function handleSearch() {
    setLoadingUsers(true);
    setLoadingPosts(true);
    const usersRef = collection(db, "users");
    const postsRef = collection(db, "posts"); // TODO: change to posted
    const targetUsers = query(usersRef, where("displayName", "==", userToFind));
    const targetPosts = query(postsRef, where("title", "==", userToFind));
    // TODO: add other filters and add them o the search results, if they already exist, dont add them
    // const q = query(
    //   usersRef,
    //   where("displayName", ">=", userToFind).where(
    //     "displayName",
    //     "<=",
    //     userToFind + "\uf8ff"
    //   )
    // );

    // const q = query(
    //   usersRef,
    //   where("displayName", "==", userToFind + "\uf8ff")
    // );

    try {
      const querySnapshotUsers = await getDocs(targetUsers);
      const querySnapshotPosts = await getDocs(targetPosts);
      const results = [];
      const resultsPosts = [];
      querySnapshotUsers.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      querySnapshotPosts.forEach((doc) => {
        resultsPosts.push({ id: doc.id, ...doc.data() });
      });
      if (results.length > 0) {
        setSearchResults(results);
        setLoadingUsers(false);
      } else {
        setSearchResults(null);
        setLoadingUsers(false);
      }
      if (resultsPosts.length > 0) {
        setSearchResultsPosts(resultsPosts);
        setLoadingPosts(false);
      } else {
        setSearchResultsPosts(null);
        setLoadingPosts(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function displayResultsUsers() {
    if (searchResults === null) {
      return <p>No results found.</p>;
    } else {
      console.log(searchResults);
      return searchResults.map((user) => (
        <a
          href={`user/${user.id}`}
          key={user.id}
          target="_blank"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="user">
            <div className="group">
              {user.photoURL && (
                <img src={user.photoURL} alt="pfp" className="profilePic" />
              )}
              <h3>{user.displayName}</h3>
            </div>
            {/* <div className="group"> */}
            <p>{user.id}</p>
            <p>{user.email}</p>
            {/* </div> */}
          </div>
        </a>
      ));
    }
  }

  function displayResultsPosts() {
    if (searchResultsPosts === null) {
      return <p>No results found.</p>;
    } else {
      console.log(searchResultsPosts);
      return searchResultsPosts.map((post) => (
        <a
          href={`posts/${post.id}`}
          key={post.id}
          target="_blank"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="post">
            <div className="group"></div>
            <h3>{post.title}</h3>
            <p>{post.id}</p>
          </div>
        </a>
      ));
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <h1>Search</h1>
        <div className="form">
          <TextField
            sx={{ m: 1, marginBottom: 2 }}
            id="userToFind"
            label="Name"
            type="text"
            variant="standard"
            // value={userToFind}
            onChange={handleInputChange}
          />

          <Button
            sx={{
              letterSpacing: 1,
              fontWeight: 600,
              p: 2,
              background: "#e8e8e8",
            }}
            onClick={handleSearch}
            disabled={!userToFind}
          >
            Search
          </Button>
        </div>
        <div className="users">
          <h3>users</h3>
          {loadingUsers ? <Spinner1 /> : displayResultsUsers()}
        </div>
        <div className="posts">
          <h3>posts</h3>
          {loadingPosts ? <Spinner1 /> : displayResultsPosts()}
        </div>
      </Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;

  .form {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 5px solid whitesmoke;
    padding: 5rem;
    gap: 2rem;
  }

  .users,
  .posts {
    border: 1px solid black;
    padding: 5rem;
    width: 75vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 1rem;
  }

  .user {
    background: whitesmoke;
    margin: 1rem;
    padding: 1rem 2rem;
    display: flex;
    /* align-items: center; */
    justify-content: center;
    flex-direction: column;
    .profilePic {
      height: 2rem;
      border-radius: 50%;
    }
    .group {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
    }
  }
`;

export default Search;
