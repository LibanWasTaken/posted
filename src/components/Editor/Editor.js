import { useState, useEffect } from "react";

import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

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
  const [editorState, setEditorState] = useState();
  const [editorValue, setEditorValue] = useState();
  const [editorValueRecieved, setEditorValueRecieved] = useState();
  const { user: currentUser, loading } = useUserContext();
  const db = getDatabase();
  if (currentUser) {
    console.log(currentUser);
    const postRef = ref(db, "users/" + currentUser.uid + "/post/letter");
    onValue(postRef, (snapshot) => {
      let data = snapshot.val();
      console.log("V this isnt working, also why twice");
      // setEditorValue(data);
      console.log(data);
    });
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

  const testertest = {
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

  const UpdatePlugin = () => {
    const [editor] = useLexicalComposerContext();

    const onButtonClick = () => {
      const editorState = editor.parseEditorState(JSON.stringify(testertest));
      editor.setEditorState(editorState);
    };

    return (
      <button
        className="classicBtn"
        style={{ margin: 10 }}
        onClick={onButtonClick}
      >
        Update
      </button>
    );
  };

  function updateUserPost() {
    const updates = {};
    updates["/users/" + currentUser.uid + "/post/letter/"] = editorValue;
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
        <button
          className="classicBtn"
          style={{ margin: 10 }}
          onClick={() => {
            console.log(editorValue);
            updateUserPost();
          }}
        >
          Save
        </button>
      </div>
    </LexicalComposer>
  );
}
