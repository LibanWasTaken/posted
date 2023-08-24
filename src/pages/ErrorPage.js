import React from "react";
import styled from "styled-components";
const ErrorPage = () => {
  return (
    <Theme>
      <div className={localStorage.getItem("theme")}>
        <Wrapper className="page-100">
          <section>
            <h1>404</h1>
            <h3>Sorry, no reason to be here</h3>
            <a href="/" className="btn">
              go back home
            </a>
          </section>
        </Wrapper>
      </div>
    </Theme>
  );
};

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  text-align: center;
  h1 {
    font-size: 12rem;
    margin: 5rem 0 2rem;
  }
  h3 {
    text-transform: none;
    margin: 2rem 0;
  }
  .btn {
    font-size: larger;
    text-decoration: none;
    background-color: black;
    color: white;
    padding: 15px 20px;
  }
`;

const Theme = styled.main`
  .dark {
    color: whitesmoke;
    .page-100 {
      background-color: #222;
    }
  }
`;

export default ErrorPage;
