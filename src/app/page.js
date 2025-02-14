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
import HoverImgCard from "@/components/hoverImgCard/HoverImgCard";
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
          <div className="md:w-1/2 flex justify-center">
            <img src="/homebg.png" alt="no img" className="w-full h-full"/>
          </div>
        </div>
        <div className="flex mb-15 flex-col md:flex-row">
          <div className="w-full">
            <h3 className="font-semibold md:text-4xl text-2xl text-center mb-10">
              <span className="text-primary-orange">Our </span>
              Mission
            </h3>
            <p className="text-center tracking-normal text-base w-4/5 mx-auto">
            To empower students and professionals with industry-relevant skills, ensuring they transition seamlessly from academia to the corporate world with confidence and expertise.
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
          Groundbreaking Originals and exclusives from A-list celebs and emerging talent.
            </p>
            <div className="pt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <HoverImgCard
  image="https://pixabay.com/get/gfd57f202866578d8d12d50726cb82512002689fd386106ce415d30a4a9d726bfdd7c22dc30aecf32f28c9b344a6746ad7b59602f1ea8d18831c7c5573bba4a77bd0ab62b1f6331ff81289f10692c319f_640.jpg"
  title="Corporate Training Programs"
  content={{
    description: "Designed for organizations looking to enhance their workforce’s skills, our training programs focus on:",
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
  image="https://pixabay.com/get/gc839af7190252eb2399e63c5aa41aa67d24f663faa97d8db361fe6b491b5e46a339da4a2437728811a9495985a8b6debd22cfff8a436f61394a141f9ef3fad6bb375e26c74c4d88e0c27dac6f994a070_640.jpg"
  title="College Training Programs"
  content={{
    description: "We prepare students for successful corporate careers through:",
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
  image="https://pixabay.com/get/g18392bebe1fd9d8223b889072ed348c9ed9b07c50c8fc5c92645a1e140516e53e9bdf22dc4d9cf0f9e0a0148b23706e76cc4e61b7917a670d9afebbaef5511dd77512bed0eae0b72f19fc23f0cc3ec29_640.jpg"
  title="Corporate Training Programs"
  content={{
    description: "Designed for organizations looking to enhance their workforce’s skills, our training programs focus on:",
    points: [
      "Leadership and Management Development",
      "Effective Communication & Public Speaking",
      "Team Collaboration & Problem-Solving",
      "Group Discussion & Personal Branding",
      "Industry-Specific Technical Skills Workshops",
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
