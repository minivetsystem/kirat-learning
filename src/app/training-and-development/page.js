
import React from "react";
import { Card, CardContent } from "@/components/ui/card"
import { BarChart2, Target, CheckSquare } from "lucide-react"

export const metadata = {
  title: "Integration",
  description:
    "Kirat IT has carved out a specialized niche in providing advisory and consulting services designed to help clients achieve their strategic objectives.",
};

const sections = [
  {
    title: "SWOT Analysis",
    description:
      "This planning tool helps us identifying Strengths, Weaknesses, Opportunities, and Threats. By examining these four key areas, we can develop a clear understanding of the internal capabilities and external market conditions. Strengths refer to the strong brand or skilled workforce, while Weaknesses highlight areas that need improvement like limited resources or outdated technology. Opportunities involve external factors that could be leveraged for growth, such as emerging markets or technological advancements, and Threats refer to challenges that could negatively impact the business, like economic downturns or intense competition.",
    imagePath: "./training/Swot Analysis.png",
    imageAlt: "SWOT Analysis diagram",
    icon: <BarChart2 className="h-6 w-6 text-primary" />,
    reverse: false,
  },
  {
    title: "Niche Identification",
    description:
      "Kirat IT Solutions is constantly focussed on this process to get the best of our businesses from a distinct group of customers with unique needs. It allows us to stand out in the crowded market. By identifying a niche, we can tailor our offerings to meet the specific demands, enhancing customer satisfaction and loyalty. It's a crucial step for our businesses seeking to differentiate ourselves and achieve sustainable growth.",
    imagePath: "./training/Niche Identification.png",
    imageAlt: "Niche Identification diagram",
    icon: <Target className="h-6 w-6 text-primary" />,
    reverse: true,
  },
  {
    title: "Sanity Check",
    description:
      "Kirat IT Solutions is constantly focussed on this process to get the best of our businesses from a distinct group of customers with unique needs. It allows us to stand out in the crowded market. By identifying a niche, we can tailor our offerings to meet the specific demands, enhancing customer satisfaction and loyalty. It's a crucial step for our businesses seeking to differentiate ourselves and achieve sustainable growth.",
    imagePath: "./training/Sanity Check.png",
    imageAlt: "Sanity Check diagram",
    icon: <CheckSquare className="h-6 w-6 text-primary" />,
    reverse: false,
  },
]

export default function Integration() {
  return (
    <div>
      

      <div className="container mx-auto 2xl:px-32 px-8 xl:pt-20 pt-8">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-full md:mb-0 mb-8 flex flex-col gap-4 pt-8">
            <div className=" text-primary-midnightBlue font-extrabold xl:text-6xl lg:text-5xl md:text-4xl text-2xl">
              Training & Development
            </div>
            <p className="text-justify w-2/3">
              Through a well-equipped training, Kirat IT Solutions typically
              focus on improving specific job-related skills, such as technical
              abilities or procedures, to ensure employees perform their current
              roles efficiently and effectively.
            </p>
            <p className="text-justify w-2/3">
              This involves workshops, related knowledge transfer or hands-on
              learning, addressing immediate needs or gaps in performance. On
              the other hand, we provide development strategies in a more
              comprehensive and long-term sense aiming at preparing employees
              for future responsibilities and leadership roles.
            </p>
            <p className="text-justify w-2/3">
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

            <div className="space-y-12 p-6">
      {sections.map((section, index) => (
        <Card
          key={index}
          className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-slate-50"
        >
          <CardContent className="p-0">
            <div className={`flex flex-col ${section.reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-0`}>
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-primary/10">{section.icon}</div>
                  <h3 className="text-xl font-semibold">{section.title}</h3>
                </div>
                <div className="relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                  <p className="text-sm text-muted-foreground pl-4">{section.description}</p>
                </div>
              </div>

              <div className="w-full md:w-1/2 bg-slate-100 flex items-center justify-center p-6 min-h-[300px]">
                <div className="relative w-full h-full max-w-md max-h-64 overflow-hidden rounded-lg shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 z-10 rounded-lg"></div>
                  <img
                    src={section.imagePath || "/placeholder.svg"}
                    alt={section.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
          </div>
        </div>
      </div>
    </div>
  );
}
