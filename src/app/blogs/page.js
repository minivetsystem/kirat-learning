import React from 'react'

export default function Blogs() {
  return (
    <div>
      <section className="flex py-8 lg:py-20 bg-[#d3fffb] items-center justify-center">
        <div className="pt-12 lg:pt-20 px-4 flex flex-col md:flex-row container xl:max-w-screen-xl gap-6 items-center">
          <div className="w-full md:w-1/3 mb-4">
            <img className="inline-block" src="/images/image11.jpg" alt="" />
          </div>
          <div className="`w-full md:w-2/3">
            <h2 className="font-bold text-3xl lg:text-4xl text-background-tertiary mb-4 lg:mb-8">Blog</h2>
            <h3 className="text-xl font-bold mb-2">Lorem Ipsum is simply dummy text</h3>
            <p className=" mb-6"> of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
            <button className="bg-background-secondary hover:bg-background-primary text-black hover:text-[#fff] px-10 py-3 rounded-[50px] text-lg font-bold">Know More</button>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center overflow-hidden py-8 lg:py-20">
        <div className="px-4 container xl:max-w-screen-xl flex flex-col gap-8">
            <h2 className="lg:text-4xl text-2xl font-bold text-background-secondary"><span className=" text-background-primary">Our </span>Blog</h2>
            <div className="flex md:flex-row-reverse flex-col gap-8 bg-gray-100 rounded-lg">
              <div className="md:w-1/5 md:text-left text-center rounded-lg border-2 border-background-primary">
              <a href="#"><img className="inline-block rounded-lg" src="/images/image12.jpg" alt="" /></a>
              </div>
              <div className="md:w-4/5 p-6">
                  <div className="flex flex-col gap-8 text-start">
                      <div className="flex flex-col gap-4">
                          <p>11 Nov, 2024</p>
                          <h3 className="text-xl font-bold text-background-tertiary"><a href="#">Lorem Ipsum </a></h3>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                      </div>
                  </div>
              </div>
            </div>  
            <div className="flex md:flex-row flex-col gap-8 bg-gray-100 rounded-lg">
              <div className="md:w-1/5 md:text-left text-center rounded-lg border-2 border-background-primary">
              <a href="#"><img className="inline-block rounded-lg" src="/images/image12.jpg" alt="" /></a>
              </div>
              <div className="md:w-4/5 p-6">
                  <div className="flex flex-col gap-8 text-start">
                      <div className="flex flex-col gap-4">
                          <p>11 Nov, 2024</p>
                          <h3 className="text-xl font-bold text-background-tertiary"><a href="#">Lorem Ipsum </a></h3>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                      </div>
                  </div>
              </div>
            </div> 
            <div className="flex md:flex-row-reverse flex-col gap-8 bg-gray-100 rounded-lg">
              <div className="md:w-1/5 md:text-left text-center rounded-lg border-2 border-background-primary">
              <a href="#"><img className="inline-block rounded-lg" src="/images/image12.jpg" alt="" /></a>
              </div>
              <div className="md:w-4/5 p-6">
                  <div className="flex flex-col gap-8 text-start">
                      <div className="flex flex-col gap-4">
                          <p>11 Nov, 2024</p>
                          <h3 className="text-xl font-bold text-background-tertiary"><a href="#">Lorem Ipsum </a></h3>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                      </div>
                  </div>
              </div>
            </div> 
            <div className="flex md:flex-row flex-col gap-8 bg-gray-100 rounded-lg">
              <div className="md:w-1/5 md:text-left text-center rounded-lg border-2 border-background-primary">
              <a href="#"><img className="inline-block rounded-lg" src="/images/image12.jpg" alt="" /></a>
              </div>
              <div className="md:w-4/5 p-6">
                  <div className="flex flex-col gap-8 text-start">
                      <div className="flex flex-col gap-4">
                          <p>11 Nov, 2024</p>
                          <h3 className="text-xl font-bold text-background-tertiary"><a href="#">Lorem Ipsum </a></h3>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                      </div>
                  </div>
              </div>
            </div>         
        </div>
      </section>
    </div>
  )
}
