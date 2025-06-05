import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import DOMPurify from "dompurify";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  // Handle invalid date input
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  return `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}, ${date.getFullYear()}`;
};

export const truncateHtmlWords = (html, wordLimit) => {
  if (typeof window === "undefined") return ""; 
 
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const text = tempDiv.textContent || "";

  const words = text.split(" ").slice(0, wordLimit).join(" ");
  
  return DOMPurify.sanitize(words + "...");
};