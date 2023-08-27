// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import { UserProvider } from "./context/UserContext";

import {
  Home,
  Error,
  AccPage,
  OwnPage,
  SearchPage,
  SettingsPage,
  SinglePostsPage,
  AllPostsPage,
} from "./pages";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/me" element={<OwnPage />} />
              <Route exact path="/search" element={<SearchPage />} />
              <Route exact path="/example" element={<SinglePostsPage />} />
              <Route exact path="/everyone" element={<AllPostsPage />} />
              <Route exact path="/account" element={<AccPage />} />
              <Route exact path="/me/them" element={<SettingsPage />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
