import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

export default function Dashboard() {
  return (
    <div className="container flex flex-col p-12 w-full mx-auto gap-8 ">
     <div className="flex justify-between">
       <Card className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        
        <CardContent className="p-14 gap-3">
          <h1 className='text-3xl font-bold text-white'>Welcome to Admin Panel</h1>
          <p className='text-white'>Mannage your website from here.</p>
        </CardContent>
       </Card>
      </div>
      </div>
  )
}
