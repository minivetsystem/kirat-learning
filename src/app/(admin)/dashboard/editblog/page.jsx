"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import dynamic from "next/dynamic"
import axios from "axios"
import { toast } from "@/hooks/use-toast"

const JoEditor = dynamic(() => import("@/components/joeditor/JoEditor"), { ssr: false })

export default function EditBlogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const blogId = searchParams.get("id")

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    coverImage: null,
    description: "",
    published: false,
  })
  const [coverImagePreview, setCoverImagePreview] = useState(null)

  // Fetch blog data on mount
  useEffect(() => {
    if (!blogId) return
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/blog/${blogId}`)
        const data = res.data
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          coverImage: data.coverImage || null, 
          description: data.description || "",
          published: data.published || false,
        })

        setCoverImagePreview(data.coverImage || null)
      } catch (err) {
        toast({
          title: "Error loading blog",
          description: "Could not fetch blog data.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [blogId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, coverImage: file }))

      const reader = new FileReader()
      reader.onload = (event) => setCoverImagePreview(event.target?.result)
      reader.readAsDataURL(file)
    }
  }

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }))
  }

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
    setFormData((prev) => ({ ...prev, slug }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = new FormData()
      payload.append("title", formData.title)
      payload.append("slug", formData.slug)
      payload.append("description", formData.description)
      payload.append("published", formData.published.toString())
      if (formData.coverImage) {
        payload.append("coverImage", formData.coverImage)
      }

      await axios.put(`/api/blog/${blogId}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      toast({
        title: "Blog updated",
        description: "Your blog post was updated successfully.",
      })

      router.push("/dashboard/blogs")
    } catch (err) {
      console.error("Update error", err)
      toast({
        title: "Error updating blog",
        description: "Something went wrong.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <p>Loading blog...</p>

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Edit Blog</h1>
          <p className="text-muted-foreground">Update your blog post</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Blog Post</CardTitle>
          <CardDescription>Update title, slug, image, description, or status.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
            </div>

            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" name="slug" value={formData.slug} onChange={handleInputChange} required />
              </div>
              <Button type="button" variant="outline" onClick={generateSlug} disabled={!formData.title}>
                Generate from Title
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image</Label>
              <Input id="coverImage" name="coverImage" type="file" accept="image/*" onChange={handleImageChange} />
              {coverImagePreview && (
                <div className="mt-2">
                  <img src={coverImagePreview} alt="Preview" className="max-h-40 rounded-md object-cover" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <div className="mt-2 min-h-[300px]">
                <JoEditor value={formData.description} onChange={handleDescriptionChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="published">Publish</Label>
              <div className="flex items-center gap-4">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(val) => setFormData((prev) => ({ ...prev, published: val }))}
                />
                <span className="text-sm text-muted-foreground">
                  {formData.published ? "Visible to everyone" : "Currently a draft"}
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Update Blog Post"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
