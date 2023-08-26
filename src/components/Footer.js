import { React } from "react";
import styled from "styled-components";
import logoPng from "../assets/logo.png";

const Footer = () => {
  return (
    <Theme>
      <div className={localStorage.getItem("theme")}>
        <Wrapper>
          <footer>
            <div className="ftgrid">
              <div className="item">
                <img className="logoPng" src={logoPng} alt="" />
              </div>
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
    padding: 2rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .ftgrid {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
  }

  .logoPng {
    height: 50px;
  }

  @media screen and (max-width: 800px) {
  }
`;

const Theme = styled.main`
  .dark {
  }
`;

export default Footer;
