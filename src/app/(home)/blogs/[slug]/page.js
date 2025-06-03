import BlogDetail from "@/components/blog/BlogDetails";




export default async function BlogPage({ params }) {
  const slug =await params?.slug; 
  return <BlogDetail slug={slug} />;
}
