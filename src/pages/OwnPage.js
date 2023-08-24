import React from "react";
import styled from "styled-components";
const OwnPage = () => {
  return (
    <Wrapper>
      <h1>Hello, you spill in</h1>
      <h2>12 days</h2>
      <button className="delayBtn">Delay</button>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  margin-top: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .delayBtn {
    background-color: black;
    padding: 1.5rem 2.5rem;
    margin-top: 4rem;
    color: white;
    letter-spacing: 2px;
    outline: none;
    text-transform: uppercase;
    border: none;
  }

  .delayBtn:hover {
    cursor: pointer;
    padding: 1.5rem 2.7rem;
    letter-spacing: 3px;
    transition: 0.3s;
  }
`;

const Theme = styled.main``;

export default OwnPage;
