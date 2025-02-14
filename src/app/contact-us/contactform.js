"use client";
import { sendEmail } from "@/app/actions/email";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function Contactform() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendEmail(formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };
  return (
    <div className="md:w-1/2 xl:py-10 py-8 bg-white px-16 md:mb-0 mb-16">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="">
            <div className="mt-2">
              <input
                placeholder="NAME"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                id="first-name"
                type="text"
                className="block w-full bg-transparent border border-transparent border-b-primary-midnightBlue text-primary-midnightBlue p-2"
              />
            </div>
          </div>

          <div className="">
            <div className="mt-2">
              <input
                placeholder="EMAIL"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                className="block w-full bg-transparent border border-transparent border-b-primary-midnightBlue text-primary-midnightBlue p-2"
              />
            </div>
          </div>

          <div className="">
            <div className="mt-2">
              <input
                placeholder="PHONE NO."
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                type="tel"
                className="block w-full bg-transparent border border-transparent border-b-primary-midnightBlue text-primary-midnightBlue p-2"
              />
            </div>
          </div>

          <div className="">
            <div className="col-span-full">
              <div className="mt-2">
                <textarea
                  placeholder="MESSAGE"
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  type="text"
                  rows="3"
                  className="block w-full bg-transparent border border-transparent border-b-primary-midnightBlue text-primary-midnightBlue p-2"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-start">
          <button
            type="submit"
            className="flex bg-primary-orange items-center p-2 px-4 ml-1 text-sm text-white rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 font-semibold group hover:pr-2 transition-all duration-200 ease-in-out"
          >
            <span>SEND</span>
            <ChevronRight className="w-0 group-hover:w-8 group-hover:opacity-100 opacity-0 transition-all duration-500 ease-in-out" />
          </button>
        </div>
      </form>
    </div>
  );
}
