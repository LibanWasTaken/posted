import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";

function Card({
  postTitle,
  postID,
  releaseDate = "Sun, 01 Oct 2023 18:00:00 GMT",
  description,
  user,
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
        <div className="card2" style={{}}>
          <p className="title">{postTitle || "title"}</p>
          <p className="release">{formattedDate}</p>
          <h4>{description || getRandomSentence()}</h4>
          <p className="userName">- {user || getRandomName()} </p>
        </div>
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
    background-color: black;
    padding: 20px;
    /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
    text-decoration: none;
    position: relative;
    /* border-radius: 10px; */

    .title {
      font-weight: 600;
      margin: 0;
      padding: 0;
      font-size: 2rem;
    }
    .release {
      margin: 5px 0;
      padding: 0;
    }
  }

  .userName {
    position: absolute;
    bottom: 10px;
    letter-spacing: 1px;
    font-size: 0.75rem;
    font-style: italic;
  }

  .card2:hover {
    background-color: whitesmoke;
    color: black;
    /* padding: 10px; */
    transform: scale(1.025);
    cursor: pointer;
    transition: 0.3s;
  }
`;

export default Card;
