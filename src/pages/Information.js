import React, { useState } from "react";
import styled from "styled-components";

import MouseTrail from "../components/MouseTrail/MouseTrail";
import BlobCursor from "../components/BlobTracer/BlobCursor";

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
        <Box sx={{ p: 3, marginLeft: 10 }}>
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

const HowToPostPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [commentValue, setCommentValue] = useState();

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    console.log(id, value);
    setCommentValue(value);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const sections2 = [
    {
      title: "What is Posted?",
      tab: "Posted?",
      content: (
        <div>
          <p className="paragraph">
            Posted is a unique app that allows you to send messages to the
            future. It's a platform where you can leave a lasting impact by
            sharing your thoughts, memories, and important information with
            others, even beyond your lifetime.
          </p>
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
      title: "Creating Multiple Posts",
      tab: "Posts",
      content: (
        <div>
          <p className="paragraph">
            With "Posted," you can create and schedule multiple posts. This
            means you can plan messages for various occasions, ensuring that
            your messages are delivered at the right time to the right people.
          </p>
        </div>
      ),
    },
    {
      title: "High Customizability and Flexibility",
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
      tab: "Chat",
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
      title: "Who's running this?",
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
          <p style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            You can{" "}
            <p style={{ textDecoration: "line-through" }}>talk sh!t to</p>
            contact me via the{" "}
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
          </p>
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
                width: "50rem",
              }}
              id="title"
              // label={!userData ? "Log in to comment" : "Comment"} // Fix
              placeholder="What's wrong..?"
              type="text"
              variant="filled"
              value={commentValue}
              inputProps={{ maxLength: 1000 }}
              fullWidth
              multiline
              rows={10}
              onChange={handleInputChange}
              // disabled={!userData || disableComment}
              // focused={commentValue}
            />
            <Button
              sx={{
                letterSpacing: 1,
                fontWeight: 400,
                backgroundColor: "#eee",
                width: "fit-content",
                p: 2,
              }}
              // disabled={!commentValue}
              // onClick={handleSubmit}
            >
              Submit
            </Button>
          </p>
        </div>
      ),
    },
  ];

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <h1 className="title"> {sections2[tabValue].title}</h1>

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
              width: 250,
              minWidth: 250,
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
              <Fade in={section.content}>{section.content}</Fade>
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

  .page {
    width: 90vw;
  }

  h1 {
    margin: 0;
    padding: 0;
  }

  .title {
    color: #333;
    font-size: 2rem;
    /* position: relative; */
    margin: 2rem;
    font-size: 5rem;
    opacity: 0.1;

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

export default HowToPostPage;
