import { dbConfig } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";


dbConfig();

export async function GET() {
    try {
        const blog = await Blog.find({});
        return NextResponse.json({data: blog }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}