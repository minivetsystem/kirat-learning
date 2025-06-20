"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import BlogDetailSkeleton from "../loading/BlogDetailsSkeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoveRight, CalendarIcon, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import "./BlogDetails.css";
const getBlogPost = async (slug) => {
  try {
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
  const [blogList, setBlogList] = useState();

  useEffect(() => {
    fetchBlog();
  }, []);

  useEffect(() => {
    if (!slug) return;
    fetchData();
  }, [slug]);

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

  const fetchBlog = async () => {
    try {
      const res = await axios.get("/api/blog");
      setBlogList(res.data);
      setIsLoading(false);
    } catch (error) {
      toast("Failed to load blogs");
    }
  };

  const otherBlogs =
    blogList?.blogs.filter((blog) => blog?.id !== blogPost?.id) || [];

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  return (
    <div className="py-8 lg:py-20">
      <div className="container mx-auto 2xl:px-32 px-8 py-">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {blogPost?.title}
        </h1>

        {blogPost?.coverImage && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={blogPost.coverImage || ""}
              alt={blogPost?.title}
              fill
              className=""
              priority
              sizes="100vw"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blogPost?.description }}
          />
        </div>
      </div>
      <div className="container mx-auto 2xl:px-32 px-8 mt-20">
        <h1 className="text-3xl font-bold mb-5">The Latest</h1>
        <div className="grid md:grid-cols-3 gap-10">
          {otherBlogs?.map((blog) => (
            <Card
              key={blog?.id}
              className="h-full overflow-hidden border-none transition-colors cursor-pointer shadow-none"
            >
              <CardHeader className="p-0 aspect-[16/9] relative overflow-hidden">
                <img
                  src={blog?.coverImage || ""}
                  alt={blog?.title}
                  className="w-full h-full object-cover rounded-b-lg"
                />
                {blog.subject && (
                  <Badge className="absolute top-3 left-3 bg-primary/90 hover:bg-primary">
                    {blog?.subject}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="px-0 py-5 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    <span>{formatDate(blog?.createdAt)}</span>
                  </div>
                  {/* {blog?.readTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{blog?.readTime}</span>
                      </div>
                    )} */}
                </div>
                <Link
                  href={`/blogs/${blog?.slug}`}
                  className="font-bold text-black text-xl leading-tight line-clamp-2 hover:underline"
                >
                  {blog?.title}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
