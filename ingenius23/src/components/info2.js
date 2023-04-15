'use client';
import Image from 'next/image';
import { Parallax } from 'react-scroll-parallax';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
export  const Info2 = () => {
    useEffect(() => {
        AOS.init();
        }, []);
    return(
        <div
        data-aos="fade-up"
        data-aos-delay="200"
        className='items-center my-20 gap-10  lg:px-40 justify-center flex'
        >

                <div
                className=' font-mono'
                >
                    <h1 className='text-4xl  py-4 text-[#fab518] font-bold'>Open Source</h1>
                    <p className='text-xl'>Students have access to public repositories on GitHub and will be judged on their contributions to improve open source software and thereby are encouraged to foster the spirit of FOSS which allows one to use and modify software collaboratively.</p>
                </div>


            <div className="lg:flex hidden items-center  w-full  ">
                <Image
                src="/team.svg"
                alt="Picture of the author"
                width={500}
                height={500}
                />
                
               
            </div>
        </div>
    )
}