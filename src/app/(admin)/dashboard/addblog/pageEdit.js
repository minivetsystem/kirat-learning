"use client";

import {
  $getRoot,
  $getSelection,
} from "lexical";
import {
  TableNode,
  TableRowNode,
  TableCellNode,
  INSERT_TABLE_COMMAND,
} from "@lexical/table";
import { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";

// Theme config (can expand)
const theme = {
  table: "table-auto border-collapse w-full border border-gray-300",
  tableCell: "border border-gray-300 px-2 py-1 text-black",
};

function onChange(editorState) {
  editorState.read(() => {
    const root = $getRoot();
    const selection = $getSelection();
    console.log("Editor content:", root);
    console.log("Current selection:", selection);
  });
}

function onError(error) {
  console.error("Lexical error:", error);
}

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

function InsertTableButton() {
  const [editor] = useLexicalComposerContext();

  const insertTable = () => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      rows: 3,
      columns: 3,
    });
  };

  return (
    <button
      onClick={insertTable}
      className="mb-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
    >
      ➕ Insert Table
    </button>
  );
}

export default function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [TableNode, TableRowNode, TableCellNode],
  };

  return (
    <div className="border border-gray-300 rounded p-4">
      <LexicalComposer initialConfig={initialConfig}>
        <InsertTableButton />
        <PlainTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[150px] outline-none" />
          }
          placeholder={<div className="text-gray-400">Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
        <TablePlugin />
      </LexicalComposer>

      <LexicalEditor />
    </div>
  );
}
