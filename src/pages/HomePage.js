import React, { useState } from "react";
import styled from "styled-components";

const HomePage = () => {
  return <Wrapper>Yellow</Wrapper>;
};

const Wrapper = styled.main`
  @mixin breakpoint($point) {
    @media (max-width: $point) {
      @content;
    }
  }
`;

const Theme = styled.main`
  .dark {
  }
`;

export default HomePage;
