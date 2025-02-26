"use client"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const items = [
  { title: "Good Health", img: "./home/cat-8266486_640.jpg", id: 1 },
  { title: "Little Things", img: "./home/christmas-7718958_640.jpg", id: 2 },
  { title: "Star-Lord", img: "./home/groovebox-8832172_640.png", id: 3 },
  { title: "Mystery", img: "./home/sky-5766341_640.jpg", id: 4 },
  { title: "Kaali Awaaz", img: "./home/tool-9253437_640.jpg", id: 5 },
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
    <div className="w-full md:w-3/4 mx-auto px-8 my-12 relative">
        <div className="absolute hidden md:block top-0 left-[-170px] w-48 h-full bg-gradient-to-r from-white from-50% to-white/0 z-30"></div>
        <div className="absolute hidden md:block top-0 right-[-170px] w-48  h-full bg-gradient-to-l from-white from-50% to-white/0 z-30"></div>
      {/* Carousel Viewport */}
      <div className="" ref={emblaRef}>
        <div className="flex items-center ">
          {items.map((item, index) => (
            <div key={item.id} className="flex-[0_0_50%] sm:flex-[0_0_33.33%] lg:flex-[0_0_25%]">
              <div
                className={`relative transition-transform duration-300 border rounded-lg overflow-hidden ${
                  current === index ? "scale-150 mx-10 opacity-100 z-50" : "scale-75 opacity-70  "
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
        className="absolute hidden md:block left-[-9.75rem] top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white z-50"
        onClick={scrollPrev}
      >
        <ChevronLeft className="text-black"/>
      </button>
      <button
        className="absolute hidden md:block right-[-9.75rem] top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white z-50"
        onClick={scrollNext}
      >
         <ChevronRight  className="text-black"/>
      </button>
    </div>
  )
}

export default CustomCarousel
