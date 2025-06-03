import { prisma } from "./prisma";


export async function getBlogBySlug(slug) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        author: true, // include author info if needed
      },
    });
    return blog;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}


export async function getPublishedBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });

    return blogs;
  } catch (error) {
    console.error("Error fetching published blogs:", error);
    return [];
  }
}

