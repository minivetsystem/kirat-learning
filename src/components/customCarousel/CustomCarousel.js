"use client"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const items = [
  { title: "Good Health", img: "https://pixabay.com/get/g6bc1d43bd1a66d28674ac1fde895f3803429ef909528f46e7891452dc2aa921ce226075d76075340d790f6dca78a361503fe38a903c3aa6905771b211630f5289f1630647b8515fca2d192f9a248a8af_640.jpg", id: 1 },
  { title: "Little Things", img: "https://pixabay.com/get/g942df11e9154680df418b69b9f0fd128d6005fafc47ecda67770edcf61d58d83486c718eb69ff7e2dcdd1d20aafdf81bc6411f68a485d2dea3d0ccafd72495c5456f0c8c09f0d4f1ab4f9fbca4e663cb_640.jpg", id: 2 },
  { title: "Star-Lord", img: "https://pixabay.com/get/gbc0379dd6101c138bef8d759484f3d7f6e42550ae2e4a8da45359bea42d70d804b6c58e3478e6aebe15d562273d21cc292914b30b82c0172403251a3af25a34224e26353de2cef6f0feb7391984ff8fe_640.jpg", id: 3 },
  { title: "Mystery", img: "https://pixabay.com/get/gc82bc0d4ed56fec9fd4e756bea99d5205831ca9ee929aa0e96f4c89dffaaa09d35628bb4d34b1eafa9200860a8865049d506ebb3e2e2bc9d5fdc0c593f18b682e5af3a0f5e18257ba2d386894d713dfd_640.jpg", id: 4 },
  { title: "Kaali Awaaz", img: "https://pixabay.com/get/gb93ac508cde2fb4969998fa9897919d9a326b7ca5a0a4326a787b45b8888a5f09832e067c295c4fb8f3695c3688da68d54f321f38e0b889adac57bc70119d00a670f4a1591adafef342e363358fa350c_640.jpg", id: 5 },
]

const CustomCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", loop: true })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    return () => emblaApi.off("select", onSelect)
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <div className="w-full max-w-3xl mx-auto px-8 my-12 relative">
        <div className="absolute top-0 left-[-120px] w-44 h-full bg-gradient-to-r from-white from-50% to-white/0 z-30"></div>
        <div className="absolute top-0 right-[-120px] w-44  h-full bg-gradient-to-l from-white from-50% to-white/0 z-30"></div>
      {/* Carousel Viewport */}
      <div className="" ref={emblaRef}>
        <div className="flex">
          {items.map((item, index) => (
            <div key={item.id} className="flex-[0_0_50%] sm:flex-[0_0_33.33%] lg:flex-[0_0_25%] px-2">
              <div
                className={`relative transition-transform duration-300 border rounded-lg overflow-hidden ${
                  current === index ? "scale-100 z-50" : "scale-75 opacity-70  "
                }`}
              >
                <div className="w-full aspect-square">
                  <img
                    src={item.img || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    
      <button
        className="absolute left-[-7.75rem] top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white z-50"
        onClick={scrollPrev}
      >
        <ChevronLeft className="text-black"/>
      </button>
      <button
        className="absolute right-[-7.75rem] top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white z-50"
        onClick={scrollNext}
      >
         <ChevronRight  className="text-black"/>
      </button>
    </div>
  )
}

export default CustomCarousel
