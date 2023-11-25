import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Spinner3 } from "../../components/Spinner";
import Card from "../../components/PostCard";
import { db } from "../../services/firebase-config";

import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import dayjs from "dayjs";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Skeleton, TextField, Tooltip, Button, Box } from "@mui/material";

//TODO: bui this thing..: import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DatePicker } from "@mui/x-date-pickers";

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
});

export default function AllProductPage() {
  const [posts, setPosts] = useState();
  const [countPosts, setCountPosts] = useState(10);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortType, setSortType] = useState("desc");
  const [filtering, setFiltering] = useState(false);
  const [selectedDate1, setSelectedDate1] = useState();
  const [selectedDate2, setSelectedDate2] = useState();

  async function getFSData() {
    let dateRangeQuery = query(
      collection(db, "/posts"),
      orderBy("releaseDate", sortType),
      limit(countPosts)
    );

    if (selectedDate1) {
      console.log(dayjs(selectedDate1).format("DD, MMM, YYYY"));
      dateRangeQuery = query(
        dateRangeQuery,
        where("releaseDate", ">=", selectedDate1)
      );
    }

    if (selectedDate2) {
      console.log(dayjs(selectedDate2).format("DD, MMM, YYYY"));
      dateRangeQuery = query(
        dateRangeQuery,
        where("releaseDate", "<=", selectedDate2)
      );
    }
    // const queryReceived = query(collection(db, `/posts`), limit(countPosts));
    const querySnapshot = await getDocs(dateRangeQuery);
    const postsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPosts(postsData);
    setLoading(false);
    setLoadingMore(false);
  }

  function runLoadingBar() {
    setFiltering(true);
    setTimeout(() => {
      setFiltering(false);
    }, 2010);
  }

  useEffect(() => {
    posts && runLoadingBar();
    getFSData();
  }, [sortType, countPosts, selectedDate1, selectedDate2]);

  function handleLoadMore() {
    setLoadingMore(true);
    setCountPosts((prevCount) => prevCount + 2);
    getFSData();
  }

  function handleSort() {
    console.log("switching");
    if (sortType == "asc") {
      setSortType("desc");
    } else {
      setSortType("asc");
    }
  }

  function generateCards(posts) {
    return Object.values(posts).map((post) => {
      if (true) {
        // TODO: change true -> post.public
        return (
          <Card
            key={post.id}
            postTitle={post.title}
            postID={post.id}
            displayName={post.displayName}
            uid={post.user}
            releaseDate={post.releaseDate}
            description={post.description}
            anonymity={post.anonymity}
            // user={post.anonymity ? "Anonymous" : post.displayName || post.user}
            className="post"
          />
        );
      }
      return null;
    });
  }

  const handleDateChange1 = (date) => {
    const dateSet = date.valueOf();
    console.log(dateSet, dateSet && dateSet !== "invalidDate");
    if (dateSet && dateSet !== "invalidDate") {
      setSelectedDate1(dateSet);
    } else {
      setSelectedDate1();
    }
  };
  const handleDateChange2 = (date) => {
    const dateSet = date.valueOf();
    console.log(dateSet, dateSet && dateSet !== "invalidDate");
    if (dateSet && dateSet !== "invalidDate") {
      setSelectedDate2(dateSet);
    } else {
      setSelectedDate2();
    }
  };
  const handleError = (newError) => {
    console.log(newError);
  };

  const handleRangeToday = () => {
    const today = dayjs().valueOf();
    setSelectedDate1(today);
    setSelectedDate2(today);
  };
  const handleResetRange = () => {
    setSelectedDate1();
    setSelectedDate2();
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        {loading ? (
          <Spinner3 />
        ) : (
          <section>
            {filtering && <div className="loadingBar"></div>}

            <div className="filter">
              <h2>Filter</h2>
              <p>Search</p>
              <TextField
                label="Posts Count"
                variant="standard"
                type="number"
                sx={{
                  m: 1,
                  width: "10ch",
                  marginBottom: 3,
                }}
                defaultValue={countPosts}
                inputProps={{
                  min: 4,
                  max: 500,
                }}
                onChange={(e) => {
                  const count = e.target.value;
                  if (count && count > 3 && count < 501) {
                    setCountPosts(Math.round(count));
                  }
                }}
              />
              <DatePicker
                label="From"
                // minDate={tomorrow}
                value={selectedDate1 ? dayjs(selectedDate1) : null}
                onChange={handleDateChange1}
                onError={handleError}
                sx={{ margin: "0.5rem 0", width: "20ch" }}
                views={["year", "month", "day"]}
              />
              <DatePicker
                label="To"
                // minDate={tomorrow}
                value={selectedDate2 ? dayjs(selectedDate2) : null}
                onChange={handleDateChange2}
                onError={handleError}
                sx={{ margin: "0.5rem 0", width: "20ch" }}
                views={["year", "month", "day"]}
              />
              <Box>
                <Button onClick={handleRangeToday}>Today</Button>
                <Button onClick={handleResetRange}>Reset</Button>
              </Box>
              {/* 
            <DateRangePicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
            /> */}
              {/* https://codesandbox.io/s/competent-wescoff-759vfm?file=/src/App.tsx */}

              <div className="layout">
                <div></div>
                <div></div>
              </div>
              <Tooltip
                title={`Sort by ${
                  sortType == "asc" ? "Newest First" : "Oldest First"
                }`}
                placement="top"
                arrow
              >
                <div className="sort" onClick={handleSort}>
                  <span className="material-symbols-outlined">sort</span>
                </div>
              </Tooltip>
            </div>
            <div className="posts">
              {/* <Skeleton
              // sx={{ bgcolor: "black" }}
              variant="rectangular"
              width={280}
              height={360}
              animation="wave"
            />*/}

              {/* {generateCards(posts)} */}
              {generateCards(posts)}
              {posts && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className={`classicBtn loadMorBtn ${
                      loadingMore && "disabledClassicBtn"
                    }`}
                    onClick={handleLoadMore}
                  >
                    {loadingMore ? "Loading More.." : "Load More.."}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </Wrapper>
    </ThemeProvider>
  );
}

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  overflow-x: hidden;

  section {
    display: flex;
    /* align-items: center; */
    justify-content: center;
    gap: 5rem;
    flex-direction: row-reverse;
    /* overflow: hidden; */
  }

  .loadingBar {
    position: fixed;
    top: 0;
    /* left: 0; */
    background-color: black;
    animation: load ease-in-out 2s;
    width: 100vw;
    overflow: hidden;
    padding: 2px 0;
    opacity: 0;
    box-shadow: 0 0 5px white;
    z-index: 1;
  }
  @keyframes load {
    0% {
      width: 0vw;
      /* padding: 2px 0; */
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    /* 95% {
      padding: 0px 0;
    } */
    100% {
      width: 100vw;
      /* padding: 0px 0; */
      opacity: 0;
    }
  }

  .filter {
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;
    padding: 2rem;
    height: 50vh;
    background-color: whitesmoke;
    width: 15rem;
    position: relative;

    .sort {
      transform: scaleX(-1);
      padding: 10px;
      background-color: #eee;
      cursor: pointer;
    }

    .sort:hover {
      background-color: #ddd;
    }
  }

  .posts {
    display: grid;
    /* grid-template-columns: repeat(5, 1fr); */
    align-items: center;
    justify-content: center;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;

    /* width: 80vw; */
  }

  .post {
  }

  .loadMorBtn {
    width: 10rem;
    text-align: center;
  }

  /* @media screen and (max-width: 1620px) {
    .posts {
      grid-template-columns: repeat(4, 1fr);
    }
  } */
  @media screen and (max-width: 1669px) {
    section {
      flex-direction: column;
      gap: 2rem;
    }

    .loadingBar {
      /* background-color: red; */
      left: 0;
    }

    .filter {
      h2 {
        display: none;
      }
      flex-direction: row;
      gap: 1rem;
      align-items: center;
      height: min-content;
      padding: 1rem;
      width: 100%;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
  @media screen and (max-width: 1420px) {
    /* flex-direction: column; */

    .posts {
      display: flex;
      flex-wrap: wrap;

      gap: 1rem;
    }
  }
  /* @media screen and (max-width: 1120px) {
    .posts {
      display: flex;
      flex-wrap: wrap;

      gap: 1rem;
    }
  } */
  @media screen and (max-width: 930px) {
    .posts {
      /* flex-direction: column; */
    }
  }
`;
