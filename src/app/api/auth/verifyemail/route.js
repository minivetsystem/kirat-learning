import { dbConfig } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


dbConfig();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token)
         
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({ error: "Invalide Token or Expired"}, { status: 500 });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({ message: "Email verified successfully" }, { status: 201 },{success: true} );

    }catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}