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
      <div className="container mx-auto 2xl:px-28 px-8 xl:py-14 py-8">
        <div className="flex mb-32 flex-col items-center md:flex-row">
          <div className="md:w-1/2 md:mb-0 mb-8">
            <h2 className="leading-10">
              <span className="block text-primary-midnightBlue  font-bold xl:text-5xl lg:text-4xl md:text-3xl text-2xl pb-3">
                Customer <span className="text-primary-orange">Focussed</span>
              </span>
              <span className="block text-primary-midnightBlue font-bold xl:text-5xl lg:text-4xl md:text-3xl text-2xl pb-3">
                Solution <span className="text-primary-orange">Driven</span>
              </span>

              <span className="block text-primary-orange font-bold xl:text-5xl lg:text-4xl md:text-3xl text-2xl">
                <span className="text-primary-midnightBlue">Dedicated </span>
                <Typewriter
                  words={[" Teams"]}
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
            </h2>
            <p className="mt-6 mb-10 text-base">
              Competency in large scale deliverance <br /> Innovation and
              Excellence with growth.
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
              <span className="text-primary-orange">Solutions we </span>
              provide
            </h3>
          </div>
          <div className="md:w-1/2">
            <p className="text-justify tracking-normal text-base">
              We are a rapidly emerging company harnessing the best in Product
              Development and IT Services from the leading platforms - SAP,
              Data, Integration and Opensource to serve end-to-end business
              process, consulting, implementation with managed service
              solutions.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-primary-midnightBlue py-20 text-white">
        <div className="container mx-auto 2xl:px-32 px-8">
          <h3 className="text-2xl text-center mb-10">Industry we serve</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {cards.map((card) => (
              <div
                key={card.id}
                className="p-8 pt-20 border border-white relative"
              >
                <img className="mb-6 text-white" src={card.icon} alt="no img" />
                <p>{card.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto 2xl:px-32 px-8 pt-20">
        <div className="flex mb-20 flex-col md:flex-row">
          <div className="flex flex-col gap-4 md:w-1/2">
            <div>
              <h3 className="font-semibold  md:text-4xl text-2xl mb-4">
                <span className="text-primary-orange">Who </span> we are
              </h3>
              <p className="text-justify text-secondary-gray text-base">
                We are the storytellers behind innovative, forward-thinking
                brands that make a global impact. In today’s competitive
                landscape, we excel at helping your brand stand out and create a
                lasting impression in your customers' minds. As your trusted
                partner, we deliver tailored digital marketing solutions to
                achieve your desired ROI and drive sustainable growth.
              </p>
            </div>
            <div>
              <h3 className="font-semibold  md:text-4xl text-2xl mb-4">
                <span className="text-primary-orange">Our </span> vision
              </h3>
              <p className="text-justify text-secondary-gray text-base">
                At KIRAT, our vision is rooted in a deep commitment to
                understanding and prioritizing our clients' needs. We are
                obsessed with delivering value by decoding your audience's
                unique expectations and crafting solutions that inspire and
                engage. By blending innovation, integrity, and excellence with a
                touch of adaptability, we ensure your brand not only stands out
                but consistently achieves exceptional results. In today’s
                ever-evolving digital landscape, we strive to stay ahead of the
                curve, partnering with you to turn challenges into opportunities
                and drive sustainable growth.
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="text-center">
              <img className="inline-block" src="/img2.png" alt="no img" />
            </div>
          </div>
        </div>

        <div></div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex items-center gap-10">
            <div className="px-4 min-w-0  flex-[0_0_auto] items-center w-36">
              <img className="inline-block " src="/image4.png" alt="no img" />
            </div>
            <div className="px-4 min-w-0 flex-[0_0_auto] items-center w-36">
              <img className="inline-block" src="/image5.png" alt="no img" />
            </div>
            <div className="px-4 min-w-0 flex-[0_0_auto] items-center w-36">
              <img className="inline-block" src="/image6.png" alt="no img" />
            </div>
            <div className="px-4 min-w-0 flex-[0_0_auto] items-center w-36">
              <img className="inline-block" src="/image8.png" alt="no img" />
            </div>
            <div className="px-4 min-w-0 flex-[0_0_auto] items-center w-36">
              <img className="inline-block" src="/image9.png" alt="no img" />
            </div>
            <div className="px-4 min-w-0 flex-[0_0_auto] items-center w-36">
              <img className="inline-block" src="/image4.png" alt="no img" />
            </div>
            <div className="px-4 min-w-0 flex-[0_0_auto] items-center w-36">
              <img className="inline-block" src="/image5.png" alt="no img" />
            </div>
            <div className="px-4 min-w-0 flex-[0_0_auto] items-center w-36">
              <img className="inline-block" src="/image6.png" alt="no img" />
            </div>
            <div className="px-4 min-w-0 flex-[0_0_auto] items-center w-36">
              <img className="inline-block" src="/image8.png" alt="no img" />
            </div>
            <div className="px-4 min-w-0 flex-[0_0_auto] items-center w-36">
              <img className="inline-block" src="/image9.png" alt="no img" />
            </div>
          </div>
        </div>

        <div className="flex my-16 relative">
          <img
            className="inline-block"
            src="/creative-people.png"
            alt="no img"
          />
          <div className="absolute md:left-28 md:top-28 left-4 top-1">
            <h3 className="font-semibold md:text-4xl text-xl md:mb-4 text-secondary-white">
              Connect on the go...
            </h3>
            <p className="text-secondary-white md:mb-8 md:text-2xl text-justify">
              If you are looking for a serviced solution or an expert
              consulting, we are there to hear.
            </p>
            <button
              type="button"
              onClick={() => router.push("/contact-us")}
              className="inline-flex items-center p-2 px-8 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:text-2xl border border-white"
            >
              <span>Contact Us</span>
            </button>
          </div>
        </div>

        <div className="flex mb-20 flex-col md:flex-row gap-8">
          <div className="md:w-full">
            <h3 className="font-semibold  md:text-4xl text-2xl mb-8">
              <span className="text-primary-orange">Global </span> presence
            </h3>
            <p className="text-justify text-secondary-gray">
              We serve our customers from different locations to fulfill their
              needs efficiently within a justified time frame...
            </p>
            <div className="mt-16 md:mb-0 mb-8">
              {/* <img className="inline-block" src="/map.png" alt="no img" /> */}
              <Map2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
