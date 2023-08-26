import React, { useEffect } from "react";
import styled from "styled-components";

const DiaryII = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [onClose]);

  return (
    <Wrapper open={isOpen}>
      <Content open={isOpen}>
        <div className="header">
          <div className="left">
            <span class="material-symbols-outlined" onClick={onClose}>
              close
            </span>
            <h1>Diary</h1>
          </div>

          <span class="material-symbols-outlined right">Save</span>
        </div>

        <div className="notes">
          <div className="note">
            <div className="primary">09 Dec, 2023</div>
            <div className="secondary"> and then this happened</div>
          </div>
          <div className="note">
            <div className="primary">25 Aug, 2023</div>
            <div className="secondary"> why</div>
          </div>
        </div>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.open ? "100%" : "0")};
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(50px);
  transition: height 0.5s ease-in-out;
`;

const Content = styled.div`
  width: 100%;
  transform: translateY(${(props) => (props.open ? "0" : "100%")});
  transition: transform 0.5s ease-in-out;
  .header {
    background-color: black;
    color: white;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    width: 100%;
    padding: 5px 2rem;
    .left {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .right {
      position: absolute;
      right: 3rem;
    }
    h1 {
      margin-left: 2rem;
      font-size: 1.5rem;
    }
  }
  .notes {
    padding: 1rem;
    .note {
      padding: 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      font-weight: 500;
      text-align: left;
      .primary {
        font-size: 1.25rem;
        margin-bottom: 2px;
      }
      .secondary {
        font-size: 0.9rem;
      }
    }
    .note:hover {
      cursor: pointer;
      /* background-color: rgba(0, 0, 0, 0.05); */
      .primary {
        margin-bottom: 2px;
        font-size: 0.9rem;
        transition: 0.3s ease-in-out;
      }
      .secondary {
        font-size: 1.25rem;
        transition: 0.3s ease-in-out;
      }
    }
  }
  .material-symbols-outlined {
    font-size: 2rem;
  }
  .material-symbols-outlined:hover {
    cursor: pointer;
  }
`;

export default DiaryII;
