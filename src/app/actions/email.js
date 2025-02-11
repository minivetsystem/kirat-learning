"use server";

import { sendContact } from "@/app/helpers/mailer";

export async function sendEmail(formData) {
  try {
    console.log("inside server", formData["email"]);
    // validation
    if (
      !formData["name"] ||
      !formData["email"] ||
      !formData["phone"] ||
      !formData["message"]
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // send verification email

    await sendContact(formData);
  } catch (error) {
    throw new Error(error.massage);
  }
}
