import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "./../components/Footer";
import Divergence from "react-divergence-meter";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Parallax } from "react-scroll-parallax";

dayjs.extend(utc);
const HomePage = () => {
  const currentDate = dayjs.utc();
  const formattedDate = currentDate.format("DD.MM.YY");
  const [value, setValue] = useState(formattedDate);
  const handleMouseEnter = () => {
    setValue("xx.xx.xx");
  };
  const handleMouseLeave = () => {
    setValue(formattedDate);
  };

  // useEffect(() => {
  //   function handleScroll() {
  //     console.log(window.pageYOffset);
  //   }

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <Wrapper>
      <div className="hero">
        <Parallax
          opacity={[1, 0]}
          speed={-10}
          endScroll={600}
          startScroll={100}
        >
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Divergence value={value} />
          </div>
        </Parallax>
        <a href="/me">
          <button>get started &#12297;</button>
        </a>
      </div>
      <section className="section2">
        <div className="text">
          <Parallax
            opacity={[0, 1]}
            easing="easeOut"
            translateX={["-50%", 0]}
            endScroll={800}
            startScroll={0}
          >
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum. </h1>
          </Parallax>
        </div>
        <Parallax
          opacity={[0, 1]}
          easing="easeOut"
          translateX={["50%", 0]}
          endScroll={800}
          startScroll={0}
        >
          <img
            src="https://www.seekpng.com/png/full/302-3021829_blank-mask-png-blank-face-mask-png.png"
            alt=""
          />
        </Parallax>
      </section>
      <section className="section3">
        <div className="textContainer">
          <Parallax
            opacity={[0, 1]}
            endScroll={2000}
            startScroll={1000}
            translateY={["-100%", 0]}
          >
            <h1>WRITE</h1>
          </Parallax>
        </div>
      </section>
      <section className="section4">
        <Parallax
          opacity={[0, 1]}
          translateX={["-50%", 0]}
          endScroll={3000}
          startScroll={2300}
          easing="easeInOut"
        >
          <h1>SET</h1>
        </Parallax>
      </section>
      <section className="section5">
        <Parallax
          opacity={[0, 1]}
          translateX={["50%", 0]}
          endScroll={3900}
          startScroll={3300}
          easing="easeInOut"
        >
          <h1>SEND</h1>
        </Parallax>
      </section>
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
    flex-direction: column;
    filter: saturate(0) brightness(1.5);
    /* padding: 2rem 0; */
    text-align: center;
    width: 100%;
    height: 95vh;
    background-color: black;
    object-fit: contain;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    img {
      user-select: none;
      width: 5vw;
      cursor: wait;
    }
    button {
      font-size: 1rem;
      text-transform: uppercase;
      padding: 1rem 1.255rem;
      border-radius: 50px;
      font-family: "Poppins";
      margin-top: 6rem;
      background-color: black;
      color: white;
      border: 3px solid gray;
      outline: none;
      letter-spacing: 1px;
    }
    button:hover {
      cursor: pointer;
      letter-spacing: 1.5px;
      transition: 0.3s;
      border: 3px solid white;
    }
  }

  .section2 {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100vw;
    .text {
      color: white;
      font-size: 2rem;
      /* font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; */
      text-transform: uppercase;
    }
    background-color: black;
    height: 90vh;
    img {
      height: 60vh;
      transform: scaleX(-1);
    }
  }

  .section3 {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("https://images.pexels.com/photos/4295845/pexels-photo-4295845.jpeg");
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
    width: 100vw;

    h1 {
      font-size: 30rem;
      /* color: white; */
    }
    overflow: hidden;
  }

  .section4 {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
    width: 100vw;

    h1 {
      font-size: 30rem;
      color: white;
    }
    overflow: hidden;
  }

  .section5 {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("https://images.pexels.com/photos/193003/pexels-photo-193003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
    width: 100vw;

    h1 {
      font-size: 30rem;
      color: white;
    }
    overflow: hidden;
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
