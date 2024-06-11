import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4  pt-32 py-20 lg:flex lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Manage Your Expenses
              <strong className="font-extrabold text-primary sm:block mt-5">
                {" "}
                Control your Money{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Start Creating your budget and save your money
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-[#4845D2] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#413EBD] focus:outline-none focus:ring sm:w-auto"
                href="#"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center  px-5 md:px-0">
          <Image
            src={"/dashboard.png"}
            alt="dashboard"
            height={1000}
            width={1000}
            className="border-2"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
