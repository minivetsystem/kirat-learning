import { dbConfig } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";


dbConfig();

export async function GET(request, { params }) {
    const id = params.id
    try {
       
      
        const blog = await Blog.findById(id);
   
        return NextResponse.json({data: blog }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// export async function PATCH(request, { params }) {
//     const id = params.blogId
//     try {

//         const formData = await request.formData();
//         const image = formData.get("image");
//         const imageByteData = await image.arrayBuffer();
//         const buffer = Buffer.from(imageByteData);
//         const path = `./public/uploads/${Date.now()}-${image.name}`;
//         await fs.writeFile(path, buffer);
//         const imgUrl = `/uploads/${Date.now()}-${image.name}`;


//         const blogData = {
//             title: formData.get("title"),
//             slug: formData.get("slug"),
//             description: formData.get("description"),
//             category: formData.get("category"),
//             tags: formData.get("tags"),
//             image: imgUrl,
//             status: formData.get("status"),
//         };

//         const blogDoc = await Blog.findByIdAndUpdate(id, blogData, { new: true });

//         // const blogDoc = await Blog.create( blogData);

//         return NextResponse.json({ message: "Blog created successfully" }, { status: 201 }, { success: true }, blogDoc);

//     } catch (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }


// }