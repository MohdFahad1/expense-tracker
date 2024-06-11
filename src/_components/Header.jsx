import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="py-3 md:px-0 px-3 border-b-[1px] shadow-md border-none">
      <div className="md:container flex justify-between items-center">
        <div className="flex gap-1 md:gap-2 items-center">
          <Image
            src={"/logo.svg"}
            alt="logo"
            height={55}
            width={55}
            className="w-[50px] h-[50px]"
          />
          <h1 className="text-xl md:text-2xl font-semibold text-primary">
            Budget Tracker
          </h1>
        </div>

        <div>
          <Button>Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
