// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   // <React.StrictMode>
//   <App />
//   // </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { isMobile } from "react-device-detect"; // Import the isMobile function
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {isMobile ? ( // Check if the user is on a mobile device
      <h1>Phones not supported, dummy</h1>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
