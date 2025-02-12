import GenericButton from "@/components/genericButton/GenericButton";
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
  title: "Integration",
  description:
    "Kirat IT has carved out a specialized niche in providing advisory and consulting services designed to help clients achieve their strategic objectives.",
};

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
            <div className=" text-primary-midnightBlue font-extrabold xl:text-6xl lg:text-5xl md:text-4xl text-2xl">
              Training & Development
            </div>
            <p className="text-justify">
              Through a well-equipped training, Kirat IT Solutions typically
              focus on improving specific job-related skills, such as technical
              abilities or procedures, to ensure employees perform their current
              roles efficiently and effectively.
            </p>
            <p className="text-justify">
              This involves workshops, related knowledge transfer or hands-on
              learning, addressing immediate needs or gaps in performance. On
              the other hand, we provide development strategies in a more
              comprehensive and long-term sense aiming at preparing employees
              for future responsibilities and leadership roles.
            </p>
            <p className="text-justify">
              It involves fostering personal growth, enhancing soft skills, and
              providing opportunities for career advancement.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto 2xl:px-32 px-8 xl:py-28 py-8">
        <div>
          <div className="flex flex-col gap-8 xl:my-20">
            <div className="md:w-full ">
              <h3 className="font-semibold md:text-4xl text-2xl mb-8">
                <span className="text-primary-orange">The </span>
                Process Highlight
              </h3>
            </div>

            <div className="list-none mb-8 flex flex-row gap-8  items-center">
              <div className="flex flex-col gap-4 items-start w-1/2 text-left">
                <h3 className="text-xl font-semibold">SWOT Analysis</h3>
                <p className="text-justify">
                  This planning tool helps us identifying Strengths, Weaknesses,
                  Opportunities, and Threats. By examining these four key areas,
                  we can develop a clear understanding of the internal
                  capabilities and external market conditions. Strengths refer
                  to the strong brand or skilled workforce, while Weaknesses
                  highlight areas that need improvement like limited resources
                  or outdated technology. Opportunities involve external factors
                  that could be leveraged for growth, such as emerging markets
                  or technological advancements, and Threats refer to challenges
                  that could negatively impact the business, like economic
                  downturns or intense competition.
                </p>
              </div>

              <div className="flex justify-center w-1/2 mx-auto">
                <img src="./change1.png" alt="change-management" />
              </div>
            </div>

            <div className="list-none mb-8 flex flex-row gap-8 items-center">
              <div className="flex justify-center w-1/2 mx-auto">
                <img src="./change1.png" alt="change-management" />
              </div>

              <div className="flex flex-col gap-4 items-start w-1/2 text-left">
                <h3 className="text-xl font-semibold">Niche Identification</h3>
                <p className="text-justify">
                  Kirat IT Solutions is constantly focussed on this process to
                  get the best of our businesses from a distinct group of
                  customers with unique needs. It allows us to stand out in the
                  crowded market. By identifying a niche, we can tailor our
                  offerings to meet the specific demands, enhancing customer
                  satisfaction and loyalty. It’s a crucial step for our
                  businesses seeking to differentiate ourselves and achieve
                  sustainable growth.
                </p>
              </div>
            </div>

            <div className="list-none mb-8 flex flex-row gap-8 items-center">

            <div className="flex flex-col gap-4 items-start w-1/2 text-left">
                <h3 className="text-xl font-semibold">Sanity Check</h3>
                <p className="text-justify">
                  Kirat IT Solutions is constantly focussed on this process to
                  get the best of our businesses from a distinct group of
                  customers with unique needs. It allows us to stand out in the
                  crowded market. By identifying a niche, we can tailor our
                  offerings to meet the specific demands, enhancing customer
                  satisfaction and loyalty. It’s a crucial step for our
                  businesses seeking to differentiate ourselves and achieve
                  sustainable growth.
                </p>
              </div>

              <div className="flex justify-center w-1/2 mx-auto">
                <img src="./change1.png" alt="change-management" />
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
