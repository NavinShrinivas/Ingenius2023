import Image from "next/image";
import { Parallax } from "react-scroll-parallax";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Theme from "./theme";

// Here's where you set themes. Change this array and the rendered themes will change accordingly
const themes = [
  {
    themeTitle: "Social Media Reimagined",
    themeDescription:
      "Transform the way we connect and engage with each other! Innovate and engineer the essential cogs for the next unique and trending Social Media Tycoon.",
  },
  {
    themeTitle: "Fashion and AI",
    themeDescription:
      "Rethink fashion, rethink AI. Consider creating AI tools that can design new fashion trends, personalize clothing for individuals.This theme invites you to explore AI's potential in fashion, to make shopping and dressing more specific, innovative and personalized.",
  },
  {
    themeTitle: "Innovations in transport solutions",
    themeDescription:
      "Redefine the future of mobility. This theme challenges you to innovate transport systems, developing solutions that revolutionize how we move from one place to another. Consider creating technologies for public transit, ride-sharing, and efficient delivery, using AI for smart route planning and partnerships for broader impact.",
  },
  {
    themeTitle: "Accessibility and Space exploration",
    themeDescription:
      "Imagine a future where it’s a common feat for the average person to not only journey into space but also to experience the wonders of the cosmos from their own backyard/balcony .This theme encourages you to think creatively about how to make space exploration more accessible to amateurs.",
  },
  {
    themeTitle: "Custom ISA Architecture/ RISC-V extension",
    themeDescription:
      "Create your own instruction set architecture to solve a specific problem, or perhaps write a RISC-V extension? Break free from the shackles of legacy architectures and bring forth the future of computing.",
  },
  {
    themeTitle: "Enhancing an existing programming language",
    themeDescription:
      "Add a sprinkle of magic to an existing programming language and transform the mundane constraints by adding a fun and quirky flair. The only thing that can limit you is your imagination!",
  },
  {
    themeTitle: "Accessible Health Hacks",
    themeDescription:
      "Make healthcare as easily accessible as your favorite pizza delivery! From designing intuitive user interfaces for telemedicine apps to making virtual reality therapy platforms. The mission is to break down barriers and ensure access to quality healthcare for everyone.",
  },
  {
    themeTitle: "Open Innovation",
    themeDescription:
      "Have an idea already that doesn't fit into the above themes? Go for it! All that matters is the excellence of your enginnering and the originality of your approach! Don't have an idea but want to do something apart from the themes above? Have a go at our idea generator!",
  },
];

export const Info2 = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      data-aos="fade-right"
      data-aos-delay="200"
      className="items-center my-20 gap-10  lg:px-40 justify-center flex"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="font-mono">
          <h1 className="text-4xl py-4 text-[#fac518] font-bold">THEMES</h1>
        </div>
        <div>
          {themes.map((item) => {
            return Theme(item.themeTitle, item.themeDescription);
          })}
        </div>
      </div>
    </div>
  );
};
