import React, { useState } from "react";
import styled from "styled-components";
import Footer from "./../components/Footer";
import Divergence from "react-divergence-meter";
import dayjs from "dayjs";

const HomePage = () => {
  const date = `${toTwoDigits(dayjs().date())}.${toTwoDigits(
    dayjs().month() + 1
  )}.${dayjs().year() % 100}`;

  const dayjsUTC = require("dayjs");
  const utc = require("dayjs/plugin/utc"); // Import the UTC plugin
  dayjsUTC.extend(utc);
  const utcDate = dayjsUTC().utc();
  console.log(utcDate.hour());

  const [value, setValue] = useState(date);

  function toTwoDigits(number) {
    return String(number).padStart(2, "0");
  }

  const handleMouseEnter = () => {
    setValue("xx.xx.xx");
  };

  const handleMouseLeave = () => {
    setValue(date);
  };
  return (
    <Wrapper>
      <div className="hero">
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Divergence value={value} />
        </div>
      </div>

      <h1>Yo</h1>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  /* margin-top: 2rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  .hero {
    display: flex;
    align-items: center;
    justify-content: center;
    /* filter: saturate(0) invert(1); */
    filter: saturate(0) brightness(1.5);
    /* padding: 2rem 0; */
    width: 100%;
    height: 100vh;
    background-color: black;
    object-fit: contain;
    img {
      user-select: none;
      width: 5vw;
    }
  }

  @media screen and (max-width: 1450px) {
    .hero {
    }
  }
`;

const Theme = styled.main`
  .dark {
  }
`;

export default HomePage;
