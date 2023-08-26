import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { AccPage } from "../pages/accountPage";
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  remove,
} from "firebase/database";

// import { VscAccount } from "react-icons/vsc";
// import { AiOutlineShopping } from "react-icons/ai";
// import Sidebar from "./Sidebar";
// import logoPng from "../assets/logo.png";
// import Badge from "@mui/material/Badge";

const Navbar = () => {
  const db = getDatabase();
  const [cartLength, setCartLength] = useState(null);
  const [loading, setLoading] = useState(true);

  const values = AccPage();
  let currentUser;
  if (values.logged) {
    currentUser = values.user;
  }
  // Admin
  let isAdmin = false;
  if (values.adminLogged) {
    isAdmin = true;
  }

  useEffect(() => {
    if (currentUser) {
      const cartRef = ref(db, "users/" + currentUser.uid + "/cart");
      onValue(cartRef, (snapshot) => {
        let data = snapshot.val();
        setCartLength(Object.keys(data).length);
      });
    }
  }, [currentUser]);

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
    <Theme>
      <div className={localStorage.getItem("theme")}>
        <Wrapper>
          <nav>
            <a href="/" className="logo">
              {/* <img className="logoPng" src={logoPng} alt="" /> */}
              POSTED
            </a>
            {windowWidth < 930 ? (
              <div className="links"></div>
            ) : (
              <div className="links">
                <ul>
                  <li>
                    <a className="navLinks" href="/me">
                      You
                    </a>
                  </li>
                  <li>
                    <a className="navLinks" href="/me/them">
                      To Who
                    </a>
                  </li>
                  <li>
                    <a className="navLinks" href="/everyone">
                      Everyone
                    </a>
                  </li>

                  {isAdmin && (
                    <li>
                      <a className="navLinks" href="/admin">
                        Admin
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            <div className="icons">
              {windowWidth < 930 ? (
                <span className="icon">{/* <Sidebar /> */}</span>
              ) : (
                <div>
                  <a href="/search" className="icon">
                    <span class="material-symbols-outlined">search</span>
                  </a>
                  <a href="/account" className="icon">
                    <span class="material-symbols-outlined">
                      account_circle
                    </span>
                  </a>
                </div>
              )}
            </div>
          </nav>
        </Wrapper>
      </div>
    </Theme>
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    /* box-shadow: rgba(149, 157, 165, 0.1) 0px 1px 24px; */
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
      margin-left: 2rem;
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

export default Navbar;
