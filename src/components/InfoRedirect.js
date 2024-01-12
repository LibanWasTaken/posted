import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const InfoRedirect = ({ hash = null, states = null, coloring = "black" }) => {
  return (
    <Wrapper>
      <Link
        to={hash ? `/what-is-this#${hash}` : "/what-is-this"}
        style={{
          textDecoration: "none",
          display: "inline-block",
          opacity: 0.8,
          color: coloring,
          overflow: "hidden",
          height: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //   border: "1px solid red",
        }}
        state={states}
      >
        <InfoOutlinedIcon fontSize="small" />
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem; */
  margin: 0;
  padding: 0;
  display: inline-flex;
  /* border: 1px solid red; */
  /* height: min-content;
  height: max-content;
  align-items: center;
  justify-content: center; */
`;

export default InfoRedirect;
