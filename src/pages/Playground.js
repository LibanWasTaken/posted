import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import { LinearProgress, Box } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Playground = () => {
  const [openS1, setOpenS1] = useState(false);
  const handleClickS1 = () => {
    setOpenS1(true);
  };
  const handleCloseS1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenS1(false);
  };

  const [openS2, setOpenS2] = useState(false);
  const handleClickS2 = () => {
    setOpenS2(true);
  };
  const handleCloseS2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenS2(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleCloseS1}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseS1}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Wrapper>
      <h1>Playground</h1>

      <Button onClick={handleClickS1}>Open simple snackbar</Button>
      <Button onClick={handleClickS2}>Open loading snackbar</Button>
      {/* <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Note archived"
        severity=""
        action={action}
      /> */}
      <Snackbar open={openS1} autoHideDuration={3000} onClose={handleCloseS1}>
        <Alert
          onClose={handleCloseS1}
          variant="contained"
          severity="error"
          sx={{ width: "100%" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
      <Snackbar open={openS2} autoHideDuration={3000} onClose={handleCloseS2}>
        <Box>
          <Alert
            onClose={handleCloseS2}
            variant="contained"
            severity="success"
            sx={{ width: "100%" }}
          >
            Auto-saving post
          </Alert>
          <LinearProgress variant="query" sx={{ width: "111%" }} />
        </Box>
      </Snackbar>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Playground;
