"use client";
import Link from "next/link";

import { useRouter } from "next/navigation";
import React, { useState, useReducer } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
// import MapComponent from "@/components/map/Map";
import { Typewriter } from "react-simple-typewriter";
import GenericBigButton from "@/components/genericButton/GenericBigButton";
import Map2 from "@/components/map2/Map2";
import CustomCarousel from "@/components/customCarousel/CustomCarousel";
export default function Home() {
  const router = useRouter();
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ speed: 0.8 }),
  ]);

  const cards = [
    { id: 1, icon: "./manufacturing.png", title: "Manufacturing" },
    { id: 2, icon: "./cutlery.png", title: "FMCG" },
    { id: 3, icon: "./management.png", title: "Real Estate" },
    {
      id: 4,
      icon: "./pharmacy.png",
      title: "Pharmaceutical and Biotechnology",
    },
    { id: 5, icon: "./retail.png", title: "Retail" },
    { id: 6, icon: "./institution.png", title: "Governments" },
    { id: 7, icon: "./shopping-cart.png", title: "E-Commerce" },
    { id: 8, icon: "./skill.png", title: "Others" },
  ];

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

  return (
    <div>
      <div className="container mx-auto 2xl:px-28 px-8 xl:py-5 py-8">
        <div className="flex mb-32 flex-col items-center md:flex-row">
          <div className="md:w-1/2 md:mb-0 mb-8">
            <h2 className="leading-10 text-center">
              <span className="block text-primary-midnightBlue  font-bold xl:text-5xl lg:text-4xl md:text-3xl text-2xl pb-3">
              KIRAT LEARNING  
              </span>
             <span className="text-2xl">Nurture Develop Empower</span>

             
            </h2>
            <p className="mt-6 mb-10 text-base text-center ">
            At KIRAT, we are committed to bridging the gap between academic learning and corporate expectations. As a premier learning and development company in India, we specialize in equipping students and professionals with the skills needed to thrive in today's competitive corporate world.
            </p>
            <GenericBigButton url="/three-pillar-ecosystem" name="Discover More" />
          </div>
          <div className="md:w-1/2">
            <img src="/rb_5768.png" alt="no img" />
          </div>
        </div>
        <div className="flex mb-20 flex-col md:flex-row">
          <div className="md:w-1/2">
            <h3 className="font-semibold md:text-4xl text-2xl">
              <span className="text-primary-orange">Our </span>
              Mission
            </h3>
          </div>
          <div className="md:w-1/2">
            <p className="text-justify tracking-normal text-base">
            To empower students and professionals with industry-relevant skills, ensuring they transition seamlessly from academia to the corporate world with confidence and expertise.
            </p>
          </div>
        </div>
      </div>

      <div className=" py-20 text-white">
        <div className="container mx-auto 2xl:px-32 px-8">
          <h3 className="text-2xl text-primary-midnightBlue text-center font-bold mb-2">Why Choose Us?</h3>
          <p className=" tracking-normal text-base text-primary-midnightBlue text-center">
          Groundbreaking Originals and exclusives from A-list celebs and emerging talent.
            </p>
            <div className="py-5">
            <CustomCarousel />
            </div>
        </div>
      </div>
    </div>
  );
}
