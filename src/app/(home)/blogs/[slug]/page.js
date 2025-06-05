import BlogDetail from "@/components/blog/BlogDetails";
import { getBlogBySlug } from "@/lib/blogs";


export async function generateMetadata({ params, searchParams }, parent) {
   const { slug } = await params
  const blog = await getBlogBySlug(slug);
  return {
    title: blog?.title,
    description: "This i kirat learning blog",
  };
}


export default async function BlogPage({ params }) {
   const { slug } = await params
  return <BlogDetail slug={slug} />;
}
