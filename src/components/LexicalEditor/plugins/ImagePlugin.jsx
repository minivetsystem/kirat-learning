"use client"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils"
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,

} from "lexical"
import { useEffect } from "react"


import { $createImageNode } from "../nodes/ImageNode"

export const INSERT_IMAGE_COMMAND= createCommand("INSERT_IMAGE_COMMAND")

export default function ImagePlugin(){
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([$createImageNode])) {
      throw new Error("ImagePlugin: ImageNode not registered on editor")
    }

    return mergeRegister(
      editor.registerCommand<ImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload)
          $insertNodes([imageNode])
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd()
          }

          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    )
  }, [editor])

  return null
}
