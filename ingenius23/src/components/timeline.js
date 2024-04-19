import Image from "next/image";
import { Parallax } from "react-scroll-parallax";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";


export const Timeline = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
     <div
      data-aos="fade-right"
      data-aos-delay="200"
      className="items-center lg:mt-8 mt-2 lg:px-40 justify-center flex"
    >
      <div className="flex flex-col items-center justify-center">
        <Image
              src="/timelinestory.png"
              alt="Picture of the author"
              width={500}
              height={500}
              className=" my-20 mx-auto"
            />
            </div>
            </div>
  )
}