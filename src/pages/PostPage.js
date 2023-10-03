import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

import DiaryMui from "../components/Diaries/DiaryMui";
import Editor from "../components/Editor/Editor";
import LinkAdder from "../components/modals/LinkAdder";
import CountDown from "../components/CountDown";
import { Spinner3 } from "../components/Spinner";
import DeletePost from "../components/modals/DeletePost";
import DisablePost from "../components/modals/DisablePost";
import dayjs from "dayjs";

// mui
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Tooltip from "@mui/material/Tooltip";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  and,
} from "firebase/firestore";
import { db } from "../services/firebase-config";

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
  const [loading2, setLoading2] = useState(true);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [editDisabled, setEditDisabled] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  function changeValueOfThis(key) {
    // const propertyName = key;
    // return {
    //   value: userInfo[propertyName] || "",
    //   onChange: (event) => updateInfo(key, event.target.value),
    // };
  }

  const getUserDoc = async (uid, postID) => {
    try {
      const docRef = doc(db, "posts", postID);

      const docSnap = await getDoc(docRef);
      const postDataReceived = docSnap.data();
      console.log(postDataReceived);
      if (uid === postDataReceived.user) {
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
      getUserDoc(currentUser.uid, id);
    }
  }, [currentUser]);

  const [diaryOpenMUI, setDiaryOpenMUI] = useState(false);
  const [linkAdderOpen, setLinkAdderOpen] = useState(false);
  const [deletePostOpen, setDeletePostOpen] = useState(false);
  const [disablePostOpen, setDisablePostOpen] = useState(false);
  const handleLinkAdderOpen = () => {
    setLinkAdderOpen(true);
  };
  const handleLinkAdderClose = () => {
    setLinkAdderOpen(false);
  };
  const handleDiaryCloseMUI = () => {
    setDiaryOpenMUI(false);
  };
  const handleDiaryOpenMUI = () => {
    setDiaryOpenMUI(true);
  };
  const handleDeletePostOpen = () => {
    setDeletePostOpen(true);
  };
  const handleDeletePostClose = () => {
    setDeletePostOpen(false);
  };
  const handleDisablePostOpen = () => {
    setDisablePostOpen(true);
  };
  const handleDisablePostClose = () => {
    setDisablePostOpen(false);
  };

  return (
    <div
      style={{ background: "whitesmoke", minHeight: "100vh", height: "100%" }}
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

            <CustomTabPanel value={tabValue} index={0}>
              {/* <div className="postForm"> */}
              <div className="textEditor">
                <Editor initialConfig={{ editable: true }} />
              </div>
              <div className="components">
                <button className="add diary" onClick={handleDiaryOpenMUI}>
                  <span className="material-symbols-outlined">add_notes</span>
                </button>
                <button className="add link" onClick={handleLinkAdderOpen}>
                  <span className="material-symbols-outlined">add_link</span>
                </button>
                <a href="/me/them">
                  <button className="add etc">
                    <span className="material-symbols-outlined">settings</span>
                  </button>
                </a>
              </div>
              {/* </div> */}
            </CustomTabPanel>

            <div className="postForm">
              <CustomTabPanel value={tabValue} index={1}>
                <Box
                  sx={{
                    padding: 8,
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
                      required
                      {...changeValueOfThis("mail1")}
                    />

                    <TextField
                      disabled={!editDisabled}
                      sx={{ m: 2, width: "25ch" }}
                      label="Short Message"
                      inputProps={{ maxLength: 100 }}
                      variant="standard"
                    />
                  </Box>
                  <Box>
                    <TextField
                      disabled={!editDisabled}
                      sx={{ m: 2, width: 300 }}
                      label="Mail 2"
                      variant="outlined"
                      type="email"
                      // {...changeValueOfThis("mail2")}
                    />

                    <TextField
                      disabled={!editDisabled}
                      sx={{ m: 2, width: "25ch" }}
                      label="Short Message"
                      inputProps={{ maxLength: 100 }}
                      variant="standard"
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
                      // {...changeValueOfThis("mail2")}
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
                </Box>
                <div className="buttons">
                  <button
                    className={`classicBtn ${
                      saveDisabled && "disabledClassicBtn"
                    }`}
                    onClick={() => {
                      if (saveDisabled) {
                        console.log("disabled");
                      } else {
                        // updateUserDetails();
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
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      Schedule
                    </FormLabel>
                    <RadioGroup
                      defaultValue="Recurring"
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="row-radio-buttons-group"
                    >
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
                    </RadioGroup>
                  </FormControl>
                  <Box>
                    <FormControl
                      sx={{ marginBottom: 5 }}
                      disabled={!editDisabled}
                    >
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
                  <p>
                    offer presets: first day of every year, month, week, 5/3
                    days
                  </p>
                  <p>offer presets: warn before a week, a day,</p>
                  <Box>
                    <DatePicker
                      label="On the"
                      disabled={!editDisabled}
                      // sx={{ m: 1 }}
                      defaultValue={dayjs("2003-07-03")}
                      helperText="12:01 am (UTC)"
                    />
                  </Box>
                  <div className="buttons">
                    <button
                      className={`classicBtn ${
                        saveDisabled && "disabledClassicBtn"
                      }`}
                      onClick={() => {
                        if (saveDisabled) {
                          console.log("disabled");
                        } else {
                          // updateUserDetails();
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
                  {/* <p>default - How long should delays - 1month</p> */}
                  {/* <p>less than month = money, more = free</p> */}
                </Box>
              </CustomTabPanel>
            </div>
            <div className="postForm">
              <CustomTabPanel value={tabValue} index={3}>
                <Box
                  sx={{
                    padding: 8,
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
                      defaultValue={postData.title}
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
                <div className="buttons">
                  <button
                    className={`classicBtn ${
                      saveDisabled && "disabledClassicBtn"
                    }`}
                    onClick={() => {
                      if (saveDisabled) {
                        console.log("disabled");
                      } else {
                        // updateUserDetails();
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
                        setEditDisabled(true);
                      }
                    }}
                  >
                    Edit Info
                  </button>
                </div>
              </CustomTabPanel>
            </div>
            {/* <LinkAdder
            open={linkAdderOpen}
            handleClose={handleLinkAdderClose}
            info={id}
          /> */}
            <DiaryMui
              open={diaryOpenMUI}
              handleClose={handleDiaryCloseMUI}
              info={id}
            />
          </ThemeProvider>
        </Wrapper>
      ) : (
        <Content>
          <h1>Invalid User, beep boop</h1>
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
  /* padding-left: 15vw; */
  padding-left: 290px;

  .textEditor {
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

    .box1 {
      padding: 20rem;
      background: rgb(15, 15, 15);
      position: absolute;
      bottom: 0;
      left: 0;
      transform: rotate(45deg);
    }
    .box2 {
      padding: 30rem;
      background: rgba(45, 45, 45, 0.5);
      position: absolute;
      bottom: -550px;
      left: -500px;
      transform: rotate(45deg);
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

  .components {
    margin-top: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    .add {
      outline: none;
      border: none;
      margin: 0 2rem;
      background-color: black;
      border-radius: 10px;
      /* border-radius: 50%; */
      padding: 2rem;
      color: white;

      .material-symbols-outlined {
        font-size: 2rem;
      }
    }
    .add:hover {
      cursor: pointer;
      transition: 0.3s;
      /* padding: 1.5rem 2.7rem; */
      color: black;
      background-color: white;
    }
  }
`;

const Content = styled.main`
  display: flex;
  justify-content: center;
  padding-top: 5rem;
  background-color: whitesmoke;
  height: 100vh;
  overflow: hidden;
`;
export default OwnPostPage;
