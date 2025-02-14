"use client"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const items = [
  { title: "Good Health", img: "/change1.png", id: 1 },
  { title: "Little Things", img: "/change1.png", id: 2 },
  { title: "Star-Lord", img: "/change1.png", id: 3 },
  { title: "Mystery", img: "/change1.png", id: 4 },
  { title: "Kaali Awaaz", img: "/change1.png", id: 5 },
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
    <div className="w-full max-w-5xl mx-auto px-4 my-12 relative">
      {/* Carousel Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item, index) => (
            <div key={item.id} className="flex-[0_0_50%] sm:flex-[0_0_33.33%] lg:flex-[0_0_25%] px-2">
              <div
                className={`relative transition-transform duration-300 border rounded-lg overflow-hidden ${
                  current === index ? "scale-100 z-50" : "scale-75 opacity-70 hover:opacity-90 hover:scale-100"
                }`}
              >
                <div className="w-full aspect-square">
                  <Image
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
        className="absolute left-1 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white"
        onClick={scrollPrev}
      >
        <ChevronLeft className="text-black"/>
      </button>
      <button
        className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white"
        onClick={scrollNext}
      >
         <ChevronRight  className="text-black"/>
      </button>
    </div>
  )
}

export default CustomCarousel
