import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
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
  signInWithRedirect,
  getRedirectResult,
  getAuth,
} from "firebase/auth";
import { auth, provider, db } from "../services/firebase-config";
import { Spinner3 } from "../components/Spinner";
import { collection, addDoc, getDoc, setDoc, doc } from "firebase/firestore";

import { useUserContext } from "../context/UserContext";
import Settings from "../components/Settings";
import PasswordReset from "../components/modals/PasswordReset";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF0000",
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
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const [passwordResetOpen, setPasswordResetOpen] = useState(false);
  const handlePasswordResetOpen = () => setPasswordResetOpen(true);
  const handlePasswordResetClose = () => setPasswordResetOpen(false);

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
    const auth = getAuth();

    // signInWithRedirect(auth, provider)
    //   .then(() => {
    //     // This code will not run since the user is redirected to the Google sign-in page
    //   })
    //   .catch((error) => {
    //     console.error("Error initiating redirect sign-in: ", error);
    //   });
    // getRedirectResult(auth)
    //   .then((result) => {
    //     const user = result.user;
    //     console.log("User authenticated: ", user);
    //     addAccToFireStore(user);
    //   })
    //   .catch((error) => {
    //     console.error("Error getting redirect result: ", error);
    //   });

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("User authenticated: ", user);
        addAccToFireStore(user);
      })
      .catch((error) => {
        console.error("Error getting pop-up result: ", error);
      });
  };

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
        <Spinner3 />
      ) : (
        <ThemeProvider theme={theme}>
          {user ? (
            <section
              className="section2"
              style={{
                paddingTop: "2rem",
              }}
            >
              {/* <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  margin: "2rem",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    user.photoURL ||
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
                  }
                  alt="pfp"
                  className="profilePic"
                />
                <h2>Welcome, {user.displayName}</h2>
              </div> */}

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
            <section className="section ">
              {/* Tab Buttons */}
              <div className="btn-container">
                <button
                  className={`tabBtn ${value === 0 && "active-btn"}`}
                  onClick={() => setValue(0)}
                >
                  LOGIN
                </button>
                <button
                  className={`tabBtn ${value === 1 && "active-btn"}`}
                  onClick={() => setValue(1)}
                >
                  REGISTER
                </button>
                <button className={`tabBtn `} onClick={loginGmail}>
                  GMAIL
                </button>
              </div>
              {value === 0 ? (
                // Sign in tab
                <div className="containers">
                  <div className="inputs">
                    <TextField
                      className="fields"
                      label="Email"
                      type="email"
                      variant="standard"
                      value={loginEmail}
                      onChange={(event) => setLoginEmail(event.target.value)}
                    />
                    <TextField
                      className="fields"
                      label="Password"
                      type="password"
                      variant="standard"
                      value={loginPassword}
                      onChange={(event) => setLoginPassword(event.target.value)}
                    />
                  </div>
                  <p
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={handlePasswordResetOpen}
                  >
                    Forgot your password?
                  </p>
                  <button
                    className={`classicBtn ${
                      btnLoading && "loadingClassicBtn disabledClassicBtn"
                    }`}
                    style={{ marginTop: "4rem" }}
                    onClick={login}
                  >
                    SIGN IN
                  </button>
                  <div className="errMsg">{errMsg !== "" && errMsg}</div>
                  <PasswordReset
                    open={passwordResetOpen}
                    handleClose={handlePasswordResetClose}
                    userMail={loginEmail} // TODO: check if mail
                    // userID={currentUser.uid}
                  />
                </div>
              ) : (
                // Register tab
                <div className="containers">
                  <div className="inputs">
                    <TextField
                      className="fields"
                      label="User Name"
                      variant="filled"
                      value={userName}
                      onChange={(event) => setUserName(event.target.value)}
                    />
                    <TextField
                      className="fields"
                      label="Email"
                      type="email"
                      variant="filled"
                      value={registerEmail}
                      onChange={(event) => setRegisterEmail(event.target.value)}
                    />
                    <TextField
                      className="fields"
                      label="Password"
                      type="password"
                      variant="filled"
                      value={registerPassword}
                      onChange={(event) =>
                        setRegisterPassword(event.target.value)
                      }
                    />
                  </div>
                  <button
                    className={`classicBtn ${
                      btnLoading && "loadingClassicBtn disabledClassicBtn"
                    }`}
                    style={{ marginTop: "4rem" }}
                    onClick={register}
                  >
                    SIGN UP
                  </button>
                  <div className="errMsg">{errMsg !== "" && errMsg}</div>
                </div>
              )}
              {/* <div className="errMsg">{errMsg !== "" && errMsg}</div> */}
            </section>
          )}
        </ThemeProvider>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  /* font-family: "Poppins", sans-serif; */

  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* padding: 5rem; */

  a {
    text-decoration: underline;
    color: grey;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 100;
    margin-top: 1rem;
  }

  .inputs {
    flex-direction: column;
    display: flex;
    gap: 2rem;
    padding-bottom: 1rem;
  }

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
    margin: 3rem;
    text-align: center;
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
