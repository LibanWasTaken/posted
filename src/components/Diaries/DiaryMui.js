import React, { useState, useEffect, forwardRef, Fragment } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Dialog,
  ListItemText,
  ListItem,
  List,
  Divider,
} from "@mui/material";

import Slide from "@mui/material/Slide";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import DiaryPNG from "./../../assets/DiaryPNG.png";
import DiaryPage from "./DiaryPage";

import dayjs from "dayjs";
import { db } from "../../services/firebase-config";
import { collection, query, getDocs, orderBy } from "firebase/firestore";

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
  // shadows: Array(25).fill('none')
});
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function renderListItems(data) {
  return data.map((item, index) => (
    <Fragment key={index}>
      <ListItem button>
        <ListItemText
          primary={
            item.primary || dayjs(item.timestamp).format("ddd, DD MMM, YYYY")
          }
          secondary={item.secondary || item.title}
        />
      </ListItem>
      <Divider />
    </Fragment>
  ));
}

export default function Diary({ open, handleClose, info, editable = true }) {
  const arrExample = [
    {
      primary: "09 Dec, 2021",
      secondary: "and then this happened",
      value: "chicken",
    },
    { primary: "25 Aug, 2022", secondary: "that was wild", value: "chicken" },
    {
      primary: "14 Feb, 2023",
      secondary: "we celebrated love",
      value: "chicken",
    },
    {
      primary: "07 Oct, 2022",
      secondary: "exploring new horizons",
      value: "chicken",
    },
    { primary: "30 May, 2023", secondary: "making memories", value: "chicken" },
    {
      primary: "18 Jul, 2022",
      secondary: "a day to remember",
      value: "chicken",
    },
    {
      primary: "12 Nov, 2022",
      secondary: "embracing change",
      value: "chicken",
    },
    {
      primary: "02 Apr, 2023",
      secondary: "finding inspiration",
      value: "chicken",
    },
    {
      primary: "22 Sep, 2022",
      secondary: "adventure awaits",
      value: "chicken",
    },
    { primary: "03 Mar, 2023", secondary: "chasing dreams", value: "chicken" },
    { primary: "11 Jan, 2022", secondary: "creating art", value: "chicken" },
    { primary: "28 Jun, 2022", secondary: "summer vibes", value: "chicken" },
    {
      primary: "09 Oct, 2023",
      secondary: "a new chapter begins",
      value: "chicken",
    },
    {
      primary: "15 May, 2022",
      secondary: "sunny days ahead",
      value: "chicken",
    },
    {
      primary: "19 Apr, 2023",
      secondary: "exploring the unknown",
      value: "chicken",
    },
    {
      primary: "05 Jul, 2022",
      secondary: "music in the air",
      value: "chicken",
    },
    {
      primary: "27 Feb, 2023",
      secondary: "finding inner peace",
      value: "chicken",
    },
    {
      primary: "08 Sep, 2022",
      secondary: "journey to happiness",
      value: "chicken",
    },
    {
      primary: "24 Mar, 2023",
      secondary: "inspiration strikes",
      value: "chicken",
    },
    {
      primary: "01 Dec, 2022",
      secondary: "new adventures await",
      value: "chicken",
    },
    {
      primary: "16 Aug, 2023",
      secondary: "making a difference",
      value: "chicken",
    },
    { primary: "10 Apr, 2022", secondary: "wandering souls", value: "chicken" },
    {
      primary: "23 Jan, 2023",
      secondary: "a world of possibilities",
      value: "chicken",
    },
    {
      primary: "06 Jun, 2022",
      secondary: "exploring the outdoors",
      value: "chicken",
    },
    {
      primary: "29 Nov, 2022",
      secondary: "embracing the moment",
      value: "chicken",
    },
    {
      primary: "20 Jul, 2023",
      secondary: "building connections",
      value: "chicken",
    },
    {
      primary: "13 Mar, 2022",
      secondary: "finding beauty in simplicity",
      value: "chicken",
    },
    {
      primary: "04 Oct, 2023",
      secondary: "adventures on the horizon",
      value: "chicken",
    },
    {
      primary: "21 May, 2022",
      secondary: "journey of self-discovery",
      value: "chicken",
    },
    {
      primary: "17 Feb, 2023",
      secondary: "chasing the sunset",
      value: "chicken",
    },
    {
      primary: "26 Sep, 2022",
      secondary: "capturing memories",
      value: "chicken",
    },
  ];
  const [pageAdderOpen, setPageAdderOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [diaryPages, setDiaryPages] = useState(false);
  const { id } = useParams();

  const handlePageAdderOpen = () => {
    setPageAdderOpen(true);
  };
  const handlePageAdderClose = () => {
    setPageAdderOpen(false);
  };

  async function getFSData() {
    setLoading(true);
    // TODO: Limit
    const queryReceived = query(
      collection(db, `/posts/${id}/diary/`),
      orderBy("timestamp", "desc")
    );
    // const queryReceived = query(
    //   collection(db, `/posts`),
    //   orderBy("releaseDate", sortType),
    //   limit(countPosts)
    // );
    const querySnapshot = await getDocs(queryReceived);
    const diaryDocs = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(diaryDocs);
    setDiaryPages(diaryDocs);
    // setLastPost(querySnapshot.docs[querySnapshot.docs.length - 1]);\
    setLoading(false);
  }

  useEffect(() => {
    getFSData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Wrapper>
          <div className="nav">
            <div>
              <span
                className="btnIcon material-symbols-outlined"
                onClick={handleClose}
              >
                close
              </span>
              <p>Diary</p>
            </div>
            {editable && (
              <span
                className="btnIcon material-symbols-outlined"
                onClick={handlePageAdderOpen}
              >
                add
              </span>
            )}
          </div>
          <section className="list">
            <Box style={{ maxHeight: "80vh", overflow: "auto" }}>
              {diaryPages && <List>{renderListItems(diaryPages)}</List>}
              <List>{renderListItems(arrExample)}</List>
            </Box>
          </section>
          {/* <img src={ExamsSVG} alt="ExamsSVG" className="ExamsSVG" /> */}
          <img
            src={DiaryPNG}
            alt="Transparent Notebook Paper Png"
            className="DiaryPNG imgLoad"
            onLoad={(e) => {
              e.target.classList.add("imgLoaded");
            }}
          ></img>
        </Wrapper>
      </Dialog>
      <DiaryPage open={pageAdderOpen} handleClose={handlePageAdderClose} />
    </ThemeProvider>
  );
}

const Wrapper = styled.main`
  /* display: flex;
  align-items: center;
  justify-content: centre; */
  .nav {
    background-color: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 2rem;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      p {
        margin-left: 2rem;
        letter-spacing: 1px;
        font-size: 1.5rem;
      }
    }

    .btnIcon {
      font-size: 2rem;
      user-select: none;
      padding: 2px;
    }
    .btnIcon:hover {
      cursor: pointer;
      transition: 0.3s;
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 50%;
      transform: rotate(90deg);
    }
  }

  .list {
    padding: 1rem 2rem;
    /* border: 1px solid red; */
    overflow: scroll;
  }

  .ExamsSVG {
    filter: saturate(0);
    height: 250px;
    position: absolute;
    bottom: 0;
    right: 10rem;
    opacity: 0.75;
  }
  .DiaryPNG {
    position: absolute;
    bottom: 0;
    right: 5rem;
    opacity: 0.1;
    height: 100vh;
    pointer-events: none;
  }
  height: 100vh;
  overflow: hidden;
`;
