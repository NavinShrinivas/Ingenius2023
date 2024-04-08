"use client";
import Image from "next/image";
import { Parallax } from "react-scroll-parallax";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export const Info1 = () => {
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
       {/* <Image
          src="/Framework.png"
          alt="Picture of the author"
          width={500}
          height={500}
          className="hidden lg:flex"
  /> */}

        <div className=" font-mono">
          <h1 className="lg:text-5xl text-3xl  py-4 text-[#fac518] font-bold">PESU-ECC's flagship hackathon is back! </h1>
          <p className="text-lg lg:text-xl text-white">
            Whether you're a coder, designer, or just curious, Ingenius provides the perfect platform for you to connect, collaborate, and create through the power of OPEN INNOVATION. &#128161;
          </p>
        </div>
      </div>
    </div>
  );
};
