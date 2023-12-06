import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";

import { Parallax } from "react-scroll-parallax";

function Card({
  postTitle,
  postID,
  displayName,
  releaseDate = "Sun, 01 Oct 2023 18:00:00 GMT",
  description,
  uid,
  user,
  anonymity,
}) {
  const formattedDate = dayjs(releaseDate, {
    format: "ddd, DD MMM YYYY HH:mm:ss [GMT]",
  }).format("DD MMM, YYYY");

  const getRandomSentence = () => {
    const words = [
      "Lorem",
      "ipsum",
      "dolor",
      "sit",
      "amet",
      "consectetur",
      "adipisicing",
      "elit",
      "Fugiat",
      "accusantium",
      "dolore",
      "in",
      "magnam",
      "tempore",
      "Repudiandae",
      "iste",
      "nostrum",
      "omnis",
      "consequatur",
      "autem",
      "possimus",
      "Cupiditate",
      "wire",
      "tail",
      "reasonable",
      "camp",
      "heroin",
      "stall",
      "duke",
      "harmful",
      "reflect",
      "notice",
      "avenue",
      "television",
      "conscience",
      "space",
      "linger",
      "tire",
      "safe",
      "fish",
      "explosion",
      "square",
      "explicabo",
      "natus",
      "nihil",
      "Quaerat",
      "facilis",
      "quidem",
      "ab",
      "maxime",
      "Lorem",
      "ipsum",
      "dolor",
      "sit",
      "amet",
      "consectetur",
      "adipisicing",
      "elit",
      "Fugiat",
      "accusantium",
    ];
    const minWordCount = 0; // Minimum word count
    const maxWordCount = 20; // Maximum word count
    const wordCount =
      Math.floor(Math.random() * (maxWordCount - minWordCount + 1)) +
      minWordCount;
    let sentence = "";
    for (let i = 0; i < wordCount; i++) {
      const randomWordIndex = Math.floor(Math.random() * words.length);
      sentence += words[randomWordIndex] + " ";
    }
    return sentence.trim(); // Remove trailing space
  };

  const getRandomName = () => {
    const names = [
      "Alice ",
      "Bob Smith",
      "Charlie Brown",
      "David Lee",
      "Emma Davis",
      "Frank Johnson",
      "Grace R. Smith",
      "Helen Brown",
      "Ivy Lee",
      "Jack ",
      "Kate",
      "Sarah Lynn",
      "Liam Smith",
      "Mia Brown",
      "Noah Lee",
      " Davis",
      "Peter Johnson",
      "Quinn Smith",
      "Rachel Brown",
      "Sam M. Lee",
      "Tom Davis",
    ];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  };

  // const randomTilt = Math.random() * 10 - 5;
  const randomTilt = 0;

  return (
    <Wrapper>
      <Link
        to={postID}
        style={{
          textDecoration: "none",
          transform: `rotate(${randomTilt}deg)`,
        }}
      >
        {/* <Parallax translateX={["-10%", 0]}> */}
        <div className="card2" style={{}}>
          <div className="group group">
            <p className="title">{postTitle || "title"}</p>
            <p className="release">{formattedDate}</p>
          </div>
          <div className="group group2">
            <h4 className="description">
              {/* {description || getRandomSentence()} */}
              {description}
            </h4>
            {anonymity == "Anonymous" ? (
              <p className="userName">- Anonymous </p>
            ) : (
              <div className="userNameContainer">
                <Link
                  to={`/user/${uid}`}
                  style={{
                    textDecoration: "none",
                    // display: "flex",
                    // alignItems: "center",
                    // justifyContent: "end",
                  }}
                >
                  <p className="userName"> - {displayName || uid} </p>
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* </Parallax> */}
      </Link>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  /* filter: invert(1); */
  .card2 {
    color: white;
    width: 15rem;
    height: 20rem;

    /* max-height: 20rem; */
    background-color: black;
    padding: 20px;
    /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
    text-decoration: none;
    position: relative;
    /* border-radius: 10px; */
    margin: 0;
  }
  .title {
    font-weight: 600;
    margin: 0;
    padding: 0;
    font-size: 2rem;
    /* word-wrap: break-word; */
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .release {
    margin: 5px 0;
    padding: 0;
  }

  .description {
    margin-bottom: 5rem;
    word-wrap: break-word;
  }

  .userName {
    position: absolute;
    bottom: 20px;
    letter-spacing: 1px;
    font-size: 0.75rem;
    font-style: italic;
    margin: 0;
    /* padding-top: 10.5rem; */
    color: white;
  }

  .card2:hover {
    /* background-color: whitesmoke;
    color: black; */
    background-color: #222;

    cursor: pointer;
    transition: 0.3s;
  }
  .userName:hover {
    /* color: #ddd; */
    text-decoration: underline;
  }

  @media screen and (min-width: 1421px) {
    .card2 {
      width: 100%;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .title {
      width: 20rem;
      /* border: 1px solid red; */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      /* width: 100%; */
      /* max-width: 80vw; */
    }
    .userNameContainer {
      display: flex;
      align-items: center;
      justify-content: end;
    }
    .userName {
      position: static;
      letter-spacing: 1px;
      font-size: 0.75rem;
      font-style: italic;
      padding: 0;
      margin: 0;
      width: max-content;
    }

    .description {
      margin: 0;
      /* margin-bottom: ; */
      flex-direction: row;
      padding: 0;
      width: 50rem;
      /* border: 1px solid red; */
      overflow: hidden;
    }

    .group2 {
      text-align: right;
      display: flex;
      /* align-items: center; */
      /* justify-content: space-betwe en; */
      gap: 1rem;
      flex-direction: column;
    }
  }
`;

export default Card;
