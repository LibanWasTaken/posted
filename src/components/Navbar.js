import { React, useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
// import Badge from "@mui/material/Badge";
import { useUserContext } from "../context/UserContext";
import defaultAccPNG from "../assets/defaultAccount.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user: currentUser, loading } = useUserContext();

  // Window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Wrapper>
      <nav>
        <Link
          to="/"
          style={{
            textDecoration: "none",
          }}
          className="logo"
        >
          POSTED
        </Link>
        {windowWidth < 930 ? (
          <div className="links"></div>
        ) : (
          <div className="links">
            <ul>
              <li>
                <Link
                  to="/me"
                  style={{
                    textDecoration: "none",
                  }}
                  className="navLinks"
                >
                  {/* <a className="navLinks" href="/me"> */}
                  You
                  {/* </a> */}
                </Link>
              </li>
              <li>
                <Link
                  to="/me/them"
                  style={{
                    textDecoration: "none",
                  }}
                  className="navLinks"
                >
                  To Who
                </Link>
              </li>
              <li>
                <Link
                  to="/posts"
                  style={{
                    textDecoration: "none",
                  }}
                  className="navLinks"
                >
                  Others
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className="icons">
          {windowWidth < 930 ? (
            <Sidebar />
          ) : (
            // <span className="icon">
            //   S.B.
            // </span>
            <div>
              <a href="/search" className="icon">
                <span className="material-symbols-outlined">search</span>
              </a>
              {/* <a href="/account" className={`icon ${currentUser && "logged"}`}> */}
              <Link
                to="/account"
                style={{
                  textDecoration: "none",
                }}
                // className="navLinks"
                className="icon"
              >
                {currentUser ? (
                  <img
                    src={currentUser.photoURL || defaultAccPNG}
                    alt=""
                    className="profilePic"
                  />
                ) : (
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                )}
              </Link>

              {/* </a> */}
            </div>
          )}
        </div>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  * {
    color: black;
    /* font-family: sans-serif; */
    letter-spacing: 1px;
    font-weight: 300;
  }
  ul {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 600;
  }

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  nav:hover {
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.2); */
    transition: 0.3s;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  }

  .logo {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 3rem;
    /* letter-spacing: 5px; */
    margin: 1rem 0 1rem 3rem;
    cursor: pointer;
    outline: none;
    border: none;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .logoPng {
    height: 50px;
  }
  .profilePic {
    height: 2rem;
    border-radius: 50%;
    /* background-color: red; */
  }

  ul {
    display: flex;
    flex-direction: row;
    gap: 2rem;
  }

  .navLinks {
    padding: 1.5rem;
  }
  .navLinks:hover {
    height: 100%;
    background-color: black;
    cursor: pointer;
    transition: 0.2s;
    color: white;
  }

  .icons {
    margin-right: 3rem;
    display: flex;
    align-items: center;
    /* justify-content: center; */
  }
  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 600, "GRAD" 0, "opsz" 48;
    /* font-variation-settings: "FILL" 1, "wght" 600, "GRAD" 0, "opsz" 48; */
    font-size: 2rem;
  }

  .icon {
    width: 1rem;
    margin: 0 1rem;
    opacity: 0.6;
  }
  .icon:hover {
    transition: 0.4s;
    opacity: 1;
    cursor: pointer;
  }

  @media screen and (max-width: 800px) {
    .logo {
      font-size: 2rem;
      margin: 0.5rem 1rem;
    }
    .icon {
      margin: 0;
      padding-top: 0.5rem;
    }

    .navLinks {
      padding: 0;
    }
  }
`;

export default Navbar;
