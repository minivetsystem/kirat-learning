"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "@/hooks/use-toast";
// import JoEitor from "@/components/joeditor/JoEditor";

import dynamic from "next/dynamic";

const JoEitor = dynamic(() => import("@/components/joeditor/JoEditor"), {
  ssr: false,
});

export default function AddBlogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    coverImage: null,
    description: "",
  });
  const [coverImagePreview, setCoverImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        coverImage: file,
      });

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setCoverImagePreview(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");

    setFormData({
      ...formData,
      slug,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your API
      console.log("Form data to submit:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Blog post created",
        description: "Your blog post has been created successfully.",
      });

      // Redirect to blog list or the new blog post
      // router.push('/blog')
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was an error creating your blog post.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Blog Post</CardTitle>
          <CardDescription>
            Create a new blog post with title, slug, cover image, and
            description.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter blog title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    placeholder="enter-blog-slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateSlug}
                  disabled={!formData.title}
                >
                  Generate from Title
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image</Label>
              <Input
                id="coverImage"
                name="coverImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {coverImagePreview && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                  <img
                    src={coverImagePreview || "/placeholder.svg"}
                    alt="Cover preview"
                    className="max-h-40 rounded-md object-cover"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <div className="mt-2">
                <JoEitor
                  value={formData.description}
                  onChange={handleDescriptionChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Blog Post"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
