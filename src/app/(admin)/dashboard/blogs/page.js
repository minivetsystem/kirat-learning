import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

import { revalidatePath } from "next/cache"
import BlogTable from "./BlogTable"
import TopicManagement from "./TopicManagement"

async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return blogs
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export default async function BlogsList() {
  const blogs = await getBlogs()

  // This function will be called by the client component via a server action
  async function handleBlogDeleted(blogId) {
    "use server"
    // Revalidate the blogs page to refresh the data
    revalidatePath("/dashboard/blogs")
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog posts</p>
        </div>
        <Link href="/dashboard/addblog">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Post
          </Button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
            <p className="text-muted-foreground mb-4">Get started by creating your first blog post.</p>
            <Link href="/dashboard/addblog">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create First Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="">
          <BlogTable blogs={blogs}  />
        </div>
      )}
<div className="mt-8">
<TopicManagement />
</div>
      
    </div>
  )
}
