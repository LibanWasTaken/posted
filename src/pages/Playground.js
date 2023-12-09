import React, { useState } from "react";
import styled from "styled-components";
import HALO_video from "./../assets/halo.mp4";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grow from "@mui/material/Grow";
import { TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import GoogleIcon from "@mui/icons-material/Google";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";

const Playground = () => {
  const [value, setValue] = useState(0);

  return (
    <Wrapper>
      <section className="design">
        <Fade in={HALO_video}>
          <video className="video" autoPlay loop muted>
            <source src={HALO_video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Fade>
      </section>
      <section className="form">
        {value == 0 && (
          <Grow in={value == 0}>
            <div className="inputs">
              <h1>Log In</h1>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                <TextField
                  sx={{ width: "30ch" }}
                  className="fields"
                  label="Email"
                  type="email"
                  variant="standard"
                  // value={loginEmail}
                  // onChange={(event) => setLoginEmail(event.target.value)}
                />
                <TextField
                  sx={{ width: "30ch" }}
                  className="fields"
                  label="Password"
                  type="password"
                  variant="standard"
                  // value={loginPassword}
                  // onChange={(event) => setLoginPassword(event.target.value)}
                />
                <p
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  // onClick={handlePasswordResetOpen}
                >
                  Forgot your password?
                </p>
              </Box>

              <button
                className={`classicBtn`}
                // style={{ marginTop: "4rem" }}
              >
                SIGN IN
              </button>
            </div>
          </Grow>
        )}
        {value == 1 && (
          <Grow in={value == 1}>
            <div className="inputs">
              <h1>Register</h1>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "2rem",
                  marginTop: 5,
                }}
              >
                <TextField
                  sx={{ width: "30ch" }}
                  className="fields"
                  label="User Name"
                  variant="filled"
                  // value={userName}
                  // onChange={(event) => setUserName(event.target.value)}
                />
                <TextField
                  sx={{ width: "30ch" }}
                  className="fields"
                  label="Email"
                  type="email"
                  variant="filled"
                  // value={registerEmail}
                  // onChange={(event) => setRegisterEmail(event.target.value)}
                />
                <TextField
                  sx={{ width: "30ch" }}
                  className="fields"
                  label="Password"
                  type="password"
                  variant="filled"
                  // value={registerPassword}
                  // onChange={(event) => setRegisterPassword(event.target.value)}
                />
                <TextField
                  sx={{ width: "30ch" }}
                  className="fields"
                  label="Confirm Password"
                  type="password"
                  variant="filled"
                  // value={registerPassword}
                  // onChange={(event) => setRegisterPassword(event.target.value)}
                />
              </Box>
              <button className={`classicBtn`} style={{ marginTop: "4rem" }}>
                SIGN UP
              </button>
            </div>
          </Grow>
        )}
        {value == 2 && (
          // <Grow in={value == 2}>
          <div className="inputs">
            <CircularProgress />
          </div>
          // </Grow>
        )}
        <Box sx={{ width: 500 }}>
          <BottomNavigation
            showLabels
            sx={{ backgroundColor: "whitesmoke", p: 1 }}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Log In" icon={<LoginIcon />} />
            <BottomNavigationAction label="Sign Up" icon={<LogoutIcon />} />
            <BottomNavigationAction
              label=""
              icon={<GoogleIcon />}
              onClick={() => {
                console.log("yo");
              }}
            />
          </BottomNavigation>
        </Box>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  height: 874px;
  .design {
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 5rem;
    width: 70vw;
    height: 100%;

    video {
      /* margin: 5rem; */
      width: 40vw;
    }
  }
  .form {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 50%;
    height: 100%;
    .inputs {
      /* border-radius: 10px;
      border: 1px solid #ddd;
      padding: 2rem 4rem; */
      transition: 1s;
      h1 {
        font-size: 2rem;
        margin: 0;
        padding: 0;
      }
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
    }
  }
  @media screen and (max-width: 1370px) {
    .design {
      display: none;
    }
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Playground;
