import React from "react";
import styled from "styled-components";
import ScreenTimeSVG from "../assets/undraw_screenTimeEdited.svg";
import ExamsSVG from "../assets/undraw_exams_re_4ios.svg";
import ReadingSVG from "../assets/undraw_reading_re_29f8.svg";

const OwnPageTEMP = () => {
  return (
    <Wrapper>
      <section className="postSection">
        <span className="stylishBg">
          <img src={ReadingSVG} alt="ExamsSVG" className="ExamsSVG" />
          <img
            src={ScreenTimeSVG}
            alt="ScreenTimeSVG"
            className="ScreenTimeSVG"
          />
        </span>

        <p className="header">Your Posts</p>
        <div className="posts">
          <div className="post">
            <p className="heading">Something</p>
            <p className="timing">14:02:52</p>
          </div>
          <div className="post">
            <p className="heading">Sum Else</p>
            <p className="timing">01:17:23</p>
          </div>
          <div className="post">
            <span className="material-symbols-outlined addPostBtn">add</span>
            <p>
              Add Post <br /> 2/3
            </p>
          </div>
        </div>
      </section>
      <h1 className="randomAssText">
        Lorem ipsum dolor sit amet,
        <br /> Jesnly fomer.
      </h1>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  color: white;

  .postSection {
    text-align: left;
  }

  .header {
    font-size: 2rem;
    text-align: left;
  }
  .stylishBg {
    background-color: black;
    position: absolute;
    width: 100vw;
    height: 20rem;
    z-index: -1;
    top: 105px;
    left: 0;

    display: flex;
    justify-content: space-between;

    .ExamsSVG {
      transform: translateY(90px);
      width: 250px;
    }

    .ScreenTimeSVG {
      transform: translateY(3px);
    }
  }

  .posts {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
  }

  .post {
    width: 15rem;
    height: 17rem;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    border-radius: 10px;
    color: black;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    .heading {
      font-size: 1.5rem;
    }
    .timing {
      letter-spacing: 1px;
      font-size: 1rem;
    }

    .count {
      font-size: 0.75rem;
    }
  }

  .post:hover {
    cursor: pointer;
    background-color: whitesmoke;
  }

  .addPostBtn {
    font-size: 2rem;
  }
  .addPostBtn:hover {
    transform: rotate(90deg);
    transition: 0.3s;
  }

  .randomAssText {
    font-family: "Poppins";
    margin-top: 8rem;
    font-size: 4rem;
    background: linear-gradient(
      to right,
      #7953cd 20%,
      #00affa 30%,
      #0190cd 70%,
      #764ada 80%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    background-size: 500% auto;
    animation: textShine 5s ease-in-out infinite alternate;
  }

  @keyframes textShine {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;

export default OwnPageTEMP;
