import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

import Slide from "@mui/material/Slide";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Raleway",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#fff",
    },
  },
  shadows: 0,
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function renderListItems(data) {
  return data.map((item, index) => (
    <React.Fragment key={index}>
      <ListItem button>
        <ListItemText primary={item.primary} secondary={item.secondary} />
      </ListItem>
      <Divider />
    </React.Fragment>
  ));
}

export default function Diary({ open, handleClose, info }) {
  const arrExample = [
    { primary: "09 Dec, 2023", secondary: "and then this happened" },
    { primary: "25 Aug, 2023", secondary: "why" },
    { primary: "09 Dec, 2023", secondary: "and then this happened" },
    { primary: "25 Aug, 2023", secondary: "why" },
    { primary: "09 Dec, 2023", secondary: "and then this happened" },
    { primary: "25 Aug, 2023", secondary: "why" },
    { primary: "09 Dec, 2023", secondary: "and then this happened" },
    { primary: "25 Aug, 2023", secondary: "why" },
    { primary: "09 Dec, 2023", secondary: "and then this happened" },
    { primary: "25 Aug, 2023", secondary: "why" },
    { primary: "09 Dec, 2023", secondary: "and then this happened" },
    { primary: "25 Aug, 2023", secondary: "why" },
    { primary: "09 Dec, 2023", secondary: "and then this happened" },
    { primary: "25 Aug, 2023", secondary: "why" },
    { primary: "09 Dec, 2023", secondary: "and then this happened" },
    { primary: "25 Aug, 2023", secondary: "why" },
    { primary: "09 Dec, 2023", secondary: "and then this happened" },
    { primary: "25 Aug, 2023", secondary: "why" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Wrapper>
          <div className="nav">
            <div>
              <span
                className="btnIcon material-symbols-outlined"
                onClick={handleClose}
              >
                close
              </span>
              <p>Diary</p>
            </div>
            <span className="btnIcon material-symbols-outlined">add</span>
          </div>
          <section className="list">
            <Paper style={{ maxHeight: "70vh", overflow: "auto" }}>
              <List>{renderListItems(arrExample)}</List>
            </Paper>
          </section>
        </Wrapper>
      </Dialog>
    </ThemeProvider>
  );
}

const Wrapper = styled.main`
  /* display: flex;
  align-items: center;
  justify-content: centre; */
  .nav {
    background-color: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 2rem;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      p {
        margin-left: 2rem;
        letter-spacing: 1px;
        font-size: 1.5rem;
      }
    }

    .btnIcon {
      font-size: 2rem;
      user-select: none;
      padding: 2px;
    }
    .btnIcon:hover {
      cursor: pointer;
      transition: 0.3s;
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 50%;
      transform: rotate(90deg);
    }
  }

  .list {
    padding: 1rem 2rem;
    border: 1px solid red;
    overflow: scroll;
  }
  height: 100vh;
  overflow: hidden;
`;
