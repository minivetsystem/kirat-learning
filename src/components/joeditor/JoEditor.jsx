"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
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
    const [imageMap, setImageMap] = useState(new Map()) // URL -> ID mapping
  const [previousImages, setPreviousImages] = useState([])
const editorRef = useRef(null)
  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  // Update content when value prop changes
  useEffect(() => {
    if (value !== content) {
      setContent(value)
    }
  }, [value])


 // Function to extract image URLs from HTML content
  const extractImageUrls = (htmlContent)=> {
    const imgRegex = /<img[^>]+src="([^">]+)"/g
    const urls = []
    let match

    while ((match = imgRegex.exec(htmlContent)) !== null) {
      const url = match[1]
      // Only include S3 URLs from our bucket
      if (url.includes(process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME || "") || url.includes("s3.")) {
        urls.push(url)
      }
    }
    return urls
  }
 // Function to get image ID from URL using your existing API
  const getImageIdFromUrl = async (imageUrl) => {
    try {
      // Check if we already have the ID cached
      if (imageMap.has(imageUrl)) {
        return imageMap.get(imageUrl)
      }

      // Call your API to get image info by URL
      const response = await fetch(`/api/upload/find-by-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: imageUrl }),
      })

      if (response.ok) {
        const imageData = await response.json()
        const imageId = imageData.id

        // Cache the mapping
        setImageMap((prev) => new Map(prev).set(imageUrl, imageId))

        return imageId
      }

      return null
    } catch (error) {
      console.error("❌ Error getting image ID:", error)
      return null
    }
  }
   // Function to delete image using your existing API
  const deleteImageById = async (imageId) => {
    try {
      console.log("🗑️ Deleting image with ID:", imageId)

      // Use your existing delete API endpoint
      const response = await fetch(`/api/upload/${imageId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        console.log("✅ Image deleted successfully from S3 and database")
        return true
      } else {
        console.error("❌ Failed to delete image")
        return false
      }
    } catch (error) {
      console.error("❌ Error deleting image:", error)
      return false
    }
  }


  
    // Function to handle image deletion when removed from editor
  const handleImageDeletion = async (imageUrl) => {
    console.log("🔍 Processing removed image:", imageUrl)

    const imageId = await getImageIdFromUrl(imageUrl)

    if (imageId) {
      const deleted = await deleteImageById(imageId)
      if (deleted) {
        // Remove from our cache
        setImageMap((prev) => {
          const newMap = new Map(prev)
          newMap.delete(imageUrl)
          return newMap
        })
      }
    } else {
      console.warn("⚠️ Could not find image ID for URL:", imageUrl)
    }
  }

  const handleChange = useCallback(
    (newContent) => {
      setContent(newContent)

      // Extract current images from new content
      const currentImages = extractImageUrls(newContent)

      // Find images that were removed
      const removedImages = previousImages.filter((url) => !currentImages.includes(url))

      // Delete removed images using your existing API
      removedImages.forEach((imageUrl) => {
        console.log("🔍 Detected removed image:", imageUrl)
        handleImageDeletion(imageUrl)
      })

      // Update previous images list
      setPreviousImages(currentImages)

      if (onChange) {
        onChange(newContent)
      }
    },
    [onChange, previousImages, imageMap],
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
          console.log("🔄 Preparing data for upload...")
          console.log(
            "FormData entries:",
            Array.from(formData.entries()).map(([key, value]) => [key, typeof value]),
          )
          return formData
        },
        isSuccess: (resp) => {
          console.log("✅ Upload response received:", resp)
          const isSuccess = resp && resp.success === true
          console.log("Is success:", isSuccess)
          return isSuccess
        },
        process: (resp) => {
          console.log("🔄 Processing response:", resp)

          // Handle different response structures
          if (resp && resp.file && resp.file.url) {
            console.log("✅ Found file URL:", resp.file.url)
            return {
              file: {
                url: resp.file.url,
              },
            }
          }

          // Fallback for different response structure
          if (resp && resp.url) {
            console.log("✅ Found URL:", resp.url)
            return {
              file: {
                url: resp.url,
              },
            }
          }

          console.error("❌ Unexpected response structure:", resp)
          throw new Error("Invalid response structure")
        },
        error: (e) => {
          console.error("❌ Image upload error:", e)
        },
        defaultHandlerSuccess: (data, resp) => {
          console.log("🎉 Upload successful!")
          console.log("Data:", data.file.url)
          console.log("Response:", resp)

          // Safe access to response data
          const imageUrl = data?.file?.url || "Unknown URL"
          console.log("✅ Image uploaded successfully to S3:", imageUrl)

          // Force editor to refresh/update
          setTimeout(() => {
              if (editorRef.current) {
                console.log("🔄 Manually inserting image into editor...")
                const editor = editorRef.current
                const imgHtml = `<img src="${imageUrl}" alt="Uploaded image" style="" />`

                try {
                  // Try to insert at cursor position
                  editor.selection.insertHTML(imgHtml)
                  console.log("✅ Image inserted successfully")
                } catch (insertError) {
                  console.error("❌ Failed to insert image:", insertError)
                  // Fallback: append to end of content
                  const currentContent = editor.value
                  editor.value = currentContent + imgHtml
                  console.log("✅ Image appended to content as fallback")
                }
              }
            }, 100)
        },
        defaultHandlerError: (resp) => {
          console.error("❌ Upload error response:", resp)
        },
      },
      width: "100%",
      height: 400,
      imageProcessor: {
        replaceDataURIToBlobIdInView: false,
      },
      // Image-specific settings
      image: {
        openOnDblClick: true,
        editSrc: true,
        useImageEditor: true,
        editTitle: true,
        editAlt: true,
        editLink: true,
        editSize: true,
        editBorderRadius: true,
        editMargins: true,
        editClass: true,
        editStyle: true,
        editId: true,
        resizer: true,
        resizeUsingPercent: false,
        resizeHandleSize: 10,
      },
      // Additional stability options
      cleanHTML: {
        timeout: 300,
      },
      beautifyHTML: false,
      // Prevent editor from reinitializing
      triggerChangeEvent: false,
      // Enable image drag and drop
      enableDragAndDropFileToEditor: true,
      // Image upload settings
      insertImageAsBase64URI: false,
    }),
    [],
  ) // Empty dependency array means this only runs once

  if (!editorLoaded) {
    return <div className="h-[400px] w-full bg-muted flex items-center justify-center">Loading editor...</div>
  }

  return (
    <div className="w-full border rounded-md overflow-hidden">
      <JoditEditor
      ref={editorRef}
        value={content}
        config={editorConfig}
        onChange={handleChange}
        // Add a key to prevent unnecessary re-renders
        key="jodit-editor"
      />
    </div>
  )
}
