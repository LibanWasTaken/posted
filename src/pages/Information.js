import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";

import { scrollToBottom } from "../functions/functions";
import { useUserContext } from "../context/UserContext";
import { db } from "../services/firebase-config";
import { setDoc, addDoc, collection, doc } from "firebase/firestore";
import MouseTrail from "../components/MouseTrail/MouseTrail";
import BlobCursor from "../components/BlobTracer/BlobCursor";
import CornerImg from "assets/top-corner.svg";

import ReCAPTCHA from "react-google-recaptcha";
import dayjs from "dayjs";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  transition: transform 0.3s ease-in-out, z-index 0.3s ease-in-out;
  overflow: hidden;
  position: relative;

  &:hover {
    transform: scale(1.1);
    z-index: 1;
  }

  &:hover > p {
    opacity: 1;
    max-height: 200px; /* Adjust as needed */
  }
`;

const CardHeading = styled.h2`
  margin: 0;
  font-size: 1.2em;
  font-weight: bold;
`;

const CardContent = styled.p`
  margin: 10px 0 0;
  font-size: 0.9em;
  opacity: 0;
  max-height: 0;
  transition: opacity 0.3s ease-in-out, max-height 0.3s ease-in-out;
  overflow: hidden;
`;

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
    } else {
      scrollToBottom(105);
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
      // await setDoc(docaddDoc ,(db, "feedback", timestamp), feedbackObj);

      const docRef = await addDoc(
        collection(db, "returns/feedbacks/feedback"),
        feedbackObj
      );
      console.log("Document written with ID: ", docRef.id);
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
        // <div>
        //   <p className="paragraph">
        //     Posted opens up a world of possibilities for users. Some potential
        //     use cases include:
        //   </p>
        //   <ul className="list">
        //     <li className="list-item">
        //       1. <strong>Automated Safety</strong> System Set up a system that
        //       automatically publishes messages if certain conditions are not
        //       met, providing a layer of safety.
        //     </li>
        //     <li className="list-item">
        //       2. <strong>Post-Mortem Communication:</strong> Imagine crafting a
        //       digital legacy that transcends time. With "Posted," you can
        //       communicate with loved ones, friends, or even the world after
        //       you've passed away. Leave behind a treasure trove of memories,
        //       advice, or heartfelt messages, ensuring your voice resonates for
        //       generations.
        //     </li>

        //     <li className="list-item">
        //       3. <strong>Delayed Post Release:</strong> Utilize the power of
        //       delayed post release to schedule messages for future events,
        //       birthdays, or special occasions. Whether it's a heartfelt
        //       congratulation or a nostalgic reflection, "Posted" allows you to
        //       plan and share your sentiments at the perfect moment.
        //     </li>

        //     <li className="list-item">
        //       4. <strong>Privacy Controls:</strong> "Posted" puts you in control
        //       of your content. Adjust the settings to make posts public or
        //       private, allowing you to curate who has access to your messages.
        //       With automatically generated keys, ensure that your shared moments
        //       remain secure and accessible only to those you choose.
        //     </li>

        //     <li className="list-item">
        //       5. <strong>Anonymity:</strong> Explore the freedom of anonymous
        //       posting on "Posted." Share your thoughts, stories, or advice
        //       without revealing your identity. This feature enables users to
        //       express themselves openly and honestly, fostering a space for
        //       genuine communication.
        //     </li>

        //     <li className="list-item">
        //       6. <strong>Post Disablement:</strong> Life is dynamic, and
        //       circumstances can change. With "Posted," you have the option to
        //       disable or retract a post, providing flexibility and control over
        //       your shared content. Adapt to evolving situations while
        //       maintaining the integrity of your digital legacy.
        //     </li>
        //     <li className="list-item">
        //       6. <strong>Post Disablement:</strong> Life is dynamic, and
        //       circumstances can change. With "Posted," you have the option to
        //       disable or retract a post, providing flexibility and control over
        //       your shared content. Adapt to evolving situations while
        //       maintaining the integrity of your digital legacy.
        //     </li>
        //     <li className="list-item">
        //       1. <strong>Personal Milestones:</strong> Send future birthday or
        //       anniversary wishes, words of encouragement, or life advice to
        //       loved ones.
        //     </li>
        //     <li className="list-item">
        //       2. <strong>Legacy Planning:</strong> Leave important information,
        //       financial details, or final wishes for family members.
        //     </li>
        //     <li className="list-item">
        //       3. <strong>Time Capsules:</strong> Create digital time capsules
        //       filled with memories, photos, and videos to be opened on a
        //       specific date.
        //     </li>
        //     <li className="list-item">
        //       4. <strong>Inspirational Messages:</strong> Share motivational
        //       quotes, life lessons, or your personal story to inspire future
        //       generations.
        //     </li>
        //     <li className="list-item">
        //       5. <strong>Event Reminders:</strong> Schedule reminders for
        //       significant events, anniversaries, or deadlines to ensure they are
        //       remembered and celebrated.
        //     </li>
        //     <li className="list-item">
        //       6. <strong>Post Disablement:</strong> Life is dynamic, and
        //       circumstances can change. With "Posted," you have the option to
        //       disable or retract a post, providing flexibility and control over
        //       your shared content. Adapt to evolving situations while
        //       maintaining the integrity of your digital legacy.
        //     </li>
        //   </ul>
        //   <p>
        //     "Posted" is more than a platform; it's a canvas for your stories, a
        //     vault for your sentiments, and a conduit for the timeless
        //     expressions that define you. As you explore these use cases, the
        //     possibilities are boundless, offering a unique and personal way to
        //     connect, share, and make an impact that lasts beyond the present
        //     moment.
        //   </p>
        // </div>
        <div>
          <h1>Explore the Possibilities with Posted</h1>
          <p>
            Posted opens up a world of possibilities for users. Here are some
            potential use cases:
          </p>

          <h2>Automated Safety System</h2>
          <p>
            Set up a system that automatically publishes messages if certain
            conditions are not met, providing an extra layer of safety and
            assurance.
          </p>

          <h2>Post-Mortem Communication</h2>
          <p>
            Craft a digital legacy that transcends time. Communicate with loved
            ones, friends, or even the world after you've passed away. Leave
            behind memories, advice, or heartfelt messages, ensuring your voice
            resonates for generations.
          </p>

          <h2>Delayed Post Release</h2>
          <p>
            Schedule messages for future events, birthdays, or special
            occasions. Whether it's a heartfelt congratulation or a nostalgic
            reflection, Posted allows you to share your sentiments at the
            perfect moment.
          </p>

          <h2>Privacy and Control</h2>
          <p>
            Posted puts you in control of your content. Adjust settings to make
            posts public or private, curating who has access to your messages.
            Additionally, you have the option to disable or retract a post,
            providing flexibility to adapt to changing circumstances.
          </p>

          <h2>Anonymity</h2>
          <p>
            Enjoy the freedom of anonymous posting. Share your thoughts,
            stories, or advice without revealing your identity, fostering a
            space for genuine and honest communication.
          </p>

          <h2>Personal Milestones</h2>
          <p>
            Send future birthday or anniversary wishes, words of encouragement,
            or life advice to loved ones. Ensure that your messages are received
            at just the right time.
          </p>

          <h2>Legacy Planning</h2>
          <p>
            Leave important information, financial details, or final wishes for
            family members. Securely share critical details that will be
            accessible when needed.
          </p>

          <h2>Time Capsules</h2>
          <p>
            Create digital time capsules filled with memories, photos, and
            videos to be opened on a specific date. Preserve moments and share
            them in the future.
          </p>

          <h2>Inspirational Messages</h2>
          <p>
            Share motivational quotes, life lessons, or your personal story to
            inspire future generations. Use Posted to make a lasting impact with
            your words.
          </p>

          <h2>Event Reminders</h2>
          <p>
            Schedule reminders for significant events, anniversaries, or
            deadlines to ensure they are remembered and celebrated.
          </p>
        </div>
      ),
    },
    {
      title: "Types of Information You Can Store",
      tab: "Like what?",
      content: (
        <div className="expandableCards">
          <div class="card">
            <h3>Personal Milestones</h3>
            <p>
              Store future birthday or anniversary wishes, words of
              encouragement, or life advice to be delivered at specific times.
            </p>
          </div>

          <div class="card">
            <h3>Legacy Planning</h3>
            <p>
              Securely store important information, financial details, or final
              wishes for access by trusted family members.
            </p>
          </div>

          <div class="card active">
            <h3>Time Capsules</h3>
            <p>
              Create digital time capsules filled with memories, photos, and
              videos to be opened on specific dates or events.
            </p>
          </div>

          <div class="card">
            <h3>Inspirational Messages</h3>
            <p>
              Share motivational quotes, life lessons, or personal stories to
              inspire future generations or uplift others.
            </p>
          </div>

          <div class="card">
            <h3>Event Reminders</h3>
            <p>
              Set reminders for significant events, anniversaries, or deadlines
              to ensure they are remembered and celebrated.
            </p>
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
          <div>
            <h2>Customizability in Posted</h2>
            <p>
              Posted offers a <strong>high level of customizability</strong>{" "}
              tailored to meet diverse communication needs. Whether you're
              sharing personal messages, organizing business communications, or
              planning future communications, Posted provides robust features to
              enhance your messaging experience.
            </p>
            <p>Key features include:</p>
            <ul>
              <li>
                Add multimedia content such as images, videos, and documents to
                enrich your messages.
              </li>
              <li>
                Choose specific recipients or groups for targeted communication.
              </li>
              <li>Set recurring messages for regular updates or reminders.</li>
            </ul>
            <p>
              This flexibility empowers users to tailor their messages precisely
              to their preferences and the preferences of their intended
              audience. Whether you're a business professional, educator, or
              individual user, Posted adapts to your unique communication needs.
            </p>
            <p>
              Start using Posted today and experience the difference in
              customizable messaging solutions.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Privacy Features",
      content: (
        <div>
          <div className="backgroundIcon">
            <LockOutlinedIcon sx={{ fontSize: "50vh" }} />
          </div>
          <p className="paragraph">
            Your privacy is a top priority with Posted. The app ensures that
            your messages are encrypted and securely stored. You have control
            over who receives your messages, providing you with the peace of
            mind that your information is shared only with those you trust.
          </p>
          <div>
            <h2>Privacy in Posted</h2>
            <p>
              Your privacy is a <strong>top priority with Posted</strong>. We
              understand the importance of keeping your messages secure and
              confidential. Posted ensures that your messages are encrypted
              end-to-end and securely stored, giving you peace of mind knowing
              that your information is protected from unauthorized access.
            </p>
            <p>
              With Posted, you have control over who can view your messages. You
              can create custom groups or select specific individuals to share
              your messages with. Whether you're sending personal notes,
              business updates, or sharing memories with loved ones, Posted
              allows you to tailor your audience and ensure that your messages
              are seen only by those you choose.
            </p>
            <p>
              This flexibility extends to every message you send. You can set
              permissions and manage access rights, ensuring that sensitive
              information remains confidential and personal communications stay
              private. Whether it's sharing among family members, collaborating
              with colleagues, or communicating with clients, Posted offers
              robust privacy features to meet your needs.
            </p>
            <p>
              Experience the confidence of secure messaging with Posted. Start
              using our platform today and take control of your privacy while
              communicating effectively.
            </p>
          </div>
          {/* <img
            src="https://imageio.forbes.com/blogs-images/forbestechcouncil/files/2018/12/canva-photo-editor-3-9.jpg?height=640&width=640&fit=bounds"
            alt=""
          />
          <Fade in={imageLoaded}>
            <img
              src="https://imageio.forbes.com/blogs-images/forbestechcouncil/files/2018/12/canva-photo-editor-3-9.jpg?height=640&width=640&fit=bounds"
              alt=""
              onLoad={handleImageLoad}
            />
          </Fade> */}
        </div>
      ),
    },
    {
      title: "Built-in Chat System",
      tab: "Messaging",
      content: (
        <div>
          <h2>Stay Connected Anytime, Anywhere</h2>
          <p>
            Our app now features a{" "}
            <strong>full built-in messaging system</strong> that allows you to
            stay connected with your friends, family, and colleagues seamlessly.
            Whether you need to send a quick update, share important
            information, or just catch up, our messaging system has got you
            covered.
          </p>

          <h2>Key Features</h2>
          <p>
            Here are some of the <strong>exciting features</strong> of our
            messaging system:
          </p>
          <ul>
            <li>
              <strong>Real-Time Messaging:</strong> Enjoy instant communication
              with real-time messaging capabilities.
            </li>
            <li>
              <strong>Multimedia Support:</strong> Send and receive photos,
              videos, and documents effortlessly.
            </li>
            <li>
              <strong>Group Chats:</strong> Create group chats to stay connected
              with multiple people at once.
            </li>
            <li>
              <strong>Message History:</strong> Access your message history to
              revisit past conversations.
            </li>
            <li>
              <strong>End-to-End Encryption:</strong> Ensure your conversations
              are private and secure with end-to-end encryption.
            </li>
          </ul>

          <h2>How to Use</h2>
          <p>Getting started with our messaging system is easy:</p>
          <ol>
            <li>
              <strong>Open the App:</strong> Launch the app and navigate to the
              messaging section.
            </li>
            <li>
              <strong>Select a Contact:</strong> Choose a contact or create a
              new group chat.
            </li>
            <li>
              <strong>Start Messaging:</strong> Type your message and hit send.
              It's that simple!
            </li>
          </ol>

          <p>
            Experience the convenience of having all your communications in one
            place with our built-in messaging system. Stay connected, stay
            informed, and enjoy the seamless integration within our app.
          </p>
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
          src={CornerImg}
          alt=""
          srcset=""
          className="cornerImg"
          onClick={() => {
            scrollToBottom(0.01);
          }}
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
    // pointer-events: none;
    cursor: pointer;
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

  .backgroundIcon {
    position: absolute;
    top: 15rem;
    right: 10rem;
    transition: 1s;
    opacity: 0.05;
    /* transform: translateX(15rem) rotate(-5deg); */
    transform: rotate(-5deg);
    user-select: none;
    pointer-events: none;
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

  .expandableCards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    max-width: 55rem;
    .card {
      padding: 1rem;
      height: 100px;
      width: 150px;
      background-color: black;
      color: white;
      border-radius: 10px;
      overflow: hidden;
      h3 {
        margin-top: 0;
      }
      p {
        opacity: 0;
      }
    }
    .card:hover {
      transition: 0.3s;
      /* height: 200px; */
      height: 250px;
      width: 200px;
      p {
        transition: 0.3s;
        border-top: 1px solid #333;
        padding-top: 1rem;
        opacity: 1;
      }
    }
    /* .active {
      height: 250px;
      width: 200px;
      p {
        transition: 0.3s;
        border-top: 1px solid #333;
        padding-top: 1rem;
        opacity: 1;
      }
    } */
  }
`;

export default PostedGuidePage;
