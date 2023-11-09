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
import { useParams } from "react-router-dom";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useUserContext } from "../../context/UserContext";

import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db as FSdb } from "../../services/firebase-config";

import { Box, TextField, Button, Skeleton } from "@mui/material";

// import FloatingTextFormatToolbarPlugin from "./playground/plugins/FloatingTextFormatToolbarPlugin/SpeechToTextPlugin";

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
  const [editorValueReceivedFS, setEditorValueReceivedFS] = useState();
  const [description, setDescription] = useState();
  const [saving, setSaving] = useState(false);
  const [incoming, setIncoming] = useState(true);
  const [changed, setChanged] = useState(false);
  const { id } = useParams();

  const [valueApplied, setValueApplied] = useState(false);
  const { user: currentUser, loading } = useUserContext();
  useEffect(() => {
    if (currentUser) {
      getFSData();
    }
  }, [currentUser]);

  async function getFSData() {
    const docRef = doc(FSdb, "posts", id);
    const docSnap = await getDoc(docRef);
    const userInfo = docSnap.data();
    userInfo.letter && setEditorValueReceivedFS(userInfo.letter);
    userInfo.description && setDescription(userInfo.description);
    setIncoming(false);
    console.log("editor value set");
  }

  function OnChangePlugin({ onChange }) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
      !changed && setChanged(true); //FIXME: changed when loads
      setEditorValue(JSON.stringify(editor.getEditorState()));
      return editor.registerUpdateListener((editorState) => {
        onChange(editorState);
      });
    }, [editor, onChange]);
  }

  const UpdatePlugin = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      if (editorValueReceivedFS && !valueApplied) {
        const newEditorState = editor.parseEditorState(editorValueReceivedFS);
        editor.setEditorState(newEditorState);
        setValueApplied(true);
      }
    }, [editor, valueApplied]);

    return null;
  };

  async function updateUserData() {
    setSaving(true);
    try {
      const postRef = doc(FSdb, "posts", id);
      if (description) {
        await updateDoc(postRef, {
          letter: editorValue,
          description: description,
        });
      } else {
        await updateDoc(postRef, {
          letter: editorValue,
        });
      }
      console.log("Document successfully updated");
      setSaving(false);
    } catch (error) {
      console.error("Error updating document: ", error);
      setSaving(false);
    }
  }

  function Placeholder() {
    return (
      <div className="editor-placeholder">
        {incoming ? (
          <>Loading..</>
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
    <>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <TextField
          sx={{
            marginTop: 0,
            bgcolor: "white",
            "& fieldset": { border: "none" },
            border: "1px solid #eee",
          }}
          fullWidth
          label="Description"
          variant="outlined"
          id="outlined-controlled"
          type="text"
          placeholder="Keep it short"
          value={description || ""}
          inputProps={{ maxLength: 150 }}
          onChange={(e) => {
            !changed && setChanged(true);
            setDescription(e.target.value);
          }}
        />
        <Button
          sx={{
            bgcolor: "white",
            borderColor: "whitesmoke",
          }}
          disabled={!changed}
          className={`${saving && "loadingClassicBtn"}`}
          onClick={updateUserData}
          variant="text"
        >
          save
        </Button>
      </Box>
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
            {/* <FloatingTextFormatToolbarPlugin /> */}
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <UpdatePlugin />
            <OnChangePlugin
              onChange={(editorState) =>
                setEditorState(JSON.stringify(editorState))
              }
            />
          </div>
          {/* <span
            onClick={updateUserData}
            className={`material-symbols-outlined ${
              !editorState && "disabled"
            } ${saving && "loadingClassicBtn"}`}
          >
            save
          </span> */}
        </div>
      </LexicalComposer>
    </>
  );
}
