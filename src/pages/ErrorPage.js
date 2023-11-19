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
            <a
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="classicBtn">go back home</div>
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
  align-items: center;
  text-align: center;

  h1 {
    font-size: 20rem;
    letter-spacing: -20px;
    margin: 2rem 0;
    padding: 0;
    /* position: absolute; */
    z-index: -1;
  }
  h3 {
    text-transform: none;
    margin: 2rem 0;
  }
  .classicBtn {
    margin-top: 3rem;
    /* font-size: larger; */
    text-decoration: none;
    width: fit-content;
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
