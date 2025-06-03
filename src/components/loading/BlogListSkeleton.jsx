"use client"

import { Skeleton } from "../ui/skeleton"

export default function BlogListSkeleton() {
  return (
    <div className="w-full">
      {/* Featured Blog Skeleton */}
      <div className="container mx-auto 2xl:px-32 px-8 gap-10 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="space-y-3 mt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <Skeleton className="h-8 w-32 mt-2" />
        </div>
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <Skeleton className="w-full aspect-[16/9] rounded-lg" />
        </div>
      </div>

      {/* Latest Blogs Skeleton */}
      <div className="container mx-auto 2xl:px-32 px-8 mt-20">
        <Skeleton className="h-10 w-40 mb-5" />
        <div className="grid md:grid-cols-3 gap-10">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="w-full aspect-[16/9] rounded-lg" />
                <div className="flex items-center gap-2 mt-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
