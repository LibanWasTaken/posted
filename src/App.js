// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
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
  const result = AccPage();
  return (
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
            <Route exact path="/account" element={result.jsx} />
            <Route exact path="/me/them" element={<SettingsPage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
