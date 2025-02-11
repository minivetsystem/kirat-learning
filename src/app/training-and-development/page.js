import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components//ui/card";

export const metadata = {
  title: 'Integration',
  description: 'Kirat IT has carved out a specialized niche in providing advisory and consulting services designed to help clients achieve their strategic objectives.',
}

export default function Integration() {
  return (
    <div>
     

      {/* <div className="container mx-auto 2xl:px-32 px-8 xl:pt-28 pt-8">
        <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2">
          <img src="/integration/integration1.png" alt="no img" />
          </div>
          <div className="md:w-1/2 md:mb-0 mb-8 flex flex-col gap-4 pt-20 pl-10 ">
            <span className=" text-primary-midnightBlue font-extrabold xl:text-6xl lg:text-5xl md:text-4xl text-2xl uppercase">
            Integration
            </span>
            <p className="text-justify">
              Kirat IT has carved out a specialized niche in providing
              advisory and consulting services designed to help clients achieve
              their strategic objectives.
            </p>

            <p className="text-justify">
              Integration is a fundamental concept across numerous domains,
              including technology, business processes, and systems. At its
              core, integration involves unifying disparate parts or systems
              into a cohesive whole, enabling them to work seamlessly together.
              This capability is critical for ensuring effectiveness,
              consistency, and the successful achievement of business goals
            </p>
          </div>
          
        </div>
      </div> */}

      <div className="container mx-auto 2xl:px-32 px-8 xl:pt-20 pt-8">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-full md:mb-0 mb-8 flex flex-col gap-4 pt-8">
              <span className=" text-primary-midnightBlue font-extrabold xl:text-6xl lg:text-5xl md:text-4xl text-2xl">
              Integration
              </span>
              <p className="text-justify">
              Integration is a fundamental concept across numerous domains,
              including technology, business processes, and systems. At its
              core, integration involves unifying disparate parts or systems
              into a cohesive whole, enabling them to work seamlessly together.
              This capability is critical for ensuring effectiveness,
              consistency, and the successful achievement of business goals.
              </p>
            </div>
          </div>
        </div>

      <div className="container mx-auto 2xl:px-32 px-8 xl:py-28 py-8">
        <div className="flex flex-col md:flex-row xl:my-20 my-8 ">
          <div className="md:w-full flex flex-col gap-4">
            <p className="text-justify">
              Our approach to integration is both comprehensive and nuanced. We
              meticulously analyze the various forms, meanings, and components
              of integration to develop tailored solutions that enhance
              efficiency, coherence, and innovation across different fields. By
              bringing together diverse systems, processes, or components,
              organizations and individuals can overcome complex challenges and
              drive significant, sustainable growth.
            </p>

            <p className="text-justify">
              At Kirat IT, we empower stakeholders to navigate
              potential obstacles and harness the full benefits of integration.
              With a deep understanding of the intricacies involved, we help our
              clients capitalize on the opportunities presented by integration,
              leading to more substantial achievements and long-term success.
            </p>
          </div>
        </div>

       
        <div className="flex justify-between flex-row md:mb-8 mb-0">
          <div className="w-1/2">
            <h3 className="font-semibold  md:text-4xl text-2xl mb-8">
              <span className="text-primary-orange">Case </span> study
            </h3>
          </div>
        </div>
      

        <div className="grid grid-cols-4 gap-4  md:grid-rows-3 mb-8">
          <Card className="duration-300  hover:tranform hover:scale-105">
            <img
              className="rounded-t-md mb-8 w-full"
              src="/integration2.jpg"
              alt="no img"
            />
            <CardContent>
              <CardTitle className="text-sm">SMELLCELLS</CardTitle>
              <CardDescription className=" text-xs">
              SmellCells has revolutionized the markets by the advanced...
                <Link
                  href="/ank"
                  className="text-secondary-boldGray font-bold  cursor-pointer text-xs"
                >
                  Read More
                </Link>
              </CardDescription>
            </CardContent>
          </Card>

          

      
        </div>
      </div>
    </div>
  );
}
