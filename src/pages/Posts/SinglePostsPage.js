import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  push,
  update,
} from "firebase/database";
import { Spinner1 } from "../../components/Spinner";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

export default function SinglePostPage() {
  const db = getDatabase();
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const prodRef = ref(db, "users/unposted/" + id); // TODO: change to posted later
    onValue(prodRef, (snapshot) => {
      let data = snapshot.val();
      if (!data) {
        setUser("noUser");
      } else {
        setUser(data);
      }
    });
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
    const [editor] = useLexicalComposerContext();
    const newEditorState = editor.parseEditorState(user.post.letter);
    editor.setEditorState(newEditorState);
  };

  const initialConfig = {
    namespace: "MyEditor",
    editable: false,
  };

  return (
    <Wrapper>
      {user && user !== "noUser" ? (
        <div className="section">
          {/* {product.imgs.map((url, index) => (
                  <div className="preview" onClick={() => setMainImg(url)}>
                    <img key={index} src={url} alt="" />
                  </div>
                ))} */}
          <h1>{user.info.firstName}</h1>
          <h3>31 Aug, 2023</h3>
          <LexicalComposer initialConfig={initialConfig}>
            <PlainTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<div>Loading...</div>}
            />
            <UpdatePlugin />
          </LexicalComposer>

          <div className="diary">
            <button className="classicBtn">Diary</button>
          </div>
        </div>
      ) : user == "noUser" ? (
        <div className="error">
          <h1>Post Not Found</h1>
          <a href="/">
            <button className="classicBtn">Go home</button>
          </a>
        </div>
      ) : (
        <div className="error">
          <Spinner1 />
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  /* justify-content: center; */
  margin: 2rem 3rem;
  .section {
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
