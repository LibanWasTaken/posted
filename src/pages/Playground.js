import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Card from "components/PostCard";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function generateCards(posts, filtered = false) {
  return Object.values(posts).map((post) => {
    if (post) {
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
          className={`post ${filtered && "filtered"}`}
        />
      );
    } else {
      return null;
    }
  });
}

const dummyPosts = [
  {
    preset: { day: 1, timePeriod: "Month" },
    anonymity: false,
    title: "mmmmmmmmmmmmmmmmmmmm",

    likes: ["gHJGsv0uqAcC4FBnrWPcTCA7wz32"],
    scheduleType: "One Time",
    description: "mmmmmmmmmmmmmmmmmmmmmmmm",
    releaseDate: "Thu, 30 Nov 2023 03:00:00 GMT",
    public: true,
    user: "L1uljY8hgdZ9wnLovjJJuCr2sN63",
    id: "Gnp5f7c23SNgPWuBKyCK",
  },
  {
    anonymity: true,
    releaseDate: "Sun, 01 Oct 2023 18:00:00 GMT",
    letter:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"HELLo","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    displayName: "rbeh",
    likes: ["gHJGsv0uqAcC4FBnrWPcTCA7wz32"],
    description: "still no clue what im doing brah, yet again",
    timestamp: 2693152800000,
    mail2: "display?",
    user: "L1uljY8hgdZ9wnLovjJJuCr2sN63",
    links: [
      { primary: "yt", secondary: "youtube.com" },
      { secondary: "https://www.youtube.com/", primary: "yotube" },
      { secondary: "gethti", primary: "anotho" },
      { primary: "wt thisi", secondary: "anoths" },
      { primary: "MOREE", secondary: "asd" },
      { secondary: "ofc", primary: "MOROIErO" },
      { primary: "i aint stoppping", secondary: "asdads" },
      { secondary: "heh", primary: "1 more" },
      { primary: "anotha why note", secondary: "bla bla" },
      { primary: "moreeee", secondary: "hheheh" },
    ],
    mail1: "test1@gmail.com",
    preset: { day: 1, timePeriod: "Month" },
    disabled: true,
    title: "test5 disabled",
    id: "9NTgKaiCKeoE4rWUgcOd",
  },
  {
    description: "wubba lubba dub dub",
    dateCreated: 1703242545120,
    delayDuration: "Year",
    likes: ["gHJGsv0uqAcC4FBnrWPcTCA7wz32"],
    warnDuration: "7",
    title: "snowman metled",
    scheduleFormat: "Preset",
    scheduleType: "Recurring",
    preset: { timePeriod: "Year", day: 1 },
    releaseDate: 4102423140000,
    displayName: "espi",
    user: "twDnrNXMO0gFnKZasRBd3bLGHIc2",
    id: "efyDsuHH3cVMq3qC2KB0",
  },
  {
    warnDuration: "7",
    dateCreated: 1700064937831,
    autoSaveMS: 120000,
    releaseDate: 2399652000000,
    title: "example 1",
    links: [{ secondary: "a", primary: "asdasd" }],
    user: "gHJGsv0uqAcC4FBnrWPcTCA7wz32",
    scheduleType: "Recurring",
    displayName: "yelo",
    description: "anotha examply yk",
    scheduleFormat: "Preset",
    letter:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"asdasdasdasdasdasdads","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"altText":"","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAaVBMVEX4hyn4hyj////4ghj4fgD4hSL4gxz4fAD4gRL/+fX4gAz+9e/93cr3eQD7uI37tYf95db8y6z94dD807r6qnT5nVr7xqT5n1/6rnv5mE/7wZ34jzv5omX8z7L92cP6pmz+7OD4kkT4izLE/Yr/AAACPElEQVRYhe2U65KbMAyFsWz5igFzMXdC8v4PWZvAtuk0M+1uOpsfnBkCscWHJB87SU6dekOR707g1KlTp6LIofvTlzF/oSM63r/C+TP7NZwP0vasGRXymKAJfYzk/CkE5Qdq+7uAAreTeAb5w5vSqGckbRw9sgq/rDRStJUmXGqJ2JQNUs6lxECVFLVRVIZ4pBguTihHiTQCOKsqESLIvgoIhQ2ThHfVMl95n/U41JdqHlHnlWuEUaMbkF/8FUdf86Huq2kYAqdu5luM2EhbgrB2jGMLPlcQSssQIJ3B2KWovbIGihKMcHChDSwUjFJ+CfVr1du0rJ3ROwgbBWBqeSPWztCGHsUcbQEElsSyUJqwC3R+A1UyMAXvQ8RlZQwqYhnZQYTTfAWYWLuU6gAxVgAWAGttQ7NpDj6C+ggqBCFihVua83CD9UIPEBJufagLZul+Bd3oYADGAOIdZA+gMOBM6A31MQL30nrGZQ91CSjuILKDuBATtEbJMD56mHQDM91AhCmYQ2/Qig76HSSh7Dq1igyqbistS+4gvs6Th5D+pYOBXaFsU7gSWCNIDvF9YdzkNpvF9cfepUvOiO4W3/pr4xsy5JznA+nndE5QZunSBpeNfnEjj3PR7YkRcZ2q1BE8LIlU60iN9qMYjUdjLA07QEe7UR3NGcI288U5MkzF5v8Y8XPHPd1KzwWh1oeBTx4BqMVvO/vVh8nLjrcvoj57yr9Sb5HEqWd6++X5jgT/6Ztv38FTp079d/0AMiYhKrPMaaMAAAAASUVORK5CYII=","type":"image","version":1,"width":0}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    preset: { day: 1, timePeriod: "Month" },
    id: "l2sA4xcPLyaJuTglTxUV",
  },
  {
    title: "post 2",
    releaseDate: 2128759860000,
    dateCreated: 1703397665229,
    user: "twDnrNXMO0gFnKZasRBd3bLGHIc2",
    id: "ROxnFCDeEqsmQciVwwTB",
  },
  {
    dateCreated: 1702895610831,
    releaseDate: 1714123080000,
    description: "sami nami an",
    likes: ["twDnrNXMO0gFnKZasRBd3bLGHIc2"],
    delayDuration: "Week",
    displayName: "Liban M.R.",
    letter:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"normal ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"font-family: Arial;","text":"ultra normal","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"font-family: Georgia;","text":"giga normal","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"font-family: Trebuchet MS;","text":"beta normal","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    user: "gHJGsv0uqAcC4FBnrWPcTCA7wz32",
    scheduleType: "Recurring",
    preset: { day: 1, timePeriod: "Month" },
    title: "newest exampl",
    scheduleFormat: "Preset",
    id: "tHW6houShrlbw9NoT9CK",
  },
];

