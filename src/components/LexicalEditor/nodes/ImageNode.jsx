"use client";

import { DecoratorNode } from "lexical";
import ImageComponent from "./ImageComponent"; // Import the ImageComponent

export class ImageNode extends DecoratorNode {
  constructor(src, altText, width, height, key) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
  }

  static getType() {
    return "image";
  }

  static clone(node) {
    return new ImageNode(node.__src, node.__altText, node.__width, node.__height, node.__key);
  }

  static importJSON(serializedNode) {
    const { src, altText, width, height } = serializedNode;
    return $createImageNode({ src, altText, width, height });
  }

  exportJSON() {
    return {
      src: this.__src,
      altText: this.__altText,
      width: this.__width,
      height: this.__height,
      type: "image",
      version: 1,
    };
  }

  createDOM(config) {
    const span = document.createElement("span");
    const className = config.theme?.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM() {
    return false;
  }

  getSrc() {
    return this.__src;
  }

  getAltText() {
    return this.__altText;
  }

  getWidth() {
    return this.__width;
  }

  getHeight() {
    return this.__height;
  }

  setWidth(width) {
    const writable = this.getWritable();
    writable.__width = width;
  }

  setHeight(height) {
    const writable = this.getWritable();
    writable.__height = height;
  }

  decorate() {
    return (
      <ImageComponent
        src={this.__src || "/placeholder.svg"}
        altText={this.__altText}
        width={this.__width}
        height={this.__height}
        nodeKey={this.__key}
      />
    );
  }
}

export function $createImageNode({ src, altText, width, height, key }) {
  return new ImageNode(src, altText, width, height, key);
}

export function $isImageNode(node) {
  return node instanceof ImageNode;
}
