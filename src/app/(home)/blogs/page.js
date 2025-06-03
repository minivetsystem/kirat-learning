import { Suspense } from "react"
import { getPublishedBlogs } from "@/lib/blogs"
import BlogListSkeleton from "@/components/loading/BlogListSkeleton"
import BlogListPage from "@/components/blog/BlogListPage"

export default async function BlogsPage() {
  const blogs = await getPublishedBlogs()

  return (
    <div>
      <section className="py-8 lg:py-20 bg-primary-midnightBlue">
        <div className="container mx-auto 2xl:px-32 px-8">
          <h1 className="text-white font-extrabold md:text-4xl text-2xl">Kirat Learning Blogs</h1>
        </div>
      </section>
       <Suspense fallback={<BlogListSkeleton />}>
      <BlogListPage blogs={blogs} />
    </Suspense>
    </div>
   
  )
}
