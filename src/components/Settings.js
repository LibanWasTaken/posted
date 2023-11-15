import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { countries } from "../context/UserOptions";

import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase-config";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Skeleton } from "@mui/material";
import dayjs from "dayjs";

import {
  TextField,
  Box,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

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
    // fontWeightMedium,
    fontSize: 15,
    fontWeight: 700,
  },
  Accordion: {
    backgroundColor: "whitesmoke",
  },
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#fff",
    },
  },
  // shadows: 0,
});

function ExpandMoreIcon() {
  return <span className="material-symbols-outlined">expand_more</span>;
}

function Settings({ userID }) {
  const [user, setUser] = useState();
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [updatedObj, setUpdatedObj] = useState({});

  const userDocRef = doc(db, "users", userID);
  const fetchUserDoc = async () => {
    try {
      const docSnapshot = await getDoc(userDocRef);
      console.log(docSnapshot.data());
      setUser(docSnapshot.data());
    } catch (error) {
      console.log("Error getting document:", error);
    }
  };

  useEffect(() => {
    fetchUserDoc();
  }, []);

  async function updateUserData() {
    try {
      const postRef = doc(db, "users", userID);
      await updateDoc(postRef, updatedObj);
      console.log("Document successfully updated");
      setSaveDisabled(true);
    } catch (error) {
      console.error("Error updating document: ", error);
      setSaveDisabled(false);
    }
  }

  const updateValueOf = (fieldName) => (event) => {
    const value = event.target.value;
    setUpdatedObj((prevObj) => ({
      ...prevObj,
      [fieldName]: value,
    }));
    saveDisabled && setSaveDisabled(false);
  };

  function handleSave() {
    if (!saveDisabled) {
      console.log(updatedObj);

      updateUserData();
      setSaveDisabled("saving");
    }
  }

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        {user ? (
          <div className="userPage">
            {/* FIXME: */}
            <img
              src={
                user.photoURL ||
                userAuthFB.photoURL ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
              }
              alt="pfp"
              className="profilePic"
            />
            <h2>Welcome, {user.displayName}</h2>

            <div className="accordion">
              <Accordion
                sx={{ m: 3, boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px" }}
              >
                <AccordionSummary
                  sx={{ backgroundColor: "whitesmoke" }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="User-Info"
                >
                  <Typography>User Info</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 2 }}>
                  <div className="howdy">
                    <TextField
                      sx={{ m: 1, width: "35ch" }}
                      label="Display Name"
                      variant="outlined"
                      defaultValue={user.displayName || ""}
                      onChange={updateValueOf("displayName")}
                      inputProps={{
                        maxLength: 25,
                      }}
                    />
                    <div className="name">
                      <TextField
                        sx={{ m: 1 }}
                        label="First Name"
                        variant="outlined"
                        defaultValue={user.firstName || ""}
                        onChange={updateValueOf("firstName")}
                      />
                      <TextField
                        sx={{ m: 1 }}
                        label="Middle Name"
                        variant="outlined"
                        defaultValue={user.middleName || ""}
                        onChange={updateValueOf("middleName")}
                      />
                      <TextField
                        sx={{ m: 1 }}
                        label="Last Name"
                        variant="outlined"
                        defaultValue={user.lastName || ""}
                        onChange={updateValueOf("lastName")}
                      />
                    </div>
                    <TextField
                      sx={{ m: 1, width: "5ch" }}
                      label="Prefix"
                      inputProps={{ maxLength: 5 }}
                      variant="standard"
                    />
                    <TextField
                      sx={{ m: 1, width: "5ch" }}
                      label="Suffix"
                      inputProps={{ maxLength: 5 }}
                      variant="standard"
                    />
                    <div className="datePicker" style={{ marginTop: "2rem" }}>
                      <DatePicker
                        label="Date of Birth"
                        sx={{ m: 1 }}
                        defaultValue={dayjs(user.dob) || null}
                        onChange={(date) => {
                          const dob = dayjs(date).format();
                          console.log(dob);
                          if (dob !== "Invalid Date")
                            updateValueOf("dob")({ target: { value: dob } });
                        }}
                      />
                    </div>
                    <div>
                      <Autocomplete
                        id="gender-select"
                        sx={{ width: 350, m: 1 }}
                        options={countries}
                        autoHighlight
                        getOptionLabel={(option) => option.label}
                        renderOption={(props, option) => (
                          <li {...props}>{option.label}</li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Birth Country"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password",
                            }}
                          />
                        )}
                      />
                      <TextField
                        label="Birth State"
                        variant="outlined"
                        type="text"
                        sx={{ m: 1, width: "25ch" }}
                      />
                      <TextField
                        label="Birth City"
                        variant="outlined"
                        type="text"
                        sx={{ m: 1, width: "25ch" }}
                      />
                    </div>
                    <TextField
                      label="Phone Number"
                      variant="standard"
                      type="number"
                      sx={{ m: 1, width: "25ch", marginBottom: 3 }}
                    />

                    <Autocomplete
                      id="gender-select"
                      sx={{ width: 150, m: 1 }}
                      options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                      ]}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <li {...props}>{option.label}</li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Gender"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                          }}
                        />
                      )}
                    />
                    <TextField
                      label="Own Email"
                      variant="outlined"
                      type="email"
                      sx={{ m: 1, width: "25ch" }}
                      disabled
                      defaultValue={user.email || ""}
                    />
                    {/* <p>More..</p> */}
                    <div>
                      <TextField
                        sx={{ m: 1, width: "40ch" }}
                        label="Home Address"
                        inputProps={{ maxLength: 100 }}
                        variant="standard"
                      />
                      {/* <TextField
                        
                        sx={{ m: 1, width: "40ch", marginBottom: 3 }}
                        label="Mailing Address"
                        inputProps={{ maxLength: 100 }}
                        variant="standard"
                      /> */}

                      {/* <p>Spouse-s</p> */}
                      {/* <p>Children-s</p> */}
                      <Autocomplete
                        id="blood-type-select"
                        sx={{ width: 150, m: 1 }}
                        options={[
                          { label: "A+", value: "A+" },
                          { label: "A-", value: "A-" },
                          { label: "B+", value: "B+" },
                          { label: "B-", value: "B-" },
                          { label: "AB+", value: "AB+" },
                          { label: "AB-", value: "AB-" },
                          { label: "O+", value: "O+" },
                          { label: "O-", value: "O-" },
                        ]}
                        autoHighlight
                        getOptionLabel={(option) => option.label}
                        renderOption={(props, option) => (
                          <li {...props}>{option.label}</li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Blood Type"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password",
                            }}
                          />
                        )}
                      />
                      <TextField
                        sx={{ m: 1, width: "35ch" }}
                        label="Profile Picture URL"
                        variant="outlined"
                        type="url"
                        defaultValue={user.photoURL || ""}
                        onChange={updateValueOf("photoURL")}
                      />
                      {/* <TextField
                        
                        sx={{ m: 1, width: "20ch" }}
                        label="Occupation"
                        inputProps={{ maxLength: 20 }}
                        variant="outlined"
                      /> */}
                      {/* 
                      <p>MORE..</p>

                      <p>Medical Conditions</p>
                      <p>Medications</p>
                      <p>Social Media Profiles</p>
                      <p>Online Usernames</p> */}
                    </div>
                  </div>
                  <Box sx={{ width: "100%", textAlign: "center" }}>
                    <button
                      className={`classicBtn ${
                        saveDisabled && "disabledClassicBtn"
                      } ${saveDisabled == "saving" && "loadingClassicBtn"}`}
                      onClick={handleSave}
                    >
                      save
                    </button>
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{
                  m: 3,
                  boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px",
                }}
              >
                <AccordionSummary
                  sx={{ backgroundColor: "whitesmoke" }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="User-Settings"
                >
                  <Typography>Preferences</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 2 }}>
                  <Typography sx={{ width: "50rem" }}>
                    Timezone <br /> date format dd/mm/yyyy <br /> language{" "}
                    <br /> Dark mode <br /> hide navbar?
                  </Typography>

                  <Box sx={{ width: "100%", textAlign: "center" }}>
                    <button className="classicBtn">save</button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        ) : (
          <div className="skeleton">
            <Skeleton
              variant="rectangular"
              width={830}
              height={50}
              sx={{ m: 3 }}
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              width={830}
              height={50}
              sx={{ m: 3 }}
              animation="wave"
            />
          </div>
        )}
      </ThemeProvider>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  .profilePic {
    border-radius: 50%;
    width: 5rem;
  }
  .howdy {
    /* height: 100rem;
    width: 10rem; */
    /* border: 1px solid red; */
  }
  .accordion {
    margin-bottom: 5rem;
    /* display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; */
  }
`;

export default Settings;
