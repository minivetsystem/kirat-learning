import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getAuthUser } from "@/lib/auth";

// AWS S3 config
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


export async function PATCH(request, { params }) {
  const { id } = params;
 const user = await getAuthUser(request)
      if (!user) {
        return NextResponse.json({ error: "Authentication required" }, { status: 401 })
      }
  try {
    const body = await req.json();

    const updated = await prisma.registration.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        dob: new Date(body.dob),
        course: body.course,
        state: body.state,
        city: body.city,
        fileUrl: body.fileUrl || null,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ success: false, error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  const id = context.params.id;
  const user = await getAuthUser(request)
      if (!user) {
        return NextResponse.json({ error: "Authentication required" }, { status: 401 })
      }

  try {
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
    }

    // Fetch the registration to get the file URL
    const registration = await prisma.registration.findUnique({
      where: { id: numericId },
    });

    if (!registration) {
      return NextResponse.json({ success: false, error: "Registration not found" }, { status: 404 });
    }

    // Delete file from S3 if it exists
    if (registration.fileUrl) {
      const fileKey = registration.fileUrl.split(".amazonaws.com/")[1]; // e.g. 'registrations/filename.jpg'

      const deleteCommand = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileKey,
      });

      try {
        await s3Client.send(deleteCommand);
        console.log("Deleted S3 file:", fileKey);
      } catch (s3Error) {
        console.error("Failed to delete S3 file:", s3Error);
      }
    }

    // Delete registration record from DB
    await prisma.registration.delete({
      where: { id: numericId },
    });

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
  }
}
