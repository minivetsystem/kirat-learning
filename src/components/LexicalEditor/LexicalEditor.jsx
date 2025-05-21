"use client";


import { $getRoot } from "lexical"
import { useEffect, useState } from "react"

import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table"
import { ListItemNode, ListNode } from "@lexical/list"
import { CodeNode } from "@lexical/code"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { TRANSFORMERS } from "@lexical/markdown"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $generateHtmlFromNodes } from "@lexical/html"

import Toolbar from "./Toolbar"
import ImagePlugin from "./plugins/ImagePlugin"
import ImagesPlugin from "./plugins/ImagesPlugin"
import { ImageNode } from "./nodes/ImageNode"

import "./editor.css"

const theme = {
  ltr: "ltr",
  rtl: "rtl",
  paragraph: "editor-paragraph",
  quote: "editor-quote",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
  },
  list: {
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
    listitem: "editor-listitem",
  },
  image: "editor-image",
  link: "editor-link",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
    code: "editor-text-code",
  },
  code: "editor-code",
}


function onError(error) {
  console.error(error);
}

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus()
  }, [editor])

  return null
}

function BasicCodeStylingPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // Add basic styling to code blocks
    const styleCodeBlocks = () => {
      const codeBlocks = document.querySelectorAll("pre, code")
      codeBlocks.forEach((block) => {
        if (!block.classList.contains("editor-code")) {
          block.classList.add("editor-code")
        }
      })
    }

    // Run once on mount
    styleCodeBlocks()

    // Set up mutation observer to watch for new code blocks
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          styleCodeBlocks()
        }
      })
    })

    // Start observing the editor content
    const editorElement = editor.getRootElement()
    if (editorElement) {
      observer.observe(editorElement, {
        childList: true,
        subtree: true,
      })
    }

    return () => {
      observer.disconnect()
    }
  }, [editor])

  return null
}

function MyErrorBoundary({ children }) {
  return <LexicalErrorBoundary>{children}</LexicalErrorBoundary>
}

export default function LexicalEditor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
   nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
      ImageNode
    ],
   
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Toolbar />
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            aria-placeholder={'Enter some text...'}
            
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
            <AutoFocusPlugin />
            <ListPlugin />
            <LinkPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <BasicCodeStylingPlugin />
    </LexicalComposer>
  );
}