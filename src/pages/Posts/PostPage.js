import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

// import Editor from "../../components/Editor/Editor";
import LexicalEditor from "components/Lexical/App";

import Diary from "../../components/Diaries/DiaryList";
import LinkAdder from "../../components/modals/LinkAdder";
import CountDown from "../../components/CountDown";
import { Spinner3 } from "../../components/Spinner";
import DeletePost from "../../components/modals/DeletePost";
import DisablePost from "../../components/modals/DisablePost";
import InfoRedirect from "../../components/InfoRedirect";
import dayjs from "dayjs";

import { DATE_OPTIONS } from "../../context/UserOptions";
import { InfoRedirectLink } from "../../functions/functions";

// mui
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
  Switch,
  Select,
  Button,
  LinearProgress,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";

// mui x
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../../services/firebase-config";

// LEXICAL:

import Editor from "components/Lexical/Editor";
import "components/Lexical/index.css";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import {
  SettingsContext,
  useSettings,
} from "components/Lexical/context/SettingsContext";
import PlaygroundNodes from "components/Lexical/nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "components/Lexical/themes/PlaygroundEditorTheme";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Settings from "components/Lexical/Settings";

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
  const [otherPostData, setOtherPostData] = useState();
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

  // Letter

  const [openAutoSaveAlert, setOpenAutoSaveAlert] = useState(false);

  // const [editorStateReceived, setEditorStateReceived] = useState(null);
  const [editorStateValue, setEditorStateValue] = useState();
  const [letterDescription, setLetterDescription] = useState();
  // const [letterDescriptionReceived, setLetterDescriptionReceived] = useState();
  const [adminText, setAdminText] = useState();
  const [autoSaveMS, setAutoSaveMS] = useState();
  const [progress, setProgress] = useState(0);
  const [savingLetter, setSavingLetter] = useState(false);
  const [lastLetterSaved, setLastLetterSaved] = useState();
  const emptyRoot = JSON.stringify({
    root: {
      children: [
        {
          children: [],
          direction: null,
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: null,
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  });

  const [preset, setPreset] = useState({
    timePeriod: "Month",
    day: datesOptions[0].value,
  });
  const [openEditDial, setOpenEditDial] = useState(false);
  const [showFinalButtons, setShowFinalButtons] = useState(true);
  const handleOpenEditDial = () => setOpenEditDial(true);
  const handleCloseEditDial = () => setOpenEditDial(false);

  const handleOpenAutoSaveAlert = () => {
    setOpenAutoSaveAlert(true);
  };
  const handleCloseAutoSaveAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAutoSaveAlert(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  async function getOtherPostsData() {
    const userID = currentUser.uid;
    // TODO: also get from users/posted
    await getDocs(collection(db, `/users/${userID}/posts`)).then(
      (querySnapshot) => {
        const postsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setOtherPostData(postsData);
      }
    );
  }

  function generateOtherPostLinks(posts) {
    return posts.map((post) => (
      <a className="add postTitles" key={post.id} href={`/me/post/${post.id}`}>
        <p>{post.title}</p>
      </a>
    ));
  }

  const verifyUserAndGetPost = async (uid, postID) => {
    setLoading2(true);

    try {
      const docRef = doc(db, "posts", postID);
      const docSnap = await getDoc(docRef);
      const postDataReceived = docSnap.data();
      // console.log(postDataReceived);
      if (postDataReceived == undefined) {
        setInValidPost(true);
        setValidUser(false);
      } else if (uid === postDataReceived.user) {
        setValidUser(true);
        setPostData(postDataReceived);
        if (
          postDataReceived.autoSaveMS &&
          postDataReceived.autoSaveMS > 59000
        ) {
          setAutoSaveMS(postDataReceived.autoSaveMS);
        }
        // if (postDataReceived.hasOwnProperty('autoSave')) {
        //   console.log('obj has key1');
        // } else {
        //   console.log('obj does not have key1');
        // }
        // postDataReceived.letter && setEditorStateValue(postDataReceived.letter);
        // postDataReceived.description &&
        //   setLetterDescriptionReceived(postDataReceived.description);
        getOtherPostsData();
      } else {
        setValidUser(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading2(false);
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

  async function checkData() {
    // Update users/posts db
    const exceptions = ["public", "releaseDate", "title"];
    let tempObj = {};
    const filteredProperties = Object.keys(updatedObj).filter((prop) =>
      exceptions.includes(prop)
    );
    if (filteredProperties.length > 0) {
      tempObj = filteredProperties.reduce((obj, prop) => {
        obj[prop] = updatedObj[prop];
        return obj;
      }, {});
      console.log("Matching properties found:", tempObj);
    }
    try {
      const postRef = doc(db, "users", currentUser.uid, "posts", id);
      if (Object.keys(tempObj).length > 0) {
        await updateDoc(postRef, tempObj);
        console.log(
          "User document successfully updated with matching properties",
          tempObj
        );
      } else {
        console.log("No matching properties found, skipping update");
      }
    } catch (error) {
      console.error("Error updating document:", error.message || error);
      throw error;
    }
  }

  async function updateUserData() {
    setSaving(true);
    try {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, updatedObj);
      console.log("Document successfully updated");
      checkData();
      setEditDisabled(false);
      setSaving(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating document: ", error);
      setSaving(false);
    }
  }

  // TODO: wont it be better if release date had releaseDate: {timestamp: , preset:..}

  const updateValueOf = (fieldName) => (event) => {
    const value = event.target.value;
    setUpdatedObj((prevObj) => ({
      ...prevObj,
      [fieldName]: value,
    }));
    saveDisabled && setSaveDisabled(false);
    // TODO: instead do if newObj = postData or something
  };

  // Log updates:
  useEffect(() => {
    updatedObj && console.log(updatedObj);
  }, [updatedObj]);

  function handleSave() {
    if (postData.displayName !== currentUser.displayName) {
      updatedObj.displayName = currentUser.displayName;
    }

    if (!saveDisabled) {
      console.log(updatedObj);
      console.log(releaseDate);

      updateUserData();
      setSaveDisabled(true);
    }
  }

  function handleCancel() {
    console.log("click");
    if (!editDisabled) {
      console.log("disabled");
    } else {
      setSaveDisabled(true);
      setEditDisabled(false);
    }
  }

  function handleEdit() {
    if (!editDisabled) {
      setEditDisabled(true);
    }
  }

  // LEXICAL:

  const {
    settings: { isCollab, emptyEditor, measureTypingPerf },
  } = useSettings();

  const initialConfig = {
    editorState: isCollab
      ? null
      : emptyEditor
      ? undefined
      : // : prepopulatedRichText,
        null,
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  async function handleSaveEditor() {
    // TODO: https://lexical.dev/docs/concepts/editor-state#:~:text=LexicalOnChangePlugin
    console.log({
      letter: editorStateValue,
      description: letterDescription,
    });
    setSavingLetter(true);
    try {
      const postRef = doc(db, "posts", id);
      if (letterDescription && letterDescription != postData.description) {
        await updateDoc(postRef, {
          letter: editorStateValue,
          description: letterDescription,
        });
      } else if (editorStateValue == postData.letter) {
        return;
      } else {
        await updateDoc(postRef, {
          letter: editorStateValue,
        });
      }
      console.log("Document successfully updated");
    } catch (error) {
      console.error(error);
    }
    setSavingLetter(false);
  }

  // State to manage autoUpdate
  // const MINUTE_MS = 1500;

  async function handleAutoSave() {
    console.log(autoSaveMS && true);
    console.log(postData && true);
    console.log(validUser && true);
    console.log(!saving && true);
    console.log(JSON.stringify(editorStateValue) == postData.letter);
    console.log(
      lastLetterSaved && editorStateValue !== lastLetterSaved && true
    );
    console.log(editorStateValue);
    console.log(postData.letter);
    // FIXME:  what check if postData.letter empty?
    if (
      autoSaveMS &&
      postData &&
      validUser &&
      !saving &&
      editorStateValue &&
      editorStateValue !== postData.letter &&
      lastLetterSaved &&
      editorStateValue !== lastLetterSaved
    ) {
      console.log(autoSaveMS && postData && validUser);
      setLastLetterSaved(editorStateValue);
      handleOpenAutoSaveAlert();
      console.log("saving started");
      // await handleSaveEditor();
      console.log("saving ended");
      handleCloseAutoSaveAlert();
    } else {
      console.log("somethings not right");
    }
  }

  useEffect(() => {
    console.log(autoSaveMS);
    if (autoSaveMS && autoSaveMS > 59000) {
      console.log("as enabled");
      console.log(autoSaveMS);

      const interval = setInterval(() => {
        console.log("running");
        handleAutoSave();
      }, 5000);

      return () => clearInterval(interval);
    } else {
      console.log("as disabled");
    }
    // }, [autoSaveMS, postData, validUser, editorStateValue]);
  }, [autoSaveMS, postData, validUser]);

  function roughSizeOfObject(object) {
    const objectList = [];
    const stack = [object];
    let bytes = 0;

    while (stack.length) {
      const value = stack.pop();

      switch (typeof value) {
        case "boolean":
          bytes += 4;
          break;
        case "string":
          bytes += value.length * 2;
          break;
        case "number":
          bytes += 8;
          break;
        case "object":
          if (!objectList.includes(value)) {
            objectList.push(value);
            for (const prop in value) {
              if (value.hasOwnProperty(prop)) {
                stack.push(value[prop]);
              }
            }
          }
          break;
      }
    }
    // console.log(`${bytes / 1000}kb`);
    // console.log(`${((bytes / 1000 / 1000) * 100).toFixed(2)}%`);
  }
  function estimateObjectSizeInKB(obj) {
    const jsonString = JSON.stringify(obj);
    // console.log(jsonString);
    const bytes = new Blob([jsonString]).size;
    const kilobytes = bytes / 1024;
    const megabytes = kilobytes / 1024;
    const percentage = Number(kilobytes / 500) * 100;
    // console.log(kilobytes.toFixed(2), megabytes.toFixed(2));
    // console.log(percentage);
    setProgress(percentage);
    // if (percentage < 100) {
    //   setProgress(percentage);
    // } else {
    //   setProgress(100);
    // }
  }

  function addAdminText(textState, text) {
    const objState = JSON.parse(textState);
    const textObj = {
      children: [
        {
          detail: 0,
          format: 0,
          mode: "normal",
          style: "background-color: #ffdfdf;color: #d0021b;",
          text: `Error: ${text}`,
          type: "text",
          version: 1,
        },
        {
          detail: 0,
          format: 0,
          mode: "normal",
          style: "",
          text: " ",
          type: "text",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "paragraph",
      version: 1,
    };
    if (!objState || !objState.root || !objState.root.children) {
      console.log("Invalid objState or missing 'root' or 'children' key.");
      return objState;
    }

    objState.root.children.push(textObj);
    console.log(objState);
    return JSON.stringify(objState);
  }

  function OnChangePlugin({ onChange }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      // !changed && setChanged(true); //FIXME: changed when loads
      // setEditorValue(JSON.stringify(editor.getEditorState()));
      return editor.registerUpdateListener((editorState) => {
        // TODO: logging
        // console.log(JSON.stringify(editorState.editorState));
        // roughSizeOfObject(JSON.stringify(editorState.editorState));
        estimateObjectSizeInKB(editorState.editorState);
        setEditorStateValue(JSON.stringify(editorState.editorState));
        onChange(editorState);
      });
    }, [editor, onChange]);
  }

  // This activates every time theres a change
  const UpdatePlugin = () => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
      if (postData.letter && !editorStateValue) {
        editor.setEditorState(editor.parseEditorState(postData.letter));

        // setEditorStateValue(postData.letter);
        estimateObjectSizeInKB(postData.letter);
      }
    }, [postData]);

    if (adminText && editorStateValue) {
      editor.setEditorState(
        editor.parseEditorState(addAdminText(editorStateValue, adminText))
      );
      setAdminText(null);
    }
  };

  const LoadingSnackbar = (
    <Snackbar open={openAutoSaveAlert} onClose={handleCloseAutoSaveAlert}>
      <Box>
        <Alert
          onClose={handleCloseAutoSaveAlert}
          variant="contained"
          severity="success"
          elevation={2}
          sx={{ width: "100%", position: "relative", bgcolor: "white" }}
        >
          Auto-saving post
          <LinearProgress
            variant="query"
            sx={{
              width: "100%",
              position: "absolute",
              bottom: 0,
              left: 0,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />
        </Alert>
      </Box>
    </Snackbar>
  );

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
    if (editDisabled) {
      console.log("here?");
      if (preset.timePeriod === "Month") {
        setDatesOptions(DATE_OPTIONS);
      } else if (preset.timePeriod === "Week") {
        setDatesOptions(DATE_OPTIONS.slice(0, 7));
        // TODO: make it Sun -> Sat instead of numbers
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
    }
    // console.log(preset.timePeriod, preset.day);
  }, [preset.timePeriod, preset.day]);

  function handleDateChange(date) {
    // TODO: change to .valueOf + update user db? check
    setReleaseDate(dayjs(date));
    setUpdatedObj((prevObj) => ({
      ...prevObj,
      releaseDate: String(date),
    }));
    // console.log(date.valueOf());
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
        <TimePicker
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
        <div
          className="closeBtn"
          onClick={() => {
            setShowFinalButtons(false);
          }}
        >
          <CloseIcon />
        </div>
      </div>
    );
  }
  function EditSpeedDial() {
    // FIXME: rerenders if hover over

    return (
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{
          position: "absolute",
          bottom: 24,
          right: 24,
        }}
        icon={<EditIcon onClick={handleEdit} />}
        onClose={handleCloseEditDial}
        onOpen={handleOpenEditDial}
        open={openEditDial}

        // direction={"down"}
      >
        <SpeedDialAction
          key="Change"
          icon={<SwitchLeftIcon />}
          tooltipTitle="Change"
          onClick={() => {
            setShowFinalButtons(true);
          }}
        />
        <SpeedDialAction
          key="Cancel"
          icon={<CloseIcon />}
          tooltipTitle="Cancel"
          disabled={!editDisabled}
          onClick={handleCancel}
        />
        <SpeedDialAction
          key="Save"
          icon={<SaveIcon />}
          tooltipTitle="Save"
          disabled={!editDisabled}
          onClick={handleSave}
        />
      </SpeedDial>
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
                postID: id,
                disabled: postData.disabled,
                preset: postData.preset,
                releaseDate: postData.releaseDate,
                delayDuration: postData.delayDuration,
                scheduleFormat: postData.scheduleFormat,
                scheduleType: postData.scheduleType,
                warnDuration: postData.warnDuration,
              }}
            />
            <div className="sidebar">
              <span className="box1"></span>
              <span className="box2"></span>
              <section>
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
              </section>
              <section>
                {otherPostData && (
                  <>
                    <p className="title">Other Posts</p>
                    <div className="components otherPosts">
                      {generateOtherPostLinks(otherPostData)}
                    </div>
                  </>
                )}
              </section>
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
                {LoadingSnackbar}
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <TextField
                    sx={{
                      marginTop: 0,
                      bgcolor: "white",
                      "& fieldset": { border: "none" },
                      border: "1px solid #eee",
                    }}
                    fullWidth
                    label="Description"
                    variant="outlined"
                    id="outlined-controlled"
                    type="text"
                    placeholder="Keep it short"
                    value={letterDescription}
                    defaultValue={postData.description}
                    inputProps={{ maxLength: 100 }}
                    disabled={saving}
                    onChange={(e) => {
                      // !changed && setChanged(true);
                      setLetterDescription(e.target.value);
                    }}
                  />
                  <Button
                    sx={{
                      bgcolor: "white",
                      borderColor: "whitesmoke",
                      letterSpacing: 1,
                      padding: "0 1rem",
                    }}
                    // disabled={!changed || incoming || saving}
                    disabled={
                      savingLetter ||
                      progress > 99.99 ||
                      !editorStateValue ||
                      (postData &&
                        editorStateValue &&
                        postData.letter == editorStateValue)
                    }
                    className={`${savingLetter && "loadingClassicBtn"}`}
                    onClick={handleSaveEditor}
                    variant="text"
                  >
                    save
                  </Button>
                </Box>
                <div className="lexical">
                  <SettingsContext>
                    <LexicalComposer initialConfig={initialConfig}>
                      <div className="editor-shell">
                        <Editor editableEditor />
                        <LinearProgress
                          sx={{
                            width: "100%",
                            borderRadius: "10px",
                            marginTop: 1,
                            bgcolor: "#ccc",
                            opacity: 0.5,
                          }}
                          variant={
                            progress < 100 ? "determinate" : "indeterminate"
                          }
                          color={progress < 95 ? "primary" : "error"}
                          value={progress}
                        />

                        <UpdatePlugin />
                        <OnChangePlugin onChange={(editorState) => null} />
                      </div>
                      {/* <Settings /> */}
                    </LexicalComposer>
                  </SettingsContext>
                </div>
                {/* <LexicalEditor /> */}
                {/* <Editor initialConfig={{ editable: true }} /> */}
              </CustomTabPanel>
            </div>

            <div className="postForm">
              <CustomTabPanel value={tabValue} index={1}>
                <Box
                  sx={{
                    padding: 8,
                    // paddingBottom: 4,
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
                      defaultValue={`Posting (post ID): ${id}`}
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
                        setUpdatedObj((prevObj) => ({
                          ...prevObj,
                          public: event.target.checked,
                        }));
                        saveDisabled && setSaveDisabled(false);
                      }}
                    />
                  </Tooltip>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <InfoRedirect states={{ tabIndex: 3, pageIndex: 3 }} />

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
                </Box>
                {/* TODO: nsfw switch */}
                {showFinalButtons ? (
                  <FinalButtons />
                ) : (
                  <SpeedDial
                    ariaLabel="SpeedDial controlled open example"
                    sx={{
                      position: "absolute",
                      bottom: 24,
                      right: 24,
                    }}
                    onClick={handleEdit}
                    icon={
                      <EditIcon
                        sx={{ borderRadius: "50%" }}
                        // onClick={handleEdit}
                      />
                    }
                    onClose={handleCloseEditDial}
                    onOpen={handleOpenEditDial}
                    open={openEditDial}

                    // direction={"down"}
                  >
                    <SpeedDialAction
                      key="Change"
                      icon={<SwitchLeftIcon />}
                      tooltipTitle="Change"
                      onClick={() => {
                        setShowFinalButtons(true);
                      }}
                    />
                    <SpeedDialAction
                      key="Cancel"
                      icon={<CloseIcon />}
                      tooltipTitle="Cancel"
                      disabled={!editDisabled}
                      onClick={handleCancel}
                    />
                    <SpeedDialAction
                      key="Save"
                      icon={<SaveIcon />}
                      tooltipTitle="Save"
                      disabled={saveDisabled}
                      onClick={handleSave}
                    />
                  </SpeedDial>
                )}
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
                    <FormLabel
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      Schedule
                      <InfoRedirect states={{ tabIndex: 3, pageIndex: 3 }} />
                    </FormLabel>
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
                        {/* https://reactrouter.com/en/main/components/link#state */}

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
                              label="Age"
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
                              postData.preset
                                ? datesOptions[postData.preset.day - 1]
                                : datesOptions[0]
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
                    </Box>
                  )}
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
                {showFinalButtons && <FinalButtons />}
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
                  <Divider sx={{ m: 2 }} />
                  <Box
                    sx={{
                      minWidth: 120,
                      margin: "2rem 0",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <FormControlLabel
                        // sx={{ marginRight: 2 }}
                        disabled={!editDisabled}
                        value="start"
                        control={
                          <Switch defaultChecked={postData.autoSaveMS} />
                        }
                        label="Auto Update"
                        labelPlacement="start"
                        onChange={(event) => {
                          const selection = event.target.checked;
                          // TODO: do nothing if its the same as the one in postData?
                          if (selection) {
                            setUpdatedObj((prevObj) => ({
                              ...prevObj,
                              autoSaveMS: 120000,
                            }));
                          } else {
                            setUpdatedObj((prevObj) => ({
                              ...prevObj,
                              autoSaveMS: 0,
                            }));
                          }
                          saveDisabled && setSaveDisabled(false);
                        }}
                      />
                      <FormControl
                        // disabled={!editDisabled || !updatedObj.autoSaveMS}
                        disabled
                      >
                        <InputLabel id="demo-simple-select-label">
                          Every
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={120000}
                          label="Every"
                          // onChange={(event) => {
                          //   setUpdatedObj((prevObj) => ({
                          //     ...prevObj,
                          //     autoSaveMS: event.target.value,
                          //   }));
                          //   saveDisabled && setSaveDisabled(false);
                          // }}
                          onChange={updateValueOf("autoSaveMS")}
                        >
                          <MenuItem value={30000} disabled>
                            30 second
                          </MenuItem>
                          <MenuItem value={60000} disabled>
                            1 minute
                          </MenuItem>
                          <MenuItem value={120000}>2 minute</MenuItem>
                          <MenuItem value={300000}>5 minute</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <FormControlLabel
                      sx={{ marginRight: 2 }}
                      disabled
                      value="start"
                      control={<Switch defaultChecked={false} />}
                      label="Live Update"
                      labelPlacement="start"
                    />
                  </Box>

                  <Divider sx={{ m: 2 }} />
                  <FormControl
                    sx={{ m: 1, marginLeft: 2 }}
                    disabled={!editDisabled}
                  >
                    <FormLabel
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      Post Type
                      <InfoRedirect states={{ tabIndex: 3, pageIndex: 3 }} />
                    </FormLabel>
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
                  <Divider sx={{ m: 2 }} />
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
                {showFinalButtons && <FinalButtons />}
              </CustomTabPanel>
            </div>
            <LinkAdder
              open={linkAdderOpen}
              handleClose={handleLinkAdderClose}
              info={id}
            />
            <Diary
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
  padding-bottom: 0rem;
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
    text-align: start;
    /* background-color: red; */
  }

  .sidebar {
    display: flex;
    gap: 4rem;
    flex-direction: column;

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

    section {
      z-index: 1;
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
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.15);
        text-decoration: none;
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
        background-color: rgba(255, 255, 255, 0.25);
      }
      .postTitles {
        border-radius: 0;
      }
    }

    .otherPosts {
      /* max-height: 30rem;
      overflow-y: scroll;
      overflow-x: hidden; */
    }

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
      z-index: 0;
      pointer-events: none;
    }
    .box2 {
      padding: 30rem;
      background: rgba(45, 45, 45, 0.5);
      position: absolute;
      top: 550px;
      left: -500px;
      transform: rotate(45deg);
      z-index: 0;
      pointer-events: none;
    }
  }

  @media screen and (max-width: 1000px) {
    padding-left: 0;
    padding-top: 6rem;

    .sidebar {
      align-items: center;
      justify-content: space-around;
      flex-direction: row-reverse;
      width: 100vw;
      min-height: 0;
      height: 4rem;
      padding-top: 0;
      gap: 0;

      .components {
        flex-direction: row;

        .add {
          background-color: black;
        }
        p {
          display: none;
        }
        .icon {
          padding: 0.5rem;
        }
      }

      .otherPosts {
        max-width: 50vw;
        overflow-y: hidden;
        overflow-x: scroll;
      }

      .otherPosts::-webkit-scrollbar {
        display: none;
      }

      .otherPosts {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      .title {
        display: none;
      }
      .box1 {
        display: none;
      }
      .box2 {
        display: none;
      }

      .postTitles {
        p {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 6rem;
          overflow: hidden;
          /* white-space: nowrap; */
          text-overflow: ellipsis;
        }
      }
      /* .postTitles:hover {
        background-color: rgba(238, 238, 238, 0.25);
      } */
    }
  }

  .tabs {
    margin-top: 1rem;
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
    position: relative;
    /* margin-bottom: 1rem; */
  }

  .buttons {
    background-color: rgba(150, 150, 150, 0.06);
    /* border-radius: 10px; */
    /* border: 1px solid #eee; */
    margin: 2rem;
    text-align: center;
    position: relative;
    .classicBtn {
      margin: 1rem;
    }
    .classicBtn:hover {
      margin: 1rem;
      letter-spacing: 2px;
      padding: 1.5rem 2.5rem;
    }
    .closeBtn {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
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
      cursor: pointer;
      background: none;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: 0.3s;
    }
    .delete {
      background-color: tomato;
      color: white;
      border: none;
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
