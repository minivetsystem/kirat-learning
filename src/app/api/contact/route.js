import { dbConfig } from "@/dbConfig/dbConfig";
import Contact from "@/models/contactModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendContact } from "@/helpers/mailer";

dbConfig();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    console.log(reqBody)

    const { name, email, phone, message } = reqBody;

    // validation
    if (!name || !email || !phone || !message) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }

    // send verification email

    await sendContact({email, name, phone, massage: message});

    return NextResponse.json({ message: "Mail send successfully" }, { status: 201 },{success: true} );

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
