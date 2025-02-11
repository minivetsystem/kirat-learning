import GenericButton from "@/components/genericButton/GenericButton";
import React from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  analyticsInsights,
  eCommerceIntegration,
  orderManagement,
  pricingManagement,
  productListing,
} from "@/lib/data";
import TabContent from "@/components/tab-content/TabContent";

export const metadata = {
  title: "Ecommerce Services",
  description:
    "Are you looking to take your business online or elevate your existing e-commerce operations? At KIRAT, we offer a comprehensive suite of e-commerce services designed to simplify and optimize every aspect of your online store.",
};

export default function LeadershipDevelopment() {
  return (
    <>
      <div>
        {/* <div className="container mx-auto 2xl:px-32 px-8 xl:pt-20 pt-8">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-full md:mb-0 mb-8 flex flex-col gap-4 pt-8">
              <span className=" text-primary-midnightBlue font-extrabold xl:text-6xl lg:text-5xl md:text-4xl text-2xl">
                Ecommerce Services
              </span>
              <p className="text-justify">
                Are you looking to take your business online or elevate your
                existing e-commerce operations? At KIRAT, we offer a
                comprehensive suite of e-commerce services designed to simplify
                and optimize every aspect of your online store.
              </p>
            </div>
          </div>
        </div> */}

        <div className="container mx-auto 2xl:px-32 px-8 xl:pt-10 py-8 ">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-3/5 md:mb-0 mb-8 flex flex-col gap-6 pt-20 lg:pl-10">
              <span className=" text-primary-midnightBlue font-extrabold xl:text-7xl lg:text-5xl md:text-4xl text-2xl ">
                Ecommerce Services
              </span>
              <p className="text-justify  lg:pr-60">
                Are you looking to take your business online or elevate your
                existing e-commerce operations? At KIRAT, we offer a
                comprehensive suite of e-commerce services designed to simplify
                and optimize every aspect of your online store.
              </p>
            </div>
            <div className="md:w-2/5">
              <img src="/ecommerce/ecommerce1.png" alt="no img" />
            </div>
          </div>
        </div>

        <div className="container mx-auto 2xl:px-32 px-8 xl:pb-20 py-8">
          <div className="flex flex-col md:flex-row text-center">
            <div className="md:w-full">
              <h3 className="font-semibold md:text-4xl text-2xl mb-8">
                <span className="text-primary-orange">Our </span>
                E-Commerce Services
              </h3>
              <TabContent />
            </div>
          </div>
        </div>
        <div className="bg-muted">
          <div className="container mx-auto 2xl:px-32 px-8 xl:py-20 py-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-full">
                <h3 className="font-semibold md:text-4xl text-2xl mb-8 py-8 text-center">
                  <span className="text-primary-orange">Why </span>
                  Choose Us?
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                  <div className=" text-center border-r-2 border-gray-400">
                    <img
                      src="/whychooseus/solution.png"
                      className="inline-block mb-4 py-4"
                    />

                    <h2 className="font-bold text-xl">Customized Solutions</h2>
                    <p className="px-2">
                      Tailored strategies for businesses of all sizes.
                    </p>
                  </div>
                  <div className=" text-center border-r-2 border-gray-400">
                    <img
                      src="/whychooseus/experts.png"
                      className="inline-block mb-4 py-4"
                    />

                    <h2 className="font-bold text-xl">Expert Team</h2>
                    <p className="px-2">
                      Skilled professionals with extensive industry experience.
                    </p>
                  </div>
                  <div className=" text-center border-r-2 border-gray-400">
                    <img
                      src="/whychooseus/api.png"
                      className="inline-block mb-4 py-4"
                    />

                    <h2 className="font-bold text-xl">Scalable Services</h2>
                    <p className="px-2">
                      Grow with ease as your business expands.
                    </p>
                  </div>
                  <div className=" text-center">
                    <img
                      src="/whychooseus/24-hours-support.png"
                      className="inline-block mb-4 py-4"
                    />

                    <h2 className="font-bold text-xl">24/7 Support</h2>
                    <p className="px-2">
                      {" "}
                      Dedicated customer service when you need it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto 2xl:px-32 px-8 xl:py-20 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-full flex md:flex-row flex-col items-center">
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold md:text-4xl text-2xl">
                  Get Started Today!
                </h3>
                <p className="pr-10 xl:pr-60">
                  Take the first step toward e-commerce success. Contact us at
                  info@kiratit.com or call us at +971585960949. Let us help you
                  build a thriving online presence and deliver exceptional
                  shopping experiences to your customers.
                </p>
                <GenericButton url="/contact-us" name="Learn More" />
              </div>
              <div>
                <img src="/ecommerce/ecommerce2.png" alt="no img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
