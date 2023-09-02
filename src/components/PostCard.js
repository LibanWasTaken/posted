import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Rating from "@mui/material/Rating";
import { Spinner2 } from "./Spinner";

function Card({ user, loading }) {
  console.log(user);
  return (
    <Wrapper>
      <a className="card" href={`posts/${user.id}`}>
        <div className="heading">
          <p>{user.info.firstName}, Adam</p>
        </div>
        <div className="info">
          <p>Released: 07-08-21</p>
        </div>
      </a>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  border-radius: 10px;
  margin: 1rem;
  display: flex;
  /* align-items: center; */
  border: 1px solid whitesmoke;
  justify-content: center;
  .heading {
    background-color: black;
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
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
  }
  .card:hover {
    cursor: pointer;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    .heading {
      background-color: #333;
    }
  }
`;

export default Card;
