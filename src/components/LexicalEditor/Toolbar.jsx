"use client"

import { useCallback, useEffect, useState } from "react"
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from "lexical"
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text"
import { $wrapNodes, $isAtNodeEnd, $getSelectionStyleValueForProperty } from "@lexical/selection"
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils"
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, $isListNode, ListNode } from "@lexical/list"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createCodeNode } from "@lexical/code"
import { $createLinkNode, $isLinkNode } from "@lexical/link"

import {
  Bold,
  Italic,
  Underline,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  Link,
  ImageIcon,
  ChevronDown,
} from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
// import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui"

export default function Toolbar() {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [fontSizeValue, setFontSizeValue] = useState("15px")
  const [fontFamily, setFontFamily] = useState("Arial")
  const [isLink, setIsLink] = useState(false)
  const [selectedElementKey, setSelectedElementKey] = useState(null)
  const [blockType, setBlockType] = useState("paragraph")
  const [alignType, setAlignType] = useState("left")

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      // Text formatting
      setIsBold(selection.hasFormat("bold"))
      setIsItalic(selection.hasFormat("italic"))
      setIsUnderline(selection.hasFormat("underline"))
      setIsCode(selection.hasFormat("code"))

      // Check for links
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      setIsLink($isLinkNode(parent) || $isLinkNode(node))

      // Font size and family
      const fontSize = $getSelectionStyleValueForProperty(selection, "font-size", "15px")
      const fontFamily = $getSelectionStyleValueForProperty(selection, "font-family", "Arial")
      setFontSizeValue(fontSize)
      setFontFamily(fontFamily)

      // Block type and alignment
      const anchorNode = selection.anchor.getNode()
      const element = anchorNode.getKey() === "root" ? anchorNode : anchorNode.getTopLevelElementOrThrow()
      const elementKey = element.getKey()
      const elementDOM = activeEditor.getElementByKey(elementKey)

      setSelectedElementKey(elementKey)

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode)
          const type = parentList ? parentList.getListType() : element.getListType()
          setBlockType(type)
        } else {
          const type = element.getType()
          // Check if it's a heading (h1, h2, h3, etc.)
          if (type.startsWith("h") && /^h[1-6]$/.test(type)) {
            setBlockType(type)
          } else {
            setBlockType(type)
          }

          // Alignment
          const textAlign = element.getFormatType()
          setAlignType(textAlign ? textAlign : "left")
        }
      }
    }
  }, [activeEditor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      }),
    )
  }, [editor, updateToolbar])

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "link")
      const url = prompt("Enter URL")
      if (url) {
        editor.update(() => {
          const selection = $getSelection()
          if ($isRangeSelection(selection)) {
            const linkNode = $createLinkNode(url)
            selection.insertNodes([linkNode])
          }
        })
      }
    } else {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "link")
    }
  }, [editor, isLink])

  const insertImage = useCallback(() => {
    const url = prompt("Enter image URL")
    if (url) {
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, { src: url, altText: "Image" })
    }
  }, [editor])

  // Define the image insertion command
  const INSERT_IMAGE_COMMAND = editor.registerCommand(
    "INSERT_IMAGE",
    (payload) => {
      const { src, altText } = payload
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const imageNode = $createImageNode({ src, altText })
          selection.insertNodes([imageNode])
        }
      })
      return true
    },
    0,
  )

  // Helper function to get the current selected node
  function getSelectedNode(selection) {
    const anchor = selection.anchor
    const focus = selection.focus
    const anchorNode = selection.anchor.getNode()
    const focusNode = selection.focus.getNode()
    if (anchorNode === focusNode) {
      return anchorNode
    }
    const isBackward = selection.isBackward()
    if (isBackward) {
      return $isAtNodeEnd(focus) ? anchorNode : focusNode
    } else {
      return $isAtNodeEnd(anchor) ? focusNode : anchorNode
    }
  }

  // Create a custom image node
  function $createImageNode({ src, altText }) {
    return $createImageNode({ src, altText })
  }

  return (
    <div className="toolbar">
      <div className="toolbar-item">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-item">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 px-2 gap-1">
              {fontFamily} <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                activeEditor.update(() => {
                  const selection = $getSelection()
                  if ($isRangeSelection(selection)) {
                    selection.getNodes().forEach((node) => {
                      node.setStyle("font-family: Arial")
                    })
                  }
                })
                setFontFamily("Arial")
              }}
            >
              Arial
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                activeEditor.update(() => {
                  const selection = $getSelection()
                  if ($isRangeSelection(selection)) {
                    selection.getNodes().forEach((node) => {
                      node.setStyle("font-family: Times New Roman")
                    })
                  }
                })
                setFontFamily("Times New Roman")
              }}
            >
              Times New Roman
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                activeEditor.update(() => {
                  const selection = $getSelection()
                  if ($isRangeSelection(selection)) {
                    selection.getNodes().forEach((node) => {
                      node.setStyle("font-family: Courier New")
                    })
                  }
                })
                setFontFamily("Courier New")
              }}
            >
              Courier New
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 px-2 gap-1">
              {fontSizeValue} <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[10, 12, 14, 15, 16, 18, 20, 24, 30, 36, 48, 60, 72].map((size) => (
              <DropdownMenuItem
                key={size}
                onClick={() => {
                  activeEditor.update(() => {
                    const selection = $getSelection()
                    if ($isRangeSelection(selection)) {
                      selection.getNodes().forEach((node) => {
                        node.setStyle(`font-size: ${size}px`)
                      })
                    }
                  })
                  setFontSizeValue(`${size}px`)
                }}
              >
                {size}px
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-item">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
          }}
          className={isBold ? "is-active" : ""}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
          }}
          className={isItalic ? "is-active" : ""}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
          }}
          className={isUnderline ? "is-active" : ""}
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
          }}
          className={isCode ? "is-active" : ""}
          title="Code"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={insertLink} className={isLink ? "is-active" : ""} title="Link">
          <Link className="h-4 w-4" />
        </Button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-item">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 px-2 gap-1">
              {blockType === "paragraph"
                ? "Normal"
                : blockType === "h1"
                  ? "Heading 1"
                  : blockType === "h2"
                    ? "Heading 2"
                    : blockType === "h3"
                      ? "Heading 3"
                      : blockType === "bullet"
                        ? "Bullet List"
                        : blockType === "number"
                          ? "Numbered List"
                          : blockType === "quote"
                            ? "Quote"
                            : blockType === "code"
                              ? "Code Block"
                              : "Normal"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                activeEditor.update(() => {
                  const selection = $getSelection()
                  if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createParagraphNode())
                  }
                })
                setBlockType("paragraph")
              }}
            >
              Normal
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                activeEditor.update(() => {
                  const selection = $getSelection()
                  if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createHeadingNode("h1"))
                  }
                })
                setBlockType("h1")
              }}
            >
              Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                activeEditor.update(() => {
                  const selection = $getSelection()
                  if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createHeadingNode("h2"))
                  }
                })
                setBlockType("h2")
              }}
            >
              Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                activeEditor.update(() => {
                  const selection = $getSelection()
                  if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createHeadingNode("h3"))
                  }
                })
                setBlockType("h3")
              }}
            >
              Heading 3
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                activeEditor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
                setBlockType("bullet")
              }}
            >
              Bullet List
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                activeEditor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
                setBlockType("number")
              }}
            >
              Numbered List
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                activeEditor.update(() => {
                  const selection = $getSelection()
                  if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createQuoteNode())
                  }
                })
                setBlockType("quote")
              }}
            >
              Quote
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                activeEditor.update(() => {
                  const selection = $getSelection()
                  if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createCodeNode())
                  }
                })
                setBlockType("code")
              }}
            >
              Code Block
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-item">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
          }}
          className={alignType === "left" ? "is-active" : ""}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
          }}
          className={alignType === "center" ? "is-active" : ""}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
          }}
          className={alignType === "right" ? "is-active" : ""}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
          }}
          className={alignType === "justify" ? "is-active" : ""}
          title="Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </Button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-item">
        <Button variant="ghost" size="icon" onClick={insertImage} title="Insert Image">
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
