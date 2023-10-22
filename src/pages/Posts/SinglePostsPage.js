import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { db } from "../../services/firebase-config";
import { doc, getDoc } from "firebase/firestore";

import { Spinner1 } from "../../components/Spinner";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalRichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

// plugins

import AutoLinkPlugin from "../../components/Editor/plugins/AutoLinkPlugin";
import Viewer from "../../components/Editor/Viewer";

function LinkList({ links }) {
  return (
    <div>
      {links.map((link, index) => (
        <div key={index}>
          <h4>{link.primary}</h4>
          <p>{link.secondary}</p>
        </div>
      ))}
    </div>
  );
}

export default function SinglePostPage() {
  const { id } = useParams();
  const [postData, setPostData] = useState();
  const [loading, setLoading] = useState(true);
  const [inValidPost, setInValidPost] = useState(false);

  async function getFSData() {
    try {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      const postDataReceived = docSnap.data();
      console.log(postDataReceived);
      if (postDataReceived == undefined) {
        setInValidPost(true);
        setLoading(false);
      } else {
        setPostData(postDataReceived);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    getFSData();
  }, []);

  const tester = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Okay hopefully this is the ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 1,
              mode: "normal",
              style: "",
              text: "final ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "test of this ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 2,
              mode: "normal",
              style: "",
              text: "saga",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "..",
              type: "text",
              version: 1,
            },
            { type: "linebreak", version: 1 },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Though I ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 8,
              mode: "normal",
              style: "",
              text: "have to change",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: " stuff around...",
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };

  const UpdatePlugin = () => {
    if (postData.letter) {
      const [editor] = useLexicalComposerContext();
      const newEditorState = editor.parseEditorState(postData.letter);
      editor.setEditorState(newEditorState);
      console.log(postData.letter);
    }
  };

  const initialConfig = {
    namespace: "MyEditor",
    editable: false,
    onError(error) {
      throw error;
    },
  };

  return (
    <Wrapper>
      {loading ? (
        <div className="error">
          <Spinner1 />
        </div>
      ) : inValidPost ? (
        <div className="error">
          <h1>Post Not Found</h1>
          <a href="/">
            <button className="classicBtn">Go home</button>
          </a>
        </div>
      ) : (
        <div className="post">
          <section className="info">
            <h1>{postData.title}</h1>
            <h3>{postData.releaseDate}</h3>

            {postData.links && <LinkList links={postData.links} />}

            <div className="diary">
              <button className="classicBtn">Diary</button>
            </div>
            <h4>{postData.user}</h4>
          </section>

          <section className="letter">
            {postData.letter && <Viewer state={postData.letter} />}

            {/* <LexicalComposer initialConfig={initialConfig}>
               <PlainTextPlugin
                contentEditable={<ContentEditable className="editor-input" />}
                placeholder={<div>Loading...</div>}
              /> 
              <UpdatePlugin />
            </LexicalComposer>
            <LexicalComposer initialConfig={initialConfig}>
              <RichTextPlugin
                contentEditable={<ContentEditable className="editor-input" />}
                ErrorBoundary={LexicalErrorBoundary}
                placeholder={<div>Loading...</div>}
              />
              <ContentEditable className="editor-input" />
              <UpdatePlugin />
            </LexicalComposer> */}
          </section>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  /* justify-content: center; */
  margin: 2rem 3rem;
  .post {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    section {
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      padding: 3rem;
      border-radius: 10px;
    }

    .info {
      width: 30%;
      /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
    }

    .letter {
      width: 50%;
    }
  }

  .error {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 100vw;
    height: 50vh;
  }
`;
