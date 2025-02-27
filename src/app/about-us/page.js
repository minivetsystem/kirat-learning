"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import TeamCard from "./TeamCard";

const teamMembers = [
  {
    name: "Raghbir Kapoor Singh",
    title: "Managing Director (Technology)",
    image: "/about/profile2.jpg",
    description:
      "Having worked on system integration projects for big international companies in the chemical, banking, retail, and fast-moving consumer goods industries for 14 years...",
  },
  {
    name: "Sandeep Patel",
    title: "Director (Operations)",
    image: "/about/profile1.jpg",
    description:
      "Sandeep Patel is in charge of all aspects of the company's operations, client relations, technology, and capability development...",
  },
  {
    name: "Rudra Roy",
    title: "Head (SAP Business)",
    image: "/about/profile2.jpg",
    description:
      "Before joining Kirat and leading the SAP division, Rudra spent 12 years working for IBM and 3 years working as a freelance consultant in Europe...",
  },
  {
    name: "Ripple Kaur",
    title: "Director (Integration and Quality Assurance)",
    image: "/about/profile1.jpg",
    description:
      "Ripple is the Head of Integration at Kirat and is a Certified SAP Process Integration Consultant...",
  },
];

export default function AboutUs() {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="">
      <div className="container mx-auto 2xl:px-32 px-8 xl:py-28">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 md:mb-0 mb-8">
            <span className="block text-primary-midnightBlue font-extrabold xl:text-6xl lg:text-5xl md:text-4xl text-2xl uppercase">
              About Us
            </span>
          </div>
          <div className="md:w-1/2">
            <p className="text-justify">
              It is time to unfold the cores of Kirat IT Solutions Pvt. Ltd.
              Founded in the middle of 2015, Kirat is a rapidly expanding
              private limited company that specializes in IT services and
              product development. Entrepreneurs with vast backgrounds in
              software services and IT consulting across a range of industrial
              verticals created Kirat. Our emphasis is on innovation and quality
              in creating solutions with cutting-edge technologies in an
              economical manner. From strategy to execution, we assist our
              clients in meeting their IT demands by providing solutions that
              help them achieve their objectives. Our industry-skilled
              professional team of highly motivated experts provides
              comprehensive services in SAP and custom software, including
              design, development, and support. May it be under the vertical of
              solutions or services, Kirat always extend its span to deliver the
              project in a hassle-free timeline. Aspiring business owners with
              vast IT experience in a variety of industrial verticals and rich
              customer-facing knowledge worldwide created Kirat IT Solutions.
              LegalBell, a product of Kirat, is a testament to our dedication to
              innovation in fields that affect millions of people and increase
              transparency.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto 2xl:px-32 px-8 xl:py-2 py-8">
        <div className="flex justify-between flex-row md:mb-8 mb-0">
          <div className="w-1/2">
            <h3 className="font-semibold md:text-4xl text-2xl mb-5">
              <span className="text-primary-orange">Management </span>
              Team
            </h3>
          </div>
        </div>
        <div className="flex justify-between gap-8 flex-col md:flex-row mb-12">
          <div className="flex justify-between flex-col md:flex-row gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}


