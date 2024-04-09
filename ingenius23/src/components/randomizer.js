"use client";

import { useRef } from "react";

export default function Randomizer() {
  let r1Ref = useRef(null);
  let r2Ref = useRef(null);

  const r1Items = [
    "healthcare",
    "education",
    "entertainment",
    "Women empowerment",
    "Accessibility",
    "AI",
    "Cyber Security",
    "agriculture",
    "blockchain",
    "logistics",
    "Urban Planning",
  ];
  const r2Items = [
    "pets",
    "Graphics/Visualisation",
    "parking",
    "fintech",
    "Space exploration",
    "Social Media",
    "Gaming",
  ];

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // async function randomize() {
  //   let i = 1000; // This variable varies the speed of the animation
  //   let j = 1;
  //
  //   const animate = async (timestamp) => {
  //     let r1Random = getRandomElement(r1Items);
  //     let r2Random = getRandomElement(r2Items);
  //     r1Ref.current.innerText = r1Random;
  //     r2Ref.current.innerText = r2Random;
  //
  //     j = j * 1.2;
  //
  //     if (j >= i) {
  //       return;
  //     } else {
  //       await new Promise((r) => setTimeout(r, j));
  //       requestAnimationFrame(animate);
  //     }
  //   };
  //
  //   requestAnimationFrame(animate);
  // }
  //

  async function randomize() {
    let r1Random = getRandomElement(r1Items).toUpperCase();
    let r2Random = getRandomElement(r2Items).toUpperCase();

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval1 = null;
    let interval2 = null;
    let iteration1 = 0;
    let iteration2 = 0;

    interval1 = setInterval(() => {
      r1Ref.current.innerText = r1Random
        .split("")
        .map((letter, index) => {
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
    }, 30);
    interval2 = setInterval(() => {
      r2Ref.current.innerText = r2Random
        .split("")
        .map((letter, index) => {
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
    }, 30);

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds

    clearInterval(interval1);
    clearInterval(interval2);

    interval1 = setInterval(() => {
      r1Ref.current.innerText = r1Random
        .split("")
        .map((letter, index) => {
          if (index < iteration1) {
            return r1Random[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration1 >= r1Random.length) {
        clearInterval(interval1);
      }

      iteration1 += 1 / 5;
    }, 30);

    interval2 = setInterval(() => {
      r2Ref.current.innerText = r2Random
        .split("")
        .map((letter, index) => {
          if (index < iteration2) {
            return r2Random[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration2 >= r2Random.length) {
        clearInterval(interval2);
      }

      iteration2 += 1 / 5;
    }, 30);
  }

  return (
    <div className="flex flex-col justify-center items-center font-mono text-white">
      <div className="text-lg">You can do something related to</div>
      <div className="flex flex-col lg:flex-row justify-center items-center text-2xl">
        <div className="text-white border-b border-b-[#fac518] m-5" ref={r1Ref}>
          Your Next Big
        </div>
        <div className="text-white border-b border-b-[#fac518] m-5" ref={r2Ref}>
          IDEA!
        </div>
      </div>

      <div className="flex flex-col items-center justify-center m-5">
        <button
          className="relative text-lg inline-flex items-center justify-center px-4 py-2 mb-2 mr-2 overflow-hidden font-medium text-zinc-900 border-solid border-4 border-[#fab518] rounded-xl bg-[#fac518] hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-400 hover:text-white hover:text-bold hover:scale-110 hover:shadow-[0_0_45px_-10px_(0,0,0,0.3)] hover:shadow-cyan-500 transition duration-300 ease-in-out transform hover:-translate-y-1"
          onClick={randomize}
        >
          Generate Idea!
        </button>
      </div>
    </div>
  );
}
