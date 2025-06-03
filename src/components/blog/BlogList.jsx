import { prisma } from '@/lib/prisma'
import React, { useEffect } from 'react'


async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true, 
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return blogs
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}


export default  function BlogList() {

    useEffect(() => {
        const blogs = getBlogs()
           console.log("blogList", blogs)
      }, [])



  return (
    <div>BlogList</div>
  )
}
