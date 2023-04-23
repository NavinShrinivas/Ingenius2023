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
              src="https://media.discordapp.net/attachments/972456002844766228/1091712713010462801/Main_Logo.png?width=1036&height=1036"
              alt="Picture of the author"
              width={500}
              height={500}
              className=" my-28 mx-auto"
            />
            {/* a button */}
            <div className="flex flex-col items-center justify-center">
              <button class="relative text-lg inline-flex items-center justify-center px-7 py-4 mb-2 mr-2 bg-white overflow-hidden font-medium text-gray-900 border-solid border-4 border-[#fab518] rounded-xl hover:bg-[#fab518] hover:text-white hover:text-bold hover:scale-110 transition duration-300 ease-in-out transform hover:-translate-y-1">
                <Link href="https://fadze26msn0.typeform.com/to/eFY5Atro">
                  Register Now
                </Link>
              </button>
            </div>
          </div>
        </Parallax>
        <Parallax speed={15}>
          <div className=" absolute lg:-top-[520px] -top-[400px] z-10  text-center  w-full  text-[#fab518] heading text-6xl font-lovelo-line-bold lg:font-lovelo-line-light lg:text-9xl font-bold ">
            <h1 className="">INGENIUS 2023</h1>
          </div>
        </Parallax>
      </div>
    </>
  );
};
