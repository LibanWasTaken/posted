import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import { Spinner1 } from "../components/Spinner";
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  remove,
} from "firebase/database";
// mui
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Autocomplete from "@mui/material/Autocomplete";

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
  // shadows: 0,
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SettingsPage = () => {
  const { user: currentUser, loading } = useUserContext();
  const [userInfo, setUserInfo] = useState(null);
  const [value, setValue] = useState(0);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [editDisabled, setEditDisabled] = useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Setting User and Database
  const db = getDatabase();
  // useEffect(() => {
  //   if (currentUser) {
  //     const infoRef = ref(db, "users/" + currentUser.uid + "/info");
  //     onValue(infoRef, (snapshot) => {
  //       let data = snapshot.val();
  //       setUserInfo(data);
  //     });
  //   }
  // }, [currentUser]);
  // console.log(userInfo);

  const userDetails = {
    firstName: "Liban",
    lastName: "",
    middleName: "",
    prefix: "",
    suffix: "",
    dob: "03072004",
    cityOfBirth: "",
    stateOfBirth: "",
    countryOfBirth: "",
    gender: "",
    phoneNumber: "",
    emailAddress: "",
    homeAddress: "",
    mailingAddress: "",
    occupation: "",
    spouse: "",
    children: "",
    bloodType: "",
    mail1: "",
    mail2: "",
    // mail3: emailAddress,
  };
  function updateUserDetails() {
    const updates = {};
    updates["/users/" + currentUser.uid + "/info/"] = userDetails;
    update(ref(db), updates);
    console.log("updated");
  }

  return (
    <Wrapper>
      {loading ? (
        <Spinner1 />
      ) : (
        <div>
          {currentUser ? (
            <div className="tabs">
              <Box sx={{ width: "100%" }}>
                <ThemeProvider theme={theme}>
                  <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="WHOM" {...a11yProps(0)} />
                      <Tab label="WHO" {...a11yProps(1)} />
                      <Tab label="WHEN" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    <h4>tip on who to send, how etc</h4>

                    <div className="mail1">
                      <TextField
                        disabled={editDisabled}
                        sx={{ m: 1 }}
                        label="Mail 1"
                        variant="outlined"
                        type="email"
                        required
                      />

                      <TextField
                        disabled={editDisabled}
                        sx={{ m: 1, width: "25ch" }}
                        label="Short Message"
                        inputProps={{ maxLength: 100 }}
                        variant="standard"
                      />
                    </div>
                    <div className="mail2">
                      <TextField
                        disabled={editDisabled}
                        sx={{ m: 1 }}
                        label="Mail 2"
                        variant="outlined"
                        type="email"
                      />

                      <TextField
                        disabled={editDisabled}
                        sx={{ m: 1, width: "25ch" }}
                        label="Short Message"
                        inputProps={{ maxLength: 100 }}
                        variant="standard"
                      />
                    </div>
                    <h2>More..</h2>

                    <div className="mail3">
                      <TextField
                        disabled={editDisabled}
                        sx={{ m: 1 }}
                        label="Mail 3"
                        variant="outlined"
                        type="email"
                        defaultValue="libanmesbah@gmail.com"
                      />
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    {/* <h2>how much do u want to reveal</h2> */}
                    <div className="name">
                      <TextField
                        disabled={editDisabled}
                        sx={{ m: 1 }}
                        label="First Name"
                        variant="outlined"
                        required
                      />
                      <TextField
                        disabled={editDisabled}
                        sx={{ m: 1 }}
                        label="Middle Name"
                        variant="outlined"
                      />
                      <TextField
                        disabled={editDisabled}
                        sx={{ m: 1 }}
                        label="Last Name"
                        variant="outlined"
                        required
                      />
                    </div>
                    <TextField
                      disabled={editDisabled}
                      sx={{ m: 1, width: "5ch" }}
                      label="Prefix"
                      inputProps={{ maxLength: 5 }}
                      variant="standard"
                    />
                    <TextField
                      disabled={editDisabled}
                      sx={{ m: 1, width: "5ch" }}
                      label="Suffix"
                      inputProps={{ maxLength: 5 }}
                      variant="standard"
                    />
                    <div className="datePicker" style={{ marginTop: "2rem" }}>
                      <DatePicker
                        label="Date of Birth"
                        disabled={editDisabled}
                        defaultValue={dayjs("2003-07-03")}
                      />
                    </div>
                    <h2>more..</h2>

                    <h3>Country of Birth</h3>

                    {/* https://mui.com/material-ui/react-autocomplete/#load-on-open:~:text=for%20each%20keystroke.-,Load%20on%20open,-It%20displays%20a 
                    
                    + the country thing, (link)
                    */}

                    {/* https://www.google.com/search?sca_esv=560498928&rlz=1C1CHBF_enBD1064BD1064&sxsrf=AB5stBjkXlUTelH7ND295ZhGy2rVmwPVBA:1693150717696&q=time+illustration&tbm=isch&source=lnms&sa=X&ved=2ahUKEwju7dD4lf2AAxUuyDgGHY9mCv4Q0pQJegQIDBAB&biw=1920&bih=963&dpr=1#imgrc=_LPw8rHBrAMQgM 

these types of drawings also
*/}

                    <h3>City of Birth</h3>
                    <h3>State of Birth</h3>
                    <Autocomplete
                      disabled={editDisabled}
                      id="gender-select"
                      sx={{ width: 150 }}
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
                            autoComplete: "new-password", // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />

                    <h3>Phone Number</h3>
                    <TextField
                      disabled={editDisabled}
                      label="Own Email"
                      variant="outlined"
                      type="email"
                      sx={{ m: 1, width: "25ch" }}
                      defaultValue="libanmesbah@gmail.com"
                    />
                    <h2>More..</h2>

                    <TextField
                      disabled={editDisabled}
                      sx={{ m: 1, width: "40ch" }}
                      label="Home Address"
                      inputProps={{ maxLength: 100 }}
                      variant="standard"
                    />
                    <h3>Mailing Address</h3>
                    <h3>Occupation</h3>
                    <h3>Spouse-s</h3>
                    <h3>Children-s</h3>
                    <Autocomplete
                      disabled={editDisabled}
                      id="blood-type-select"
                      sx={{ width: 150 }}
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
                            autoComplete: "new-password", // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />

                    <h2>MORE..</h2>

                    <h3>Medical Conditions</h3>
                    <h3>Medications</h3>
                    <h3>Social Media Profiles</h3>
                    <h3>Online Usernames</h3>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={2}>
                    <h3>default Delay date - 1st day of month</h3>
                    <h3>default - How long should delays - 1month</h3>
                    <h4>less than month = money, more = free</h4>
                  </CustomTabPanel>
                </ThemeProvider>
                <div className="buttons">
                  <button
                    className={`classicBtn ${
                      saveDisabled && "disabledClassicBtn"
                    }`}
                    onClick={() => {
                      if (saveDisabled) {
                        console.log("disabled");
                      } else {
                        updateUserDetails();
                      }
                    }}
                  >
                    Submit
                  </button>
                  <button
                    className={`classicBtn ${
                      !editDisabled && "disabledClassicBtn"
                    }`}
                    onClick={() => {
                      if (!editDisabled) {
                        console.log("disabled");
                      } else {
                        console.log("nothing yet");
                        setEditDisabled(false);
                      }
                    }}
                  >
                    Edit Info
                  </button>
                </div>
              </Box>
            </div>
          ) : (
            <h1>Log in</h1>
          )}
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: left; */
  flex-direction: column;
  margin: 2rem;
  .classicBtn {
    margin: 1rem;
  }

  .tabs {
    width: 90vw;
  }
`;

export default SettingsPage;
