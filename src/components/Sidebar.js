import { React, useState, useEffect } from "react";
import styled from "styled-components";

const Sidebar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <Theme>
      <div className="dark">
        <Wrapper>
          <nav
            onMouseLeave={() => {
              if (showLinks) {
                toggleLinks();
              }
            }}
          >
            hey
            <div
              className={showLinks ? "hamburger toggle" : "hamburger "}
              onClick={toggleLinks}
              // onMouseEnter={toggleLinks}
            >
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
            <ul className={showLinks ? "nav-links open" : "nav-links open"}>
              <li className={showLinks ? "fade" : ""}>
                <a href="/">Home</a>
              </li>
              <li className={showLinks ? "fade" : ""}>
                {/* <a href="#" onClick={switchTheme}>
              {theme} Mode
            </a> */}
              </li>
              <li className={showLinks ? "fade" : ""}>
                <a href="/me">You</a>
              </li>
              <li className={showLinks ? "fade" : ""}>
                <a href="/me/settings">To Who</a>
              </li>
              <li className={showLinks ? "fade" : ""}>
                <a href="/account">Account</a>
              </li>
              <li className={showLinks ? "fade" : ""}>
                <a
                  href="https://www.youtube.com/watch?v=8D4WZmyyx_k&ab_channel=JCDHDelgado"
                  target="_blank"
                >
                  Contact Me
                </a>
              </li>
            </ul>
          </nav>
        </Wrapper>
      </div>
    </Theme>
  );
};

const Wrapper = styled.section`
  * {
    color: #f2f5f7;
    /* font-family: sans-serif; */
    letter-spacing: 1px;
    font-weight: 300;
  }
  body {
    overflow-x: hidden;
  }
  nav {
    height: 5rem;
    width: 100vw;
    background-color: hsla(0, 0%, 20%, 0.8);
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    position: fixed;
    z-index: 10;
    border: 5px solid red;
  }

  /*Styling Links*/
  .nav-links {
    display: flex;
    list-style: none;
    width: 88vw;
    padding: 0 0.7vw;
    justify-content: space-evenly;
    align-items: center;
    text-transform: uppercase;
  }
  .nav-links li a {
    text-decoration: none;
    margin: 0 0.7vw;
  }
  .nav-links li {
    position: relative;
  }
  .nav-links li a::before {
    content: "";
    display: block;
    height: 3px;
    width: 0%;
    background-color: #f2f5f7;
    position: absolute;
    transition: all ease-in-out 250ms;
    margin: 1.75rem 0 0 10%;
  }
  .nav-links li a:hover::before {
    width: 80%;
  }

  /*Styling Buttons*/
  .login-button {
    background-color: transparent;
    border: 1.5px solid #f2f5f7;
    border-radius: 2em;
    padding: 0.6rem 0.8rem;
    margin-left: 2vw;
    font-size: 1rem;
    cursor: pointer;
  }
  .login-button:hover {
    color: #131418;
    background-color: #f2f5f7;
    border: 1.5px solid #f2f5f7;
    transition: all ease-in-out 350ms;
  }
  .join-button {
    color: #131418;
    background-color: #61dafb;
    border: 1.5px solid #61dafb;
    border-radius: 2em;
    padding: 0.6rem 0.8rem;
    font-size: 1rem;
    cursor: pointer;
  }
  .join-button:hover {
    color: #f2f5f7;
    background-color: transparent;
    border: 1.5px solid #f2f5f7;
    transition: all ease-in-out 350ms;
  }

  /*Styling Hamburger Icon*/
  .hamburger div {
    width: 30px;
    height: 3px;
    background: #333;
    margin: 5px;
    transition: all 0.3s ease;
  }
  .hamburger {
    display: none;
  }

  /*Stying for small screens*/
  /* @media screen and (max-width: 800px) { */
  nav {
    position: fixed;
    z-index: 3;
    background: none;
    box-shadow: none;
  }
  .hamburger {
    display: block;
    position: absolute;
    cursor: pointer;
    right: 5%;
    top: 50%;
    transform: translate(-5%, -50%);
    z-index: 2;
    transition: all 0.7s ease;
  }
  .nav-links {
    position: fixed;
    /* background: #131418; */
    background: hsla(0, 0%, 20%, 0.95);
    font-size: 1.25rem;
    height: 100vh;
    width: 100%;
    flex-direction: column;
    clip-path: circle(50px at 90% -20%);
    -webkit-clip-path: circle(50px at 90% -20%);
    /* clip-path: circle(50px at 92% 5%);
    -webkit-clip-path: circle(50px at 92% 5%); 
    transition: all 0.5s ease-out, opacity 0.2s;
     opacity: 0; */
    transition: all 0.5s ease-out;
    pointer-events: none;
  }
  .nav-links.open {
    opacity: 1;
    clip-path: circle(1000px at 90% -10%);
    -webkit-clip-path: circle(1000px at 90% -10%);
    pointer-events: all;
  }
  .nav-links li {
    opacity: 0;
  }
  .nav-links li:nth-child(1) {
    transition: all 0.5s ease 0.2s;
  }
  .nav-links li:nth-child(2) {
    transition: all 0.5s ease 0.4s;
  }
  .nav-links li:nth-child(3) {
    transition: all 0.5s ease 0.6s;
  }
  .nav-links li:nth-child(4) {
    transition: all 0.5s ease 0.7s;
  }
  .nav-links li:nth-child(5) {
    transition: all 0.5s ease 0.8s;
  }
  .nav-links li:nth-child(6) {
    transition: all 0.5s ease 0.9s;
    margin: 0;
  }
  .nav-links li:nth-child(7) {
    transition: all 0.5s ease 1s;
    margin: 0;
  }
  li.fade {
    opacity: 1;
  }
  /* } */

  @media screen and (min-width: 800px) {
    li {
      transform: translate(20vw);
    }
    .nav-links.open {
      clip-path: circle(1000px at 90% 10%);
      -webkit-clip-path: circle(1000px at 90% 10%);
    }
  }

  /*Animating Hamburger*/
  .toggle .line1 {
    transform: rotate(-45deg) translate(-5px, 6px);
    background-color: #f2f5f7;
  }
  .toggle .line2 {
    transition: all 0.7s ease;
    width: 0;
  }
  .toggle .line3 {
    transform: rotate(45deg) translate(-5px, -6px);
    background-color: #f2f5f7;
  }

  .eye {
    display: flex;
    gap: 12px;
  }

  .eye-icon {
    margin-top: 5px;
  }
`;

const Theme = styled.main`
  .dark {
    transition: 2s;
    * {
      color: #333;
    }
    .hamburger div {
      background: #f2f5f7;
    }
    .nav-links {
      background-color: hsla(0, 0%, 80%, 0.95);
    }
    .nav-links li a::before {
      background-color: #333;
    }

    .toggle .line1 {
      background-color: #333;
    }
    .toggle .line3 {
      background-color: #333;
    }
  }
`;

export default Sidebar;
