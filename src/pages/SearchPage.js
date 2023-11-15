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
  const [loading, setLoading] = useState(false);
  const [userToFind, setUserToFind] = useState();
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setUserToFind(value);
  };

  async function handleSearch() {
    setLoading(true);
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("displayName", "==", userToFind));

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
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      if (results.length > 0) {
        setSearchResults(results);
        setLoading(false);
      } else {
        setSearchResults(null);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function displayResults() {
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
        <div className="users">{loading ? <Spinner1 /> : displayResults()}</div>
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

  .users {
    border: 1px solid black;
    padding: 5rem;
    width: 75vw;
    display: flex;
    align-items: center;
    justify-content: center;
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
