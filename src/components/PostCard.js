import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Rating from "@mui/material/Rating";
import { Spinner2 } from "./Spinner";

function Card({ postTitle, postID, releaseDate }) {
  return (
    <Wrapper>
      <a className="card" href={`posts/${postID}`}>
        <div className="heading">
          <p>{postTitle || "title"}</p>
        </div>
        <div className="info">
          <p>{releaseDate || "03 Oct, 2023"}</p>
        </div>
      </a>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

  margin: 1rem;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  .heading {
    background-color: black;
    color: white;
    /* border-top-left-radius: 10px;
    border-top-right-radius: 10px; */
    width: 20rem;
    p {
      margin: 0;
      font-size: 1.5rem;
      letter-spacing: 1px;
      padding: 1rem;
    }
  }
  .info {
    padding: 1rem;
    color: black;
  }
  .card {
    text-decoration: none;
    background-color: whitesmoke;
  }
  .card:hover {
    cursor: pointer;
    .heading {
      background-color: #333;
    }
  }
`;

export default Card;
