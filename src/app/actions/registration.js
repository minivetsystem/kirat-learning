"use server";

import { sendRegisterEmail } from "@/app/helpers/sendgridmailer";

export async function submitRegistration(formData) {
  console.log("Server action called");

  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const DOB = formData.get("DOB");
    const course = formData.get("course");
    const state = formData.get("state");
    const city = formData.get("city");
    const file = formData.get("file");
    const identity = formData.get("identity");
    const consent = formData.get("consent");

    console.log("Form data extracted:", {
      name,
      email,
      phone,
      DOB,
      course,
      state,
      city,
      identity,
      consent,
      fileSize: file?.size,
    });

    // Validation
    const requiredFields = {
      name,
      email,
      phone,
      DOB,
      course,
      state,
      city,
      identity,
    };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value || value.toString().trim() === "")
      .map(([key, _]) => key);

    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields);
      return {
        success: false,
        error: `Missing required fields: ${missingFields.join(", ")}`,
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email:", email);
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    // Phone validation (basic)
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-()]/g, ""))) {
      console.log("Invalid phone:", phone);
      return {
        success: false,
        error: "Please enter a valid phone number",
      };
    }

    // Consent validation
    if (consent !== "true") {
      console.log("Consent not given:", consent);
      return {
        success: false,
        error: "Consent is required to proceed with registration",
      };
    }

    // File size validation (if file exists)
    if (file && file.size > 10 * 1024 * 1024) {
      console.log("File too large:", file.size);
      return {
        success: false,
        error: "File size should not exceed 10MB",
      };
    }

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
    };

    console.log("Attempting to send email...");
    await sendRegisterEmail(registrationData);
    console.log("Email sent successfully");

    return {
      success: true,
      message:
        "Registration submitted successfully! We'll get back to you soon.",
    };
  } catch (error) {
    console.error("Registration submission error:", error);

    // Return a more specific error message
    let errorMessage = "Failed to submit registration. Please try again.";

    if (error.message.includes("SendGrid")) {
      errorMessage =
        "Email service is temporarily unavailable. Please try again later.";
    } else if (
      error.message.includes("network") ||
      error.message.includes("timeout")
    ) {
      errorMessage =
        "Network error. Please check your connection and try again.";
    } else if (
      error.message.includes("file") ||
      error.message.includes("attachment")
    ) {
      errorMessage =
        "File upload failed. Please try with a smaller file or try again.";
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}
