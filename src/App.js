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
                <Route exact path="/account" element={<AccPage />} />
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

/*
https://github.com/Steveeeie/react-page-transition
https://react-scroll-parallax.damnthat.tv/docs/
https://zapier.com/app/dashboard
https://www.npmjs.com/package/clsx


TODO: https://gsap.com/docs/v3/Installation/
https://github.com/Cuberto/mouse-follower
https://cuberto.com/tutorials/39/

text editors:
quill
tiptap
draftjs
https://www.tiny.cloud/docs/tinymce/6/full-featured-premium-demo/

TODO:

add a whitelist array. to ban/temp ban people. then almost everywhere if(userid == thatId0 dont do it), no need to delete. in case unbanning

https://mui.com/material-ui/react-menu/ -> all post page


https://support.google.com/firebase/answer/7000714?authuser=0
custom domain in mail for pass restting / verification

whatsapp: https://www.youtube.com/watch?v=c0PuGJW2yz8
https://www.youtube.com/watch?v=S9VXgFIY73I
do messenger, fb post, insta, insta post

https://console.firebase.google.com/u/0/project/posted-1413e/authentication/emails

make the private post thing only available to one of the posts (unless prem)
in the user db add post.private etc (for the user page and other stuff and the thing above this)

firebase, one doc has max mb? so letter should be split up/limited

set userName as userID?

maybe be able to switch out the diary and letter? like switch the modal with the, yeah

premium:

4000 letter comments:
10 posts
views and like viewer
more configuration in posts
extra password lock posts
warn everyday in warning-time period (switch)
autosave
history of post-letter
edit diary pages (prev days, but it'll say edited)
post rn instead of tomorrow
archive posts
displayName (infinite changes)


https://www.npmjs.com/package/react-responsive

*/
