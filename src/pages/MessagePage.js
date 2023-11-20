// import React from "react";
// import styled from "styled-components";

// const EmailVerification = () => {
//   return (
//     <Wrapper>
//       <h1>Email verification sent</h1>
//       <h2>Please check your inbox</h2>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.main`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin-top: 2rem;
// `;

// export default EmailVerification;

import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const MessagePage = () => {
  const location = useLocation();
  const customH1Message = location.state
    ? location.state.customH1Message
    : null;

  return (
    <Wrapper>
      {customH1Message ? (
        <>
          <h1>{customH1Message}</h1>
          <h2>Please check your inbox</h2>
          <p>(might be in spam)</p>
        </>
      ) : (
        <>
          <h1>Uhh</h1>
        </>
      )}
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

export default MessagePage;
