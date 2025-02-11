// import Map from '@/components/map/Map';

import React from "react";
import Contactform from "./contactform";
import Map2 from "@/components/map2/Map2";


export const metadata = {
  title: "Contact Us",
  description: "Generated by kirat IT",
};

export default function ContactUs() {
  return (
    <div>
      <div className="bg-secondary-lightGray bg-[url('/bg1.png')]">
        <div className="container mx-auto 2xl:px-32 px-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:mb-0 mb-8">
              <h2 className="block text-primary-midnightBlue font-bold xl:text-7xl lg:text-5xl md:text-4xl text-2xl uppercase md:mt-80 mt-12">
                Contact{" "}
                <span className="text-primary-orange font-bold xl:text-7xl lg:text-5xl md:text-4xl text-2xl uppercase">
                  Us
                </span>
              </h2>
            </div>
            <Contactform />
          </div>
        </div>
      </div>
      <div className="container mx-auto 2xl:px-32 px-8 xl:py-28 py-8">
        <div className="flex justify-between flex-col md:flex-row mb-16 px-28 md:text-left text-center">
          <div className="md:w-1/3 mb-8 xl:mr-16 mr-0">
            <img className="mb-4 inline" src="/icon1.png" alt="no img" />
            <h3 className="font-extrabold text-xl mb-2">PHONE NO.</h3>
            <p>
              <a href="tel:+971585960949" className=" text-sm block">
                +971585960949
              </a>
            </p>
          </div>
          <div className="md:w-1/3 mb-8 xl:mr-16 mr-0">
            <img className="mb-4 inline " src="/icon2.png" alt="no img" />
            <h3 className="font-extrabold text-xl mb-2">EMAIL </h3>
            <p className="text-sm ">
              <a href="mailto:hr@kiratitsolutions.com">info@kiratit.com</a>
            </p>
          </div>

          <div className="md:w-1/3 mb-8 xl:mr-16 mr-0 ">
            <img className="mb-4 inline" src="/icon3.png" alt="no img" />
            <h3 className="font-extrabold text-xl mb-2">ADDRESS</h3>
            <div className="flex flex-col gap-2">
              <p className="text-sm">
                Kirat Information Technology LLC, PO BOX - 111409, Dubai, United
                Arab Emirates,
                <br /> Phone- +971585960949
              </p>
              <p className="text-sm">
                Kirat IT, UK - 127 Fencepiece Road, Ilford, England, IG6 2LD
              </p>
              {/*  <p className="text-sm">
                604B, Astra North Office, Astra Towers, Major Arterial Road
                (North Extension), New Town, West Bengal-700161, India
              </p> */}
            </div>
          </div>
        </div>
        <div>
          <div className="w-full text-center mb-16">
            <h3 className="font-semibold  md:text-4xl text-2xl mb-4">
              <span className="text-primary-orange">Global </span> Presence
            </h3>
            <p>
              Do you need a fast solution, a significant change or professional
              advice to guide you through it all? We're interested in hearing
              from you...
            </p>
          </div>
          <div className="w-full p-5 mx-auto">
            {/* <img src="/map2.png" alt="no img" /> */}
            {/* <Map />  */}

            <Map2 />
          </div>
        </div>
      </div>
    </div>
  );
}
