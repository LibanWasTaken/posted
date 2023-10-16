import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";

export default function PositionedSnackbar() {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const openSnackbar = (open, position) => {
    setState({ open, ...position });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: state.vertical, horizontal: state.horizontal }}
      open={state.open}
      onClose={handleClose}
      message="I love snacks"
      key={state.vertical + state.horizontal}
    />
  );
}

export function openSnackbar(open, position) {
  PositionedSnackbar.openSnackbar(open, position);
}
