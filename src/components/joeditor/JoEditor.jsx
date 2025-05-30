"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import "jodit"
import JoditEditor from "jodit-react"
import "./JoEditor.css"

const buttons = [
  "undo",
  "redo",
  "|",
  "bold",
  "strikethrough",
  "underline",
  "italic",
  "|",
  "superscript",
  "subscript",
  "|",
  "align",
  "|",
  "ul",
  "ol",
  "outdent",
  "indent",
  "|",
  "font",
  "fontsize",
  "brush",
  "paragraph",
  "|",
  "image",
  "link",
  "table",
  "|",
  "hr",
  "eraser",
  "copyformat",
  "|",
  "fullsize",
  "selectall",
  "print",
  "|",
  "source",
  "|",
]



export default function JoEditor({ value = "", onChange }) {
  const [content, setContent] = useState(value)
  const [editorLoaded, setEditorLoaded] = useState(false)

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  // Update content when value prop changes
  useEffect(() => {
    if (value !== content) {
      setContent(value)
    }
  }, [value])

  const handleChange = useCallback(
    (newContent) => {
      setContent(newContent)
      if (onChange) {
        onChange(newContent)
      }
    },
    [onChange],
  )

  // Memoize the editor config to prevent recreation on every render
  const editorConfig = useMemo(
    () => ({
      readonly: false,
      toolbar: true,
      spellcheck: true,
      language: "en",
      toolbarButtonSize: "medium",
      toolbarAdaptive: false,
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      askBeforePasteHTML: true,
      askBeforePasteFromWord: true,
      buttons: buttons,
      uploader: {
        url: "/api/upload",
        format: "json",
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        prepareData: (formData) => {
          console.log("Preparing data for upload...")
          console.log(
            "FormData entries:",
            Array.from(formData.entries()).map(([key, value]) => [key, typeof value]),
          )
          return formData
        },
        isSuccess: (resp) => {
          console.log("Upload response received:", resp)
          return resp && resp.success === true
        },
        process: (resp) => {
          console.log("Processing response:", resp)

          // Handle different response structures
          if (resp && resp.file && resp.file.url) {
            return {
              file: {
                url: resp.file.url,
              },
            }
          }

          // Fallback for different response structure
          if (resp && resp.url) {
            return {
              file: {
                url: resp.url,
              },
            }
          }

          console.error("Unexpected response structure:", resp)
          throw new Error("Invalid response structure")
        },
        error: (e) => {
          console.error("Image upload error:", e)
        },
        defaultHandlerSuccess: (data, resp) => {
          console.log("Upload successful!")
          console.log("Data:", data)
          console.log("Response:", resp)

          // Safe access to response data
          const imageUrl = resp?.file?.url || resp?.url || "Unknown URL"
          console.log("Image uploaded successfully to S3:", imageUrl)
        },
        defaultHandlerError: (resp) => {
          console.error("Upload error response:", resp)
        },
      },
      width: "100%",
      height: 400,
      imageProcessor: {
        replaceDataURIToBlobIdInView: false,
      },
      // Additional stability options
      cleanHTML: {
        timeout: 300,
      },
      beautifyHTML: false,
      // Prevent editor from reinitializing
      triggerChangeEvent: false,
    }),
    [],
  ) // Empty dependency array means this only runs once

  if (!editorLoaded) {
    return <div className="h-[400px] w-full bg-muted flex items-center justify-center">Loading editor...</div>
  }

  return (
    <div className="w-full border rounded-md overflow-hidden">
      <JoditEditor
        value={content}
        config={editorConfig}
        onChange={handleChange}
        // Add a key to prevent unnecessary re-renders
        key="jodit-editor"
      />
    </div>
  )
}
