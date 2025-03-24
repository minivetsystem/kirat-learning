"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"



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
              At KIRAT Learning, we are passionate about empowering individuals
              and organizations to unlock their full potential through
              transformative learning experiences. With over two decades of
              expertise in the Learning and Development (L&D) space, our team of
              highly experienced trainers has been at the forefront of shaping
              effective training programs that make a real difference.
            </p>
            <br/>
            <p className="text-justify">
              We specialize in soft skills training, delivering tailored
              solutions that focus on developing essential interpersonal skills
              such as communication, leadership, emotional intelligence, time
              management, and conflict resolution. Our trainers, with their
              extensive global experience, have worked with diverse
              organizations across various industries, delivering high-impact
              training programs that foster personal growth, enhance team
              collaboration, and drive organizational success.
            </p>
            <p className="text-justify">
              Whether you're looking to upskill your workforce or foster a
              culture of continuous learning, we bring you the expertise,
              insights, and customized solutions to meet your unique needs. At
              KIRAT, we believe that investing in people is the key to building
              stronger, more resilient organizations—and we're here to guide you
              every step of the way.
            </p>
            <p className="text-justify">
            Let us help you transform your team with world-class training that leaves a lasting impact!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto 2xl:px-32 px-8 xl:py-2 py-8">
      <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="mb-10 text-center">
        <h3 className="font-semibold md:text-4xl text-2xl mb-8">
                  <span className="text-primary-orange">Soft </span>
                  skill Offerings
                </h3>
      </div>

      <Tabs defaultValue="levels" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="levels">Skill Levels</TabsTrigger>
          <TabsTrigger value="industries">Industry Focus</TabsTrigger>
        </TabsList>

        <TabsContent value="levels" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Beginner Level */}
            <Card className="flex flex-col">
              <CardHeader className="bg-primary/10 rounded-t-lg">
                <CardTitle>Beginner Level</CardTitle>
                <CardDescription>Foundation Building</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary font-semibold">•</span>
                    <span>
                      <span className="font-medium">Active Listening & Empathy Development</span> – Enhancing
                      understanding in conversations.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary font-semibold">•</span>
                    <span>
                      <span className="font-medium">Interpersonal Communication Skills</span> – Strengthening personal
                      and professional relationships.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary font-semibold">•</span>
                    <span>
                      <span className="font-medium">Assertiveness Training</span> – Speaking confidently without
                      aggression.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary font-semibold">•</span>
                    <span>
                      <span className="font-medium">Professional & Business Writing</span> – Writing clear emails,
                      reports, and messages.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary font-semibold">•</span>
                    <span>
                      <span className="font-medium">Body Language & Nonverbal Communication</span> – Reading and using
                      silent cues effectively.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Intermediate Level */}
            <Card className="flex flex-col">
              <CardHeader className="bg-primary/20 rounded-t-lg">
                <CardTitle>Intermediate Level</CardTitle>
                <CardDescription>Advanced Interactions & Influence</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary font-semibold">•</span>
                    <span>
                      <span className="font-medium">Public Speaking Mastery</span> – Structuring speeches and engaging
                      audiences.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary font-semibold">•</span>
                    <span>
                      <span className="font-medium">Persuasive Communication</span> – Techniques to influence others
                      effectively.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary font-semibold">•</span>
                    <span>
                      <span className="font-medium">Negotiation & Influence Strategies</span> – Managing disagreements
                      and reaching agreements.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary font-semibold">•</span>
                    <span>
                      <span className="font-medium">Cross-Cultural Communication</span> – Adapting communication styles
                      for global interactions.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary font-semibold">•</span>
                    <span>
                      <span className="font-medium">Facilitation & Moderation Skills</span> – Leading discussions and
                      meetings effectively.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Advanced Level */}
            <Card className="flex flex-col">
              <CardHeader className="bg-primary/30 rounded-t-lg">
                <CardTitle>Advanced Level</CardTitle>
                <CardDescription>Leadership & High-Stakes Communication</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary font-semibold">•</span>
                    <span>
                      <span className="font-medium">Executive Presence & Leadership Communication</span> – Speaking with
                      confidence, clarity, and authority.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary font-semibold">•</span>
                    <span>
                      <span className="font-medium">Crisis Communication & Conflict Management</span> – Handling
                      high-pressure situations.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary font-semibold">•</span>
                    <span>
                      <span className="font-medium">Storytelling for Impact</span> – Using narratives to inspire and
                      persuade.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary font-semibold">•</span>
                    <span>
                      <span className="font-medium">Strategic Communication Planning</span> – Developing long-term
                      communication strategies.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary font-semibold">•</span>
                    <span>
                      <span className="font-medium">Coaching & Mentoring Through Communication</span> – Guiding teams
                      with effective communication.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="industries" className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="corporate">
              <AccordionTrigger className="text-lg font-medium">Corporate & Business</AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Executive Presence & Leadership Communication</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Negotiation & Influence Strategies</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Professional & Business Writing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Facilitation & Moderation Skills</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Crisis Messaging & Reputation Management</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="education">
              <AccordionTrigger className="text-lg font-medium">Education & Training</AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Coaching & Mentoring Through Communication</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Storytelling for Impact</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Public Speaking Mastery</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Active Listening & Empathy Development</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Interpersonal Communication Skills</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="healthcare">
              <AccordionTrigger className="text-lg font-medium">Healthcare & Counselling</AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Emotional Intelligence in Communication</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Crisis Communication & Conflict Management</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Body Language & Nonverbal Communication</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Assertiveness Training</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Cross-Cultural Communication</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="sales">
              <AccordionTrigger className="text-lg font-medium">Sales & Customer Service</AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Persuasive Communication</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Negotiation & Influence Strategies</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Handling Difficult Conversations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Communication for Remote & Hybrid Teams</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-semibold">•</span>
                        <span>Building a Personal Brand through Communication</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
       
      </div>
    </div>
  );
}
