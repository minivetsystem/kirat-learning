import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    // Check if email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Check if username already exists
    const existingUserByUsername = await prisma.user.findFirst({
      where: { username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: 'User with this username already exists' },
        { status: 409 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create the new user with the hashed password
    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    return NextResponse.json(
      { user: newUser, message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
