"use client"

import { useState, useEffect } from "react"
import "jodit";
import JoditEditor from "jodit-react";
import "./JoEditor.css"
const copyStringToClipboard = (str) => {
  var el = document.createElement("textarea")
  el.value = str
  el.setAttribute("readonly", "")
  el.style.position = "absolute"
  el.style.left = "-9999px"
  document.body.appendChild(el)
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
}

const facilityMergeFields = [
  "FacilityNumber",
  "FacilityName",
  "Address",
  "MapCategory",
  "Latitude",
  "Longitude",
  "ReceivingPlant",
  "TrunkLine",
  "SiteElevation"
];
const inspectionMergeFields = [
  "InspectionCompleteDate",
  "InspectionEventType"
];



const createOptionGroupElement = (mergeFields, optionGrouplabel) => {
  const optionGroupElement = document.createElement("optgroup")
  optionGroupElement.setAttribute("label", optionGrouplabel)
  for (let index = 0; index < mergeFields.length; index++) {
    const optionElement = document.createElement("option")
    optionElement.setAttribute("class", "merge-field-select-option")
    optionElement.setAttribute("value", mergeFields[index])
    optionElement.text = mergeFields[index]
    optionGroupElement.appendChild(optionElement)
    selectElement.appendChild(createOptionGroupElement(facilityMergeFields, "Facility"));
      selectElement.appendChild(createOptionGroupElement(inspectionMergeFields, "Inspection"));
  }
  return optionGroupElement
}

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

const editorConfig = {
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
    insertImageAsBase64URI: true,
  },
  width: "100%",
  height: 400,
}



export default function JoEitor({ value = "", onChange }) {
  const [content, setContent] = useState(value)
  const [editorLoaded, setEditorLoaded] = useState(false)

  useEffect(() => {
    setEditorLoaded(true)
   
  }, [])

  const handleChange = (newContent) => {
    setContent(newContent)
    if (onChange) {
      onChange(newContent)
    }
  }

  if (!editorLoaded) {
    return <div className="h-[400px] w-full bg-muted flex items-center justify-center">Loading editor...</div>
  }

  return (
    <div className="w-full border rounded-md overflow-hidden">
      <JoditEditor value={content} config={editorConfig} onChange={handleChange} />
    </div>
  )
}
