import React, { useState } from "react";
import styled from "styled-components";
import { countries } from "../context/UserOptions";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import {
  TextField,
  Box,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
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
  shadows: 0,
});

function ExpandMoreIcon() {
  return <span className="material-symbols-outlined">expand_more</span>;
}

function Settings({ userID }) {
  console.log(userID);

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
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
                  inputProps={{
                    maxLength: 25,
                  }}
                />
                <div className="name">
                  <TextField
                    sx={{ m: 1 }}
                    label="First Name"
                    variant="outlined"
                    required
                  />
                  <TextField
                    sx={{ m: 1 }}
                    label="Middle Name"
                    variant="outlined"
                  />
                  <TextField
                    sx={{ m: 1 }}
                    label="Last Name"
                    variant="outlined"
                    required
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
                    defaultValue={dayjs("2003-07-03")}
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
                  defaultValue="libanmesbah@gmail.com"
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
                <button className="classicBtn">save</button>
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
              <Typography>User Settings</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2 }}>
              <Typography sx={{ width: "50rem" }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo,
                corrupti. Sint tenetur quisquam fugit delectus nesciunt
                laudantium dolor, magnam consequuntur!
              </Typography>
              <Box sx={{ width: "100%", textAlign: "center" }}>
                <button className="classicBtn">save</button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
      </ThemeProvider>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  .howdy {
    /* height: 100rem;
    width: 10rem; */
    /* border: 1px solid red; */
  }
  .accordion {
    margin-bottom: 5rem;
  }
`;

export default Settings;
