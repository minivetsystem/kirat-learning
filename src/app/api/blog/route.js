import { dbConfig } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";


dbConfig();

export async function POST(request) {

    try {

        const formData = await request.formData();
        const image = formData.get("image");
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const path = `./public/uploads/${Date.now()}-${image.name}`;
        await fs.writeFile(path, buffer);
        const imgUrl = `/uploads/${Date.now()}-${image.name}`;


        const blogData = {
            title: formData.get("title"),
            slug: formData.get("slug"),
            description: formData.get("description"),
            category: formData.get("category"),
            tags: formData.get("tags"),
            image: imgUrl,
            status: formData.get("status"),
        };


        const blogDoc = await Blog.create( blogData);

        return NextResponse.json({ message: "Blog created successfully" }, { status: 201 }, { success: true }, blogDoc);

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }


}

