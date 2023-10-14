import React, { useState } from "react";
import styled from "styled-components";
import { countries } from "../context/UserOptions";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import PropTypes from "prop-types";
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

function ExpandMoreIcon() {
  return <span class="material-symbols-outlined">expand_more</span>;
}

function Settings({ userID }) {
  const [editDisabled, setEditDisabled] = useState(true);

  console.log(userID);

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <div className="accordion">
          <Accordion>
            <AccordionSummary
              sx={{ backgroundColor: "whitesmoke" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="howdy">
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
              </div>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
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
`;

export default Settings;
