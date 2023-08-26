import React, { useState } from "react";
import styled from "styled-components";
import Footer from "./../components/Footer";

const HomePage = () => {
  const currentDate = new Date(); // Get the current date

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const optionsTime = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  const formattedTime = currentDate.toLocaleTimeString(undefined, optionsTime);

  return (
    <Wrapper>
      <h1>Yo</h1>
      <p>Today's Date: {formattedDate}</p>
      <p>Current Time: {formattedTime}</p>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Theme = styled.main`
  .dark {
  }
`;

export default HomePage;
