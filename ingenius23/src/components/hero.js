import { ParallaxBanner } from 'react-scroll-parallax';
import Image from 'next/image';
import { Parallax } from 'react-scroll-parallax';
export  const Banner = () => {
    return (
     <>
    <div
    className=' mb-60 lg:mb-1 relative  text-center lg:min-h-screen '
    >
    <Parallax speed={-15}>
      <div className="   -z-10   w-full slow">
        <Image
            src="https://media.discordapp.net/attachments/972456002844766228/1091712713010462801/Main_Logo.png?width=1036&height=1036"
            alt="Picture of the author"
            width={500}
            height={500}
            className=' my-28 mx-auto'
            />

      </div>
    </Parallax>
    <Parallax speed={15}>

      <div
        className=" absolute lg:-top-[520px] -top-[400px] z-10  text-center  w-full  text-[#fab518] heading text-6xl font-lovelo-line-bold lg:font-lovelo-line-light lg:text-9xl font-bold "
        >
          <h1
          className=''
          >INGENIUS 2023</h1>
        </div>

    </Parallax>
    </div>
     

     
     </>
    );
  };
  
  