import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import { Spinner1 } from "../components/Spinner";

import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  remove,
} from "firebase/database";

const SettingsPage = () => {
  const { user: currentUser, loading } = useUserContext();
  const [userInfo, setUserInfo] = useState(null);

  // Setting User and Database
  const db = getDatabase();
  useEffect(() => {
    if (currentUser) {
      const infoRef = ref(db, "users/" + currentUser.uid + "/info");
      onValue(infoRef, (snapshot) => {
        let data = snapshot.val();
        s(data);
      });
    }
  }, [currentUser]);

  const userDetails = {
    firstName: "Liban",
    lastName: "",
    middleName: "",
    prefix: "",
    suffix: "",
    dob: "03072004",
    cityOfBirth: "",
    stateOfBirth: "",
    countryOfBirth: "",
    gender: "",
    phoneNumber: "",
    emailAddress: "",
    homeAddress: "",
    mailingAddress: "",
    occupation: "",
    spouse: "",
    children: "",
    bloodType: "",
    mail1: "",
    mail2: "",
    // mail3: emailAddress,
  };
  function updateUserDetails() {
    const updates = {};
    updates["/users/" + currentUser.uid + "/info/"] = userDetails;
    update(ref(db), updates);
    console.log("updated");
  }

  if (userInfo) {
    console.log(userInfo);
    console.log(userInfo.dob);
    console.log(userInfo["dob"]);
  }
  return (
    <Wrapper>
      {loading ? (
        <Spinner1 />
      ) : (
        <div>
          {currentUser ? (
            <div>
              <button className="classicBtn" onClick={updateUserDetails}>
                Submit
              </button>
              <div className="section recipient">
                <h1>Who are you going to send tho? </h1>
                <h4>tip on who to send, how etc</h4>
                <h3>Mail 1, short msg 100 letter</h3>
                <h3>Mail 2, short msg 100 letter</h3>
                <button className="classicBtn">Edit</button>
                <h2>More..</h2>
                <h3>default - mail 3 - self </h3>
                <h3>default - How long should delays - 1month</h3>
                <h3>default - when - 1st day of month</h3>
                <h3>default - - </h3>
              </div>
              <div className="section recipient">
                <h1>Who are you?</h1>
                <h2>how much do u want to reveal</h2>
                <h3>First Name</h3>
                <h3>Last Name</h3>
                <h3>Middle Name</h3>
                <button className="classicBtn">Edit</button>

                <h3>Prefix</h3>
                <h3>Suffix</h3>
                <h3>Date of Birth</h3>
                <h3>City of Birth</h3>
                <h2>more..</h2>

                <h3>State of Birth</h3>
                <h3>Country of Birth</h3>
                <h3>Gender</h3>
                <h3>Phone Number</h3>
                <h3>Email Address</h3>
                <h2>More..</h2>

                <h3>Home Address</h3>
                <h3>Mailing Address</h3>
                <h3>Occupation</h3>
                <h3>Spouse-s</h3>
                <h3>Children-s</h3>
                <h3>Blood Type</h3>
                <h2>MORE..</h2>

                <h3>Medical Conditions</h3>
                <h3>Medications</h3>
                <h3>Social Media Profiles</h3>
                <h3>Online Usernames</h3>
              </div>
            </div>
          ) : (
            <h1>Log in</h1>
          )}
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  /* display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  flex-direction: column; */
  margin: 2rem 0 5rem 2rem;
  .classicBtn {
  }
  .recipient {
    margin-bottom: 3rem;
  }
`;

export default SettingsPage;
