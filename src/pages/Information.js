import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";

import { scrollToBottom } from "../functions/functions";
import { useUserContext } from "../context/UserContext";
import { db } from "../services/firebase-config";
import { setDoc, doc } from "firebase/firestore";
import MouseTrail from "../components/MouseTrail/MouseTrail";
import BlobCursor from "../components/BlobTracer/BlobCursor";

import ReCAPTCHA from "react-google-recaptcha";
import dayjs from "dayjs";

import {
  Tabs,
  Tab,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  Fade,
  Grow,
  Link as LinkMui,
  TextField,
  Button,
  CircularProgress,
  Pagination,
} from "@mui/material/";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, marginLeft: 7 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
const theme = createTheme({
  typography: {
    fontFamily: "Raleway",
    fontSize: 15,
    fontWeight: 700,
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

const FadingImage = ({ src, alt }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    // <Fade in={isImageLoaded} timeout={1000}>
    <Fade in={isImageLoaded}>
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        style={{ display: isImageLoaded ? "block" : "none" }}
      />
    </Fade>
  );
};

const PostedGuidePage = () => {
  const { user: currentUser, loading } = useUserContext();
  const [tabValue, setTabValue] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [feedbackValues, setFeedbackValues] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  const [sendingFeedback, setSendingFeedback] = useState(false);
  const { infoNav } = useParams();
  let { state } = useLocation();
  const [infoPage, setInfoPage] = useState(1);
  const handleInfoPageChange = (event, value) => {
    setInfoPage(value);
  };
  useEffect(() => {
    if (state) {
      scrollToBottom(150);

      if (state.tabIndex) {
        setTabValue(state.tabIndex);
      }
      if (state.pageIndex) {
        setInfoPage(state.pageIndex);
      }
    }
  }, [state]);

  useEffect(() => {
    if (currentUser && !(feedbackValues.email && feedbackValues.name)) {
      setFeedbackValues((prevCommentValue) => ({
        ...prevCommentValue,
        email: currentUser.email,
        name: currentUser.displayName,
      }));
    }
  }, [currentUser]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    // console.log(id, value);

    setFeedbackValues((prevCommentValue) => ({
      ...prevCommentValue,
      [id]: value,
    }));
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function captchaCheck(value) {
    // console.log("Captcha value:", value);

    // Check if the value indicates a successful verification
    if (value) {
      console.log("User passed reCAPTCHA!");
      setCaptchaSuccess(true);
    } else {
      console.log("User did not pass reCAPTCHA.");
      setCaptchaSuccess(false);
    }
  }

  async function handleSubmitFeedback() {
    setSendingFeedback(true);
    try {
      const timestamp = String(dayjs().valueOf());
      const feedbackObj = {
        ...feedbackValues,
        ts: timestamp,
      };
      await setDoc(doc(db, "feedback", timestamp), feedbackObj);
      console.log(feedbackObj);
    } catch (error) {
      console.log(error);
      alert("Error sending critic");
    }
    setSendingFeedback(false);
    setTabValue(0);
  }

  const sections2 = [
    {
      title: "What is Posted?",
      tab: "Posted",
      content: (
        <div>
          <p className="paragraph">
            Posted is a unique app that allows you to send messages to the
            future. It's a platform where you can leave a lasting impact by
            sharing your thoughts, memories, and important information with
            others, even beyond your lifetime.
          </p>
          <p>Fast, reliable, safe, lightweight</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste,
            corrupti explicabo. Repellendus, hic est fugiat praesentium sunt
            dolorem itaque perferendis id iusto quibusdam natus et sed nemo at
            modi impedit neque aliquam corporis consequuntur veritatis, voluptas
            asperiores aliquid ullam! Ratione nemo numquam nobis dolorem porro
            quas, iusto vero? Distinctio, itaque.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi
            cupiditate quos quis, amet labore voluptatem dolorem assumenda
            molestias ex mollitia.
          </p>
        </div>
      ),
    },
    {
      title: "Possible Use Cases",
      tab: "For?",
      content: (
        <div>
          <p className="paragraph">
            Posted opens up a world of possibilities for users. Some potential
            use cases include:
          </p>
          <ul className="list">
            <li className="list-item">
              1. <strong>Automated Safety</strong> System Set up a system that
              automatically publishes messages if certain conditions are not
              met, providing a layer of safety.
            </li>
            <li className="list-item">
              2. <strong>Post-Mortem Communication:</strong> Imagine crafting a
              digital legacy that transcends time. With "Posted," you can
              communicate with loved ones, friends, or even the world after
              you've passed away. Leave behind a treasure trove of memories,
              advice, or heartfelt messages, ensuring your voice resonates for
              generations.
            </li>

            <li className="list-item">
              3. <strong>Delayed Post Release:</strong> Utilize the power of
              delayed post release to schedule messages for future events,
              birthdays, or special occasions. Whether it's a heartfelt
              congratulation or a nostalgic reflection, "Posted" allows you to
              plan and share your sentiments at the perfect moment.
            </li>

            <li className="list-item">
              4. <strong>Privacy Controls:</strong> "Posted" puts you in control
              of your content. Adjust the settings to make posts public or
              private, allowing you to curate who has access to your messages.
              With automatically generated keys, ensure that your shared moments
              remain secure and accessible only to those you choose.
            </li>

            <li className="list-item">
              5. <strong>Anonymity:</strong> Explore the freedom of anonymous
              posting on "Posted." Share your thoughts, stories, or advice
              without revealing your identity. This feature enables users to
              express themselves openly and honestly, fostering a space for
              genuine communication.
            </li>

            <li className="list-item">
              6. <strong>Post Disablement:</strong> Life is dynamic, and
              circumstances can change. With "Posted," you have the option to
              disable or retract a post, providing flexibility and control over
              your shared content. Adapt to evolving situations while
              maintaining the integrity of your digital legacy.
            </li>
          </ul>
          <p>
            "Posted" is more than a platform; it's a canvas for your stories, a
            vault for your sentiments, and a conduit for the timeless
            expressions that define you. As you explore these use cases, the
            possibilities are boundless, offering a unique and personal way to
            connect, share, and make an impact that lasts beyond the present
            moment.
          </p>
        </div>
      ),
    },
    {
      title: "Types of Information You Can Store",
      tab: "Like what?",
      content: (
        <div>
          <p className="paragraph">
            Posted provides high customizability in terms of the types of
            messages you can store. Whether it's links, letters, or a diary for
            each day, you have the flexibility to choose the format that suits
            your needs.
          </p>
          <div
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <FadingImage
              src="https://cdn.pixabay.com/photo/2015/10/31/12/00/question-1015308_640.jpg"
              alt="Image 1"
            />
            <FadingImage
              src="https://www.nameslook.com/names/adasdad-nameslook.png"
              alt="Image 1"
            />
            <FadingImage
              src="https://media.istockphoto.com/id/1470130937/photo/young-plants-growing-in-a-crack-on-a-concrete-footpath-conquering-adversity-concept.webp?b=1&s=170667a&w=0&k=20&c=IRaA17rmaWOJkmjU_KD29jZo4E6ZtG0niRpIXQN17fc="
              alt="Image 1"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Posts Features",
      tab: "Posts",
      content: (
        <div>
          {infoPage == 1 && (
            <div className="infoTab">
              <div className="info">
                <h3>1.1 Post containers</h3>
                <p className="paragraph">
                  With Posted, you can create and schedule multiple posts.
                </p>
                <p>
                  This means you can plan messages for various occasions,
                  ensuring that your messages are delivered at the right time to
                  the right people. <br />
                  Begin your Posted journey with, at max, three meaningful
                  posts, creating your digital footprint. Elevate your
                  experience with Posted Premium, unlocking the potential for up
                  to ten cherished messages that define your unique legacy.
                </p>
                <h4>1.1.1 Titles</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias fugit iure labore dolorem voluptatem!
                </p>

                <h4>1.1.2 Release Date</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid ducimus non nulla saepe? Expedita similique ipsam at?
                  Fuga placeat blanditiis atque sed! Ipsam veritatis impedit
                  exercitationem.
                </p>
                <h3>1.2 Others</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cupiditate laboriosam corporis amet velit cum? Velit quis unde
                  dolorum possimus perferendis omnis, iste est
                </p>
              </div>
            </div>
          )}
          {infoPage == 2 && (
            <div className="infoTab">
              <div className="info">
                <h3>2.1 Letter</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                  inventore eum saepe voluptas rerum placeat dolor fugiat, harum
                  esse velit dignissimos praesentium facere veniam suscipit?
                  Vitae nobis officiis dolorem deserunt.
                </p>
                <p>For prem you get Lorem ipsum dolor sit amet.</p>
                <h4>2.1.1 Title</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempora, quaerat.
                </p>
              </div>
              <div className="info">
                <h3 id="1.2">2.2 Diaries</h3>
                <p>
                  Lorem ipsualsjdlakj sdljalsdjlakjs llkjdlakfkuueqo cncoasunc
                  asnls linl jm deserunt.
                </p>
                <p>Only one a day</p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Exercitationem ipsam vel sequi facere ex est. <br /> Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Deserunt
                  voluptatem veritatis ex quisquam consequatur aspernatur
                  distinctio porro, accusamus totam quasi id suscipit eligendi
                  illo adipisci.
                </p>
              </div>
              <div className="info">
                <h3 id="1.2">2.3 Links</h3>
                <p>
                  Lorem ipsualsjdlakj sdljalsdjlakjs llkjdlakfkuueqo cncoasunc
                  asnls linl jm deserunt. Lorem, ipsum dolor sit amet
                  consectetur adipisicing elit. Natus ducimus culpa repudiandae!
                </p>
                <p>Only one a day</p>
                <p>Lorem ipllore Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          )}
          {infoPage == 3 && (
            <div className="infoTab">
              <div className="info">
                <h2>3.1 Release Formats</h2>
                <h3>3.1.1 Schedule</h3>
                <p>
                  <strong>One Time: </strong>The Post will be released at
                  specified date, it cannot be delayed but can be disabled. The
                  user will get warned as wanted.
                </p>
                <p>
                  <strong>Recurring: </strong>The Post will be released at
                  specified intervals unless intervened, it can be delayed for a
                  defined time period or disabled.
                </p>
                <h3>3.1.2 Type</h3>
                <p>
                  <strong>Specified: </strong>saepe voluptas rerum placeat dolor
                  fugiat, harum esse velit dignissimos prLorem ipsum dolor sit
                  amet consectetur adipisicing elit. Magni inventore
                  eumaesentium facere veniam suscipit? Vitae nobis officiis
                  dolorem deserunt.
                </p>
                <p>For prem you get Lorem ipsum dolor sit amet.</p>
                <p>
                  <strong>Preset: </strong>Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sunt fugit dolorum mollitia ut
                  placeat, numquam iste nihil reprehenderit voluptate
                  voluptates, nemo natus a!
                </p>
                <h2>3.2 Delays</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem ea, dicta quasi tempora et alias officiis, iste sed
                  ratione esse, tenetur totam
                </p>
                <h2>3.2 Warnings</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Accusantium voluptatibus maxime pariatur veniam deleniti
                  mollitia iusto dolores? Similique fuga beatae eaque ratione
                  maxime?
                </p>
              </div>
              <div className="info">
                <h3 id="1.2">2.2 Diaries</h3>
                <p>
                  Lorem ipsualsjdlakj sdljalsdjlakjs llkjdlakfkuueqo cncoasunc
                  asnls linl jm deserunt.
                </p>
                <p>Only one a day</p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Exercitationem icusamus totam quasi id suscipit eligendi illo
                  adipisci.
                </p>
              </div>
            </div>
          )}

          <Pagination
            sx={{ m: 5 }}
            count={8}
            page={infoPage}
            onChange={handleInfoPageChange}
          />
        </div>
      ),
    },
    {
      title: "Customizing",
      content: (
        <div>
          <p className="paragraph">
            Posted offers a high level of customizability. You can add
            multimedia content, choose specific recipients, and even set
            recurring messages. This flexibility allows you to tailor your
            messages to your preferences and the preferences of your intended
            audience.
          </p>
        </div>
      ),
    },
    {
      title: "Privacy Features",
      content: (
        <div>
          <p className="paragraph">
            Your privacy is a top priority with Posted. The app ensures that
            your messages are encrypted and securely stored. You have control
            over who receives your messages, providing you with the peace of
            mind that your information is shared only with those you trust.
          </p>
          <img
            src="https://imageio.forbes.com/blogs-images/forbestechcouncil/files/2018/12/canva-photo-editor-3-9.jpg?height=640&width=640&fit=bounds"
            alt=""
          />
          <Fade in={imageLoaded}>
            <img
              src="https://imageio.forbes.com/blogs-images/forbestechcouncil/files/2018/12/canva-photo-editor-3-9.jpg?height=640&width=640&fit=bounds"
              alt=""
              onLoad={handleImageLoad}
            />
          </Fade>
        </div>
      ),
    },
    {
      title: "Built-in Chat System",
      tab: "Messaging",
      content: (
        <div>
          <div>
            <p>
              Welcome to your personal haven within "Posted," where your
              messages become a digital legacy. Here, every post reflects your
              unique voice, and you hold the reins of access. Your messages are
              securely guarded, accessible only with your permission. Embrace
              the freedom to share thoughts, memories, and moments with trusted
              recipients, ensuring that your digital presence remains as private
              or as shared as you desire. Your space, your posts, your
              legacy—guarded by the assurance of utmost privacy.
            </p>
          </div>

          <div>
            <p>
              Your "Posted" page, a vault for cherished words. Personal posts,
              shared selectively. Secure, private, and timeless—your digital
              legacy begins here.
            </p>
          </div>

          <div>
            <p>
              In your "Posted" sanctuary, messages echo your essence.
              Safeguarded and selectively shared, each post carries the weight
              of your digital legacy.
            </p>
          </div>

          <div>
            <p>
              "Posted" goes beyond time capsules—it's a full-fledged messaging
              app. Connect, converse, and share messages seamlessly, creating
              meaningful connections that withstand the test of time.
            </p>
          </div>

          <div>
            <p>
              Welcome to the all-encompassing realm of communication within
              'Posted'—where timeless messaging meets seamless connection.
              Beyond the traditional notion of time capsules, 'Posted' unfolds
              into a fully-fledged messaging app, designed to facilitate
              meaningful interactions that transcend temporal constraints.
            </p>
            <p>
              Engage in conversations that echo across the years, crafting a
              digital dialogue that stands as a testament to enduring
              connections. The platform provides a spectrum of communication
              options, from sending instant messages to scheduling messages for
              the future, ensuring that your expressions resonate exactly when
              intended.
            </p>
            <p>
              The 'Posted' messaging app isn't just a conduit for words; it's a
              conduit for emotions, memories, and the essence of personal
              connection. Embrace the versatility to share your thoughts
              spontaneously or curate messages meticulously for future delivery.
              Communicate with loved ones, friends, or even yourself in a manner
              that aligns with the rhythm of your life.
            </p>
            <p>
              Privacy remains paramount. 'Posted' ensures that your
              conversations are safeguarded, accessible only to those with whom
              you've chosen to share. Whether it's one-on-one exchanges, group
              discussions, or solo reflections scheduled for the future, every
              interaction is a celebration of connection and a tribute to the
              enduring power of communication.
            </p>
          </div>
        </div>
      ),
    },

    {
      title: "Me",
      content: (
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
            architecto earum corrupti dolor numquam sit.
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nam
            omnis possimus et soluta sit culpa voluptatum recusandae laboriosam
            labore.
          </p>
          <p>
            Lorem isit amet cosit amet copsum dolor sit amet consit amet
            cosectetur adipisicing elit. Cum,sit amet cosit amet co architecto
            earum corrupti dolsit amet coor numquam sit.
          </p>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            You can talk shi- You can contact me via the
            <LinkMui
              // underline="always"
              href="#"
              onClick={() => {
                setTabValue(8);
              }}
            >
              {"feedback page"}
            </LinkMui>{" "}
            or email <LinkMui>{"somepeopledoingstuffs@gmail.com"}</LinkMui>
          </span>
        </div>
      ),
    },
    {
      title: "Btw..",
      tab: "Feedback",
      content: (
        <div>
          <p
            className="paragraph"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              sx={{
                m: 1,
                width: "50ch",
              }}
              id="comment"
              // label={!userData ? "Log in to comment" : "Comment"} // Fix
              placeholder="What's wrong..?*"
              type="text"
              variant="filled"
              inputProps={{ maxLength: 500 }}
              fullWidth
              multiline
              required
              rows={5}
              onChange={handleInputChange}
              disabled={sendingFeedback}
            />
            <Box sx={{ width: "100%" }}>
              <TextField
                sx={{
                  m: 1,
                  width: "40%",
                  marginBottom: 2,
                }}
                id="name"
                placeholder="Name (optional)"
                type="text"
                variant="outlined"
                defaultValue={feedbackValues.name}
                inputProps={{ maxLength: 20 }}
                onChange={handleInputChange}
                disabled={sendingFeedback}
              />
              <TextField
                sx={{
                  m: 1,
                  width: "50%",
                  marginBottom: 2,
                }}
                id="email"
                placeholder="Email*"
                type="email"
                variant="outlined"
                required
                defaultValue={feedbackValues.email}
                inputProps={{ maxLength: 50 }}
                onChange={handleInputChange}
                disabled={sendingFeedback}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
                position: "relative",
              }}
            >
              <CircularProgress
                sx={{ position: "absolute", left: "25%", zIndex: 0 }}
              />
              <Box sx={{ zIndex: 1, minWidth: 300, minHeight: 80 }}>
                <ReCAPTCHA
                  sitekey="6Ldc4VspAAAAAFzMSR02QEvXimxAnXECuVoHKgJo" // TODO: hide?
                  onChange={captchaCheck}
                  // https://www.google.com/recaptcha/admin/site/693887324/setup
                />
              </Box>
              <Button
                sx={{
                  letterSpacing: 1,
                  fontWeight: 400,
                  backgroundColor: "#eee",
                  width: "fit-content",
                  p: 2,
                }}
                className={sendingFeedback && "loadingClassicBtn"}
                disabled={
                  !feedbackValues.comment ||
                  !feedbackValues.email ||
                  !captchaSuccess ||
                  sendingFeedback
                }
                onClick={handleSubmitFeedback}
              >
                Submit
              </Button>
            </Box>
          </p>
        </div>
      ),
    },
  ];

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <h1 className="title"> {sections2[tabValue].title}</h1>
        <img
          src="https://www.svgrepo.com/show/355324/top-corner.svg"
          alt=""
          srcset=""
          className="cornerImg"
        />

        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            // height: "90vw",
            width: "90vw",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabValue}
            onChange={handleChange}
            selectionFollowsFocus
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 1,
              borderColor: "divider",
              width: 200,
              minWidth: 200,
              // marginRight: 10,
            }}
          >
            {sections2.map((section, index) => (
              <Tab
                key={index}
                label={section.tab || section.title}
                {...a11yProps(index)}
                sx={{
                  textAlign: "right",
                  width: "95%",
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "end",
                }}
              />
            ))}
          </Tabs>

          {sections2.map((section, index) => (
            <TabPanel key={index} value={tabValue} index={index}>
              {/* <Fade in={section.content}>{section.content}</Fade> */}
              {section.content}
            </TabPanel>
          ))}
        </Box>
      </ThemeProvider>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /* margin: 20px; */
  margin: 2rem;
  /* display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; */
  /* width: 70vw; */
  min-height: 100vh;
  overflow-x: hidden;
  .page {
    width: 90vw;
  }

  h1 {
    margin: 0;
    padding: 0;
  }

  .cornerImg {
    position: fixed;
    bottom: 0;
    right: 0;
    transform: rotate(180deg);
    width: 10rem;
    pointer-events: none;
  }

  .title {
    font-size: 2rem;
    /* position: relative; */
    margin: 2rem;
    font-size: 5rem;
    /* opacity: 0.2; */
    color: #000000;

    /* right: 5rem; */
  }

  .subtitle {
    font-family: "Poppins", sans-serif;
    color: #555;
    /* margin-left: 1rem; */
  }

  .paragraph {
    font-family: "Poppins", sans-serif;
    color: #666;
    line-height: 1.6;
    max-width: 60vw;
    display: flex;
    /* align-items: center;
    justify-content: center; */
    flex-direction: column;
    gap: 1rem;
  }

  .infoTab {
    .info {
      h4 {
        margin: 0;
      }
    }
  }

  .section {
    margin-top: 20px;
  }

  .list {
    list-style-type: none;
    padding: 0;
  }

  .list-item {
    margin-bottom: 10px;
  }
`;

export default PostedGuidePage;
