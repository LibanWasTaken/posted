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
// import "./stylesPage.css";

// me:
import { useParams } from "react-router-dom";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useUserContext } from "../../context/UserContext";

import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db as FSdb } from "../../services/firebase-config";

import { Box, TextField, Button } from "@mui/material";

// import FloatingTextFormatToolbarPlugin from "./playground/plugins/FloatingTextFormatToolbarPlugin/SpeechToTextPlugin";

export function DiaryEditor({ chooseMessage, text }) {
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

  const [valueApplied, setValueApplied] = useState(false);
  // }, [text]);

  useEffect(() => {
    setValueApplied(false);
  }, []);

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
    // editable: !incoming,
  };

  function OnChangePlugin({ onChange }) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
      chooseMessage(JSON.stringify(editor.getEditorState()));
      return editor.registerUpdateListener((editorState) => {
        onChange(editorState);
      });
    }, [editor, onChange]);
  }

  const UpdatePlugin = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      // console.log("🟩");
      console.log(text);
      if (!valueApplied) {
        // console.log("🟩");
        console.log(text);
        try {
          const newEditorState = editor.parseEditorState(text);
          editor.setEditorState(newEditorState);
          setValueApplied(true);
        } catch (error) {
          editor.setEditorState(editor.parseEditorState(emptyState));
          setValueApplied(true);
          console.error(error);
        }
      }
    }, [editor, valueApplied, text]);

    return null;
  };

  function Placeholder() {
    return (
      <div className="editor-placeholder">
        {/* {incoming ? <>Loading..</> : <>Leave your thoughts for posterity..</>} */}
        <>Leave your thoughts for posterity..</>
      </div>
    );
  }

  return (
    <>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  contentEditable={false}
                  className="editor-input"
                />
              }
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
        </div>
      </LexicalComposer>
    </>
  );
}
