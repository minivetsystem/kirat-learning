import BlogDetail from "@/components/blog/BlogDetails";

import BlogDetailSkeleton from "@/components/loading/BlogDetailsSkeleton";

export default async function BlogPage({ params }) {
  const slug = params.slug;
  return <BlogDetail slug={slug} />;
}
