import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { countries } from "../context/UserOptions";
import { Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { useLocation } from "react-router-dom";

import {
  getDoc,
  doc,
  updateDoc,
  query,
  collection,
  getDocs,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../services/firebase-config";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";

import {
  TextField,
  Box,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Skeleton,
  createTheme,
  ThemeProvider,
  Button,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  LinearProgress,
} from "@mui/material";
import { Spinner3 } from "./Spinner";

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
  // zIndex: 1,
  // shadows: 0,
});

function ExpandMoreIcon() {
  // return <span className="material-symbols-outlined">expand_more</span>;
  return <KeyboardArrowDownTwoToneIcon />;
}

function Settings({ userID }) {
  const [user, setUser] = useState();
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [updatedObj, setUpdatedObj] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [changeState, setChangeState] = useState(false);
  const location = useLocation();

  // TODO: fix this + nav bar wrap the whole "show all notif" in the Link tag
  useEffect(() => {
    // Check if state exists in the location object
    if (location.state && location.state.changeStateValue) {
      setChangeState(location.state.changeStateValue);
      console.log(location.state.changeStateValue);
      console.log("hello");
    }
  }, [location]);

  const userDocRef = doc(db, "users", userID);
  const fetchUserDoc = async () => {
    try {
      const docSnapshot = await getDoc(userDocRef);
      console.log(docSnapshot.data());
      setUser(docSnapshot.data());
      getNotifications();
    } catch (error) {
      console.log("Error getting document:", error);
      alert("Error getting document"); // TODO: replace all these with mui alerts?
    }
  };

  async function getNotifications() {
    setNotificationsLoading(true);

    try {
      const notificationsQuery = query(
        collection(db, `/users/${userID}/notifs`),
        orderBy("ts", "desc")
      );

      const querySnapshot = await getDocs(notificationsQuery);

      const notificationData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setNotifications(notificationData);
      setNotificationsLoading(false);
      // console.log(notificationData);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotificationsLoading(false);
    }
  }

  const handleClearNotifications = async () => {
    setNotificationsLoading(true);
    try {
      // Specify the name of the collection you want to delete
      const collectionName = "yourCollectionName";
      const collectionRef = collection(db, `/users/${userID}/notifs`);

      // Get all documents in the collection
      const querySnapshot = await getDocs(query(collectionRef));

      // Delete each document in the collection
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Optional: Delete the collection itself (if needed)
      // await deleteDoc(collectionRef);
      setNotifications([]);
      setNotificationsLoading(false);

      console.log(`Collection "${collectionName}" deleted successfully.`);
    } catch (error) {
      console.error("Error deleting collection:", error);
      alert("Error clearing notifications");
      setNotificationsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDoc();
  }, []);

  async function checkData() {
    const exceptions = ["displayName", "photoURL", "userName"];
    let tempObj = {};

    const filteredProperties = Object.keys(updatedObj).filter((prop) =>
      exceptions.includes(prop)
    );

    if (filteredProperties.length > 0) {
      tempObj = filteredProperties.reduce((obj, prop) => {
        obj[prop] = updatedObj[prop];
        return obj;
      }, {});
    }

    try {
      // const auth = getAuth();
      const user = auth.currentUser;

      if (Object.keys(tempObj).length) {
        await updateProfile(user, tempObj);
        console.log("User profile updated", tempObj);
      } else {
        console.log("no exceptions");
      }
    } catch (error) {
      console.error("Error updating user profile:");
      console.error(error);
      console.error(error.message);
    }
  }
  // TODO: better error handling, maybe trrow the error in the checkData so that it gets cathced in the handleSave before the db updates
  async function updateUserData() {
    try {
      if (updatedObj.hasOwnProperty("displayName")) {
        updatedObj.dnLastChange = Number(dayjs().valueOf());
        setUpdatedObj(updatedObj);
      }

      const postRef = doc(db, "users", userID);
      checkData();
      await updateDoc(postRef, updatedObj);
      console.log("Document successfully updated", updatedObj);
      setSaveDisabled(true);
      window.location.reload();
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

      setSaveDisabled("saving");
      updateUserData();
      // setSaveDisabled(false);
    }
  }

  function hasBeenTwoWeeks(lastChangeDate) {
    if (lastChangeDate) {
      const currentDate = dayjs();
      const dnLastChangeDate = dayjs(lastChangeDate);

      const differenceInDays = currentDate.diff(dnLastChangeDate, "day");
      const daysRemaining = 14 - differenceInDays;

      if (differenceInDays < 14) {
        return daysRemaining;
      } else {
        // It has been 14 days or more
        return false;
      }
    } else {
      return false;
    }
  }

  const goToNotificationLink = (link) => {
    window.location.href = link;
  };

  function generateNotifications(notifs) {
    return notifs.map((notif) => (
      <MenuItem
        onClick={() => notif.link && goToNotificationLink(notif.link)}
        key={notif.id}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          marginBottom: 0.5,
          p: 2,
          borderBottom: "1px solid whitesmoke",
          // fontSize: "1.25rem",
        }}
      >
        {/* <div
          to={notif.link ? notif.link : notif.msg}
          style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            width: "100%",
            fontSize: "1rem",
          }}
        > */}
        <span
          style={{
            maxWidth: "70%",
            // overflow: "hidden",
            whiteSpace: "normal",
            textAlign: "left",
            // textOverflow: "ellipsis",
          }}
        >
          {notif.msg}
        </span>
        <span
          style={{ opacity: 0.5, fontFamily: "Poppins", fontSize: "0.75rem" }}
        >
          {dayjs(notif.ts).format("h:mm:ss a - DD/MM/YYYY")}
        </span>
        {/* </div> */}
      </MenuItem>
    ));
  }

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        {/* {user ? ( */}
        {/* FIXME: */}
        {user ? (
          <div className="userPage">
            <div className="display">
              <div
                className="background"
                style={{ backgroundColor: "black" }}
              ></div>
              <div style={{ overflow: "hidden", zIndex: 1 }}>
                <img
                  src={
                    user.photoURL ||
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
                  }
                  alt="pfp"
                  className="profilePic"
                />
              </div>

              <div className="info">
                <h1>{user.displayName}</h1>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="else">
              <div className="accordion">
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
                    <Typography>
                      Notifications{" "}
                      {!notificationsLoading && `- ${notifications.length}`}
                    </Typography>
                  </AccordionSummary>
                  {notificationsLoading ? (
                    <AccordionDetails sx={{ p: 1 }}>
                      {/* <Spinner3 /> */}
                      <LinearProgress />
                    </AccordionDetails>
                  ) : (
                    <AccordionDetails sx={{ p: 1 }}>
                      {notifications && notifications.length > 0 ? (
                        <Box
                          sx={{
                            width: "100%",
                            paddingBottom: 2,
                            textAlign: "center",
                          }}
                        >
                          <Box
                            sx={{
                              marginBottom: 5,
                              maxHeight: "50rem",
                              overflow: "scroll",
                            }}
                          >
                            {generateNotifications(notifications)}
                          </Box>
                          <button
                            className="classicBtn"
                            onClick={handleClearNotifications}
                          >
                            clear all
                          </button>
                        </Box>
                      ) : (
                        <Typography sx={{ m: 2 }}>
                          Nothing to show here
                        </Typography>
                      )}
                    </AccordionDetails>
                  )}
                </Accordion>
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
                    {/* TODO: add or something to the text fields saveDisabled == "saving" */}
                    {!hasBeenTwoWeeks(user.dnLastChange) ? (
                      <TextField
                        sx={{ m: 1, marginBottom: 2, width: "35ch" }}
                        label="Display Name"
                        variant="outlined"
                        defaultValue={user.displayName || ""}
                        onChange={updateValueOf("displayName")}
                        inputProps={{
                          maxLength: 25,
                        }}
                      />
                    ) : (
                      <Tooltip
                        title={`You can change it in 2 weeks. ${hasBeenTwoWeeks(
                          user.dnLastChange
                        )} days remaining.`}
                        placement="right"
                        arrow
                      >
                        <TextField
                          sx={{ m: 1, marginBottom: 2, width: "35ch" }}
                          label="Display Name"
                          variant="outlined"
                          disabled
                          defaultValue={user.displayName || ""}
                          onChange={updateValueOf("displayName")}
                          inputProps={{
                            maxLength: 25,
                          }}
                        />
                      </Tooltip>
                    )}
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
                    {/* <TextField
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
                    /> */}
                    <div
                      className="datePicker"
                      style={{ marginTop: "2rem", display: "flex" }}
                    >
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
                      <Autocomplete
                        id="gender-select"
                        sx={{ width: 350, m: 1 }}
                        options={countries}
                        onChange={(event, newValue) => {
                          updateValueOf("birthCountry")({
                            target: { value: newValue.label },
                          });
                        }}
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
                    </div>

                    <div>
                      <TextField
                        label="Birth State"
                        variant="outlined"
                        type="text"
                        sx={{ m: 1, width: "25ch" }}
                        onChange={updateValueOf("birthState")}
                      />
                      <TextField
                        label="Birth City"
                        variant="outlined"
                        type="text"
                        sx={{ m: 1, width: "25ch" }}
                        onChange={updateValueOf("birthCity")}
                      />
                    </div>
                    <TextField
                      label="Phone Number"
                      variant="standard"
                      type="number"
                      sx={{ m: 1, width: "25ch", marginBottom: 3 }}
                      onChange={updateValueOf("phoneNumber")}
                    />

                    <Autocomplete
                      id="gender-select"
                      sx={{ width: 150, m: 1 }}
                      options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                      ]}
                      onChange={(event, newValue) => {
                        updateValueOf("gender")({
                          target: { value: newValue.label },
                        });
                      }}
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
                      sx={{ m: 1, marginTop: 2, width: "35ch" }}
                      label="Profile Picture URL"
                      variant="outlined"
                      type="url"
                      defaultValue={user.photoURL || ""}
                      onChange={updateValueOf("photoURL")}
                      inputProps={{
                        pattern: "https?://.*", // Simple pattern for http/https URLs
                      }}
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
                    <Box
                      sx={{
                        width: "100%",
                        textAlign: "end",
                      }}
                    >
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
              <div className="details">
                <p>Created on: bla bla bla</p>
                <p>Prem or not prem: bla bla bla</p>
                <p>Freinds, Following, Always mail these guys: close firends</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="userPage">
            <div className="display">
              <div
                className="background"
                style={{ backgroundColor: "black" }}
              ></div>
              <div className="dummy"></div>
              {/* <Skeleton
                variant="circular"
                sx={{ zIndex: "5" }}
                width={"15rem"}
                height={"15rem"}
              /> */}
              <div className="info">
                <h1>
                  Uhh..
                  <br />
                </h1>
                <p>{" "}</p>
              </div>
            </div>

            <div className="skeleton">
              <Skeleton
                variant="rectangular"
                width={832}
                height={49.7}
                sx={{ m: 3 }}
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                width={832}
                height={49.7}
                sx={{ m: 3 }}
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                width={832}
                height={49.7}
                sx={{ m: 3 }}
                animation="wave"
              />
            </div>
          </div>
        )}
      </ThemeProvider>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  /* margin: 1rem;
  padding: 4rem;
  border: 2px solid black;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
  .userPage {
    display: flex;
    /* align-items: center; */
    justify-content: center;
    gap: 5rem;
    h1 {
      margin: 2rem 0 0 0;
      font-size: 2rem;
    }
  }

  .pfpContainer {
    border-radius: 50%;
    overflow: hidden;
    width: 15rem;
    height: 15rem;
    z-index: 1;
  }

  .profilePic {
    border-radius: 50%;
    /* overflow: hidden; */
    min-width: 15rem;
    object-fit: cover;
    width: 15rem;
    min-height: 15rem;
    height: 15rem;
    z-index: 1;
  }
  /* .profilePic:hover {
    border-radius: 0%;
    transition: 0.3s;
  } */

  .dummy {
    min-width: 15rem;
    width: 15rem;
    min-height: 15rem;
    height: 15rem;
    z-index: 1;
    background-color: #eee;
    border-radius: 50%;
  }

  .display {
    background-color: whitesmoke;
    padding: 2rem;
    height: 30rem;
    width: 25rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    /* overflow: scroll; */
    word-wrap: break-word;

    .background {
      height: 40%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }
  }

  .display::-webkit-scrollbar {
    display: none;
  }

  .accordion {
    margin-bottom: 5rem;
    /* display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; */
  }

  .details {
    padding: 0 2rem;
  }

  @media screen and (max-width: 1460px) {
    .userPage {
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .display {
      flex-direction: row;
      height: 10rem;
      width: 50vw;
      align-items: center;
      justify-content: space-around;

      .info {
        width: 50%;
      }

      .background {
        height: 100%;
        width: 25%;
      }

      .profilePic {
        min-width: 10rem;
        width: 10rem;
        min-height: 10rem;
        height: 10rem;
      }

      .dummy {
        min-width: 10rem;
        width: 10rem;
        min-height: 10rem;
        height: 10rem;
      }
    }

    .accordion {
      max-width: 90vw;
    }
  }
`;

export default Settings;
