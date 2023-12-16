import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
// import Badge from "@mui/material/Badge";
import { useUserContext } from "../context/UserContext";
import defaultAccPNG from "../assets/defaultAccount.png";
import { Link } from "react-router-dom";

import { getTimeDifferenceShort } from "../functions/functions";
import { NAV_OPTIONS } from "../context/UserOptions";

import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";
import ChatIcon from "@mui/icons-material/Chat";

import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { db as FSdb, auth } from "../services/firebase-config";
import { signOut, getAuth } from "firebase/auth";
import dayjs from "dayjs";

const Navbar = () => {
  const { user: currentUser, loading } = useUserContext();
  const [notifications, setNotifications] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [anchorEl, setAnchorEl] = useState(null);

  async function getNotification() {
    const userID = currentUser.uid;

    const notificationsQuery = query(
      collection(FSdb, `/users/${userID}/notifs`),
      orderBy("ts", "desc"),
      limit(5)
    );

    await getDocs(notificationsQuery).then((querySnapshot) => {
      const notifData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotifications(notifData);
      // console.log(notifData);
    });
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      getNotification();
    }
  }, [currentUser]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  async function handleLogout() {
    try {
      await signOut(auth);
      handleClose();
      window.location.reload();
    } catch (error) {
      alert(`Logout error`);
      console.log(error);
    }
  }

  // function getTimeDifferenceShort(timestamp) {
  //   const currentTime = dayjs();
  //   const targetTime = dayjs(timestamp);

  //   const secondsDiff = Math.abs(currentTime.diff(targetTime, "second"));
  //   const minutesDiff = Math.abs(currentTime.diff(targetTime, "minute"));
  //   const hoursDiff = Math.abs(currentTime.diff(targetTime, "hour"));
  //   const daysDiff = Math.abs(currentTime.diff(targetTime, "day"));
  //   const monthsDiff = Math.abs(currentTime.diff(targetTime, "month"));
  //   const yearsDiff = Math.abs(currentTime.diff(targetTime, "year"));

  //   if (secondsDiff < 60) {
  //     return `${secondsDiff}s`;
  //   } else if (minutesDiff < 60) {
  //     return `${minutesDiff}m`;
  //   } else if (hoursDiff < 24) {
  //     return `${hoursDiff}h`;
  //   } else if (daysDiff < 30) {
  //     return `${daysDiff}d`;
  //   } else if (monthsDiff < 12) {
  //     return `${monthsDiff}M`;
  //   } else if (secondsDiff < 0) {
  //     return `${monthsDiff}f`;
  //   } else {
  //     return `${yearsDiff}y`;
  //   }
  // }

  function generateMenuItemLink(url, div) {
    return (
      <Link
        to={url}
        style={{
          textDecoration: "none",
          color: "black",
          // display: "flex",
          // alignItems: "center",
          // width: "100%",
        }}
      >
        <MenuItem>{div}</MenuItem>
      </Link>
    );
  }

  function generateLinks(navOptions) {
    return navOptions.map((option) => (
      <li key={option.value}>
        <Link
          to={option.value}
          style={{
            textDecoration: "none",
          }}
          className="navLinks"
        >
          {/* <a className="navLinks" href="/me"> */}
          {option.label}
          {/* </a> */}
        </Link>
      </li>
    ));
  }
  function generateNotifications(notifs) {
    return notifs.map((notif) => (
      <MenuItem
        onClick={handleClose}
        key={notif.id}

        // sx={{
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "space-between",
        //   gap: 2,
        // }}
      >
        <Link
          to={notif.link ? notif.link : notif.msg}
          style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            width: "100%",
          }}
        >
          <span
            style={{
              maxWidth: "300px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            • {notif.msg}
          </span>
          <span style={{ opacity: 0.5 }}>
            {getTimeDifferenceShort(notif.ts)}
          </span>
        </Link>
      </MenuItem>
    ));
  }

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
            <ul>{generateLinks(NAV_OPTIONS)}</ul>
          </div>
        )}

        <div className="icons">
          {windowWidth < 930 ? (
            <Sidebar />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <a href="/search" className="icon">
                <SearchTwoToneIcon fontSize="large" />
              </a>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                // hideBackdrop
                // disableScrollLock
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(rgba(0, 0, 0, 0.16) 0px 0px 2px)",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {/* <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem> */}
                <Link
                  to="/account"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                  </MenuItem>
                </Link>
                <Link
                  to="/messages"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <ChatIcon />
                    </ListItemIcon>
                    My Messages
                  </MenuItem>
                </Link>
                <Divider sx={{ marginTop: 1 }} />
                {notifications && notifications.length > 0 && (
                  <Box>
                    {generateNotifications(notifications)}
                    {/* {notifications.length > 5 && ( */}
                    {true && (
                      <Link
                        to={{
                          pathname: "/account",
                          state: { changeStateValue: true },
                        }}
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        <MenuItem sx={{}}>Show all notifications..</MenuItem>
                      </Link>
                    )}
                    <Divider />
                  </Box>
                )}
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                {currentUser ? (
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                ) : (
                  <Box>
                    {generateMenuItemLink(
                      "/account",
                      <Box>
                        <ListItemIcon>
                          <Login fontSize="small" />
                        </ListItemIcon>
                        Login
                      </Box>
                    )}
                  </Box>
                )}
              </Menu>
              <div
                // to="/account"
                style={{
                  textDecoration: "none",
                }}
                className="icon"
                onClick={handleClick}
              >
                {currentUser ? (
                  <Badge
                    badgeContent={notifications.length}
                    max={4}
                    color="primary"
                  >
                    {/* <Avatar
                      alt="pfp"
                      src={currentUser.photoURL || defaultAccPNG}
                    /> */}
                    {currentUser.photoURL ? (
                      <Avatar alt="pfp" src={currentUser.photoURL} />
                    ) : (
                      <AccountCircleIcon fontSize="large" />
                    )}
                  </Badge>
                ) : (
                  <AccountCircleOutlinedIcon
                    className={loading && "spin"}
                    fontSize="large"
                  />
                )}
              </div>

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
    margin: 0.5rem 0 0.5rem 2rem;
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
    opacity: 1;
  }
  .profilePic:hover {
    box-shadow: 0 0 0px 2px #c5c5c5;
    transition: 0.3s;
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
    justify-content: center;
  }
  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 600, "GRAD" 0, "opsz" 48;
    /* font-variation-settings: "FILL" 1, "wght" 600, "GRAD" 0, "opsz" 48; */
    font-size: 2rem;
  }

  .icon {
    /* width: 1rem; */
    margin: 0 1rem;
    /* opacity: 0.6; */
  }
  .icon:hover {
    transition: 0.3s;
    /* opacity: 1; */
    cursor: pointer;
  }

  .spin {
    animation: loading 3s linear infinite;
    @keyframes loading {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  /* @media screen and (max-width: 800px) {
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
  } */
`;

export default Navbar;
