import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

import DiaryMui from "../components/Diaries/DiaryMui";
import Editor from "../components/Editor/Editor";
import LinkAdder from "../components/LinkAdder";
import CountDown from "../components/CountDown";
import { Spinner3 } from "../components/Spinner";
// import SettingsPage from "./SettingsPage";

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

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
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

  return (
    <div style={{ background: "whitesmoke", height: "100vh" }}>
      {loading2 ? (
        <Content>
          <Spinner3 />
        </Content>
      ) : validUser ? (
        <Wrapper>
          <ThemeProvider theme={theme}>
            <CountDown />
            <div className="sidebar"></div>

            <div className="tabs">
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label="POST" {...a11yProps(0)} />
                <Tab label="TO WHO" {...a11yProps(1)} />
                <Tab label="WHEN" {...a11yProps(2)} />
              </Tabs>
              <h2>{postData.title ? postData.title : "Title"}</h2>
            </div>

            <CustomTabPanel value={tabValue} index={0}>
              <div className="postForm">
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
                      <span className="material-symbols-outlined">
                        settings
                      </span>
                    </button>
                  </a>
                </div>
              </div>
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={1}>
              <Box>
                <TextField
                  disabled={editDisabled}
                  sx={{ m: 1 }}
                  label="Mail 1"
                  variant="outlined"
                  id="outlined-controlled"
                  type="email"
                  required
                  {...changeValueOfThis("mail1")}
                />

                <TextField
                  disabled={editDisabled}
                  sx={{ m: 1, width: "25ch" }}
                  label="Short Message"
                  inputProps={{ maxLength: 100 }}
                  variant="standard"
                />
              </Box>
              <Box>
                <TextField
                  disabled={editDisabled}
                  sx={{ m: 1 }}
                  label="Mail 2"
                  variant="outlined"
                  type="email"
                  // {...changeValueOfThis("mail2")}
                />

                <TextField
                  disabled={editDisabled}
                  sx={{ m: 1, width: "25ch" }}
                  label="Short Message"
                  inputProps={{ maxLength: 100 }}
                  variant="standard"
                />
              </Box>
              <TextField
                disabled={true}
                sx={{ m: 1 }}
                label="Mail 3"
                variant="outlined"
                type="email"
                // defaultValue={userInfo && userInfo.emailAddress}
              />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={2}></CustomTabPanel>
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
  padding-left: 15vw;

  .textEditor {
    /* margin: 2rem 0; */
  }

  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
    width: 15vw;
    height: 100vh;
  }

  .tabs {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    flex-direction: row;
  }

  .postForm {
    /* display: flex;
    flex-direction: column; */
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
