"use client"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useEffect } from "react"


import { $createImageNode, ImageNode} from "../nodes/ImageNode"

export default function ImagesPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
   if (!editor.hasNodes([ImageNode])) {
    throw new Error("ImagePlugin: ImageNode not registered on editor");
  }

    // Handle file drops
    const handleDrop = (event) => {
      event.preventDefault()

      if (!event.dataTransfer) return

      const files = Array.from(event.dataTransfer.files)
      const imageFiles = files.filter((file) => file.type.startsWith("image/"))

      if (imageFiles.length === 0) return

      imageFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          const src = reader.result
          const imagePayload= {
            src,
            altText: file.name,
          }

          editor.dispatchCommand(INSERT_IMAGE_COMMAND, imagePayload)
        }
        reader.readAsDataURL(file)
      })
    }

    // Register the command
    const INSERT_IMAGE_COMMAND = editor.registerCommand(
      "INSERT_IMAGE",
      (payload) => {
        editor.update(() => {
          const imageNode = $createImageNode(payload)
          editor.getEditorState().read(() => {
            const selection = editor.getEditorState()._selection
            if (selection) {
              selection.insertNodes([imageNode])
            }
          })
        })
        return true
      },
      0,
    )

    // Add event listeners
    const editorElement = editor.getRootElement()
    if (editorElement) {
      editorElement.addEventListener("drop", handleDrop)
      editorElement.addEventListener("dragover", (e) => e.preventDefault())
    }

    return () => {
      if (editorElement) {
        editorElement.removeEventListener("drop", handleDrop)
        editorElement.removeEventListener("dragover", (e) => e.preventDefault())
      }
    }
  }, [editor])

  return null
}
