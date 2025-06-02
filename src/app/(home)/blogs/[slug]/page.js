import BlogDetail from "@/components/blog/BlogDetails";




export default async function BlogPage({ params }) {
  const slug = params.slug; // Now safe to use
  return <BlogDetail slug={slug} />;
}
