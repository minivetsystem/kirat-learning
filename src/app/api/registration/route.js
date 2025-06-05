import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { getAuthUser } from "@/lib/auth";

// Configure AWS S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function GET(request) {
 const user = await getAuthUser(request)
      if (!user) {
        return NextResponse.json({ error: "Authentication required" }, { status: 401 })
      }
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: registrations });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch registrations" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') 
    const phone = formData.get('phone') 
    const email = formData.get('email')
    const dob = formData.get('DOB') 
    const course = formData.get('course')
    const state = formData.get('state')
    const city = formData.get('city')
    const file = formData.get('file')

    // Validate required fields
    if (!name || !phone || !email || !dob || !course || !state || !city) {
      return NextResponse.json({ error: 'All fields except file are required' }, { status: 400 });
    }

    // Check for duplicate email
    const existingEmail = await prisma.registration.findUnique({
      where: { email },
    });
    if (existingEmail) {
      return NextResponse.json({ success: false, error: "Email already exists" }, { status: 409 });
    }

    // Check for duplicate phone
    const existingPhone = await prisma.registration.findUnique({
      where: { phone },
    });
    if (existingPhone) {
      return NextResponse.json({ success: false, error: "Phone number already exists" }, { status: 409 });
    }

    let fileUrl = null;

    // Handle file upload to S3
     // Handle file upload to S3
    if (file) {
      const fileExtension = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `registrations/${fileName}`,
        Body: buffer,
        ContentType: file.type,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));
      fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/registrations/${fileName}`;
    }

    // Save to database
    const user = await prisma.registration.create({
      data: {
        name,
        phone,
        email,
        dob: new Date(dob),
        course,
        state,
        city,
        fileUrl,
      },
    });

    return NextResponse.json({ success: true, message: "Submitted" }, { status: 201 });
  } catch (error) {
    console.error('Error processing form:', error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}