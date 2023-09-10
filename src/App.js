// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import { UserProvider } from "./context/UserContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ParallaxProvider } from "react-scroll-parallax";

import {
  Home,
  Error,
  AccPage,
  OwnPage,
  SearchPage,
  SettingsPage,
  SinglePostsPage,
  AllPostsPage,
  Playground,
} from "./pages";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserProvider>
        <ParallaxProvider>
          <Router>
            <div className="app">
              <Navbar />
              <div className="content">
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/me" element={<OwnPage />} />
                  <Route exact path="/search" element={<SearchPage />} />
                  <Route exact path="/example" element={<SinglePostsPage />} />
                  <Route exact path="/posts" element={<AllPostsPage />} />
                  <Route exact path="/playground" element={<Playground />} />
                  <Route exact path="/account" element={<AccPage />} />
                  <Route exact path="/me/them" element={<SettingsPage />} />
                  <Route path="/posts/:id" element={<SinglePostsPage />} />

                  <Route path="*" element={<Error />} />
                </Routes>
              </div>
              {/* <Footer /> */}
            </div>
          </Router>
        </ParallaxProvider>
      </UserProvider>
    </LocalizationProvider>
  );
}

export default App;

/*
https://github.com/Steveeeie/react-page-transition
https://react-scroll-parallax.damnthat.tv/docs/


*/
