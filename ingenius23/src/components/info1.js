'use client';
import Image from 'next/image';
import { Parallax } from 'react-scroll-parallax';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
export  const Info1 = () => {
    useEffect(() => {
        AOS.init();
        }, []);
    return(
        <div
        className='items-center justify-center flex'
        >
            <div  
             data-aos="fade-up"
             data-aos-delay="200"
            className=" flex items-center lg:px-40 w-full gap-10  ">
                <Image
                src="/code.svg"
                alt="Picture of the author"
                width={500}
                height={500}
              
                />

                <div
                className=' font-mono'
                >
                    <h1 className='text-4xl  py-4 text-[#fab518] font-bold'>Skeletons</h1>
                    <p className='text-xl'>Skeletons are used as a loading state while the user waits for content to load. They create a natural flow on the page while content is being loaded.</p>
                </div>


               
            </div>
        </div>
    )
}