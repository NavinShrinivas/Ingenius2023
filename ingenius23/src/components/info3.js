"use client";
import Image from "next/image";
import { Parallax } from "react-scroll-parallax";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export const Info3 = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="items-center mt-10 lg:mt-0 justify-center flex">
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className=" flex items-center lg:px-40 w-full gap-10  "
      >
        <Image
          src="/Open_innovation_1.png"
          alt="Picture of the author"
          width={500}
          height={500}
          className="hidden lg:flex"
        />

        <div className=" font-mono">
          <h1 className="text-4xl  py-4 text-[#216cb5] font-bold">
            Open Innovation
          </h1>
          <p className="text-xl">
            Open innovation provides opportunities that you never knew existed.
            Opportunities to explore, learn and grow. With the liberty of
            choice, you can work on any problem statement. InGenius aims to
            kindle that fire of innovation within you. Let your thoughts run
            wild. Ideas stay unbounded. The sky is the limit.
          </p>
        </div>
      </div>
    </div>
  );
};
