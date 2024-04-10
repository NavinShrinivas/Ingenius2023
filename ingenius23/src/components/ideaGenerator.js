import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Randomizer from "./randomizer";

export const IdeaGenerator = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      data-aos="fade-right"
      data-aos-delay="200"
      className="flex items-center gap-10  lg:px-40 justify-center"
      id="idea-generator"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="font-mono">
          <h1 className="lg:text-4xl text-2xl py-4 text-[#fac518] font-bold">
            Ingenius Idea Generator
          </h1>
        </div>
        <div>
          <Randomizer />
        </div>
      </div>
    </div>
  );
};
