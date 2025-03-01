"use client";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import React, { useState, useReducer } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
// import MapComponent from "@/components/map/Map";
import { Typewriter } from "react-simple-typewriter";
import GenericBigButton from "@/components/genericButton/GenericBigButton";
import Map2 from "@/components/map2/Map2";
import CustomCarousel from "@/components/customCarousel/CarouselOne";
import HoverImgCard from "@/components/hoverImgCard/HoverImgCard";
import CarouselOne from "@/components/customCarousel/CarouselOne";
import CatouselTwo from "@/components/customCarousel/CatouselTwo";

export default function Home() {
  const router = useRouter();
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ speed: 0.8 }),
  ]);

  // const cards = [
  //   { id: 1, icon: "./manufacturing.png", title: "Manufacturing" },
  //   { id: 2, icon: "./cutlery.png", title: "FMCG" },
  //   { id: 3, icon: "./management.png", title: "Real Estate" },
  //   {
  //     id: 4,
  //     icon: "./pharmacy.png",
  //     title: "Pharmaceutical and Biotechnology",
  //   },
  //   { id: 5, icon: "./retail.png", title: "Retail" },
  //   { id: 6, icon: "./institution.png", title: "Governments" },
  //   { id: 7, icon: "./shopping-cart.png", title: "E-Commerce" },
  //   { id: 8, icon: "./skill.png", title: "Others" },
  // ];

  const initialState = {
    isReadMoreData: true,
    isReadMoreIntegration: true,
    isReadMoreSAP: true,
    isReadMoreOpenSource: true,
    isWhoWeAre: true,
    isSolar: true,
    isChartBot: true,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_READ_MORE_DATA":
        return { ...state, isReadMoreData: !state.isReadMoreData };
      case "TOGGLE_READ_MORE_INTEGRATION":
        return {
          ...state,
          isReadMoreIntegration: !state.isReadMoreIntegration,
        };
      case "TOGGLE_READ_MORE_SAP":
        return { ...state, isReadMoreSAP: !state.isReadMoreSAP };
      case "TOGGLE_READ_MORE_OPEN_SOURCE":
        return { ...state, isReadMoreOpenSource: !state.isReadMoreOpenSource };
      case "TOGGLE_WHO_WE_ARE":
        return { ...state, isWhoWeAre: !state.isWhoWeAre };
      case "TOGGLE_SOLAR":
        return { ...state, isSolar: !state.isSolar };
      case "TOGGLE_CHART_BOT":
        return { ...state, isChartBot: !state.isChartBot };
      default:
        return state;
    }
  };

  const [isCursor, setisCursor] = useState(true);

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLoopDone = () => {
    setisCursor(false);
  };

  const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <div>
      <div className="container mx-auto 2xl:px-28 px-8 xl:py-5 py-8">
        <div className="flex mb-32 flex-col items-center md:flex-row">
          <div className="md:w-1/2 md:mb-0 mb-8">
            <h2 className="leading-10 text-center">
              <span className="block text-primary-midnightBlue  font-bold xl:text-5xl lg:text-4xl md:text-3xl text-2xl pb-3">
              <Typewriter
                  words={[" KIRAT LEARNING"]}
                  loop={0}
                  cursor={isCursor}
                  cursorStyle="|"
                  cursorBlinking={false}
                  typeSpeed={100}
                  deleteSpeed={80}
                  delaySpeed={300}
                  onLoopDone={handleLoopDone}
                />
            
                
              </span>
              <span className="text-2xl">Nurture Develop Empower</span>
            </h2>
            <p className="mt-6 mb-10 text-base text-center ">
              At KIRAT, we are committed to bridging the gap between academic
              learning and corporate expectations. As a premier learning and
              development company in India, we specialize in equipping students
              and professionals with the skills needed to thrive in today's
              competitive corporate world.
            </p>
            <GenericBigButton
              url="/three-pillar-ecosystem"
              name="Discover More"
            />
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="/homebg.png" alt="no img" className="w-full h-full" />
          </div>
        </div>
        <div className="flex mb-15 flex-col md:flex-row">
          <div className="w-full">
            <h3 className="font-semibold md:text-4xl text-2xl text-center mb-10">
              <span className="text-primary-orange">Our </span>
              Mission
            </h3>
            <p className="text-center tracking-normal text-base w-4/5 mx-auto">
              To empower students and professionals with industry-relevant
              skills, ensuring they transition seamlessly from academia to the
              corporate world with confidence and expertise.
            </p>
          </div>
        </div>
      </div>

      <div className=" py-20 text-white">
        <div className="container mx-auto 2xl:px-32 px-8">
          <h3 className="font-semibold md:text-4xl text-2xl text-black text-center">
            <span className="text-primary-orange">What </span>
            We Offer
          </h3>

          <p className=" tracking-normal text-base text-primary-midnightBlue text-center">
            Groundbreaking Originals and exclusives from A-list celebs and
            emerging talent.
          </p>
          <div className="pt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <HoverImgCard
              image="./home/corporate-training.jpg"
              title="Corporate Training Programs"
              content={{
                description:
                  "Designed for organizations looking to enhance their workforce’s skills, our training programs focus on:",
                points: [
                  "Leadership and Management Development",
                  "Effective Communication & Public Speaking",
                  "Team Collaboration & Problem-Solving",
                  "Group Discussion & Personal Branding",
                  "Industry-Specific Technical Skills Workshops",
                ],
              }}
            />
            <HoverImgCard
              image="./home/college-training-programs.jpg"
              title="College Training Programs"
              content={{
                description:
                  "We prepare students for successful corporate careers through:",
                points: [
                  "Campus to Corporate Readiness Programs",
                  "Effective Communication & Public Speaking",
                  "Team Collaboration & Problem-Solving",
                  "Group Discussion & Personal Branding",
                  "Industry-Specific Technical Skills Workshops",
                ],
              }}
            />
            <HoverImgCard
              image="./home/consulting-services.jpg"
              title="Consulting Services"
              content={{
                description:
                  "Our expert consulting services help businesses and institutions optimize learning and development strategies. We provide:",
                points: [
                  "Customized Corporate Training Frameworks",
                  "Talent Development and Succession Planning",
                  "Employee Engagement & Retention Strategies",
                  "Curriculum Development for Colleges & Universities",
                  "Organizational Learning Needs Assessment",
                ],
              }}
            />
          </div>
        </div>
      </div>
      <div className=" py-20 text-white">
        <div className="container mx-auto 2xl:px-32 px-8">
          <h3 className="font-semibold md:text-4xl text-2xl text-black text-center">
            <span className="text-primary-orange">Why </span>
            Choose Us?
          </h3>
          <p className=" tracking-normal text-base text-primary-midnightBlue text-center">
            Groundbreaking Originals and exclusives from A-list celebs and
            emerging talent.
          </p>
          <div className="py-5">
            {/* <CarouselOne /> */}
            <CatouselTwo />
           
          </div>
        </div>
      </div>

      
    </div>
  );
}
