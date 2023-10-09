import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Spinner1 } from "../components/Spinner";
import { useUserContext } from "../context/UserContext";
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  remove,
} from "firebase/database";
import { countries } from "../context/UserOptions";

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

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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

// https://react-hook-form.com/ ?

const SettingsPage = () => {
  const { user: currentUser, loading } = useUserContext();
  const [userInfo, setUserInfo] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [editDisabled, setEditDisabled] = useState(false);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [updatedObj, setUpdatedObj] = useState({});

  const db = getDatabase();

  // useEffect(() => {
  //   if (currentUser) {
  //     console.log(currentUser);
  //     const infoRef = ref(db, "users/unposted/" + currentUser.uid);
  //     onValue(infoRef, (snapshot) => {
  //       let data = snapshot.val();
  //       if (data.info) {
  //         setUserInfo(data.info);
  //       } else {
  //         setUserInfo({ emailAddress: currentUser.email });
  //       }
  //     });
  //   }
  // }, [currentUser]);

  // useEffect(() => {
  //   if (userInfo && currentUser) {
  //     // if (!userInfo.emailAddress) {
  //     //   const propertyName = "emailAddress";
  //     //   userInfo[propertyName] = currentUser.email;
  //     // }
  //     console.log(userInfo);
  //     console.log(userInfo["mail1"]);
  //   }
  // }, [userInfo]);

  // const emptyObject = {
  //   firstName: "",
  //   lastName: "",
  //   middleName: "",
  //   prefix: "",
  //   suffix: "",
  //   dob: "",
  //   cityOfBirth: "",
  //   stateOfBirth: "",
  //   countryOfBirth: "",
  //   gender: "",
  //   phoneNumber: "",
  //   emailAddress: "",
  //   homeAddress: "",
  //   mailingAddress: "",
  //   occupation: "",
  //   spouse: "",
  //   children: "",
  //   bloodType: "",
  //   mail1: "",
  //   mail2: "",
  //   mail3: "",
  // };

  function updateUserDetails() {
    // const updates = {};
    // updates["/users/unposted/" + currentUser.uid + "/info/"] = userInfo;
    // update(ref(db), updates);
    // console.log("updated");

    console.log(updatedObj);

    setSaveDisabled(true);
    setEditDisabled(false);
  }

  // function changeValueOfThis(key) {
  //   const propertyName = key;
  //   return {
  //     value: userInfo[propertyName] || "",
  //     onChange: (event) => updateInfo(key, event.target.value),
  //   };
  // }

  const changeValueOfThis = (fieldName) => (event) => {
    const value = event.target.value;
    setUpdatedObj((prevObj) => ({
      ...prevObj,
      [fieldName]: value,
    }));
    console.log(updatedObj);
    saveDisabled && setSaveDisabled(false);
  };

  function updateInfo(key, info) {
    const propertyName = key;
    // console.log(key, ":", userInfo[propertyName], "->", info);
    const updatedUserInfo = {
      ...userInfo,
      [propertyName]: info,
    };
    // setUserInfo(updatedUserInfo);
    setSaveDisabled(false);
  }

  return (
    <Wrapper>
      {loading ? (
        <Spinner1 />
      ) : (
        <div>
          {currentUser && userInfo ? (
            <div className="tabs">
              <Box sx={{ width: "100%" }}>
                <ThemeProvider theme={theme}>
                  <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="TO WHO" {...a11yProps(0)} />
                      <Tab label="WHO" {...a11yProps(1)} />
                      <Tab label="WHEN" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={tabValue} index={0}>
                    {/* <p>tip on who to send, how etc</p> */}

                    <div className="mail1">
                      <TextField
                        disabled={!editDisabled}
                        sx={{ m: 1 }}
                        label="Mail 1"
                        variant="outlined"
                        id="outlined-controlled"
                        type="email"
                        required
                        // {...changeValueOfThis("mail1")}
                        // defaultValue={}
                        onChange={changeValueOfThis("mail1")}
                      />

                      <TextField
                        disabled={!editDisabled}
                        sx={{ m: 1, width: "25ch" }}
                        label="Short Message"
                        inputProps={{ maxLength: 100 }}
                        variant="standard"
                      />
                    </div>
                    <div className="mail2">
                      <TextField
                        disabled={!editDisabled}
                        sx={{ m: 1 }}
                        label="Mail 2"
                        variant="outlined"
                        type="email"
                        onChange={changeValueOfThis("mail2")}

                        // {...changeValueOfThis("mail2")}
                      />

                      <TextField
                        disabled={!editDisabled}
                        sx={{ m: 1, width: "25ch" }}
                        label="Short Message"
                        inputProps={{ maxLength: 100 }}
                        variant="standard"
                      />
                    </div>
                    {/* <p>More..</p> */}

                    <div className="mail3">
                      <TextField
                        disabled={true}
                        sx={{ m: 1 }}
                        label="Mail 3"
                        variant="outlined"
                        type="email"
                        defaultValue={userInfo && userInfo.emailAddress}
                      />
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel value={tabValue} index={1}>
                    {/* <p>how much do u want to reveal</p> */}
                    <div className="name">
                      <TextField
                        disabled={!editDisabled}
                        sx={{ m: 1 }}
                        label="First Name"
                        variant="outlined"
                        required
                      />
                      <TextField
                        disabled={!editDisabled}
                        sx={{ m: 1 }}
                        label="Middle Name"
                        variant="outlined"
                      />
                      <TextField
                        disabled={!editDisabled}
                        sx={{ m: 1 }}
                        label="Last Name"
                        variant="outlined"
                        required
                      />
                    </div>
                    <TextField
                      disabled={!editDisabled}
                      sx={{ m: 1, width: "5ch" }}
                      label="Prefix"
                      inputProps={{ maxLength: 5 }}
                      variant="standard"
                    />
                    <TextField
                      disabled={!editDisabled}
                      sx={{ m: 1, width: "5ch" }}
                      label="Suffix"
                      inputProps={{ maxLength: 5 }}
                      variant="standard"
                    />
                    <div className="datePicker" style={{ marginTop: "2rem" }}>
                      <DatePicker
                        label="Date of Birth"
                        disabled={!editDisabled}
                        sx={{ m: 1 }}
                        defaultValue={dayjs("2003-07-03")}
                      />
                    </div>
                    <div>
                      <Autocomplete
                        disabled={!editDisabled}
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
                        disabled={!editDisabled}
                        label="Birth State"
                        variant="outlined"
                        type="text"
                        sx={{ m: 1, width: "25ch" }}
                      />
                      <TextField
                        disabled={!editDisabled}
                        label="Birth City"
                        variant="outlined"
                        type="text"
                        sx={{ m: 1, width: "25ch" }}
                      />
                    </div>
                    <TextField
                      disabled={!editDisabled}
                      label="Phone Number"
                      variant="standard"
                      type="number"
                      sx={{ m: 1, width: "25ch", marginBottom: 3 }}
                    />

                    <Autocomplete
                      disabled={!editDisabled}
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
                      disabled={!editDisabled}
                      label="Own Email"
                      variant="outlined"
                      type="email"
                      sx={{ m: 1, width: "25ch" }}
                      defaultValue="libanmesbah@gmail.com"
                    />
                    {/* <p>More..</p> */}
                    <div>
                      <TextField
                        disabled={!editDisabled}
                        sx={{ m: 1, width: "40ch" }}
                        label="Home Address"
                        inputProps={{ maxLength: 100 }}
                        variant="standard"
                      />
                      {/* <TextField
                        disabled={!editDisabled}
                        sx={{ m: 1, width: "40ch", marginBottom: 3 }}
                        label="Mailing Address"
                        inputProps={{ maxLength: 100 }}
                        variant="standard"
                      /> */}

                      {/* <p>Spouse-s</p> */}
                      {/* <p>Children-s</p> */}
                      <Autocomplete
                        disabled={!editDisabled}
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
                      {/* <TextField
                        disabled={!editDisabled}
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
                  </CustomTabPanel>
                  <CustomTabPanel value={tabValue} index={2}>
                    <FormControl sx={{ marginBottom: 3 }}>
                      <FormLabel id="demo-controlled-radio-buttons-group">
                        Schedule
                      </FormLabel>
                      <RadioGroup
                        defaultValue="Recurring"
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Recurring"
                          control={<Radio />}
                          label="Recurring"
                        />

                        <FormControlLabel
                          value="One Time"
                          control={<Radio />}
                          label="One Time"
                        />
                        <p>
                          Add https://mui.com/material-ui/react-tooltip/ saying,
                          The Post will be released at specified intervals
                          unless intervened, it can be delayed for a defined
                          time period or disabled.
                        </p>
                        <p>
                          Add https://mui.com/material-ui/react-tooltip/ saying,
                          The Post will be released at specified date, it cannot
                          be delayed but can be disabled.
                        </p>
                      </RadioGroup>
                    </FormControl>
                    <Box>
                      <FormControl sx={{ marginBottom: 2 }}>
                        <FormLabel
                          helperText="12:01 am (UTC)"
                          id="demo-controlled-radio-buttons-group"
                        >
                          Attempt Post Every
                        </FormLabel>
                        <RadioGroup
                          defaultValue="Month"
                          row
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="Year"
                            control={<Radio />}
                            label="Year"
                          />
                          <FormControlLabel
                            value="Month"
                            control={<Radio />}
                            label="Month"
                          />
                          <FormControlLabel
                            value="Week"
                            disabled
                            control={<Radio />}
                            label="Week"
                          />
                          <FormControlLabel
                            value="Day"
                            disabled
                            control={<Radio />}
                            label="Day"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>
                    <Box>
                      <DatePicker
                        label="On the"
                        disabled={!editDisabled}
                        sx={{ m: 1 }}
                        defaultValue={dayjs("2003-07-03")}
                        helperText="12:01 am (UTC)"
                      />
                    </Box>
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        // onChange={handleChange}
                        sx={{ width: "15ch" }}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                    <Autocomplete
                      disabled={false}
                      id="post-date"
                      sx={{ width: 250 }}
                      options={[
                        {
                          label: "year",
                          value: "year",
                        },
                        {
                          label: "month",
                          value: "month",
                        },
                        {
                          label: "week",
                          value: "week",
                        },
                        {
                          label: "day",
                          value: "day",
                        },
                      ]}
                      autoHighlight
                      defaultValue={{
                        label: "month",
                        value: "month",
                      }}
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <li {...props}>{option.label}</li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          helperText="12:01 am (UTC)"
                          variant="standard"
                          {...params}
                          sx={{ m: 1 }}
                          label="On the"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                          }}
                        />
                      )}
                    />
                    <Autocomplete
                      disabled={false}
                      id="post-date-day"
                      sx={{ width: 250 }}
                      options={[
                        {
                          label: "year",
                          value: "year",
                        },
                        {
                          label: "month",
                          value: "month",
                        },
                        {
                          label: "week",
                          value: "week",
                        },
                        {
                          label: "day",
                          value: "day",
                        },
                      ]}
                      autoHighlight
                      // defaultValue={{
                      //   label: "month",
                      //   value: "month",
                      // }}
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <li {...props}>{option.label}</li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ m: 1 }}
                          label="Attempt Post Every"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                          }}
                        />
                      )}
                    />
                    {/* <p>default - How long should delays - 1month</p> */}
                    {/* <p>less than month = money, more = free</p> */}
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
                        console.log("updated");
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
                        console.log("uncomment");
                        setSaveDisabled(true);
                        setEditDisabled(false);
                      }
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={`classicBtn ${
                      editDisabled && "disabledClassicBtn"
                    }`}
                    onClick={() => {
                      if (editDisabled) {
                        console.log("disabled");
                      } else {
                        console.log("nothing yet");
                        setEditDisabled(true);
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
  .classicBtn:hover {
    margin: 1rem;
    letter-spacing: 2px;
    padding: 1.5rem 2.5rem;
  }

  .tabs {
    width: 90vw;
  }
`;

export default SettingsPage;
