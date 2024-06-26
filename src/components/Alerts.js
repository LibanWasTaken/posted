// AlertManager.js
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import Grow from "@mui/material/Grow";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={3} ref={ref} variant="filled" {...props} />;
});

const ErrAlert = () => {
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

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  function GrowTransition(props) {
    return <Grow {...props} />;
  }

  const [state, setState] = useState({
    open: false,
    Transition: Fade,
  });

  const handleClick = () => () => {
    setState({
      open: true,
      Transition: Slide,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <>
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
      <div>
        <Button onClick={handleClick}>Slide Transition</Button>
        <Snackbar
          open={state.open}
          onClose={handleClose}
          TransitionComponent={state.Transition}
          message="I love snacks"
          key={state.Transition.name}
          autoHideDuration={1200}
        />
      </div>
    </>
  );
};

export default ErrAlert;
