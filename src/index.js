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
  <>
    {/* <React.StrictMode> */}
    {false ? (
      // {isMobile ? (
      <div>
        <h2 style={{ padding: "15px" }}>Phones not supported, dummy</h2>
        <h3 style={{ padding: "5px 15px" }}>Comming soon..</h3>
        <img
          style={{ width: "70vw" }}
          src="https://ih1.redbubble.net/image.1539757087.3943/raf,750x1000,075,t,FFFFFF:97ab1c12de.jpg"
          alt=""
          srcset=""
        />
      </div>
    ) : (
      // <h2>
      //   magnet:?xt=urn:btih:155660DDDDBBA6F161EA7A18893E9BA7F55F2C3E&dn=The+Silence+%282019%29+%5BWEBRip%5D+%5B1080p%5D+%5BYTS%5D+%5BYIFY%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce
      // </h2>
      <App />
    )}
    {/* </React.StrictMode> */}
  </>
);
