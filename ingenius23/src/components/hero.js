import { ParallaxBanner } from "react-scroll-parallax";
import Image from "next/image";
import { Parallax } from "react-scroll-parallax";
import Link from "next/link";
export const Banner = () => {
  return (
    <>
      <div className=" mb-60 lg:mb-1 relative  text-center lg:min-h-screen ">
        <Parallax speed={-15}>
          <div className="   -z-10   w-full slow">
            <Image
              src="/Crop_logo_2024.svg"
              alt="Picture of the author"
              width={500}
              height={500}
              className=" my-28 mx-auto"
            />
            {/* a button */}
            <div className="flex flex-col items-center justify-center">
              <button class="relative text-lg inline-flex items-center justify-center px-7 py-4 mb-2 mr-2 overflow-hidden font-medium text-zinc-900 border-solid border-4 border-[#fab518] rounded-xl bg-[#fac518] hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-400 hover:text-white hover:text-bold hover:scale-110 hover:shadow-[0_0_45px_-10px_(0,0,0,0.3)] hover:shadow-cyan-500 transition duration-300 ease-in-out transform hover:-translate-y-1">
                <Link href="https://fadze26msn0.typeform.com/to/eFY5Atro">
                  Register Now
                </Link>
              </button>
            </div>
          </div>
        </Parallax>
       <Parallax speed={15}>
          <div  className=" absolute lg:-top-[520px] -top-[400px] z-10  text-center  w-full  text-[#fab518] flex justify-center ">
             
            <h1 className="heading text-6xl font-lovelo-line-bold lg:font-lovelo-line-light lg:text-9xl font-bold flex flex-wrap justify-center">
              <div className="lg:hidden">&nbsp;</div>
              <div className="text-orange-600">I</div>
              <div className="text-violet-600">N</div>
              <div className="text-blue-600">G</div>
              <div className="text-rose-600">E</div>
              <div>N</div>
              <div className="text-cyan-600">I</div>
              <div className="text-red-600">U</div>
              <div className="text-purple-600">S</div>
              <div className="">&nbsp;</div>
              <div className="text-fuchsia-600">2</div>
              <div className="text-teal-600">0</div>
              <div className="text-indigo-600">2</div>
              <div className="text-pink-600">4</div>
            </h1>
            
          </div>
        </Parallax>
      </div>
    </>
  );
};
