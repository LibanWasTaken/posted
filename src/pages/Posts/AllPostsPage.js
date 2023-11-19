import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Spinner3 } from "../../components/Spinner";
import Card from "../../components/PostCard";
import { Skeleton, TextField, Tooltip } from "@mui/material";
import dayjs from "dayjs";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../services/firebase-config";

export default function AllProductPage() {
  const [posts, setPosts] = useState();
  const [countPosts, setCountPosts] = useState(4);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortType, setSortType] = useState("desc");
  const [filtering, setFiltering] = useState(false);

  async function getFSData() {
    const queryReceived = query(
      collection(db, `/posts`),
      orderBy("releaseDate", sortType),
      limit(countPosts)
    );
    // const queryReceived = query(collection(db, `/posts`), limit(countPosts));
    const querySnapshot = await getDocs(queryReceived);
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
    getFSData();
  }, [sortType, countPosts]);

  // if (posts) {
  //   setPosts((prevPosts) => [...prevPosts, ...postsData]);
  // } else {
  //   setPosts(postsData);
  // }

  function handleLoadMore() {
    runLoadingBar();
    setLoadingMore(true);
    setCountPosts((prevCount) => prevCount + 2);
    getFSData();
  }

  function handleSort() {
    runLoadingBar();

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
            releaseDate={post.releaseDate}
            description={post.description}
            user={post.anonymity ? "Anonymous" : post.user}
            className="post"
          />
        );
      }
      return null;
    });
  }

  return (
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
                filter: "saturate(0)",
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

            <p>Lorem ipsum dolor sit amet.</p>

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
          </div>
        </section>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  margin: 2rem 0;

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
      flex-direction: row;
      gap: 1rem;
      align-items: center;
      height: 4rem;
      width: 100%;
    }
  }
  @media screen and (max-width: 1420px) {
    /* flex-direction: column; */

    .posts {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }
  @media screen and (max-width: 1120px) {
    .posts {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 820px) {
    .posts {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
