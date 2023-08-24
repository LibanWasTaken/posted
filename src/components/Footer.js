import { React } from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Theme>
      <div className={localStorage.getItem("theme")}>
        <Wrapper>
          <footer>
            <div className="ftgrid">
              <div className="item">asd</div>
              <div className="item">asd</div>
              <div className="item">POSTED © 2023. All rights reserved.</div>
            </div>
          </footer>
        </Wrapper>
      </div>
    </Theme>
  );
};

const Wrapper = styled.section`
  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: black;
    color: white;
    padding: 3rem 2rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    /* border-top: 1px solid rgba(0, 0, 0, 0.2); */
    /* box-shadow: rgba(149, 157, 165, 0.5) 0px -10px 24px; */
  }

  .ftgrid {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
  }

  @media screen and (max-width: 800px) {
  }
`;

const Theme = styled.main`
  .dark {
  }
`;

export default Footer;
