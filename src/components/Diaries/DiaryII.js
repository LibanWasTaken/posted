import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DiaryPage from "./DiaryPage";

const DiaryII = ({ isOpen, onClose }) => {
  const [pageAdderOpen, setPageAdderOpen] = useState(false);
  const handlePageAdderOpen = () => {
    setPageAdderOpen(true);
  };
  const handlePageAdderClose = () => {
    setPageAdderOpen(false);
  };

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
      <div className="header">
        <div className="left">
          <span className="material-symbols-outlined" onClick={onClose}>
            close
          </span>
          <h1>Diary</h1>
        </div>

        <span
          className="material-symbols-outlined right"
          onClick={handlePageAdderOpen}
        >
          add
        </span>
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
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
        <div className="note">
          <div className="primary">09 Dec, 2023</div>
          <div className="secondary"> and then this happened</div>
        </div>
        <div className="note">
          <div className="primary">25 Aug, 2023</div>
          <div className="secondary"> why</div>
        </div>
      </div>
      <DiaryPage open={pageAdderOpen} handleClose={handlePageAdderClose} />
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
  backdrop-filter: blur(10px);
  /* transition: height 1s ease-in-out; */
  transition: height 0.3s;

  .header {
    background-color: black;
    color: white;
    display: flex;
    letter-spacing: 1px;

    /* justify-content: space-between; */
    align-items: center;
    width: 100%;
    padding: 5px 1rem;
    .left {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .right {
      position: absolute;
      right: 2rem;
    }
    h1 {
      margin-left: 2rem;
      font-size: 1.5rem;
    }
  }
  .notes {
    padding: 1rem;
    max-height: 80vh;
    overflow: scroll;
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
      background-color: rgba(0, 0, 0, 0.025);
      .primary {
        margin-bottom: 2px;
        font-size: 0.9rem;
        transition: 0.15s ease-in-out;
      }
      .secondary {
        font-size: 1.25rem;
        transition: 0.15s ease-in-out;
      }
    }
  }
  .material-symbols-outlined {
    font-size: 2rem;
    padding: 10px;
  }
  .material-symbols-outlined:hover {
    cursor: pointer;
    transition: 0.3s;
    background-color: #333;
    border-radius: 50%;
    transform: rotate(90deg);
  }
`;

export default DiaryII;
