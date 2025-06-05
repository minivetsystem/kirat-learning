import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Workbook } from "exceljs";

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany();

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Registrations");

    // Define all columns from your model
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 25 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Date of Birth", key: "dob", width: 15 },
      { header: "Course", key: "course", width: 20 },
      { header: "State", key: "state", width: 20 },
      { header: "City", key: "city", width: 20 },
      { header: "File URL", key: "fileUrl", width: 50 },
      { header: "Created At", key: "createdAt", width: 25 },
    ];

    // Add rows
    registrations.forEach((user) => {
      worksheet.addRow({
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        dob: user.dob.toISOString().split("T")[0], // Format as YYYY-MM-DD
        course: user.course,
        state: user.state,
        city: user.city,
        fileUrl: user.fileUrl || "",
        createdAt: user.createdAt.toISOString(),
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="registrations.xlsx"',
        "Content-Length": buffer.length,
      },
    });
  } catch (error) {
    console.error("Error generating Excel:", error);
    return NextResponse.json(
      { success: false, message: "Failed to generate Excel file" },
      { status: 500 }
    );
  }
}
