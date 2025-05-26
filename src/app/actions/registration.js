"use server";

import { sendRegisterEmail } from "@/app/helpers/sendgridmailer";

export async function submitRegistration(formData) {
    const name = formData.get("name")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const DOB = formData.get("DOB")
    const course = formData.get("course")
    const state = formData.get("state")
    const city = formData.get("city")
    const file = formData.get("file")
    const identity = formData.get("identity")
    const consent = formData.get("consent")

  // Validation
  const requiredFields = { name, email, phone }
  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value || value.trim() === "")
    .map(([key, _]) => key)

  if (missingFields.length > 0) {
    return {
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: "Please enter a valid email address",
    }
  }

  // Phone validation (basic)
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  if (!phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))) {
    return {
      success: false,
      error: "Please enter a valid phone number",
    }
  }

  // Consent validation
  if (!consent) {
    return {
      success: false,
      error: "Consent is required to proceed with registration",
    }
  }

  try {
    const registrationData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      DOB,
      course,
      state,
      city,
      file,
      identity,
      consent,
    }

    await sendRegisterEmail(registrationData)

    return {
      success: true,
      message: "Registration submitted successfully! We'll get back to you soon.",
    }
  } catch (error) {
    console.error("Registration submission error:", error.message)
    return {
      success: false,
      error: error.message || "Failed to submit registration. Please try again.",
    }
  }
}