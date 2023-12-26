import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Footer from "./../components/Footer";
import { useUserContext } from "../context/UserContext";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import Divergence from "react-divergence-meter";
import { Parallax } from "react-scroll-parallax";
import Sitting from "./../assets/undraw_wandering_mind_re_x2a3.svg";
import typefaceanimator from "./../assets/STG_flash.mp4";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Lenis from "@studio-freight/lenis";

import Fade from "react-reveal/Fade";
import Rotate from "react-reveal/Rotate";

dayjs.extend(utc);
const HomePage = () => {
  const { user: currentUser, loading } = useUserContext();
  const currentDate = dayjs.utc();
  const formattedDate = currentDate.format("DD.MM.YY");
  const [value, setValue] = useState(formattedDate);
  const handleMouseEnter = () => {
    setValue("xx.xx.xx");
  };
  const handleMouseLeave = () => {
    setValue(formattedDate);
  };

  // lenis.on("scroll", (e) => {
  //   console.log(e);
  // });

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      console.log(window.pageYOffset);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Wrapper>
      <div className="hero">
        {/* <video
          className="video"
          width="750"
          height="500"
          style={{ position: "absolute", opacity: 0.025, zIndex: -1 }}
          autoPlay
          loop
          muted
        >
          <source src={typefaceanimator} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
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
        <Link to={currentUser ? "/me" : "/account"}>
          <button style={{ display: "flex", gap: 5, alignItems: "center" }}>
            Get Started <ArrowForwardIcon />
          </button>
        </Link>
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
            <h1>
              Send messages to the <span className="pop"> future.</span>
            </h1>
            <h3>
              Make your <span className="pop">mark.</span> Your{" "}
              <span className="pop">Legacy.</span>{" "}
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              libero error consectetur, magni officia similique voluptate ut
              obcaecati sit architecto?
            </p>
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
            src="https://www.washingtonpost.com/graphics/entertainment/golden-age-of-hip-hop/img/Future.png"
            alt=""
            className="imgLoad"
            onLoad={(e) => {
              e.target.classList.add("imgLoaded");
            }}
          />
        </Parallax>
      </section>
      <section className="section3">
        <div className="backgroundCoverWhite"></div>

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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dolorum
          adipisci facilis repellendus explicabo, praesentium qui a porro cumque
          nesciunt.
        </p>
      </section>
      <section className="section4">
        <div className="backgroundCoverBlack"></div>

        <Parallax
          opacity={[0, 1]}
          translateX={["-40%", 0]}
          endScroll={3000}
          startScroll={2200}
          easing="easeInOut"
        >
          <h1>SET</h1>
        </Parallax>
        <p>
          Lorem ipsum dolor sit amet. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Neque, hic! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Ut doloremque rerum illum debitis assumenda iure!
        </p>
      </section>
      {/* <section className="section6">
        <h1>View some of the Posted</h1>
        <h1>Exceptional customizability</h1>
        <h1>Unparalleled adaptability</h1>
        <h1>Unmatched Flexibilty</h1>
      </section> */}
      <section className="section5">
        <div className="backgroundCoverBlack"></div>

        <Parallax
          opacity={[0, 1]}
          translateX={["40%", 0]}
          endScroll={4200}
          startScroll={3200}
          easing="easeInOut"
        >
          <Fade right>
            <h1>SEND</h1>
          </Fade>
        </Parallax>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dolorum
          adipisci facilis repellendus explicabo, praesentium qui a porro cumque
          nesciunt.
        </p>
      </section>
      <section className="section7">
        {/* <Parallax
          style={{ width: "90vw" }}
          // style={{ background: "black", color: "white", width: "100vw" }}
          // opacity={[1, 0]}
          // startScroll={5900}
          // endScroll={6600}
          className="section7"
        > */}
        <img
          src="https://freesvg.org/img/Simple-Cloud-Icon-Silhouette.png"
          alt=""
          className="cloud"
          style={{ top: 0, right: 0 }}
        />

        <img
          src="https://freesvg.org/img/Simple-Cloud-Icon-Silhouette.png"
          alt=""
          className="cloud"
          style={{ bottom: 0, left: 0 }}
        />
        {/* <Parallax
          opacity={[0, 1]}
          // translateY={["40%", 0]}
          speed={-5}
          startScroll={4900}
          endScroll={5600}
          easing="easeInOutBack"
        > */}
        <h1>Exceptional customizability</h1>
        {/* </Parallax> */}
        {/* <Parallax
          opacity={[0, 1]}
          // translateY={["100%", 0]}
          speed={-5}
          startScroll={4850 + 100}
          endScroll={5600 + 100}
          easing="easeInOutBack"
        > */}
        <h1>Unparalleled adaptability</h1>
        {/* </Parallax> */}
        {/* <Parallax
          opacity={[0, 1]}
          // translateY={["40%", 0]}
          speed={-5}
          startScroll={4850 + 100 + 100}
          endScroll={5600 + 100 + 100}
          easing="easeInOutBack"
        > */}
        <h1>Unmatched Flexibilty</h1>
        {/* </Parallax> */}
        <Fade>
          <div className="other">
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum
              rem, porro adipisci quis corporis voluptatem.
            </h3>
            <h3>Lorem ipsum dolor sit amet.</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi,
              ducimus? Officiis veniam molestiae aliquid perferendis laudantium
              suscipit porro perspiciatis snsequuntur, quam debitis sit incidunt
              vitae est asperiores obcaecati atque animi placeat.
            </p>
          </div>
        </Fade>

        {/* </Parallax> */}
      </section>
      <div className="divider"></div>

      <section className="section8">
        {/* <div
          className=""
          style={{
            backgroundColor: "white",
            height: "20rem",
            width: "20rem",
          }}
        ></div> */}

        <img
          src="https://freesvg.org/img/Simple-Cloud-Icon-Silhouette.png"
          alt=""
          className="cloud"
          style={{ top: 0, right: 0 }}
        />

        <img
          src="https://freesvg.org/img/Simple-Cloud-Icon-Silhouette.png"
          alt=""
          className="cloud"
          style={{ bottom: 0, left: 0 }}
        />
        <div
          className=""
          style={{ backgroundColor: "white", zIndex: 1, borderRadius: "50%" }}
        >
          <Parallax
            rotate={["90deg", "360deg"]}
            startScroll={6200}
            endScroll={7000}
            easing="easeInOut"
          >
            {/* <Rotate> */}
            <img
              className="clock"
              src="https://www.freeiconspng.com/uploads/clock-png-5.png"
              alt=""
            />
            {/* </Rotate> */}
          </Parallax>
        </div>
        <Parallax
          translateX={["-100%", "-30%"]}
          // opacity={[0.5, 1]}
          startScroll={6300}
          endScroll={7100}
          easing="easeInOut"
        >
          <Fade left>
            <h1>
              Faultless <br />
              Punctuality
            </h1>
          </Fade>
        </Parallax>
        {/* <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia error
          eligendi neque sed et recusandae alias asperiores deleniti fugiat
          earum!
        </h3> */}
        <div className="msg">
          <Parallax
            opacity={[0, 1]}
            translateX={["50%", "20%"]}
            startScroll={6900}
            endScroll={7300}
            easing="easeInOut"
          >
            <p>Okay not really..</p>
          </Parallax>
        </div>

        <div className="sitting">
          <Parallax
          // rotate={[0, "90deg"]}
          // translateY={[0, "-5%"]}
          // opacity={[1, 0]}
          // startScroll={8000}
          // endScroll={8200}
          // easing=""
          >
            <img className="" src={Sitting} />
          </Parallax>
        </div>
      </section>
      {/* <div className="divider"></div> */}

      <section className="section9">
        {/* <Parallax
          rotate={[0, "10deg"]}
          translateY={["100%", "-5%"]}
          // opacity={[1, 0]}
          scale={[0.6 , 0.75]}
          startScroll={8040}
          endScroll={8640}
          easing="easeOut"
          className="hourglass"
        >
          <img
            src="https://pics.clipartpng.com/midle/Hourglass_PNG_Clip_Art-2426.png"
            alt=""
          />
        </Parallax> */}
        <Parallax speed={-10}>
          <div className="box1 box"></div>
        </Parallax>
        <Parallax speed={-7}>
          <div className="box2 box"></div>
        </Parallax>
        <Parallax speed={0} scale={[0.9, 1]}>
          <img
            src="https://images.pexels.com/photos/6446684/pexels-photo-6446684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="laptop"
          />
        </Parallax>
        <Parallax speed={-5} scale={[0.9, 1]}>
          <img
            src="https://images.pexels.com/photos/14979013/pexels-photo-14979013/free-photo-of-time-on-cellphone-screen.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="phone"
          />
        </Parallax>

        <div className="line"></div>
        <Fade>
          <div className="text">
            <h1>CRAFT FUTURE MOMENTS NOW</h1>
            <h2>SEIZE THE PRESENT</h2>
          </div>
        </Fade>
      </section>

      <section className="endSection">
        <div className="slide">
          <h1>one</h1>
        </div>
        <div className="slide">
          <h1>uhh yeah do it</h1>
          <Link
            to={"/what-is-this"}
            style={{
              textDecoration: "none",
              color: "white",
            }}
            className="anchor"
          >
            <p>do what?</p>
          </Link>
        </div>
        <div className="slide">
          <h1>2</h1>
        </div>
      </section>
      {/* <video className="video" width="750" height="500" autoPlay loop muted>
        <source src={typefaceanimator} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

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
    /* animation: swipe 1s ease-in-out infinite; */

    align-items: center;
    justify-content: center;
    /* filter: saturate(0) invert(1); */
    flex-direction: column;
    filter: saturate(0) brightness(1.5);
    /* padding: 2rem 0; */
    padding-top: 2rem;
    text-align: center;
    width: 100%;
    height: 95vh;
    background-color: black;
    object-fit: contain;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    img {
      user-select: none;
      width: 5vw;
      min-width: 4rem;
      margin: 0 1rem;
      /* cursor: wait; */
      /* box-shadow: 0px 0px 10px 00px rgba(255, 255, 255, 0.1); */
      border-radius: 10px;
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
      transition: 0.3s;
    }
    button:hover {
      cursor: pointer;
      /* letter-spacing: 1.5px; */
      border: 3px solid white;
    }
  }

  @keyframes swipe {
    0% {
      transform: translateX(0%); /* Start off screen to the right */
    }
    5% {
      transform: translateX(5%); /* Start off screen to the right */
    }
    100% {
      transform: translateX(-100%); /* Move off screen to the left */
    }
  }

  .section2 {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100vw;
    .text {
      padding: 0 2rem;
      color: #ccc;

      font-size: 2rem;
      /* font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; */
      text-transform: uppercase;
    }
    .pop {
      color: #fff;
      /* font-weight: 800; */
      /* font-size: larger; */
      /* font-style: italic; */
    }
    background-color: black;
    height: 90vh;
    img {
      height: 60vh;
      filter: saturate(0);

      /* transform: scaleX(-1); */
    }
    p {
      margin: 0;
      padding: 0;
      font-size: 1rem;
      max-width: 50rem;
    }
  }

  .section3 {
    height: 120vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    background-image: url("https://images.pexels.com/photos/4295845/pexels-photo-4295845.jpeg");
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
    width: 100vw;

    p {
      /* border: 1px solid red; */
      color: black;
      margin: 0;
      z-index: 5;
      max-width: 35vw;
      line-height: 2rem;
      text-align: center;
    }

    h1 {
      font-size: 20rem;
      margin: 0;
    }
    overflow: hidden;
  }

  .section4 {
    height: 120vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: url("https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
    width: 100vw;
    p {
      /* border: 1px solid red; */
      color: white;
      margin: 0;
      z-index: 1;
      max-width: 35vw;
      line-height: 2rem;
    }
    h1 {
      font-size: 20rem;
      margin: 0;
      color: white;
    }
    overflow: hidden;
  }

  .section5 {
    height: 120vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    background-image: url("https://images.pexels.com/photos/193003/pexels-photo-193003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
    width: 100vw;

    p {
      /* border: 1px solid red; */
      color: white;
      margin: 0;
      z-index: 1;
      max-width: 35vw;
      line-height: 2rem;
      text-align: right;
    }
    h1 {
      font-size: 20rem;
      margin: 0;
      color: white;
    }
    overflow: hidden;
  }

  .section6 {
    /* filter: invert(1); */
    h1 {
      margin: 0;
      padding: 0.5rem;
      text-transform: uppercase;
      background-color: black;
      color: white;
      letter-spacing: 2px;
    }
    background-color: black;

    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    overflow: hidden;
    /* animation: scrollText 10s linear infinite;  */
    z-index: -1;
  }

  .section7 {
    height: 140vh;
    display: flex;
    /* align-items: start; */
    justify-content: center;
    flex-direction: column;
    letter-spacing: 2px;
    gap: 3rem;
    text-transform: uppercase;
    h1 {
      text-align: left;
      font-size: 4rem;
      margin: 0;
    }
    .other {
      max-width: 60vw;
    }
  }

  .section8 {
    height: 140vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    position: relative;

    .clock {
      /* background-color: red; */
      position: relative;
      z-index: 1;
      /* padding: 2rem; */
      border-radius: 50%;
      /* box-shadow: rgb(255, 255, 255) 0px 8px 24px; */
    }

    h1 {
      z-index: -1;
      text-align: left;
      font-size: 5rem;
      gap: 5rem;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    h2 {
      position: absolute;
      bottom: 0;
      right: 0;
    }

    .msg {
      /* background-color: black; */
      /* color: white; */
      position: absolute;
      /* padding: 1rem 10rem; */
      bottom: 7rem;
      right: 25rem;
      border-radius: 10px 0 0 10px;
      font-size: 2rem;
    }
    .sitting {
      position: absolute;
      bottom: -115px;
      right: 50px;
      z-index: 1;
      img {
        height: 20rem;
      }

      filter: saturate(0);
    }
  }

  .section9 {
    height: 140vh;
    position: relative;
    width: 100vw;
    filter: saturate(0);

    /* background-image: url("https://images.pexels.com/photos/3570733/pexels-photo-3570733.jpeg");
    background-repeat: no-repeat;
    background-size: contain; */
    background-color: whitesmoke;
    .hourglass {
      position: absolute;
      filter: saturate(0);
      /* bottom: -10rem;
      left: 45%; */
      right: 15rem;
      bottom: 10rem;
      /* width: 10rem; */
      z-index: -1;
    }

    .laptop {
      position: absolute;
      left: 5rem;
      top: 15rem;
      width: 400px;
      z-index: 1;
    }

    .phone {
      position: absolute;
      left: 20rem;
      top: 45rem;
      width: 400px;
      z-index: 2;
    }

    .box {
      /* padding: 5rem 0; */
      border: 8px solid #d4d4d4;
      width: 15rem;
      height: 15rem;
      position: absolute;
      z-index: 0;
    }

    .box1 {
      left: 25rem;
      top: 23rem;
    }
    .box2 {
      left: 32rem;
      top: 35rem;
    }
    .line {
      width: 30rem;
      height: 8px;
      background-color: #d4d4d4;
      position: absolute;
      right: 0;
      top: 30rem;
    }

    .text {
      z-index: 1;
      /* font-size: 3rem; */
      color: gray;
      /* text-shadow: 0 0 rgba(0, 0, 0, 0.1); */
      position: absolute;
      bottom: 30rem;
      right: 10rem;
      text-align: right;
      max-width: 35rem;
      h1 {
        font-size: 3.5rem;
        padding: 0;
        margin: 0;
      }
      h2 {
        font-size: 2.5rem;
        padding: 0;
        margin: 0;
      }
    }
  }

  video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }

  .endSection {
    background-color: black;
    height: 90vh;
    width: 100vw;
    color: white;
    display: flex;
    /* align-items: center; */
    justify-content: center;
    flex-direction: row;

    overflow: hidden;
    .slide {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 90vh;
      min-width: 100vw;
      width: 100vw;
      /* animation: scrollText 9s infinite linear; */
    }
    h1 {
      margin: 0;
      padding: 0;
      font-size: 6rem;
      gap: 2rem;
      margin: 10px;
    }
    p:hover {
      text-decoration: underline;
      transition: 30ms;
    }
  }

  .divider {
    background-color: rgba(124, 124, 124, 0.73);
    padding: 0.5px 0;
    /* background-color: red; */
    width: 100vw;
  }

  .cloud {
    position: absolute;
    opacity: 0.05;
    pointer-events: none;
  }

  @keyframes scrollText {
    0% {
      opacity: 0;
      transform: translateX(100vw); /* Start off screen to the right */
    }
    5% {
      opacity: 1;
    }
    95% {
      opacity: 1;
    }
    100% {
      opacity: 0;

      transform: translateX(-100vw); /* Move off screen to the left */
    }
  }

  @media screen and (max-width: 1200px) {
    .hero {
      img {
        margin: 0;
      }
    }

    .section2 {
      /* background-color: red; */
      font-size: smaller;
      /* width: 90vw; */
      /* padding: 20rem; */
      flex-direction: column;

      img {
        width: 20vw;
        height: auto;
      }
    }
    .section3 {
      h1 {
        font-size: 10rem;
      }
    }
    .section4 {
      h1 {
        font-size: 10rem;
      }
    }
    .section5 {
      h1 {
        font-size: 10rem;
      }
    }
    .section6 {
      h1 {
        font-size: 1rem;
      }
    }
  }

  .backgroundCoverWhite {
    width: 100%;
    z-index: 0;
    height: 120vh;
    position: absolute;
    background-color: rgb(255, 255, 255, 0.75);
  }
  .backgroundCoverBlack {
    width: 100%;
    height: 120vh;
    position: absolute;
    background-color: rgb(0, 0, 0, 0.9);
  }
`;

const Theme = styled.main`
  .dark {
  }
`;

export default HomePage;
