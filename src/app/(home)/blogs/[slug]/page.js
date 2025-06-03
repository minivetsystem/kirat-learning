import { notFound } from "next/navigation";
import BlogDetail from "@/components/blog/BlogDetails";
import { getBlogBySlug } from "@/lib/blogs";
import { Suspense } from "react";
import BlogDetailSkeleton from "@/components/loading/BlogDetailsSkeleton";


export default async function BlogPage({ params }) {
  const blogPost = await getBlogBySlug(params.slug);

  if (!blogPost) {
    notFound(); // Renders Next.js 404 page
  }

  return (
    <Suspense fallback={<BlogDetailSkeleton />}>
      <BlogDetail blogPost={blogPost} />
    </Suspense>
  );

}
