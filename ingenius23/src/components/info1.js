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
        className='items-center mt-10 lg:mt-0 justify-center flex'
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
                className='hidden lg:flex'
                />

                <div
                className=' font-mono'
                >
                    <h1 className='text-4xl  py-4 text-[#fab518] font-bold'>Framework</h1>
                    <p className='text-xl'>Framework repositories contain test suites and benchmarks or in other words, barebone code structures using which, participants compete as teams to optimize the best approach and complete the code most effectively.</p>
                </div>


               
            </div>
        </div>
    )
}