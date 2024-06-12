import Image from "next/image";
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-white py-8 border-t-2">
        <div className="container  relative z-10 mx-auto px-4">
          <div className="-m-8 flex flex-wrap items-center justify-between">
            <div className="w-auto p-8">
              <a href="#">
                <div className="inline-flex items-center gap-2">
                  <Image src={"/logo.svg"} width={50} height={50} alt="logo" />
                  <span className="text-lg font-bold text-primary">
                    Budget Tracker
                  </span>
                </div>
              </a>
            </div>
            <div className="w-auto p-8">
              <ul className="-m-5 flex flex-wrap items-center">
                <li className="p-5">
                  <span className="font-medium text-gray-600 hover:text-primary cursor-pointer">
                    Privacy Policy
                  </span>
                </li>
                <li className="p-5">
                  <span className="font-medium text-gray-600 hover:text-primary cursor-pointer">
                    Terms of Service
                  </span>
                </li>
                <li className="p-5">
                  <span className="font-medium text-gray-600 hover:text-primary cursor-pointer">
                    Return Policy
                  </span>
                </li>
                <li className="p-5">
                  <span className="font-medium text-gray-600 hover:text-primary cursor-pointer">
                    Contact Us
                  </span>
                </li>
              </ul>
            </div>
            <div className="w-auto p-8">
              <div className="-m-1.5 flex flex-wrap">
                <div className="w-auto p-1.5">
                  <span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-[#413EBD] cursor-pointer">
                      <Facebook />
                    </div>
                  </span>
                </div>
                <div className="w-auto p-1.5">
                  <span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-[#413EBD] cursor-pointer">
                      <Twitter />
                    </div>
                  </span>
                </div>
                <div className="w-auto p-1.5">
                  <span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-[#413EBD] cursor-pointer">
                      <Instagram />
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
