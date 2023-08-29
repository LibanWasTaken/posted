import React, { useState, useRef } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import emailjs from "@emailjs/browser";
import { SERVICE_ID, TEMPLATE_ID, USER_PUBLIC_ID } from "../services/constants";

const Search = () => {
  const name = "Liban";
  const [end, setEnd] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, USER_PUBLIC_ID)
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  function ending(e) {
    e.preventDefault();

    setEnd(true);
    setTimeout(() => {
      window.location.replace("/");
    }, 3000);
  }

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#000000",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E0E3E7",
      },
      "&:hover fieldset": {
        borderColor: "#B2BAC2",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#000000",
      },
    },
  });

  return (
    <Wrapper>
      <h4>https://extensions.dev/extensions/firebase/firestore-send-email</h4>
      <form
        ref={form}
        className="form"
        onSubmit={console.log("enable it dummy")}
      >
        {/* <form ref={form} className="form" onSubmit={sendEmail}> */}
        <CssTextField
          id="outlined-basic"
          className="input"
          label="E-mail"
          variant="outlined"
          type="email"
          required
          name="to_mail"
        />
        <CssTextField
          id="outlined-basic"
          className="input"
          label="Name"
          required
          name="from_name"
          variant="outlined"
        />
        <CssTextField
          id="outlined-basic"
          className="input"
          label="Message"
          required
          name="message"
          variant="outlined"
        />
        <CssTextField
          id="outlined-basic"
          className="input"
          label="sender_url"
          required
          name="sender_url"
          variant="outlined"
        />
        <button type="submit" className="classicBtn">
          Submit
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  .form {
    margin: 2rem;
    display: flex;
    flex-direction: column;
    .input {
      margin: 1rem;
    }
  }

  .field {
    margin-bottom: 10px;
  }

  .field label {
    display: block;
    font-size: 12px;
    color: #777;
  }

  .field input {
    display: block;
    min-width: 250px;
    line-height: 1.5;
    font-size: 14px;
  }

  input[type="submit"] {
    display: block;
    padding: 6px 30px;
    font-size: 14px;
    background-color: #4460aa;
    color: #fff;
    border: none;
  }
`;

export default Search;
