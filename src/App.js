// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Home, Error, AccPage, OwnPage } from "./pages";

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
            <Route exact path="/account" element={result.jsx} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
