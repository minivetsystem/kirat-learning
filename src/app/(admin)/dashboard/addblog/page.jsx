"use client";

import { useState, useEffect, useCallback } from "react";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";
import { Loader2, Upload, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { authFetch } from "@/components/auth/AuthFetch";

const JoEditor = dynamic(() => import("@/components/joeditor/JoEditor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[500px] border rounded-md flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Loading editor...</p>
      </div>
    </div>
  ),
});

export default function AddBlogPage() {
  const router = useRouter();
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    coverImage: null,
    description: "",
    published: false,
    topicName: "",
  });
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true);
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      // Use authFetch instead of regular fetch
      const response = await authFetch("/api/topics");

      if (!response.ok) {
        if (response.status === 401) {
          toast.warning("Please log in again");
          router.push("/login");
          return;
        }
        throw new Error("Failed to fetch topics");
      }

      const data = await response.json();
      setTopics(data);
    } catch (error) {
      console.error("Error fetching topics:", error);
      toast.error("Failed to load topics");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (formData.title.length > 200) {
      newErrors.title = "Title must be less than 200 characters";
    }

    if (!formData.topicName) {
      newErrors.topicName = "Topic is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug =
        "Slug can only contain lowercase letters, numbers, and hyphens";
    } else if (formData.slug.length > 100) {
      newErrors.slug = "Slug must be less than 100 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    },
    [errors]
  );

  const handleImageChange = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          coverImage: "Image size must be less than 5MB",
        }));
        return;
      }

      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          coverImage: "Please select a valid image file",
        }));
        return;
      }

      setFormData((prev) => ({ ...prev, coverImage: file }));
      setErrors((prev) => ({ ...prev, coverImage: undefined }));

      const reader = new FileReader();
      reader.onload = (event) => {
        setCoverImagePreview(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDescriptionChange = useCallback(
    (value) => {
      setFormData((prev) => ({
        ...prev,
        description: value,
      }));

      if (errors.description) {
        setErrors((prev) => ({
          ...prev,
          description: undefined,
        }));
      }
    },
    [errors.description]
  );

  const generateSlug = useCallback(() => {
    if (!formData.title.trim()) {
      toast.error("Please enter a title first");
      return;
    }

    const slug = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    setFormData((prev) => ({
      ...prev,
      slug,
    }));

    setErrors((prev) => ({
      ...prev,
      slug: undefined,
    }));
  }, [formData.title]);

  const removeCoverImage = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      coverImage: null,
    }));
    setCoverImagePreview(null);

    if (mounted) {
      const fileInput = document.getElementById("coverImage");
      if (fileInput) {
        fileInput.value = "";
      }
    }
  }, [mounted]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast("Please fill in the required fields before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const submitFormData = new FormData();
      submitFormData.append("title", formData.title.trim());
      submitFormData.append("slug", formData.slug.trim());
      submitFormData.append("description", formData.description.trim());
      submitFormData.append("published", formData.published.toString());
      submitFormData.append("topicName", formData.topicName);

      if (formData.coverImage) {
        submitFormData.append("coverImage", formData.coverImage);
      }

      // Use authFetch for authenticated request
      const response = await authFetch("/api/blog", {
        method: "POST",
        body: submitFormData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast("Authentication Error", {
            description: "Please log in again",
          });
          router.push("/login");
          return;
        }

        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create blog post");
      }

      const blog = await response.json();

      toast.success("Blog post created successfully.");

      router.push("/dashboard/blogs");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast("Error", {
        description:
          error instanceof Error
            ? error.message
            : "There was an error creating your blog post.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="container mx-auto py-6">
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="py-16">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Add Blog</h1>
          <p className="text-muted-foreground">
            Create and publish your blog content
          </p>
        </div>
      </div>

      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Add New Blog Post</CardTitle>
          <CardDescription>
            Create a new blog post with title, slug, cover image, and
            description.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>

              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter an engaging blog title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={errors.title ? "border-red-500" : ""}
                  maxLength={200}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  {formData.title.length}/200 characters
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <Label htmlFor="slug">
                      URL Slug <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="slug"
                      name="slug"
                      placeholder="enter-blog-slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      className={errors.slug ? "border-red-500" : ""}
                      maxLength={100}
                    />
                    {errors.slug && (
                      <p className="text-sm text-red-500 mt-1">{errors.slug}</p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateSlug}
                    disabled={!formData.title.trim()}
                  >
                    Generate from Title
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  URL: /blog/{formData.slug || "your-slug"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topicName">
                Topic <span className="text-red-500">*</span>
              </Label>
              <select
                id="topicName"
                name="topicName"
                value={formData.topicName}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                required
              >
                <option value="" disabled>
                  Select a topic
                </option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.name}>
                    {topic.name}
                  </option>
                ))}
              </select>
              {errors.topicName && (
                <p className="text-sm text-red-500">{errors.topicName}</p>
              )}
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image</Label>

              {!coverImagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Label htmlFor="coverImage" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Click to upload cover image
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </span>
                    </Label>
                    <Input
                      id="coverImage"
                      name="coverImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={coverImagePreview || "/placeholder.svg"}
                      alt="Cover preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeCoverImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {errors.coverImage && (
                <p className="text-sm text-red-500">{errors.coverImage}</p>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Content <span className="text-red-500">*</span>
              </Label>
              <div className="min-h-[300px] border rounded-md">
                <JoEditor
                  value={formData.description}
                  onChange={handleDescriptionChange}
                />
              </div>
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Publication Status */}
            <div className="space-y-2">
              <Label htmlFor="published">Publication Status</Label>
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(value) =>
                    setFormData((prev) => ({ ...prev, published: value }))
                  }
                />
                <div className="flex-1">
                  <p className="font-medium">
                    {formData.published
                      ? "Publish immediately"
                      : "Save as draft"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formData.published
                      ? "This post will be visible to all visitors"
                      : "This post will be saved as a draft and won't be visible to visitors"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/blogs")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : formData.published ? (
                "Publish Post"
              ) : (
                "Save Draft"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
