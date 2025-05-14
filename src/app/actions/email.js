"use server";

import { sendContact } from "@/app/helpers/sendgridmailer";

export async function sendEmail(formData) {
  if (!formData.name || !formData.email || !formData.phone || !formData.message) {
    return {
      success: false,
      error: "All fields are required",
    }
  }

  try {
    await sendContact(formData)
    return {
      success: true,
    }
  } catch (error) {
    console.error("Email error:", error.message)
    return {
      success: false,
      error: error.message || "Failed to send email",
    }
  }
}