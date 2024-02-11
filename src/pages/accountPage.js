import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  // signInWithRedirect,
  // getRedirectResult,
  getAuth,
} from "firebase/auth";
import { auth, provider, db } from "../services/firebase-config";
import { Spinner3 } from "../components/Spinner";
import { collection, addDoc, getDoc, setDoc, doc } from "firebase/firestore";

import { useUserContext } from "../context/UserContext";
import Settings from "../components/Settings";
import PasswordReset from "../components/modals/PasswordReset";

import HALO_video from "./../assets/halo.mp4";
import ReCAPTCHA from "react-google-recaptcha";

import Grow from "@mui/material/Grow";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import GoogleIcon from "@mui/icons-material/Google";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import AppleIcon from "@mui/icons-material/Apple";
import MicrosoftIcon from "@mui/icons-material/Microsoft";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    // secondary: {
    //   main: "#11cb5f",
    // },
  },
});

export function AccPage() {
  const { user, loading } = useUserContext();
  const [value, setValue] = useState(0);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmRegisterPassword, setConfirmRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [loginMethods, setLoginMethods] = useState(1);
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  const navigate = useNavigate();

  const [passwordResetOpen, setPasswordResetOpen] = useState(false);
  const handlePasswordResetOpen = () => setPasswordResetOpen(true);
  const handlePasswordResetClose = () => setPasswordResetOpen(false);

  function handleLoginMethodsScroll() {
    if (loginMethods >= 3) {
      setLoginMethods(1);
    } else {
      setLoginMethods(loginMethods + 1);
    }
  }

  const formatErr = (str) => {
    const words = str.split(" ");
    const target = words[words.length - 1].split("/")[1].slice(0, -2);
    words.shift();
    words.pop();
    const result = `${words.join(" ")}, ${target}`;
    return result;
  };

  const addAccToFireStore = async (newUser) => {
    console.log("adding:", newUser);

    try {
      const docRef = doc(db, "users", newUser.uid); // Specify the custom ID here
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document already exists with custom ID: ", newUser.uid);
      } else {
        await setDoc(docRef, {
          displayName: newUser.displayName,
          email: newUser.email,
        });
        console.log("Document created with custom ID: ", newUser.uid);
      }
    } catch (error) {
      console.error("Error setting/updating document: ", error);
    }
  };

  const verifyEmailAndRedirect = async (user) => {
    try {
      await sendEmailVerification(user);
      console.log("Verification email sent");
      const customH1Message = "Password reset email sent";
      // TODO: verify if valid mail + if there even a acc in this mail + security q.
      navigate(`/message`, { state: { customH1Message } });
    } catch (error) {
      console.error("Email verification error:", error);
    }
  };

  const register = async () => {
    let success = true;
    function errDetected(msg) {
      success = false;
      setErrMsg(msg);
    }

    if (!userName) {
      errDetected(`Registration error: Provide an User Name`);
    } else if (!/^[a-zA-Z0-9_.]+$/.test(userName)) {
      errDetected(
        `Registration error: User Name can only contain letters, numbers, underscores, and periods`
      );
    } else if (userName.length < 3) {
      errDetected(`Registration error: Provide a longer User Name`);
    } else if (!registerEmail) {
      errDetected(`Registration error: Provide an email`);
    } else if (registerPassword.length < 5) {
      errDetected(`Registration error: Thats.. your password?`);
    } else if (registerPassword !== confirmRegisterPassword) {
      errDetected(`Registration error: Passwords did not match`);
    } else if (!captchaSuccess) {
      errDetected(`Registration error: Captcha incomplete`);
    }

    if (success) {
      try {
        setBtnLoading(true);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        const newUser = userCredential.user;
        await updateProfile(newUser, { displayName: userName });
        addAccToFireStore(newUser);

        verifyEmailAndRedirect(newUser);
      } catch (error) {
        setBtnLoading(false);

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Registration error [${errorCode}]: ${errorMessage}`);
        setErrMsg(`Registration error: ${formatErr(errorMessage)}`);
      }
    }
  };

  const login = async () => {
    try {
      setBtnLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const loggedInUser = userCredential.user;
      setBtnLoading(false);
    } catch (error) {
      setBtnLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Login error [${errorCode}]: ${errorMessage}`);
      setErrMsg(`Login error: ${formatErr(errorMessage)}`);
    }
  };

  const loginGmail = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        addAccToFireStore(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
        setErrMsg(formatErr(errorMessage));
        // setErrMsg(errorCode);
        setValue(0);
      });
  };

  function captchaCheck(value) {
    if (value) {
      console.log("User passed reCAPTCHA!");
      setCaptchaSuccess(true);
    } else {
      console.log("User did not pass reCAPTCHA.");
      setCaptchaSuccess(false);
    }
  }

  // useEffect(() => {
  //   loginGmail();
  // }, []);
  // useEffect(async () => {
  //   try {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       // This gives you a Google Access Token. You can use it to access Google APIs.
  //       // const credential = GoogleAuthProvider.credentialFromResult(result);
  //       // const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = response.user;
  //       addAccToFireStore(user);
  //       console.log(user);
  //     }
  //   } catch (error) {
  //     console.log("Error signing in:", error);
  //   }
  //   return () => {};
  // }, []);

  const logout = async () => {
    try {
      setBtnLoading(true);
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      setBtnLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Logout error [${errorCode}]: ${errorMessage}`);
      setErrMsg(`Logout error: ${formatErr(errorMessage)}`);
    }
  };

  return (
    <Wrapper>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "5rem",
          }}
        >
          <Spinner3 />
        </div>
      ) : (
        <ThemeProvider theme={theme}>
          {user ? (
            <section
              className="section2"
              style={{
                paddingTop: "2rem",
              }}
            >
              <Settings userID={user.uid} />

              <button
                style={{ margin: "5rem" }}
                onClick={logout}
                className={`classicBtn ${
                  btnLoading && "loadingClassicBtn disabledClassicBtn"
                }`}
              >
                Sign Out
              </button>
            </section>
          ) : (
            <div className="log">
              <section className="design">
                <Grow in={HALO_video}>
                  <video className="video" autoPlay loop muted>
                    <source src={HALO_video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Grow>
              </section>
              <section className="form">
                {value == 0 && (
                  <Fade in={value == 0}>
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
                          value={loginEmail}
                          onChange={(event) =>
                            setLoginEmail(event.target.value)
                          }
                        />
                        <TextField
                          sx={{ width: "30ch" }}
                          className="fields"
                          label="Password"
                          type="password"
                          variant="standard"
                          value={loginPassword}
                          onChange={(event) =>
                            setLoginPassword(event.target.value)
                          }
                        />
                        <p
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={handlePasswordResetOpen}
                        >
                          Forgot your password?
                        </p>
                      </Box>

                      <button
                        className={`classicBtn ${
                          btnLoading && "loadingClassicBtn disabledClassicBtn"
                        }`}
                        onClick={login}
                      >
                        SIGN IN
                      </button>
                      <PasswordReset
                        open={passwordResetOpen}
                        handleClose={handlePasswordResetClose}
                        userMail={loginEmail} // TODO: check if mail
                        // userID={currentUser.uid}
                      />
                    </div>
                  </Fade>
                )}
                {value == 1 && (
                  <Fade in={value == 1}>
                    <div className="inputs">
                      <h1>Register</h1>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: "2rem",
                          marginTop: 2,
                        }}
                      >
                        <TextField
                          sx={{ width: "30ch" }}
                          className="fields"
                          label="User Name"
                          variant="filled"
                          inputProps={{
                            maxLength: 25,
                          }}
                          value={userName}
                          onChange={(event) => setUserName(event.target.value)}
                        />
                        <TextField
                          sx={{ width: "30ch" }}
                          className="fields"
                          label="Email"
                          type="email"
                          variant="filled"
                          inputProps={{
                            maxLength: 150,
                          }}
                          value={registerEmail}
                          onChange={(event) =>
                            setRegisterEmail(event.target.value)
                          }
                        />
                        <TextField
                          sx={{ width: "30ch" }}
                          className="fields"
                          label="Password"
                          type="password"
                          variant="filled"
                          inputProps={{
                            maxLength: 75,
                          }}
                          value={registerPassword}
                          onChange={(event) =>
                            setRegisterPassword(event.target.value)
                          }
                        />
                        <TextField
                          sx={{ width: "30ch" }}
                          className="fields"
                          label="Confirm Password"
                          type="password"
                          variant="filled"
                          inputProps={{
                            maxLength: 75,
                          }}
                          value={confirmRegisterPassword}
                          onChange={(event) =>
                            setConfirmRegisterPassword(event.target.value)
                          }
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                          width: "100%",
                          position: "relative",
                          marginTop: 4,
                        }}
                      >
                        <CircularProgress
                          sx={{
                            position: "absolute",
                            left: "45%",
                            zIndex: 0,
                          }}
                        />
                        <Box sx={{ zIndex: 1, minWidth: 300, minHeight: 80 }}>
                          <ReCAPTCHA
                            sitekey="6Ldc4VspAAAAAFzMSR02QEvXimxAnXECuVoHKgJo" // TODO: hide?
                            onChange={captchaCheck}
                            // https://www.google.com/recaptcha/admin/site/693887324/setup
                          />
                        </Box>
                      </Box>
                      <button
                        className={`classicBtn ${
                          btnLoading && "loadingClassicBtn disabledClassicBtn"
                        }`}
                        style={{ marginTop: "2rem" }}
                        onClick={register}
                      >
                        SIGN UP
                      </button>
                    </div>
                  </Fade>
                )}
                {value == 2 && (
                  // <Grow in={value == 2}>
                  <div className="inputs">
                    <CircularProgress />
                  </div>
                  // </Grow>
                )}
                <Box sx={{ width: 500 }}>
                  <div className="errMsg">{errMsg} </div>

                  <BottomNavigation
                    showLabels
                    sx={{
                      backgroundColor: "whitesmoke",
                      p: 1,
                    }}
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  >
                    {loginMethods == 1 && (
                      <Fade in={loginMethods == 1}>
                        <BottomNavigationAction
                          label="Log In"
                          className="bottomNavBtn"
                          icon={<LoginIcon />}
                        />
                      </Fade>
                    )}
                    {loginMethods == 1 && (
                      <Fade in={loginMethods == 1}>
                        <BottomNavigationAction
                          label="Sign Up"
                          className="bottomNavBtn"
                          icon={<LogoutIcon />}
                        />
                      </Fade>
                    )}
                    {loginMethods == 1 && (
                      <Fade in={loginMethods == 1}>
                        <BottomNavigationAction
                          label=""
                          className="bottomNavBtn"
                          icon={<GoogleIcon />}
                          onClick={loginGmail}
                        />
                      </Fade>
                    )}
                    {loginMethods == 2 && (
                      <Fade in={loginMethods == 2}>
                        <BottomNavigationAction
                          label="Phone"
                          className="bottomNavBtn"
                          disabled
                          icon={<PhoneIcon sx={{ opacity: 0.5 }} />}
                        />
                      </Fade>
                    )}
                    {loginMethods == 2 && (
                      <Fade in={loginMethods == 2}>
                        <BottomNavigationAction
                          label="Facebook"
                          className="bottomNavBtn"
                          disabled
                          icon={<FacebookIcon sx={{ opacity: 0.5 }} />}
                        />
                      </Fade>
                    )}
                    {loginMethods == 2 && (
                      <Fade in={loginMethods == 2}>
                        <BottomNavigationAction
                          label="Github"
                          className="bottomNavBtn"
                          disabled
                          icon={<GitHubIcon sx={{ opacity: 0.5 }} />}
                        />
                      </Fade>
                    )}
                    {loginMethods == 3 && (
                      <Fade in={loginMethods == 3}>
                        <BottomNavigationAction
                          label="Twitter"
                          className="bottomNavBtn"
                          disabled
                          icon={<TwitterIcon sx={{ opacity: 0.5 }} />}
                        />
                      </Fade>
                    )}
                    {loginMethods == 3 && (
                      <Fade in={loginMethods == 3}>
                        <BottomNavigationAction
                          label="Apple"
                          className="bottomNavBtn"
                          disabled
                          icon={<AppleIcon sx={{ opacity: 0.5 }} />}
                        />
                      </Fade>
                    )}
                    {loginMethods == 3 && (
                      <Fade in={loginMethods == 3}>
                        <BottomNavigationAction
                          label="Microsoft"
                          className="bottomNavBtn"
                          disabled
                          icon={<MicrosoftIcon sx={{ opacity: 0.5 }} />}
                        />
                      </Fade>
                    )}

                    <KeyboardArrowRightIcon
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        cursor: "pointer",
                      }}
                      onClick={handleLoginMethodsScroll}
                      className="scrollMore"
                    />
                  </BottomNavigation>
                </Box>
                <div></div>
              </section>
            </div>
          )}
        </ThemeProvider>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  /* font-family: "Poppins", sans-serif; */
  /* display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; */
  /* padding: 5rem; */
  background-color: #fafafa;
  min-height: 100vh;
  height: 100%;
  overflow-x: hidden;
  .scrollMore:hover {
    transition: 300ms;
    transform: translateX(5px);
  }

  .log {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    height: 874px;
    height: 100vh;
    background-color: white;
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
    .design:hover {
      transition: 1s;
      /* filter: invert(1); */
    }

    .form {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      width: 50%;
      height: 100%;
      /* padding-bottom: 3rem; */
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
    .bottomNavBtn {
      border-radius: 10px;
    }
    .bottomNavBtn:hover {
      transition: 1s;
      /* transform: translateY(-2px); */
      background-color: #eeeeee;
    }
    @media screen and (max-width: 1370px) {
      .design {
        display: none;
      }
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  a {
    text-decoration: underline;
    color: grey;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 100;
    margin-top: 1rem;
  }
  /* 
  .inputs {
    flex-direction: column;
    display: flex;
    gap: 2rem;
    padding-bottom: 1rem;
  } */

  .fields {
    color: red;
    width: 75vw;
    max-width: 30rem;
  }

  .section {
    margin-bottom: 15rem;
  }

  .containers {
    /* border: 1px solid black;
    padding: 2rem; */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .btn-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 4rem;
    flex-wrap: wrap;
  }
  .tabBtn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    font-size: 1.25rem;
    letter-spacing: var(--spacing);
    margin: 0 1rem;
    transition: var(--transition);
    cursor: pointer;
    padding: 0.25rem 0;
    line-height: 1;
    letter-spacing: 1px;
  }
  .tabBtn:hover {
    color: red;
  }
  .active-btn {
    color: red;
    box-shadow: 0 2px red;
  }

  .errMsg {
    margin-bottom: 3rem;
    text-align: center;
    height: 1rem;
    color: red;
  }

  /* Section 2 */

  .section2 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .profilePic {
    border-radius: 50%;
    width: 5rem;
  }

  @media screen and (min-width: 800px) {
  }
  @media screen and (min-width: 992px) {
    .section {
      margin-top: 5rem;
      width: 95vw;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      flex-flow: row-reverse;
    }
    .btn-container {
      flex-direction: column;
      justify-content: flex-start;
      gap: 2rem;
      margin-left: 5rem;
      padding: 5rem 0 5rem 5rem;
      border-left: 1px solid black;
    }
    .active-btn {
      padding-left: 5px;
      box-shadow: -2px 0 red;
    }
  }
`;
