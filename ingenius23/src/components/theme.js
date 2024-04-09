"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Theme(themeTitle, themeDescription) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="items-center lg:mt-20 justify-center flex">
      <div
        data-aos="zoom-in"
        data-aos-delay="200"
        className=" flex items-center lg:px-40 w-full lg:justify-center lg:gap-10 "
      >
        <div className="font-mono my-8">
          <h1 className="lg:text-4xl text-2xl  py-4 text-[#fac518] font-bold">
            {themeTitle}
          </h1>
          <p className="text-lg lg:text-xl text-white">{themeDescription}</p>
        </div>
      </div>
    </div>
  );
}
