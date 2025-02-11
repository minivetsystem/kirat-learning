"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GenericButton from "../genericButton/GenericButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function GenericPage({ title, description, data, imgUrl }) {
  const router = useRouter();

  return (
    <div>
      {/* <div className="container mx-auto 2xl:px-32 px-8 xl:pt-28 pt-8">
        <div className="flex flex-col md:flex-row gap-10 ">
          <div className="md:w-1/2">
            <img src={imgUrl} alt="no img" title={title} />
          </div>
          <div className="md:w-1/2 md:mb-0 mb-8 flex flex-col gap-4 pl-10 pt-20">
            <span className="block text-primary-midnightBlue font-extrabold xl:text-7xl lg:text-5xl md:text-4xl text-2xl">
              {title}
            </span>
            <p className="text-justify">{description}</p>
          </div>
        </div>
      </div> */}
{/* content-writing */}
      <div className="container mx-auto 2xl:px-32 px-8 xl:py-20 py-8">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-full md:mb-0 mb-8 flex flex-col gap-4 pt-8">
            <span className=" text-primary-midnightBlue font-extrabold xl:text-6xl lg:text-5xl md:text-4xl text-2xl">
              {title}
       
            </span>
            <p className="text-justify">{description}</p>
          </div>
        </div>
      </div>

      {data.map((section, index) => (
        <div key={index} className={index % 2 === 0 ? "bg-muted" : ""}>
          <div className="container mx-auto 2xl:px-32 px-8 xl:py-20 py-8">
            <div className="flex flex-col md:flex-row ">
              <div className="md:w-full">
                {section.category !== "letsCreateTogether" && (
                  <h3 className="font-semibold md:text-4xl text-2xl mb-8">
                    <span className="text-primary-orange">
                      {section.title.split(" ")[0]}{" "}
                    </span>
                    {section.title.split(" ").slice(1).join(" ")}
                  </h3>
                )}

                {section.category === "benefits" && (
                  <div className="grid grid-cols-3 w-full benefits">
                    {section.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="text-center relative">
                        <div className="py-4">
                          <img
                            src={step.imgURl}
                            className="inline-block mb-4"
                          />
                          <h2 className="font-bold text-xl py-1">
                            {step.title}
                          </h2>
                          <p className="px-4">{step.description}</p>
                        </div>

                        {/* Divider in the middle */}
                        {stepIndex !== section.steps.length - 1 && (
                          <div className="absolute right-0 top-0 h-full border-r border-gray-400"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {section.category === "industriesWeServe" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full industry">
                    {section.steps.map((step, stepIndex) => (
                   
                   
                      <Card
                        key={stepIndex}
                        className="duration-300  hover:tranform hover:scale-105"
                      >
                        <img
                            src={step.imgURl}
                            className="rounded-t-md mb-8 w-full"
                          />
                        <CardContent>
                          <CardTitle className="text-start pb-4 text-base">
                            {step.title}
                          </CardTitle>
                          <CardDescription className="text-justify text-sm">
                            {step.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {section.category === "whyChooseUs" && (
                  <div className="list-disc pl-8 ">
                    {section.steps.map((step, stepIndex) => (
                      <div
                        key={stepIndex}
                        className="list-none mb-8 flex flex-row gap-8 items-center"
                      >
                        <div className="flex flex-col gap-4 items-start w-1/2 text-left">
                          <h3 className="text-lg font-semibold">
                            {step.title}
                          </h3>
                          <p className="text-justify">{step.description}</p>
                          {step.linkText && step.linkUrl && (

                            <GenericButton
                              url={step.linkUrl}
                              name={step.linkText}
                            />
                          )}
                        </div>
                        {step.imgUrl && (
                          <div className="w-1/2">
                            <img src={step.imgUrl} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {section.category === "process" && (
                  <div className="grid  w-full md:grid-cols-3 grid-col-1 benefits">
                    {section.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="text-center relative">
                        <div className="py-4">
                          <img
                            src={step.imgURl}
                            className="inline-block mb-4"
                          />
                          <h2 className="font-bold text-xl py-1">
                            {step.title}
                          </h2>
                          <p className="px-4">{step.description}</p>
                        </div>

                        {/* Divider in the middle */}
                        {(stepIndex + 1) % 3 !== 0 &&
                          stepIndex !== section.steps.length - 1 && (
                            <div className="absolute right-0 top-0 h-full border-r border-gray-400 hidden md:block"></div>
                          )}
                      </div>
                    ))}
                  </div>
                )}

               

                {section.category === "services" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {section.steps.map((card, index) => (
                      <div
                        key={index}
                        className="p-8 pt-20 border border-orange-500 relative"
                      >
                        <img
                          className="mb-6 text-white"
                          src={card.icon}
                          alt="no img"
                        />
                        <p>{card.title}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.category === "letsCreateTogether" && (
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-full flex md:flex-row flex-col items-center">
                      <div className="flex flex-col gap-4">
                        <h3 className="font-semibold md:text-4xl text-2xl">
                          {section.title}
                        </h3>
                        <p className="pr-10 xl:pr-60">{section.description}</p>
                        <GenericButton url="/contact-us" name="Learn More" />
                      </div>
                      <div>
                        <img src="/ecommerce/ecommerce2.png" alt="no img" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}