"use client"





const ImageComponent  = ({ src, altText, width, height, nodeKey }) => {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={altText}
      style={{
        width: width || "auto",
        height: height || "auto",
        maxWidth: "100%",
      }}
    />
  )
}

export default ImageComponent
