"use client";
import { Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const router = useRouter();
  return (
    <div className="">
      <div className="bg-primary-midnightBlue md:py-20 py-8 text-white">
        <div className="container mx-auto 2xl:px-32 px-8">
          <div className="flex justify-between flex-col md:flex-row">
            <div className="md:mb-0 mb-8">
              <Link href="#" className="flex items-center w-36">
                <img
                  src="/logo-footer.png"
                  className="mr-3 "
                  alt="Kirat IT"
                  title="Kirat IT"
                />
              </Link>
            </div>
            <div className="md:mb-0 mb-8">
              <h2 className="font-semibold md:text-2xl text-xl">COMPANY</h2>
              <ul className="justify-start">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about-us">About Us</Link>
                </li>
                <li>
                  <Link href="/training-and-development">
                    Training & Development
                  </Link>
                </li>
                <li>
                  <Link href="/leadership-development">
                    Leadership Development
                  </Link>
                </li>
                <li>
                  <Link href="/college-placements-and-consulting-services">
                    Placements & Consulting
                  </Link>
                </li>
                <li>
                  <Link href="/blogs"> 
                    Blogs
                  </Link>
                </li>

                <li>
                  <Link href="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>

            <div className="md:mb-0 mb-8">
              <h2 className="font-semibold md:text-2xl text-xl">SITEMAP</h2>
              <ul>
                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#">Feedback</Link>
                </li>
              </ul>
            </div>
            <div className="">
              <h2 className="font-semibold md:text-2xl text-xl">CONTACT</h2>
              <ul className="mb-2">
                <li>
                  <Link href="mailto:hr@kiratitsolutions.com">
                    hello@kiratlearning.com
                  </Link>
                </li>
                <li>
                <a href="tel:+918500007126" className=" text-sm flex">
             Mob : +918500007126
              </a>
                </li>
              </ul>
              <div className="flex items-center space-x-2">
                <Link href="#" className="inline-block">
                  <img src="/social1.png" alt="Social Icon 1" />
                </Link>
                <Link href="#" className="inline-block">
                  <img src="/social2.png" alt="Social Icon 2" />
                </Link>
                <Link target="_blank" href="https://wa.me/918500007126" className="flex justify-center w-7 h-7 rounded-full bg-gray-500 items-center">
                  <FaWhatsapp className="text-primary-midnightBlue text-lg"/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
