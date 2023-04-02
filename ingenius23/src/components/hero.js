import { ParallaxBanner } from 'react-scroll-parallax';
import Image from 'next/image';
import { Parallax } from 'react-scroll-parallax';
export  const Banner = () => {
    return (
     <>
    <div
    className='flex min-h-screen mt-32'
    >
    <Parallax speed={-15}>
      <div className="slow">
        <Image
            src="https://media.discordapp.net/attachments/972456002844766228/1091712713010462801/Main_Logo.png?width=1036&height=1036"
            alt="Picture of the author"
            width={500}
            height={500}
            className='translate-x-full'
            />

      </div>
    </Parallax>
    <Parallax speed={15}>

      <div
        className=" -translate-x-1/4 my-40 text-[#fab518] heading text-5xl font-lovelo-line-light lg:text-9xl font-bold text-center"
        >
          <h1>INGENIUS 2023</h1>
        </div>

    </Parallax>
    </div>
     

     
     </>
    );
  };
  
  