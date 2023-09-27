import { useState, useEffect } from "react";

// Nodes
import ExampleTheme from "./themes/ExampleTheme";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { TRANSFORMERS } from "@lexical/markdown";

// Plugins
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

// Custom Plugins
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

import "./styles.css";

// me:
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useUserContext } from "../../context/UserContext";
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  remove,
} from "firebase/database";

import { getDoc, doc } from "firebase/firestore";
import { db as FSdb } from "../../services/firebase-config";

const editorConfig = {
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
  // editable: false,
};

export default function Editor() {
  const testState = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Well, this is test number ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 1,
              mode: "normal",
              style: "",
              text: "two",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: ".",
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
  const emptyState = {
    root: {
      children: [
        {
          children: [],
          direction: null,
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: null,
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };

  const [editorState, setEditorState] = useState();
  const [editorValue, setEditorValue] = useState(emptyState);
  const [editorValueReceived, setEditorValueReceived] = useState();
  const [editorValueReceivedFS, setEditorValueReceivedFS] = useState();

  const [valueApplied, setValueApplied] = useState(false);
  const { user: currentUser, loading } = useUserContext();
  const db = getDatabase();
  useEffect(() => {
    if (currentUser) {
      // console.log(currentUser);
      const postRef = ref(
        db,
        "users/unposted/" + currentUser.uid + "/post/letter"
      );
      onValue(postRef, (snapshot) => {
        let data = snapshot.val();
        setEditorValueReceived(data);
      });

      getFSData();
    }
  }, [currentUser]);

  async function getFSData() {
    const docRef = doc(FSdb, "posts", "DZL3b9ij1vWSZ4d72aa2");
    const docSnap = await getDoc(docRef);
    const userInfo = docSnap.data();
    setEditorValueReceivedFS(userInfo.letter);
    console.log("editorValueReceivedFS set");
  }

  function OnChangePlugin({ onChange }) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
      setEditorValue(JSON.stringify(editor.getEditorState()));
      return editor.registerUpdateListener((editorState) => {
        onChange(editorState);
      });
    }, [editor, onChange]);
  }

  const UpdatePlugin = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      // Realtime Database
      // if (editorValueReceived && !valueApplied) {
      //   const newEditorState = editor.parseEditorState(editorValueReceived);
      //   editor.setEditorState(newEditorState);
      //   setValueApplied(true);
      // }

      // Firestore
      if (editorValueReceivedFS && !valueApplied) {
        const newEditorState = editor.parseEditorState(editorValueReceivedFS);
        editor.setEditorState(newEditorState);
        setValueApplied(true);
      }
    }, [editorValueReceived, editor, valueApplied]);

    return null; // You can simply return null since you don't need any JSX here
  };

  function updateUserPost() {
    const updates = {};
    updates["/users/unposted/" + currentUser.uid + "/post/letter/"] =
      editorValue;
    update(ref(db), updates);
    console.log("updated");
  }

  function Placeholder() {
    return (
      <div className="editor-placeholder">
        {loading ? (
          "Loading"
        ) : (
          <>
            Leave your legacy or thoughts for posterity... <br />I want
            https://playground.lexical.dev/ here and this for diaries
          </>
        )}
      </div>
    );
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          {/* <TreeViewPlugin /> */}
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <UpdatePlugin />
          <OnChangePlugin
            onChange={(editorState) =>
              setEditorState(JSON.stringify(editorState))
            }
          />
        </div>
        <span
          className={`material-symbols-outlined ${!editorState && "disabled"}`}
        >
          done
        </span>
        {/* <button
          className="classicBtn"
          style={{ margin: 15, position: "relative", right: "-75%" }}
          onClick={() => {
            // console.log(editorValue);
            updateUserPost();
          }}
        >
          Save
        </button> */}
      </div>
    </LexicalComposer>
  );
}
