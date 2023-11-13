import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

import DiaryMui from "../../components/Diaries/DiaryMui";
import Editor from "../../components/Editor/Editor";
import LinkAdder from "../../components/modals/LinkAdder";
import CountDown from "../../components/CountDown";
import { Spinner3 } from "../../components/Spinner";
import DeletePost from "../../components/modals/DeletePost";
import DisablePost from "../../components/modals/DisablePost";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { DATE_OPTIONS } from "../../context/UserOptions";

// mui
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  TextField,
  Autocomplete,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Tooltip,
  Snackbar,
  Switch,
  Button,
} from "@mui/material";

// mui x
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase-config";

const theme = createTheme({
  typography: {
    fontFamily: "Raleway",
    fontSize: 15,
    fontWeight: 700,
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
        <Box sx={{ p: 0 }}>
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

const OwnPostPage = () => {
  const { user: currentUser, loading } = useUserContext();
  const { id } = useParams();
  const [postData, setPostData] = useState();
  const [validUser, setValidUser] = useState(false);
  const [inValidPost, setInValidPost] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [editDisabled, setEditDisabled] = useState(false);
  // const [changeOccurred, setChangeOccurred] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [updatedObj, setUpdatedObj] = useState({});
  const [scheduleValue, setScheduleValue] = useState("One Time");
  const [scheduleTypeValue, setScheduleTypeValue] = useState("Specified");
  const [releaseDate, setReleaseDate] = useState();
  const [datesOptions, setDatesOptions] = useState(DATE_OPTIONS);
  const [preset, setPreset] = useState({
    timePeriod: "Month",
    day: datesOptions[0].value,
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const verifyUserAndGetPost = async (uid, postID) => {
    try {
      const docRef = doc(db, "posts", postID);
      const docSnap = await getDoc(docRef);
      const postDataReceived = docSnap.data();
      // console.log(postDataReceived);
      if (postDataReceived == undefined) {
        setInValidPost(true);
        setValidUser(false);
        setLoading2(false);
      } else if (uid === postDataReceived.user) {
        setValidUser(true);
        setPostData(postDataReceived);
        setLoading2(false);
      } else {
        setValidUser(false);
        setLoading2(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      verifyUserAndGetPost(currentUser.uid, id);
    }
    if (!loading && !currentUser) {
      setValidUser(false);
      setLoading2(false);
    }
  }, [currentUser, loading]);

  function updateUserDB() {}

  async function updateUserData() {
    setSaving(true);
    try {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, updatedObj);
      console.log("Document successfully updated");
      setEditDisabled(false);
      setSaving(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating document: ", error);
      setSaving(false);
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
      console.log(releaseDate);
      // checking
      if (updatedObj.releaseDate) {
        console.log("yeah");
        // TODO: wont it be better if release date had releaseDate: {timestamp: , preset:..}
        // TODO: also if oublic/private change, update it to updateUserData()
      }

      // updateUserData();
      setSaveDisabled(true);
    }
  }

  function handleCancel() {
    if (!editDisabled) {
      console.log("disabled");
    } else {
      setSaveDisabled(true);
      setEditDisabled(false);
    }
  }
  function handleEdit() {
    if (editDisabled) {
      console.log("disabled");
    } else {
      console.log("nothing yet");
      setEditDisabled(true);
    }
  }

  // Timings
  useEffect(() => {
    if (postData) {
      postData.scheduleType && setScheduleValue(postData.scheduleType);
      postData.scheduleFormat && setScheduleTypeValue(postData.scheduleFormat);
      postData.preset && setPreset(postData.preset);
      postData.releaseDate && setReleaseDate(dayjs(postData.releaseDate));
    }
  }, [postData]);

  useEffect(() => {
    if (preset.timePeriod === "Month") {
      setDatesOptions(DATE_OPTIONS);
    } else if (preset.timePeriod === "Week") {
      setDatesOptions(DATE_OPTIONS.slice(0, 7));
    }
    if (preset.timePeriod === "Week" && preset.day > 7) {
      setPreset((prevState) => ({
        ...prevState,
        day: datesOptions[6].value,
      }));
    }
    setUpdatedObj((prevObj) => ({
      ...prevObj,
      preset,
    }));
    // console.log(preset.timePeriod, preset.day);
  }, [preset.timePeriod, preset.day]);

  function handleDateChange(date) {
    // TODO: change to .valueOf + update user db? check
    setReleaseDate(dayjs(date));
    setUpdatedObj((prevObj) => ({
      ...prevObj,
      releaseDate: String(date),
    }));
    saveDisabled && setSaveDisabled(false);
  }

  function DateTimePicker() {
    return (
      <Box sx={{ marginBottom: 4 }}>
        <DatePicker
          label="On the"
          disabled={!editDisabled}
          sx={{ marginRight: 2 }}
          // defaultValue={dayjs("2003-07-03")}
          value={releaseDate || null}
          onChange={(date) => {
            handleDateChange(date);
          }}
        />
        <MobileTimePicker
          disabled={!editDisabled}
          value={releaseDate || null}
          onChange={(date) => {
            handleDateChange(date);
          }}
        />
      </Box>
    );
  }
  function FinalButtons() {
    return (
      <div className="buttons">
        <button
          className={`classicBtn ${saving && "loadingClassicBtn"} ${
            saveDisabled && "disabledClassicBtn"
          }`}
          onClick={handleSave}
        >
          Submit
        </button>
        <button
          className={`classicBtn ${!editDisabled && "disabledClassicBtn"}`}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className={`classicBtn ${editDisabled && "disabledClassicBtn"}`}
          onClick={handleEdit}
        >
          Edit Info
        </button>
      </div>
    );
  }

  const [diaryOpenMUI, setDiaryOpenMUI] = useState(false);
  const [linkAdderOpen, setLinkAdderOpen] = useState(false);
  const [deletePostOpen, setDeletePostOpen] = useState(false);
  const [disablePostOpen, setDisablePostOpen] = useState(false);
  const handleLinkAdderOpen = () => setLinkAdderOpen(true);
  const handleLinkAdderClose = () => setLinkAdderOpen(false);
  const handleDiaryCloseMUI = () => setDiaryOpenMUI(false);
  const handleDiaryOpenMUI = () => setDiaryOpenMUI(true);
  const handleDeletePostOpen = () => setDeletePostOpen(true);
  const handleDeletePostClose = () => setDeletePostOpen(false);
  const handleDisablePostOpen = () => setDisablePostOpen(true);
  const handleDisablePostClose = () => setDisablePostOpen(false);

  return (
    <div
      style={{
        background: "whitesmoke",
        minHeight: "100vh",
        height: "100%",
        overflow: "hidden",
        // border: "5px dashed red",
        // padding: "0 0 5rem 0",
      }}
    >
      {loading2 ? (
        <Content>
          <Spinner3 />
        </Content>
      ) : validUser ? (
        <Wrapper>
          <ThemeProvider theme={theme}>
            <CountDown
              info={{
                releaseDate: postData.releaseDate,
                disabled: postData.disabled,
              }}
            />
            <div className="sidebar">
              <span className="box1"></span>
              <span className="box2"></span>
              <p className="title">Post Addons</p>
              <div className="components">
                <button className="add diary" onClick={handleDiaryOpenMUI}>
                  <p>Diary</p>
                  <span className="icon material-symbols-outlined">
                    add_notes
                  </span>
                </button>
                <button className="add link" onClick={handleLinkAdderOpen}>
                  <p>Links</p>
                  <span className="icon material-symbols-outlined">
                    add_link
                  </span>
                </button>
                <button
                  className="add etc"
                  onClick={() => {
                    setTabValue(3);
                  }}
                >
                  <p>Settings</p>
                  <span className="icon material-symbols-outlined">
                    settings
                  </span>
                </button>
              </div>
            </div>

            <div className="tabs">
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label="POST" {...a11yProps(0)} />
                <Tab label="TO WHO" {...a11yProps(1)} />
                <Tab label="WHEN" {...a11yProps(2)} />
                <Tab
                  label="settings"
                  {...a11yProps(3)}
                  sx={{ borderLeft: "1px solid rgba(0, 0, 0, 0.2)" }}
                />
              </Tabs>
              <h2>{postData.title ? postData.title : "Title"}</h2>
            </div>

            <div className="textEditor">
              <CustomTabPanel value={tabValue} index={0}>
                <Editor initialConfig={{ editable: true }} />
              </CustomTabPanel>
            </div>

            <div className="postForm">
              <CustomTabPanel value={tabValue} index={1}>
                <Box
                  sx={{
                    padding: 8,
                    paddingBottom: 0,
                    textAlign: "left",
                  }}
                >
                  <Box>
                    <TextField
                      disabled={!editDisabled}
                      sx={{ m: 2, width: 300 }}
                      label="Mail 1"
                      variant="outlined"
                      id="outlined-controlled"
                      type="email"
                      defaultValue={postData.mail1 || ""}
                      onChange={updateValueOf("mail1")}
                    />

                    <TextField
                      disabled={!editDisabled}
                      sx={{ m: 2, width: "25ch" }}
                      label="Short Message"
                      inputProps={{ maxLength: 100 }}
                      variant="standard"
                      defaultValue={postData.mail1Msg || ""}
                      onChange={updateValueOf("mail1Msg")}
                    />
                  </Box>
                  <Box>
                    <TextField
                      disabled={!editDisabled}
                      sx={{ m: 2, width: 300 }}
                      label="Mail 2"
                      variant="outlined"
                      type="email"
                      defaultValue={postData.mail2 || ""}
                      onChange={updateValueOf("mail2")}
                    />

                    <TextField
                      disabled={!editDisabled}
                      sx={{ m: 2, width: "25ch" }}
                      label="Short Message"
                      inputProps={{ maxLength: 100 }}
                      variant="standard"
                      defaultValue={postData.mail2Msg || ""}
                      onChange={updateValueOf("mail2Msg")}
                    />
                  </Box>
                  <Box>
                    <TextField
                      disabled
                      sx={{ m: 2, width: 300 }}
                      label="Mail 3"
                      variant="outlined"
                      type="email"
                      defaultValue="blabla@gmial.com"
                    />

                    <TextField
                      disabled
                      sx={{ m: 2, width: "25ch" }}
                      label="Short Message"
                      inputProps={{ maxLength: 100 }}
                      variant="standard"
                      defaultValue="Posting (post ID): Uj3Klev3JDCH74u73Rkf"
                    />
                  </Box>
                  <Tooltip
                    title="Public: The Post will be publicly available after release, even through the users page. Private: The Post will only be accessible through the link or id (Provided in the email)."
                    placement="right"
                    arrow
                  >
                    <FormControlLabel
                      sx={{ marginTop: 2 }}
                      disabled={!editDisabled}
                      value="start"
                      control={<Switch defaultChecked={postData.public} />}
                      label="Public"
                      labelPlacement="start"
                      onChange={(event) => {
                        console.log(event.target.checked);
                        setUpdatedObj((prevObj) => ({
                          ...prevObj,
                          public: event.target.checked,
                        }));
                        saveDisabled && setSaveDisabled(false);
                      }}
                    />
                  </Tooltip>
                  <FormControlLabel
                    sx={{ marginTop: 2 }}
                    disabled={!editDisabled}
                    value="start"
                    control={<Switch defaultChecked={postData.anonymity} />}
                    label="Anonymous"
                    labelPlacement="start"
                    onChange={(event) => {
                      console.log(event.target.checked);
                      setUpdatedObj((prevObj) => ({
                        ...prevObj,
                        anonymity: event.target.checked,
                      }));
                      saveDisabled && setSaveDisabled(false);
                    }}
                  />
                </Box>
                <FinalButtons />
              </CustomTabPanel>
            </div>

            <div className="postForm">
              <CustomTabPanel value={tabValue} index={2}>
                <Box
                  sx={{
                    padding: 8,
                    textAlign: "left",
                  }}
                >
                  <FormControl
                    sx={{ marginBottom: 5 }}
                    disabled={!editDisabled}
                  >
                    <FormLabel>Schedule</FormLabel>
                    <RadioGroup
                      defaultValue={postData.scheduleType || "One Time"}
                      row
                      name="row-radio-buttons-group"
                      value={scheduleValue}
                      onChange={(event) => {
                        setScheduleValue(event.target.value);
                        updateValueOf("scheduleType")(event);
                      }}
                    >
                      <Tooltip
                        title="The
                        Post will be released at specified date, it cannot be
                        delayed but can be disabled."
                        placement="top"
                        arrow
                      >
                        <FormControlLabel
                          value="One Time"
                          control={<Radio />}
                          label="One Time"
                        />
                      </Tooltip>
                      <Tooltip
                        title="The
                        Post will be released at specified intervals unless
                        intervened, it can be delayed for a defined time period or
                        disabled."
                        placement="top"
                        arrow
                      >
                        <FormControlLabel
                          value="Recurring"
                          control={<Radio />}
                          label="Recurring"
                        />
                      </Tooltip>
                    </RadioGroup>
                  </FormControl>
                  {scheduleValue == "One Time" ? (
                    <DateTimePicker />
                  ) : (
                    <Box>
                      <FormControl
                        sx={{ marginBottom: 2 }}
                        disabled={!editDisabled}
                      >
                        <FormLabel>Type</FormLabel>
                        <RadioGroup
                          defaultValue={postData.scheduleFormat || "Specified"}
                          row
                          name="row-radio-buttons-group"
                          value={scheduleTypeValue}
                          onChange={(event) => {
                            setScheduleTypeValue(event.target.value);
                            updateValueOf("scheduleFormat")(event);
                          }}
                        >
                          <FormControlLabel
                            value="Specified"
                            control={<Radio />}
                            label="Specified"
                          />
                          <FormControlLabel
                            value="Preset"
                            control={<Radio />}
                            label="Preset"
                          />
                        </RadioGroup>
                      </FormControl>
                      {scheduleTypeValue == "Specified" ? (
                        <DateTimePicker />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 2,
                            marginBottom: 3,
                          }}
                        >
                          <Typography variant="body1">
                            Attempt post every
                            <Select
                              variant="standard"
                              labelId="demo-simple-select-label"
                              id="time-select"
                              disabled={!editDisabled}
                              // label="Age"
                              onChange={(event) => {
                                console.log(event.target.value);
                                setPreset((prevState) => ({
                                  ...prevState,
                                  timePeriod: event.target.value,
                                }));
                                saveDisabled && setSaveDisabled(false);
                              }}
                              sx={{ width: "10ch", marginLeft: 2 }}
                              defaultValue={preset.timePeriod}
                            >
                              <MenuItem disabled value={"Day"}>
                                Day
                              </MenuItem>
                              <MenuItem value={"Week"}>Week</MenuItem>
                              <MenuItem value={"Month"}>Month</MenuItem>
                              <MenuItem value={"Year"}>Year</MenuItem>
                            </Select>
                          </Typography>
                          <Autocomplete
                            id="post-date"
                            disabled={!editDisabled}
                            options={datesOptions}
                            defaultValue={
                              datesOptions[postData.preset.day - 1] ||
                              datesOptions[0]
                            }
                            disableClearable
                            getOptionLabel={(option) => option.label}
                            renderOption={(props, option) => (
                              <li {...props}>{option.label}</li>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                sx={{ width: "15ch" }}
                                label="On the"
                                helperText="12:01 am (UTC)"
                                variant="standard"
                              />
                            )}
                            onChange={(event, newValue) => {
                              console.log(newValue);
                              // change preset day value to newValue.value
                              setPreset((prevState) => ({
                                ...prevState,
                                day: newValue.value,
                              }));
                            }}
                          />
                          <Typography variant="body1">day</Typography>
                        </Box>
                      )}

                      <FormControl
                        sx={{ marginBottom: 5 }}
                        disabled={!editDisabled}
                      >
                        {/* <FormLabel helperText="12:01 am (UTC)"> */}
                        <FormLabel>Delay Post by a</FormLabel>
                        <RadioGroup
                          defaultValue={postData.delayDuration || "Month"}
                          row
                          onChange={(event) => {
                            updateValueOf("delayDuration")(event);
                          }}
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
                      <Box></Box>
                      <FormControl
                        sx={{ marginBottom: 5 }}
                        disabled={!editDisabled}
                      >
                        {/* <FormLabel helperText="12:01 am (UTC)"> */}
                        <FormLabel>Warn before</FormLabel>
                        <RadioGroup
                          defaultValue={postData.warnDuration || 3}
                          row
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="row-radio-buttons-group"
                          onChange={(event) => {
                            updateValueOf("warnDuration")(event);
                          }}
                        >
                          <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label="A Day"
                          />
                          <FormControlLabel
                            value={3}
                            control={<Radio />}
                            label="3 Days"
                          />
                          <FormControlLabel
                            value={7}
                            control={<Radio />}
                            label="A Week"
                          />
                          <FormControlLabel
                            value={30}
                            control={<Radio />}
                            label="A Month"
                          />
                          <FormControlLabel
                            value={364}
                            control={<Radio />}
                            label="A Year"
                            disabled
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  )}

                  <FinalButtons />
                </Box>
              </CustomTabPanel>
            </div>
            <div className="postForm">
              <CustomTabPanel value={tabValue} index={3}>
                <Box
                  sx={{
                    padding: 8,
                    paddingBottom: 1,
                    textAlign: "left",
                  }}
                >
                  <Box>
                    <TextField
                      disabled={!editDisabled}
                      sx={{ m: 2, width: 300 }}
                      label="Title"
                      variant="outlined"
                      id="outlined-controlled"
                      type="text"
                      inputProps={{ maxLength: 20 }}
                      defaultValue={postData.title}
                      onChange={updateValueOf("title")}
                    />
                  </Box>
                  <div
                    className={`changeStateBtns ${
                      !editDisabled && "changeStateBtnsDiasbled"
                    }`}
                  >
                    <button
                      className="changeStateBtn disable"
                      onClick={handleDisablePostOpen}
                    >
                      {postData.disabled ? "enable post" : "disable post"}
                    </button>
                    <button
                      className="changeStateBtn delete"
                      onClick={handleDeletePostOpen}
                    >
                      delete post
                    </button>
                    <DeletePost
                      open={deletePostOpen}
                      handleClose={handleDeletePostClose}
                      postID={id}
                      userID={currentUser.uid}
                    />
                    <DisablePost
                      open={disablePostOpen}
                      handleClose={handleDisablePostClose}
                      postID={id}
                      userID={currentUser.uid}
                      isDisabled={postData.disabled}
                    />
                  </div>

                  {/* <Typography variant="body1">Enter post ID: {id}</Typography> */}
                </Box>
                <FinalButtons />
              </CustomTabPanel>
            </div>
            <LinkAdder
              open={linkAdderOpen}
              handleClose={handleLinkAdderClose}
              info={id}
            />
            <DiaryMui
              open={diaryOpenMUI}
              handleClose={handleDiaryCloseMUI}
              info={id}
            />
          </ThemeProvider>
        </Wrapper>
      ) : (
        <Content>
          <h1>
            {inValidPost
              ? "Post doesn't exist, beep boop"
              : "Invalid User, beep boop"}
          </h1>
          <a href="/">
            <button className="classicBtn">Go Home</button>
          </a>
        </Content>
      )}
    </div>
  );
};

const Wrapper = styled.main`
  display: flex;
  padding: 2rem 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  padding-left: 290px;
  /* overflow: hidden; */

  /* background-color: red; */

  .textEditor {
    width: 90%;
    /* background-color: red; */
  }

  .sidebar {
    position: absolute;

    top: 0;
    left: 0;
    background-color: black;
    /* width: 15vw; */
    width: 290px;
    min-height: 100vh;
    height: 100%;
    overflow: hidden;
    color: white;
    padding-top: 4rem;

    .title {
      letter-spacing: 1px;
      text-align: left;
      padding-left: 10%;
    }
    .box1 {
      padding: 20rem;
      background: rgb(15, 15, 15);
      position: absolute;
      top: 450px;

      left: 0;
      transform: rotate(45deg);
    }
    .box2 {
      padding: 30rem;
      background: rgba(45, 45, 45, 0.5);
      position: absolute;
      top: 550px;
      left: -500px;
      transform: rotate(45deg);
    }
  }

  .components {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.75rem;
    .add {
      outline: none;
      border: none;
      background-color: black;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.15);

      padding: 0px 15px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 90%;
      p {
        font-size: 1rem;
        font-family: "Raleway";
      }

      .icon {
        font-size: 1.5rem;
        opacity: 0.8;
        padding-right: 10px;
      }
    }
    .add:hover {
      cursor: pointer;
      transition: 0.3s;
      /* padding: 1.5rem 2.7rem; */
      /* color: black; */
      background-color: rgba(255, 255, 255, 0.25);
    }
  }

  @media screen and (max-width: 1000px) {
    padding-left: 0;

    .sidebar {
      visibility: hidden;
    }
  }

  .tabs {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    flex-direction: row;
    margin-bottom: 1rem;
  }

  .postForm {
    width: 90%;
    background-color: white;
    border-radius: 10px;
    /* margin-top: 2rem; */
  }

  .buttons {
    background-color: #eee;

    border-radius: 10px;
    margin: 5rem;
    text-align: center;
    .classicBtn {
      margin: 1rem;
    }
    .classicBtn:hover {
      margin: 1rem;
      letter-spacing: 2px;
      padding: 1.5rem 2.5rem;
    }
  }

  .changeStateBtnsDiasbled {
    opacity: 0.8;
    pointer-events: none;
  }

  .changeStateBtns {
    margin: 2rem 0;
    .changeStateBtn {
      margin: 0 1rem;
      padding: 1rem;
      outline: none;
      border: none;
      cursor: pointer;
      background: none;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: 0.3s;
    }
    .delete {
      background-color: tomato;
      color: white;
    }
    .delete:hover {
      background-color: #dd573f;
    }

    .disable {
      color: tomato;
      /* text-decoration: underline; */
      border: 1px solid tomato;
    }

    .disable:hover {
      /* color: red;
      border: 1px solid red; */
      text-shadow: 0 0 1px red;
    }
  }
`;

const Content = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-direction: column;
  background-color: whitesmoke;
  height: 60vh;
  overflow: hidden;
`;
export default OwnPostPage;
