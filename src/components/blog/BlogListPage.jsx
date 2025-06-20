"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DOMPurify from "dompurify";
import { MoveRight, CalendarIcon, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ComingSoonPage from "@/app/(home)/comingsoon/page";
import BlogListSkeleton from "../loading/BlogListSkeleton";
import axios from "axios";

const truncateHtmlWords = (html, wordLimit) => {
  if (typeof window === "undefined") return "";

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || "";
  const words = text.split(" ").slice(0, wordLimit).join(" ");
  return DOMPurify.sanitize(words + "...");
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.toLocaleString("default", {
    month: "short",
  })} ${date.getDate()}, ${date.getFullYear()}`;
};

export default function BlogListPage({ blogs }) {
  const [blogList, setBlogList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await axios.get("/api/blog");
      setBlogList(res.data);
      setIsLoading(false);
    } catch (error) {
      toast("Failed to load blogs");
    }
  };
  if (isLoading) {
    return <BlogListSkeleton />;
  }
  if (!blogList?.blogs || blogList?.blogs.length === 0) {
    return <ComingSoonPage />;
  }

  const firstBlog = blogList?.blogs?.[0] || null;
  const otherBlogs = blogList?.blogs.length > 1 ? blogList?.blogs.slice(1) : [];

  return (
    <div>
      <section className="py-8 lg:py-20">
        <div className="container mx-auto 2xl:px-32 px-8 gap-10 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <p className="font-bold">Blog</p>
            <Link href={`/blogs/${firstBlog.slug}`}>
              <h1 className="font-bold text-3xl">{firstBlog.title}</h1>
            </Link>
            <div className="flex gap-4 text-muted-foreground">
              <p>{firstBlog.author?.name}</p>
              <p>{formatDate(firstBlog.createdAt)}</p>
            </div>
            <div
              className="prose max-w-none text-lg mt-5"
              dangerouslySetInnerHTML={{
                __html: truncateHtmlWords(firstBlog?.description, 80),
              }}
            />
            <Link href={`/blogs/${firstBlog.slug}`}>
              <button className="flex gap-2 mt-5 items-center">
                Read More{" "}
                <span className="bg-yellow-200 rounded-full p-1">
                  <MoveRight className="w-4 h-4" />
                </span>
              </button>
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={firstBlog.coverImage || "/placeholder.svg"}
              alt={firstBlog.title}
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="container mx-auto 2xl:px-32 px-8 mt-20">
          <h1 className="text-3xl font-bold mb-5">The Latest</h1>
          <div className="grid md:grid-cols-3 gap-10">
            {otherBlogs.map((blog) => (
              <Card
                key={blog.id}
                className="h-full overflow-hidden border-none transition-colors cursor-pointer shadow-none"
              >
                <CardHeader className="p-0 aspect-[16/9] relative overflow-hidden">
                  <img
                    src={blog.coverImage || "/placeholder.svg"}
                    alt={blog.title}
                    className="w-full h-full object-cover rounded-b-lg"
                  />
                  {blog.subject && (
                    <Badge className="absolute top-3 left-3 bg-primary/90 hover:bg-primary">
                      {blog.subject}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="px-0 py-5 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    {blog.readTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{blog.readTime}</span>
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="font-bold text-black text-xl leading-tight line-clamp-2 hover:underline"
                  >
                    {blog.title}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