const Playground = () => {
  const handleClick = () => {
    // ShowAlert("Custom error message", 5000);
  };

  return (
    <Wrapper>
      <div className="filtering">
        <div className="filter">
          <div className="container">
            <h3>Filter</h3>
            <p>blablas as da sd a</p>
            <p>blablas as da sd a</p>
            <p>blablas as da sd a</p>
            <p>blablas as da sd a</p>
            <div className="search"></div>
            <div className="search"></div>
            <div className="search"></div>
          </div>
        </div>
        <div className="filteredPosts">
          <div className="post">
            <div className="heading">
              <p className="title">test5 disabled</p>
              <p className="date">02 Oct, 2023</p>
            </div>
            <p className="description">
              still no clue what im doing brah, yet again asdadasd asda sdasd
              asdasda dasd fasdasdm doing brah, yet again asdadasd asda sdasd
              asdasda dasd fasdasdm doing brah, yet again asdadasd asda sdasd
              asdasda dasd fasdasdm doing brah, yet again asdadasd asda sdasd
              asdasda dasd fasdasdm doing brah, yet again asdadasd asda sdasd
              asdasda dasd fasdasd
            </p>
            <div className="user">- espi</div>
          </div>
          <div className="post"></div>
          <div className="post"></div>
          <div className="post"></div>
          <div className="post"></div>
          {/* {generateCards(dummyPosts, true)} */}
        </div>
      </div>

      <div className="allPostsHeader">
        <h2>New Posts</h2>
        <div className="buttons">
          <p>x</p>
          <p>o</p>
        </div>
      </div>
      <div className="allPosts">
        <div className="post"></div>
        <div className="post"></div>
        <div className="post"></div>
        <div className="post"></div>
        <div className="post"></div>
        <div className="post"></div>
        <div className="post"></div>
        <div className="post"></div>
        {/* {generateCards(dummyPosts)} */}
      </div>
      <div className="testGrid"></div>

      {/* <Box sx={{ width: 500, height: 450, overflowY: "scroll" }}> */}
      <ImageList variant="masonry" cols={3} gap={8}>
        <ImageListItem>
          <div className="posttest">asdasd</div>
        </ImageListItem>
        <ImageListItem>
          <div className="posttest2">asdasd</div>
        </ImageListItem>
        <ImageListItem>
          <div className="posttest">asdasd</div>
        </ImageListItem>
        <ImageListItem>
          <div className="posttest2">asdasd</div>
        </ImageListItem>
        <ImageListItem>
          <div className="posttest">asdasdffff</div>
        </ImageListItem>
        <ImageListItem>
          <div className="posttest2"></div>
        </ImageListItem>
        <ImageListItem>
          <div className="posttest"></div>
        </ImageListItem>
        <ImageListItem>
          <div className="posttest2"></div>
        </ImageListItem>
        <ImageListItem>
          <div className="posttest"></div>
        </ImageListItem>
        <ImageListItem>
          <div className="posttest2"></div>
        </ImageListItem>
      </ImageList>
      {/* </Box> */}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  /* background-color: whitesmoke; */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .posttest {
    background-color: red;
    height: 15rem;
    width: 15rem;
  }
  .posttest2 {
    background-color: blue;
    height: 17rem;
    width: 15rem;
  }

  .filtered {
    /* border: 1px solid red; */
  }

  .filtering {
    margin: 2rem;
    /* border: 1px solid red; */
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    padding: 1rem;
    border-radius: 10px;
    height: 35rem;
    width: 90vw;
    display: flex;
    /* justify-content: space-between; */
    /* box-sizing: border-box; */

    .filter {
      width: 20%;
      max-width: 20%;
      min-width: 13rem;
      height: 100%;
      border-right: 1px solid #ccc;
      font-size: larger;
      .search {
        border: 1px solid black;
        height: 3rem;
        width: 80%;
        margin: 1rem;
        margin-left: 0;
      }
      .container {
        display: block;
        padding: 1rem 1rem 0 2rem;
      }
    }
  }

  .filteredPosts {
    width: 80%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 1rem;
    overflow: scroll;
    padding-left: 2rem;
    position: relative;

    .post {
      background-color: whitesmoke;
      min-width: 18rem;
      width: 18rem;
      height: 23rem;
      min-height: 23rem;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      .heading {
        /* border: 1px solid red; */
      }
      .title {
        font-size: 2rem;
        margin: 0;
        padding: 0;
        font-weight: 600;
      }
      .date {
        font-size: 1rem;
        margin-top: 0.5rem;
        padding: 0;
        font-weight: 500;
      }
      .description {
        /* border: 1px solid blue; */
        border: 1px solid blue;
        font-weight: 600;
        flex-grow: 1;
        margin: 0;
        font-size: 1.15rem;
        max-width: 90%;
        overflow: hidden;
      }
      .user {
        /* border: 1px solid orange; */
      }
    }

    .post:hover {
      background-color: #f1f1f1;
      transition: 0.3s;
      cursor: pointer;
    }
  }

  .allPostsHeader {
    display: flex;
    justify-content: space-between;
    width: 80vw;
    align-items: center;
    margin-top: 2rem;
    .buttons {
      display: flex;
    }
  }

  .allPosts {
    /* border: 1px solid blue; */
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    width: 85vw;
    min-height: 20rem;
    margin-top: 0;
    margin-bottom: 5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .post {
      background-color: whitesmoke;
      min-height: 9rem;
      width: 100%;
      min-width: 50rem;
    }
  }

  @media screen and (max-width: 1300px) {
    .filtering {
      width: 95vw;
      height: 50rem;
      flex-direction: column;
      .filter {
        /* display: none; */

        width: 100%;
        max-width: 100%;
        height: 10rem;
        .container {
          display: flex;
          h3 {
            display: none;
          }
        }
      }
      .filteredPosts {
        /* border: 1px solid red; */
        width: 100%;
        padding: 0;
        padding-top: 1rem;
        .post {
          width: 100%;
          height: 6rem;
          min-width: 18rem;
          min-height: 1rem;

          display: flex;
          align-items: center;
          flex-direction: row;
          position: relative;
          .heading {
            max-width: 20%;
            white-space: nowrap;
            /* overflow: hidden; */
            text-overflow: ellipsis;
          }
          .date {
            margin-bottom: 0;
          }
          .description {
            flex-grow: 0;
            position: absolute;
            right: 1rem;
            margin-bottom: 1.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 60%;
            white-space: nowrap;
            text-align: right;
          }
          .user {
            position: absolute;
            right: 1rem;
            margin-top: 1.5rem;
          }
        }
      }
    }

    .allPosts {
      /* border: 1px solid blue; */
      width: 95vw;
      min-height: 20rem;
      margin-top: 0;
      margin-bottom: 5rem;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      /* justify-content: center; */
      padding: 1rem;
      gap: 1rem;
      .post {
        display: block;
        background-color: whitesmoke;
        /* border: 1px solid red; */
        width: 18rem;
        min-width: 18rem;
        height: 23rem;
      }
    }
  }
`;

export default Playground;
