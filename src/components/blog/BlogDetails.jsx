import Image from "next/image";
import "./BlogDetails.css";

export default function BlogDetail({ blogPost }) {
  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Blog post not found</h1>
          <p className="mt-2">The blog post you're looking for doesn't exist or may have been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{blogPost.title}</h1>

        {blogPost.coverImage && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={blogPost.coverImage || "/placeholder.svg"}
              alt={blogPost.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: blogPost.description }} />
        </div>

      
      </div>
    </div>
  );
}
