"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import BlogDetailSkeleton from "../loading/BlogDetailsSkeleton";

const getBlogPost = async (slug) => {
  try {
    // Fix the API endpoint URL - remove the extra "slug/" in the path
    const res = await axios.get(`/api/blog/slug/${slug}`);

    if (res.status === 404) {
      return null;
    }

    if (res.status !== 200) {
      throw new Error("Failed to fetch blog post");
    }

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }
};

export default function BlogDetail({ slug }) {
  const [blogPost, setBlogPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const data = await getBlogPost(slug);
        setBlogPost(data);
      } catch (error) {
        console.error("Failed to load blog post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Blog post not found
          </h1>
          <p className="mt-2">
            The blog post you're looking for doesn't exist or may have been
            removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {blogPost.title}
        </h1>

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
          <div dangerouslySetInnerHTML={{ __html: blogPost.description }} />
        </div>

        {blogPost.author && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-600">
                  {blogPost.author.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {blogPost.author.name}
                </h3>
                <p className="text-gray-600">{blogPost.author.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
