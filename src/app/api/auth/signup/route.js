import { dbConfig } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

dbConfig();

export async function POST(request) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;
    // validation
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser =  new User({
        username,
        email,
        password: hashedPassword,
    })

    const sevedUser = await newUser.save();
    console.log(sevedUser);

    // send verification email

    await sendEmail({email, emailType: "VERIFY", userId: sevedUser._id})

    return NextResponse.json({ message: "User created successfully" }, { status: 201 },{success: true}, sevedUser );

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
