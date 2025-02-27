"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";


const slides = [
  {
    image: "/home/cat-8266486_640.jpg",
    title: "Industry-Experienced Trainers",
    description:
      "Our expert trainers bring years of corporate experience to the classroom.",
  },
  {
    image: "/home/christmas-7718958_640.jpg",
    title: "Tailored Curriculum",
    description:
      "Programs designed to meet the unique needs of colleges and corporations.",
  },
  {
    image: "/home/sky-5766341_640.jpg",
    title: "Practical Learning Approach",
    description:
      "Interactive sessions, real-world case studies, and hands-on activities.",
  },
  {
    image: "/home/tool-9253437_640.jpg",
    title: "Placement Readiness",
    description:
      "Enhancing students’ employability through strategic career guidance.",
  },
  {
    image: "/home/tool-9253437_640.jpg",
    title: "Continuous Support",
    description:
      "Post-training mentorship and learning resources for sustained growth.",
  },
];

export default function OptimizedCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative w-full">
      {/* Embla Viewport */}
      <div className="overflow-hidden relative" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div className="flex-[0_0_50%] pl-4 min-w-0" key={index}>
              <div className="flex items-center justify-center h-72">
                {/* Image Section */}
                <div className="w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden bg-white">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full rounded-br-3xl sm:rounded-bl-none sm:rounded-tr-none sm:rounded-tl-3xl"
                  />
                </div>
                {/* Text Content */}
                <div className="w-full sm:w-3/5 flex flex-col justify-center items-center text-center p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-black">
                    {slide.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* **Gradient Overlays for Smooth Edges** */}
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white to-transparent hidden md:block z-30"></div>
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white to-transparent hidden md:block z-30"></div>
      </div>

      {/* **Navigation Buttons** */}
      <button
        className="absolute left-[-2.75rem] top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white z-50 hidden md:flex"
        onClick={scrollPrev}
      >
        <ChevronLeft className="text-black" />
      </button>
      <button
        className="absolute right-[-2.75rem] top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white z-50 hidden md:flex"
        onClick={scrollNext}
      >
        <ChevronRight className="text-black" />
      </button>
    </div>
  );
}
