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

        <div className="container mx-auto 2xl:px-32 px-8 xl:pt-20 pt-8">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-full md:mb-0 mb-8 flex flex-col gap-4 pt-8">
              <div className=" text-primary-midnightBlue font-extrabold xl:text-6xl lg:text-5xl md:text-4xl text-2xl">
                Leadership Development
              </div>
              <p className="text-justify">
                The team members of Kirat IT Solutions have an extensive
                experience over the years. With endeavour, we aim to train some
                of our members to managing large teams and successfully manage
                other aspects of the business by enhancing the skills,
                qualities, and capabilities of individuals.
              </p>
              <p className="text-justify">
                We focus onimproving our key attributes such as decision-making,
                communication, problem-solving, and emotional intelligence.
                Value adding sessions may include mentorship, training, and
                hands-on experience to build confidence and leadership
                effectiveness.
              </p>
              <p className="text-justify">
                Effective leadership development has helped in cultivating our
                strong leaders, drive innovation, and ensured long-term success
                by aligning leaders with the company’s vision and goals.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto 2xl:px-32 px-8 xl:py-28 py-8">
          <div>
            <div className="flex flex-col gap-8 xl:my-20">
              <div className="md:w-full ">
                <h3 className="font-semibold md:text-4xl text-2xl mb-8">
                  <span className="text-primary-orange">Our </span>
                  Pillars To Our Leadership
                </h3>
              </div>

              <div className="list-none mb-8 flex flex-row gap-8  items-center">
                <div className="flex flex-col gap-4 items-start w-full text-left">
                  <h3 className="text-xl font-semibold">
                    Gaining Trust of your team members
                  </h3>
                  <p className="text-justify">
                    Acquiring the trust of team members requires consistent
                    honesty, transparency, and reliability. When team members
                    see that their leader values their contributions and follows
                    through on commitments, trust naturally strengthens,
                    fostering a collaborative and positive work environment at
                    Kirat.
                  </p>
                </div>

                {/* <div className="flex justify-center w-1/2 mx-auto">
                  <img src="./change1.png" alt="change-management" />
                </div> */}
              </div>

              <div className="list-none mb-8 flex flex-row gap-8 items-center">
                {/* <div className="flex justify-center w-1/2 mx-auto">
                  <img src="./change1.png" alt="change-management" />
                </div> */}

                <div className="flex flex-col gap-4 items-start w-full text-left">
                  <h3 className="text-xl font-semibold">Managing Scale</h3>
                  <p className="text-justify">
                    With skilled-driven techniques Kirat has managed to scale
                    effectively and expand without compromising quality or
                    performance. It involved optimizing processes, systems, and
                    resources to handle increased demand or size. With careful
                    planning, strategic investments in technology and
                    infrastructure, and maintaining strong communication
                    channels, Kirat has maintained operational efficiency and
                    customer satisfaction.
                  </p>
                </div>
              </div>

              <div className="list-none mb-8 flex flex-row gap-8 items-center">
                <div className="flex flex-col gap-4 items-start w-full text-left">
                  <h3 className="text-xl font-semibold">
                    Turning around situations when chips are down
                  </h3>
                  <p className="text-justify">
                    With changes and developments, Kirat has always stayed calm,
                    focused, and resilient in the face of adversity. We have
                    identified the key issues, developed a strategic plan, and
                    rallied the team with clear communication and motivation. By
                    leveraging its resources effectively and maintaining a
                    positive outlook, we navigate challenges and turned
                    difficult circumstances into opportunities for growth.
                  </p>
                </div>

                {/* <div className="flex justify-center w-1/2 mx-auto">
                  <img src="./change1.png" alt="change-management" />
                </div> */}
              </div>

              <div className="list-none mb-8 flex flex-row gap-8 items-center">
                <div className="flex flex-col gap-4 items-start w-full text-left">
                  <h3 className="text-xl font-semibold">
                    Dealing with ambiguity
                  </h3>
                  <p className="text-justify">
                    We have always been adaptable and open-minded when faced
                    with unclear or uncertain situations. It requires making
                    decisions with limited information, trusting instincts, and
                    staying flexible to come upon any emerge new information.
                    Embracing ambiguity has helped us and our organization to
                    navigate change and drive innovation despite the lack of
                    clear direction.
                  </p>
                </div>

                {/* <div className="flex justify-center w-1/2 mx-auto">
                  <img src="./change1.png" alt="change-management" />
                </div> */}
              </div>

              <div className="list-none mb-8 flex flex-row gap-8 items-center">
                <div className="flex flex-col gap-4 items-start w-full text-left">
                  <h3 className="text-xl font-semibold">
                    Managing cross functional teams and stakeholder management
                  </h3>
                  <p className="text-justify">
                    Down the years, Kirat has skillfully and efficiently managed
                    our cross-functional teams, coordinated diverse groups with
                    different skills and perspectives to achieve common goals.
                    Effective stakeholder management requires clear
                    communication, understanding their needs, and aligning
                    project outcomes with their expectations. By fostering
                    collaboration and maintaining transparency, we have ensured
                    the success of both team efforts and stakeholder
                    relationships.
                  </p>
                </div>

                {/* <div className="flex justify-center w-1/2 mx-auto">
                  <img src="./change1.png" alt="change-management" />
                </div> */}
              </div>

              <div className="list-none mb-8 flex flex-row gap-8 items-center">
                <div className="flex flex-col gap-4 items-start w-full text-left">
                  <h3 className="text-xl font-semibold">
                  Culture and change management
                  </h3>
                  <p className="text-justify">
                  With these key aspects, Kirat has continued its alignment for the organization’s values, behaviours, and norms with strategic changes. It involves addressing employee concerns, fostering a positive environment, and guiding them through transitions. Successful culture and change management ensure that changes are embraced, reducing resistance and promoting long-term success.

                  </p>
                </div>

                {/* <div className="flex justify-center w-1/2 mx-auto">
                  <img src="./change1.png" alt="change-management" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
