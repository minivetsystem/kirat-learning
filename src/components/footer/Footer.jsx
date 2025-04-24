"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <div className="">
      <div className="bg-primary-midnightBlue md:py-20 py-8 text-white">
        <div className="container mx-auto 2xl:px-32 px-8">
          <div className="flex justify-between flex-col md:flex-row">
            <div className="md:mb-0 mb-8">
              <Link href="#" className="flex items-center">
                <img
                  src="/Logo-01.png"
                  className="mr-3 h-24"
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
                {/* <li>
                  <Link href="/blogs">
                    Blogs
                  </Link>
                </li> */}

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
                    info@kiratit.com
                  </Link>
                </li>
              </ul>
              <div className="">
                <Link href="#" className="inline-block mr-2">
                  <img src="/social1.png" alt="no img" />
                </Link>
                <Link href="#" className="inline-block">
                  <img src="/social2.png" alt="no img" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
