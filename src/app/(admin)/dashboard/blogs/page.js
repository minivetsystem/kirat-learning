"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BlogTable from "./BlogTable";
import TopicManagement from "./TopicManagement";
import { authFetch } from "@/components/auth/AuthFetch";

export default function BlogsList() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      setIsLoading(true);
      try {
        const response = await authFetch("/api/blog");
        const data = await response.json();
        setBlogs(data.blogs || []);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog posts</p>
        </div>
        <Link href="/dashboard/addblog">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Post
          </Button>
        </Link>
      </div>

      {/* BlogTable handles both loading and empty states */}
      <BlogTable blogs={blogs} isLoading={isLoading} />

      <div className="mt-8">
        <TopicManagement />
      </div>
    </div>
  );
}
