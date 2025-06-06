"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function BlogDetailSkeleton() {
  return (
    <div className="py-8 lg:py-20">
      <div className="container mx-auto 2xl:px-32 px-8">
        {/* Title skeleton */}
        <div className="mb-6">
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-10 w-1/2" />
        </div>

        {/* Cover image skeleton */}
        <Skeleton className="w-full h-64 md:h-96 mb-8 rounded-lg" />

        {/* Blog content skeleton */}
        <div className="prose prose-lg max-w-none space-y-4">
          {/* Paragraph skeletons */}
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
              </div>
            ))}

          {/* Subheading skeleton */}
          <Skeleton className="h-8 w-2/3 mt-8" />

          {/* More paragraph skeletons */}
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i + 6} className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            ))}
        </div>

        
      </div>
    </div>
  )
}
