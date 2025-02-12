import React from "react";
import Link from "next/link";
import GenericButton from "@/components/genericButton/GenericButton";
import GenericBigButton from "@/components/genericButton/GenericBigButton";

export const trainingModules = [
  {
    id: 1,
    imgUrl: "/training/aptitude.png",
    title: "Aptitude Training",
    descriptions: [
      "Customized modules on quantitative aptitude, logical reasoning, and verbal ability.",
      "Regular assessments and feedback for skill enhancement.",
    ],
  },
  {
    id: 2,
    imgUrl: "/training/resume.png",
    title: "Resume Building & Optimization",
    descriptions: [
      "Crafting professional and impactful resumes tailored to industries and job roles.",
      "Highlighting key skills, academic achievements, and extracurricular excellence.",
    ],
  },
  {
    id: 3,
    imgUrl: "/training/interview.png",
    title: "Personal Interview Preparation",
    descriptions: [
      "Mock interviews with detailed feedback.",
      "Training for HR, technical, and managerial interview rounds.",
    ],
  },
  {
    id: 4,
    imgUrl: "/training/gd.png",
    title: "Group Discussion (GD) Mastery",
    descriptions: [
      "Techniques to articulate ideas clearly and confidently.",
      "Focus on teamwork, communication skills, and problem-solving.",
    ],
  },
  {
    id: 5,
    imgUrl: "/training/soft-skills.png",
    title: "Soft Skills Development",
    descriptions: [
      "Sessions on effective communication, presentation skills, and workplace etiquette.",
      "Leadership and teamwork exercises to build interpersonal skills.",
    ],
  },
  {
    id: 6,
    imgUrl: "/training/industry-insights.png",
    title: "Industry Insights & Career Guidance",
    descriptions: [
      "Seminars and workshops with industry professionals.",
      "Guidance on emerging career trends and selecting the right job profiles.",
    ],
  },
  {
    id: 7,
    imgUrl: "/training/technical-skills.png",
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
              College Placement Consulting Services
            </div>
            <p className="text-justify">
              Kirat IT Solutions navigates the competitive landscape of college
              placements that can be overwhelming for students.
            </p>
            <p className="text-justify">
              Our consulting services are designed to empower students with the
              skills, confidence, and strategic mindset needed to excel in
              placement processes and secure their dream roles.
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

            <div className="md:w-full ">
              <h3 className="font-semibold md:text-4xl text-2xl mb-8">
                <span className="text-primary-orange">Key </span>
                Offerings
              </h3>
            </div>

            <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6 benefits">
              {trainingModules.map((step, stepIndex) => (
                <div key={step.id} className="text-center relative p-4">
                  <img
                    src={step.imgUrl}
                    alt={step.title}
                    className="inline-block mb-4"
                  />
                  <h2 className="font-bold text-xl py-1">{step.title}</h2>
                  <ul className="px-5 space-y-2 text-sm text-gray-700 text-start">
                    {step.descriptions.map((desc, index) => (
                      <li key={index} className="list-disc list-inside">
                        {desc}
                      </li>
                    ))}
                  </ul>

                  {/* Divider in the middle (Only on desktop) */}
                  {(stepIndex + 1) % 3 !== 0 &&
                    stepIndex !== trainingModules.length - 1 && (
                      <div className="absolute right-0 top-0 h-full border-r border-gray-300 hidden md:block"></div>
                    )}
                </div>
              ))}
            </div>

            <div className="md:w-full ">
              <h3 className="font-semibold md:text-4xl text-2xl mb-8">
                <span className="text-primary-orange">Why </span>
                Choose Us?
              </h3>
            </div> 

            <div className="list-disc pl-8 ">
                    
                      
                        <div className="mb-8 flex flex-row gap-8  items-center">
                          
                         <ul className="list-disc w-1/2">
                          <li>A team of experienced mentors with a proven track record in student success.</li>
                          <li>Tailored programs to match the unique needs of every student.</li>
                          <li>Comprehensive placement preparation designed to boost confidence and competence.</li>
                          <li>Access to a vast network of recruiters and alumni.</li>
                         </ul>
                         
                         <div className="w-1/2 flex justify-center">
                            <img src="./change1.png" />
                          </div>
                          
                        </div>
                      
                          
                    
            </div>
              
          </div>
        </div>
      </div>
    </div>
  );
}
