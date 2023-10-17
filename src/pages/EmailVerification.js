import React from "react";
import styled from "styled-components";

const EmailVerification = () => {
  return (
    <Wrapper>
      <h1>Email Verification</h1>
      <h2>Please check your inbox</h2>
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

export default EmailVerification;
