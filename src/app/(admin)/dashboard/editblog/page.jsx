import { Suspense } from "react"
import EditBlogContent from "./EditBlogContent"


function EditBlogFallback() {
  return (
    <div className="container mx-auto p-4">
      <div className="animate-pulse">
        <div className="h-8 w-1/3 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-1/4 bg-gray-200 rounded mb-8"></div>
        <div className="h-[600px] bg-gray-100 rounded-lg"></div>
      </div>
    </div>
  )
}

export default function EditBlogPage() {
  return (
    <Suspense fallback={<EditBlogFallback />}>
      <EditBlogContent />
    </Suspense>
  )
}
