"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  analyticsInsights,
  eCommerceIntegration,
  orderManagement,
  pricingManagement,
  productListing,
} from "@/lib/data";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function TabContent() {
  const plugin = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: true })
  );
  return (
    <div className="flex flex-col items-center mb-8 w-full">
      <Tabs defaultValue="ProductListingServices" className="w-full ">
        <TabsList className="w-full grid grid-cols-5 px-2">
          <TabsTrigger
            value="ProductListingServices"
            className="flex flex-col gap-3 px-8"
          >
            <img src="/ecommerce/features.png" alt="no img" className="pr-2" />
            Product Listing Services
          </TabsTrigger>
          <TabsTrigger
            value="PricingManagement"
            className="flex flex-col gap-3 px-8"
          >
            <img src="/ecommerce/inflation.png" alt="no img" className="pr-2" />
            Pricing Management
          </TabsTrigger>
          <TabsTrigger
            value="OrderManagement"
            className="flex flex-col gap-3 px-8"
          >
            <img
              src="/ecommerce/bulk-buying.png"
              alt="no img"
              className="pr-2"
            />
            Order Management
          </TabsTrigger>
          <TabsTrigger
            value="E-CommerceIntegration"
            className="flex flex-col gap-3 px-8"
          >
            <img
              src="/ecommerce/payment-gateway.png"
              alt="no img"
              className="pr-2"
            />
            E-Commerce Integration
          </TabsTrigger>
          <TabsTrigger
            value="AnalyticsandInsights"
            className="flex flex-col gap-3 px-8"
          >
            <img src="/ecommerce/analytics.png" alt="no img" className="pr-2" />
            Analytics And Insights
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ProductListingServices" className="w-full pt-4">
          <div className="grid grid-cols-4 gap-4 w-full">
            {productListing.sections.map((section, index) => (
              <Card
                key={index}
                className="duration-300  hover:tranform hover:scale-105"
              >
                <img
                  className="rounded-t-md mb-8 w-full"
                  src={section.imgUrl} // Placeholder for the section image
                  alt={section.title}
                />
                <CardContent>
                  <CardTitle className="text-start pb-4 text-base">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-justify text-sm">
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* <div className="flex gap-10">
            <Carousel
              className="w-2/5 p-10"
              plugins={[plugin.current]}
            >
              <CarouselContent>
                {productListing.sections.map((section, index) => (
                  <CarouselItem key={index}>
                    <img
                      className="rounded-t-md mb-8 w-full"
                      src={section.imgUrl} // Placeholder for the section image
                      alt={section.title}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="grid grid-cols-2 w-3/5 gap-8">
              {productListing.sections.map((section, index) => (
                <div key={index}>
                    <img src="./Vector5.png"  className="pb-4"/>
                  <h3 className="text-start text-sm font-semibold text-primary-orange">{section.title}</h3>
                  <p className="text-justify text-sm">{section.description}</p>
                </div>
              ))}
            </div>
          </div> */}
        </TabsContent>
        <TabsContent value="PricingManagement" className="w-full pt-4">
          {/* Sections */}
          <div className="grid grid-cols-4 gap-4 w-full">
            {pricingManagement.sections.map((section, index) => (
              <Card
                key={index}
                className="duration-300  hover:tranform hover:scale-105"
              >
                <img
                  className="rounded-t-md mb-8 w-full"
                  src={section.imgUrl} // Placeholder for the section image
                  alt={section.title}
                />
                <CardContent>
                  <CardTitle className="text-start pb-4 text-base">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-justify text-sm">
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="OrderManagement" className="w-full pt-4">
          {/* Sections */}
          <div className="grid grid-cols-4 gap-4 w-full">
            {orderManagement.sections.map((section, index) => (
              <Card
                key={index}
                className="duration-300  hover:tranform hover:scale-105"
              >
                <img
                  className="rounded-t-md mb-8 w-full"
                  src={section.imgUrl} // Placeholder for the section image
                  alt={section.title}
                />
                <CardContent>
                  <CardTitle className="text-start pb-4 text-base">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-justify">
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="E-CommerceIntegration" className="w-full pt-4">
          {/* Sections */}
          <div className="grid grid-cols-4 gap-4 w-full">
            {eCommerceIntegration.sections.map((section, index) => (
              <Card
                key={index}
                className="duration-300  hover:tranform hover:scale-105"
              >
                <img
                  className="rounded-t-md mb-8 w-full"
                  src={section.imgUrl} // Placeholder for the section image
                  alt={section.title}
                />
                <CardContent>
                  <CardTitle className="text-start pb-4 text-base">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-justify">
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="AnalyticsandInsights" className="w-full pt-4">
          {/* Sections */}
          <div className="grid grid-cols-4 gap-4 w-full">
            {analyticsInsights.sections.map((section, index) => (
              <Card
                key={index}
                className="duration-300  hover:tranform hover:scale-105"
              >
                <img
                  className="rounded-t-md mb-8 w-full"
                  src={section.imgUrl}
                  alt={section.title}
                />

                <CardContent>
                  <CardTitle className="text-start pb-4 text-base">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-justify">
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
