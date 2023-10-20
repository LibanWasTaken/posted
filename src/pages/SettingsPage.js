import React from "react";
import styled from "styled-components";

const SettingsPage = () => {
  return (
    <Wrapper>
      <h1>yeah i dunno what to do here</h1>
      <h2>maybe details</h2>
      <h3>like info</h3>
      <h4>tutorials etc</h4>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

export default SettingsPage;
