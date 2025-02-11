import React from "react";
import Link from "next/link";
import GenericButton from "@/components/genericButton/GenericButton";

export const metadata = {
  title: "Change Management",
  description:
    "Welcome to KIRAT's Change Management Solutions: In the fast-paced world of IT, effective change management is the cornerstone of sustainable growth and innovation. At KIRAT, we specialize in empowering organizations to seamlessly adapt to technological advancements, streamline processes, and drive business success.",
};

export default function CollegePlacementsAndConsultingServices() {
  return (
    <div>
      {/* <div className="container mx-auto 2xl:px-32 px-8 xl:pt-28 pt-8">
        <div className="flex flex-col md:flex-row gap-10 ">
        <div className="md:w-1/2">
          <img src="/data/image1.jpg" alt="no img" />
          </div>
          <div className="md:w-1/2 md:mb-0 mb-8 flex flex-col gap-4 pt-20 pl-10 ">
            <span className=" text-primary-midnightBlue font-extrabold xl:text-6xl lg:text-5xl md:text-4xl text-2xl uppercase">
            Change Management Services
            </span>
            <p className="text-justify">
            Welcome to KIRAT's Change Management Solutions: In the fast-paced
              world of IT, effective change management is the cornerstone of
              sustainable growth and innovation. At KIRAT, we specialize in
              empowering organizations to seamlessly adapt to technological
              advancements, streamline processes, and drive business success.
            </p>
          </div>
          
        </div>
      </div> */}

      <div className="container mx-auto 2xl:px-32 px-8 xl:pt-20 pt-8">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-full md:mb-0 mb-8 flex flex-col gap-4 pt-8">
            <div className=" text-primary-midnightBlue font-extrabold xl:text-6xl lg:text-5xl md:text-4xl text-2xl">
              Change Management Services
            </div>
            <p className="text-justify">
              Welcome to KIRAT's Change Management Solutions: In the fast-paced
              world of IT, effective change management is the cornerstone of
              sustainable growth and innovation. At KIRAT, we specialize in
              empowering organizations to seamlessly adapt to technological
              advancements, streamline processes, and drive business success.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto 2xl:px-32 px-8 xl:py-28 py-8">
        <div>
          <div className="flex flex-col gap-8 xl:my-20">
            <div className="md:w-full">
              <h3 className="font-semibold md:text-4xl text-2xl mb-8">
                <span className="text-primary-orange">Why </span>
                Choose KIRAT for Change Management?
              </h3>

              <p className="text-justify">
                Expertise in IT Transitions: With years of experience, we excel
                in managing transitions for businesses of all sizes, ensuring
                minimal disruption and maximum efficiency. Tailored Strategies:
                Our solutions are customized to meet your unique organizational
                goals and challenges. Employee Empowerment: We focus on
                equipping your workforce with the skills and mindset needed to
                embrace change. End-to-End Support: From planning to execution,
                KIRAT’s experts are with you every step of the way.
              </p>
            </div>

            <div className="md:w-full">
              <h3 className="font-semibold md:text-4xl text-2xl mb-8">
                <span className="text-primary-orange">Our </span>
                Change Management Services
              </h3>

              <p className="text-justify">
                Organizational Readiness Assessment: Evaluate your
                organization’s capacity for change and identify potential
                roadblocks. Stakeholder Engagement: Collaborate with key
                stakeholders to build a shared vision for the future.
                Communication Strategy: Develop a comprehensive plan to inform,
                engage, and inspire your team throughout the change process.
                Training and Development: Equip your workforce with the skills
                needed to thrive in a transformed environment. Performance
                Monitoring: Measure and optimize the success of change
                initiatives through data-driven insights.
              </p>
            </div>

            <div className="list-none mb-8 flex flex-row gap-8 items-center">
              <div className="flex flex-col gap-4 items-start w-1/2 text-left">
                {" "}
                {/* Change text-center to text-left and items-center to items-start */}
                <h3 className="text-xl font-semibold">Success Stories</h3>
                <p className="text-justify">
                  Discover how KIRAT has helped organizations around the globe
                  overcome challenges and achieve their goals with
                  transformative change management solutions
                </p>
                <GenericButton url="/contact-us" name="Learn More" />
              </div>

              <div className="w-1/2">
                <img src="./change2.jpg" alt="change-management" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
