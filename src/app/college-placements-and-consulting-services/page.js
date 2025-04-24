import React from "react";
import Link from "next/link";
import GenericButton from "@/components/genericButton/GenericButton";
import GenericBigButton from "@/components/genericButton/GenericBigButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const trainingModules = [
  {
    id: 1,
    imgUrl: "/placement/aptitude.png",
    title: "Aptitude Training",
    descriptions: [
      "Customized modules on quantitative aptitude, logical reasoning, and verbal ability.",
      "Regular assessments and feedback for skill enhancement.",
    ],
  },
  {
    id: 2,
    imgUrl: "/placement/bank.png",
    title: "Resume Building & Optimization",
    descriptions: [
      "Crafting professional and impactful resumes tailored to industries and job roles.",
      "Highlighting key skills, academic achievements, and extracurricular excellence.",
    ],
  },
  {
    id: 3,
    imgUrl: "/placement/job-interview.png",
    title: "Personal Interview Preparation",
    descriptions: [
      "Mock interviews with detailed feedback.",
      "Training for HR, technical, and managerial interview rounds.",
    ],
  },
  {
    id: 4,
    imgUrl: "/placement/workshop.png",
    title: "Group Discussion (GD) Mastery",
    descriptions: [
      "Techniques to articulate ideas clearly and confidently.",
      "Focus on teamwork, communication skills, and problem-solving.",
    ],
  },
  {
    id: 5,
    imgUrl: "/placement/potential.png",
    title: "Soft Skills Development",
    descriptions: [
      "Sessions on effective communication, presentation skills, and workplace etiquette.",
      "Leadership and teamwork exercises to build interpersonal skills.",
    ],
  },
  {
    id: 6,
    imgUrl: "/placement/production.png",
    title: "Industry Insights & Career Guidance",
    descriptions: [
      "Seminars and workshops with industry professionals.",
      "Guidance on emerging career trends and selecting the right job profiles.",
    ],
  },
  {
    id: 7,
    imgUrl: "/placement/technical-skills.png",
    title: "Technical Skill Enhancement",
    descriptions: [
      "Training in specific technical skills and tools relevant to target industries.",
      "Coding bootcamps, software training, and hands-on projects for engineering and IT students.",
    ],
  },
];

export default function CollegePlacementsAndConsultingServices() {
  return (
    <div>
      <div className="container mx-auto 2xl:px-32 px-8 py-5 xl:py-10">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-full md:mb-0 mb-8 flex flex-col gap-4 pt-8">
            <div className=" text-primary-midnightBlue font-extrabold xl:text-6xl lg:text-5xl md:text-4xl text-2xl">
              College Placement <br />
              Consulting Services
            </div>
            <p className="text-justify w-1/2">
              Kirat IT Solutions navigates the competitive landscape of college
              placements that can be overwhelming for students.
            </p>
            <p className="text-justify w-1/2">
              Our consulting services are designed to empower students with the
              skills, confidence, and strategic mindset needed to excel in
              placement processes and secure their dream roles.
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto 2xl:px-32 px-8  pb-5 xl:pb-10 items-center ">
        <div className="flex flex-col gap-8 xl:mt-20">
          <div className="md:w-full pb-8">
            <h3 className="font-semibold md:text-4xl text-2xl mb-8">
              <span className="text-primary-orange">Our </span>
              Approach
            </h3>
            <p className="text-justify">
              We take a personalized and holistic approach to ensure every
              student is fully prepared to meet placement challenges head-on.
              Our program encompasses all the critical aspects of college
              placement readiness, delivered by seasoned industry experts and
              educators.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 rounded-3xl">
        
          <div className="container flex gap-8 flex-col mx-auto 2xl:px-32 px-8 py-5 xl:py-10">
            <div className="md:w-full ">
              <h3 className="font-semibold md:text-4xl text-2xl mb-8">
                <span className="text-primary-orange">Key </span>
                Offerings
              </h3>
            </div>
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6 benefits pb-10">
              {trainingModules.map((step, stepIndex) => (
                <Card
                  key={step.id}
                  className="text-center relative p-4 uration-300  hover:tranform hover:scale-105"
                >
                  <img
                    src={step.imgUrl}
                    alt={step.title}
                    className="inline-block mb-4"
                  />
                  <CardContent>
                    <h2 className="font-bold text-xl py-1">{step.title}</h2>
                    <ul className="px-5 space-y-2 text-sm text-gray-700 text-start">
                      {step.descriptions.map((desc, index) => (
                        <li key={index} className="list-disc list-inside">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
       
      </div>

      <div className="list-disc container mx-auto 2xl:px-32 px-8 py-5 xl:py-10">
          <h3 className="font-semibold md:text-4xl text-2xl mb-8">
            <span className="text-primary-orange">Why </span>
            Choose Us?
          </h3>
          <div className="mb-8 flex flex-row gap-8 ">
            <ul className="list-disc w-1/2 px-5 ">
              <li>
                A team of experienced mentors with a proven track record in
                student success.
              </li>
              <li>
                Tailored programs to match the unique needs of every student.
              </li>
              <li>
                Comprehensive placement preparation designed to boost confidence
                and competence.
              </li>
              <li>Access to a vast network of recruiters and alumni.</li>
            </ul>

            <div className="w-1/2 flex justify-center ">
              <img src="./change1.jpg" className="rounded-xl w-4/5" />
            </div>
          </div>
        </div>
    </div>
  );
}
