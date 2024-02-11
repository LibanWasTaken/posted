import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import mailSentSVG from "../assets/undraw_mailSent.svg";

const MessagePage = () => {
  const location = useLocation();
  const customH1Message = location.state
    ? location.state.customH1Message
    : null;

  return (
    <Wrapper>
      {customH1Message ? (
        <>
          <h1>{customH1Message}</h1>
          <h2>Please check your inbox</h2>
          <p>(might be in spam)</p>
          <img src={mailSentSVG} alt="" className="mailSentImg" />
        </>
      ) : (
        <>
          <h1>Uhh</h1>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  h2 {
    margin: 0;
    padding: 0;
  }
  p {
    margin: 0;
    padding: 0;
  }
  .mailSentImg {
    margin-top: 10rem;
    width: 400px;
    /* opacity: 0.5; */
    rotate: -5deg;
    animation: hovering 5s infinite ease-in-out;
    transition: 30ms;
  }
  .mailSentImg:hover {
    rotate: 0deg;
  }

  @keyframes hovering {
    0% {
      transform: translate(0, 0%);
    }
    50% {
      transform: translate(0, -10%);
    }
    100% {
      transform: translate(0, 0%);
    }
  }
`;

export default MessagePage;
