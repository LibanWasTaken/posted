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

// import "./styles.css";

// me:
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const editorConfig = {
  theme: ExampleTheme,
  onError(error) {
    throw error;
  },
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
  editable: false,
};

export default function Viewer(state) {
  const [incoming, setIncoming] = useState(true);
  const [editorState, setEditorState] = useState(state.state);

  const UpdatePlugin = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      if (editorState) {
        const newEditorState = editor.parseEditorState(editorState);
        editor.setEditorState(newEditorState);
        setIncoming(false);
      }
    }, [state]);

    return null;
  };

  function Placeholder() {
    return (
      <div className="editor-placeholder">
        {incoming ? <>Loading..</> : <>This appears to be empty..</>}
      </div>
    );
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-inner" style={{ border: "1px solid #ddd" }}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <CodeHighlightPlugin />
        <ListPlugin />
        <LinkPlugin />
        <AutoLinkPlugin />
        <ListMaxIndentLevelPlugin maxDepth={7} />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <UpdatePlugin />
      </div>
    </LexicalComposer>
  );
}
