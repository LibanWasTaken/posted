import React, { useState } from "react";
import styled from "styled-components";

const ToasterFixer = () => {
  const [hidden, setHidden] = useState(true);
  const [count, setcount] = useState(0);
  const [hitting, sethitting] = useState(false);

  return (
    <Wrapper>
      {/* <h1>yeah i dunno what to do here</h1>
      <h2>maybe details</h2>
      <h3>like info</h3>
      <h4>tutorials etc</h4> */}
      <h2>toaster fixer: </h2>

      <div className="images">
        {count < 5 ? (
          <img
            src="https://www.shutterstock.com/image-photo/closeup-red-toaster-adhesive-notes-260nw-758180629.jpg"
            alt=""
            srcset=""
          />
        ) : (
          <img
            src="https://media.istockphoto.com/id/173626392/photo/stainless-toaster-with-toast.jpg?s=170667a&w=0&k=20&c=ksS1ZALr-zvIICNFB11BDHr6muVbz8FotVyNrjQEjsE="
            alt=""
            srcset=""
          />
        )}

        {!hidden && (
          <img
            src="https://e7.pngegg.com/pngimages/643/419/png-clipart-hammer-hammer.png"
            alt=""
            srcset=""
            className={`hammer ${hitting && "rotate"}`}
          />
        )}
      </div>
      {!hidden ? (
        <button
          onMouseDown={() => {
            sethitting(true);
          }}
          onMouseUp={() => {
            sethitting(false);
            setcount(count + 1);
            console.log(count);
          }}
        >
          hit that prick {count > 0 && "AGAIn"}
        </button>
      ) : (
        <button
          onClick={() => {
            setHidden(false);
          }}
        >
          fix
        </button>
      )}
      {count > 4 && <h1>Hurray!</h1>}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  img {
    height: 300px;
  }
  button {
    padding: 2rem;
    font-size: 2rem;
  }
  .hammer {
    transform: rotate(90deg);
  }
  .rotate {
    transform: rotate(0deg);
  }

  .images {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  gap: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  flex-direction: column;
`;

export default ToasterFixer;
