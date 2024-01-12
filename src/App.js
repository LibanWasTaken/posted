import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import { UserProvider } from "./context/UserContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ParallaxProvider } from "react-scroll-parallax";

// import { PageTransition } from "@steveeeie/react-page-transition";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  Home,
  Error,
  AccPage,
  OwnPage,
  OwnPostPage,
  UserPage,
  SearchPage,
  ToasterFixer,
  SinglePostsPage,
  AllPostsPage,
  Playground,
  MessagePage,
  Messages,
  Information,
} from "./pages";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Raleway",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#fff",
    },
  },
});

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserProvider>
        <ParallaxProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Navbar />
              {/* TODO: add a option to hide the navbar, only let the pfp stay and maybe a small logo (absolute positioned) */}
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/message" element={<MessagePage />} />
                <Route exact path="/me" element={<OwnPage />} />
                <Route
                  exact
                  path="/me/post/:id"
                  element={
                    //<div className="bgWhiteSmoke">
                    <OwnPostPage />
                    //</div>
                  }
                />
                <Route exact path="/user/:uid" element={<UserPage />} />
                <Route exact path="/search" element={<SearchPage />} />
                <Route exact path="/example" element={<SinglePostsPage />} />
                <Route exact path="/posts" element={<AllPostsPage />} />
                <Route exact path="/playground" element={<Playground />} />
                <Route
                  exact
                  path="/account/:whichInfo?"
                  element={<AccPage />}
                />
                <Route exact path="/messages" element={<Messages />} />
                <Route exact path="/what-is-this" element={<Information />} />
                <Route exact path="/toaster_fixer" element={<ToasterFixer />} />
                <Route path="/posts/:id" element={<SinglePostsPage />} />
                <Route path="/messages/:chatID" element={<Messages />} />
                <Route path="*" element={<Error />} />
              </Routes>
              {/* <Footer /> */}
            </BrowserRouter>
          </ThemeProvider>
        </ParallaxProvider>
      </UserProvider>
    </LocalizationProvider>
  );
}

// function App() {
//   // let location = useLocation();
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <UserProvider>
//         <ParallaxProvider>
//           <BrowserRouter>
//             <Navbar />
//             <Routes>
//               <Route
//                 path="*"
//                 element={({ location }) => (
//                   <PageTransition
//                     preset="moveToLeftFromRight"
//                     transitionKey={location.pathname}
//                   >
//                     <Routes location={location}>
//                       <Route exact path="/" element={<Home />} />
//                       <Route exact path="/me" element={<OwnPage />} />
//                       <Route exact path="/search" element={<SearchPage />} />
//                       <Route
//                         exact
//                         path="/example"
//                         element={<SinglePostsPage />}
//                       />
//                       <Route exact path="/posts" element={<AllPostsPage />} />
//                       <Route
//                         exact
//                         path="/playground"
//                         element={<Playground />}
//                       />
//                       <Route exact path="/account" element={<AccPage />} />
//                       <Route exact path="/me/them" element={<ToasterFixer />} />
//                       <Route path="/posts/:id" element={<SinglePostsPage />} />

//                       <Route path="*" element={<Error />} />
//                     </Routes>
//                   </PageTransition>
//                 )}
//               />
//             </Routes>
//             {/* <Footer /> */}
//           </BrowserRouter>
//         </ParallaxProvider>
//       </UserProvider>
//     </LocalizationProvider>
//   );
// }

export default App;
