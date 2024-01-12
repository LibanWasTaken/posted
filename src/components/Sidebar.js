import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import styled from "styled-components";
import { NAV_OPTIONS } from "../context/UserOptions";

import { Link } from "react-router-dom";

import { useUserContext } from "../context/UserContext";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";

export default function Sidebar({ show, notifications }) {
  const { user: currentUser, loading } = useUserContext();

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  if (show) {
    toggleDrawer("right", true);
  }

  function generateLinks(navOptions) {
    return navOptions.map((option) => (
      <Link to={option.value} key={option.value}>
        {/* <a key={option.value} href={option.value}> */}
        <ListItem>
          <ListItemButton>{option.label}</ListItemButton>
        </ListItem>
        {/* </a> */}
      </Link>
    ));
  }

  const list = (anchor) => (
    <Wrapper>
      <Box
        sx={{
          width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
          fontSize: "1.25rem",
          paddingTop: 5,
        }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {generateLinks(NAV_OPTIONS)}
          {/* <a href="#">
            <ListItem key={"Search"} disablePadding>
              <ListItemButton>Search</ListItemButton>
            </ListItem>
          </a> */}
        </List>
        {currentUser && (
          <>
            <Divider />
            <Link to={"/messages"}>
              <ListItem>
                <ListItemButton>Messages</ListItemButton>
              </ListItem>
            </Link>
            {notifications}
            <Divider />
          </>
        )}

        {currentUser ? (
          <List>
            <a href="/account">
              <ListItem key={"Account"}>
                <ListItemButton>Account</ListItemButton>
              </ListItem>
            </a>
          </List>
        ) : (
          <List>
            <a href="/account">
              <ListItem key={"Log In"}>
                <ListItemButton>Log In</ListItemButton>
              </ListItem>
            </a>
          </List>
        )}
        <Box
          sx={{
            // backgroundColor: "black",
            // color: "white",
            color: "#ddd",
            borderTop: "1px solid #ddd",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "10%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3rem",
            fontFamily: "Poppins",
            fontWeight: 600,
          }}
        >
          POSTED
        </Box>
      </Box>
    </Wrapper>
  );

  return (
    <SidebarIcon>
      <div className="hamburger">
        {/* <span
          className="material-symbols-outlined"
          onClick={toggleDrawer("right", true)}
        >
          menu
        </span> */}
        <MenuSharpIcon onClick={toggleDrawer("right", true)} fontSize="large" />
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </div>
    </SidebarIcon>
  );
}

const Wrapper = styled.main`
  font-size: 1rem;
  /* margin-top: 1rem; */
  padding: 0 10px;

  a {
    color: black;
    text-decoration: none;
  }
`;

const SidebarIcon = styled.main`
  .hamburger {
    cursor: pointer;
    opacity: 0.5;
  }

  .hamburger:hover {
    opacity: 1;
    transition: 0.3s;
  }
`;
