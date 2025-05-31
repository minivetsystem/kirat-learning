"use client"



import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { Loader2, Plus, Trash2, Edit2, X, Check } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



export default function TopicManagement() {
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newTopicName, setNewTopicName] = useState("")
  const [editingTopic, setEditingTopic] = useState(null)
  const [editName, setEditName] = useState("")

  useEffect(() => {
    fetchTopics()
  }, [])

  const fetchTopics = async () => {
    try {
      const response = await fetch("/api/topics")
      if (!response.ok) {
        throw new Error("Failed to fetch topics")
      }
      const data = await response.json()
      setTopics(data)
    } catch (error) {
      console.error("Error fetching topics:", error)
      toast({
        title: "Error",
        description: "Failed to load topics",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTopic = async (e) => {
    e.preventDefault()

    if (!newTopicName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic name",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newTopicName.trim() }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create topic")
      }

      const newTopic = await response.json()
      setTopics((prev) => [...prev, { ...newTopic, _count: { blogs: 0 } }])
      setNewTopicName("")

      toast({
        title: "Success",
        description: `Topic "${newTopic.name}" created successfully`,
      })
    } catch (error) {
      console.error("Error creating topic:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create topic",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteTopic = async (topicId, topicName) => {
    try {
      const response = await fetch(`/api/topics/${topicId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete topic")
      }

      setTopics((prev) => prev.filter((topic) => topic.id !== topicId))

      toast({
        title: "Success",
        description: `Topic "${topicName}" deleted successfully`,
      })
    } catch (error) {
      console.error("Error deleting topic:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete topic",
        variant: "destructive",
      })
    }
  }

  const handleEditTopic = async (topicId) => {
    if (!editName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic name",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`/api/topics/${topicId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editName.trim() }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update topic")
      }

      const updatedTopic = await response.json()
      setTopics((prev) => prev.map((topic) => (topic.id === topicId ? { ...topic, name: updatedTopic.name } : topic)))

      setEditingTopic(null)
      setEditName("")

      toast({
        title: "Success",
        description: `Topic updated successfully`,
      })
    } catch (error) {
      console.error("Error updating topic:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update topic",
        variant: "destructive",
      })
    }
  }

  const startEditing = (topic) => {
    setEditingTopic({ id: topic.id, name: topic.name })
    setEditName(topic.name)
  }

  const cancelEditing = () => {
    setEditingTopic(null)
    setEditName("")
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-16">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Management</CardTitle>
        <CardDescription>
          Create and manage blog topics. Topics help organize your content and make it easier for readers to find
          related posts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Topic Form */}
        <form onSubmit={handleAddTopic} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="newTopic">Add New Topic</Label>
              <Input
                id="newTopic"
                placeholder="Enter topic name (e.g., Technology, Travel, Food)"
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
                maxLength={50}
                disabled={isSubmitting}
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" disabled={isSubmitting || !newTopicName.trim()}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Topic
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* Topics List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Existing Topics ({topics.length})</h3>

          {topics.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No topics created yet.</p>
              <p className="text-sm">Add your first topic above to get started.</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {editingTopic?.id === topic.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-48"
                          maxLength={50}
                          autoFocus
                        />
                        <Button size="sm" onClick={() => handleEditTopic(topic.id)} disabled={!editName.trim()}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEditing}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Badge variant="secondary" className="text-sm">
                          {topic.name}
                        </Badge>
                      
                      </>
                    )}
                  </div>

                  {editingTopic?.id !== topic.id && (
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEditing(topic)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline" >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Topic</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the topic "{topic.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteTopic(topic.id, topic.name)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
