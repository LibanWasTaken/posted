// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import { UserProvider } from "./context/UserContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ParallaxProvider } from "react-scroll-parallax";

// import { PageTransition } from "@steveeeie/react-page-transition";

import {
  Home,
  Error,
  AccPage,
  OwnPage,
  OwnPostPage,
  UserPage,
  SearchPage,
  SettingsPage,
  SinglePostsPage,
  AllPostsPage,
  Playground,
  EmailVerification,
} from "./pages";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserProvider>
        <ParallaxProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                exact
                path="/verify-email"
                element={<EmailVerification />}
              />
              <Route exact path="/me" element={<OwnPage />} />
              <Route exact path="/me/post/:id" element={<OwnPostPage />} />
              <Route exact path="/user/:uid" element={<UserPage />} />
              <Route exact path="/search" element={<SearchPage />} />
              <Route exact path="/example" element={<SinglePostsPage />} />
              <Route exact path="/posts" element={<AllPostsPage />} />
              <Route exact path="/playground" element={<Playground />} />
              <Route exact path="/account" element={<AccPage />} />
              <Route exact path="/me/them" element={<SettingsPage />} />
              <Route path="/posts/:id" element={<SinglePostsPage />} />

              <Route path="*" element={<Error />} />
            </Routes>
            {/* <Footer /> */}
          </BrowserRouter>
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
//                       <Route exact path="/me/them" element={<SettingsPage />} />
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

/*
https://github.com/Steveeeie/react-page-transition
https://react-scroll-parallax.damnthat.tv/docs/
https://zapier.com/app/dashboard

text editors:
quill
tiptap
draftjs

*/
