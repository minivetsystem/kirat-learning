"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2, Upload, X } from "lucide-react";
import { authFetch } from "@/components/auth/AuthFetch";
import Loading from "@/components/loading/Loading";
const JoEditor = dynamic(() => import("@/components/joeditor/JoEditor"), {
  ssr: false,
});

export default function EditBlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  const [errors, setErrors] = useState({});
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [originalCoverImage, setOriginalCoverImage] = useState(null);
  const [imageToDelete, setImageToDelete] = useState(null); // Track image to delete from S3
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [topics, setTopics] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    coverImage: null,
    description: "",
    published: false,
    topicName: "",
  });
  const [coverImagePreview, setCoverImagePreview] = useState(null);

  useEffect(() => {
    setMounted(true);
    fetchTopics();
  }, []);

  // Fetch blog data on mount
  useEffect(() => {
    if (!blogId) return;
    const fetchData = async () => {
      try {
        const response = await authFetch(`/api/blog/${blogId}`);
        const data = await response.json();
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          coverImage: data.coverImage || null,
          description: data.description || "",
          published: data.published || false,
          topicName: data.subject || "",
        });

        setOriginalCoverImage(data.coverImage || null);
        setCoverImagePreview(data.coverImage || null);
      } catch (err) {
        toast.error("Could not fetch blog data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [blogId]);

  const fetchTopics = async () => {
    try {
      // Use authFetch instead of regular fetch
      const response = await authFetch("/api/topics");

      if (!response.ok) {
        if (response.status === 401) {
          toast("Please log in again");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.warning("Cover image must be less than 5MB.");
        return;
      }

      setFormData((prev) => ({ ...prev, coverImage: file }));

      const reader = new FileReader();
      reader.onload = (event) => setCoverImagePreview(event.target?.result);
      reader.readAsDataURL(file);

      if (originalCoverImage && originalCoverImage.includes("s3.")) {
        setImageToDelete(originalCoverImage);
      }
    }
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
    setFormData((prev) => ({ ...prev, slug }));
  };

  const deleteImageFromS3 = async (imageUrl) => {
    try {
      const response = await axios.delete("/api/delete-image", {
        data: { imageUrl },
      });

      if (response.data.success) {
        console.log("Image deleted from S3 successfully");
      }
    } catch (error) {
      console.error("Error deleting image from S3:", error);
    }
  };

  const removeCoverImage = useCallback(async () => {
    if (originalCoverImage && originalCoverImage.includes("s3.")) {
      await deleteImageFromS3(originalCoverImage);
      setOriginalCoverImage(null);
    }

    if (imageToDelete) {
      setImageToDelete(null);
    }

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

    toast.success("Cover image has been removed");
  }, [mounted, originalCoverImage, imageToDelete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("slug", formData.slug);
      payload.append("description", formData.description);
      payload.append("published", formData.published.toString());

      if (formData.coverImage instanceof File) {
        payload.append("coverImage", formData.coverImage);
      }

      if (imageToDelete) {
        payload.append("deleteImageUrl", imageToDelete);
      }

      const response = await authFetch(`/api/blog/${blogId}`, {
        method: "PUT",
        body: payload,
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      toast.success("Your blog post was updated successfully.");

      router.push("/dashboard/blogs");
    } catch (err) {
      console.error("Update error", err);
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Edit Blog</h1>
          <p className="text-muted-foreground">Update your blog post</p>
        </div>
      </div>
      // Display a loading component if the data is still loading
      <Card>
        <CardHeader>
          <CardTitle>Edit Blog Post</CardTitle>
          <CardDescription>
            Update title, slug, image, description, or status.
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
                      src={coverImagePreview || ""}
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
              onClick={() => router.push("/dashboard/blog")}
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
