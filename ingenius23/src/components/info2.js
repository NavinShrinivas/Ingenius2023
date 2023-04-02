import Image from 'next/image';

import { Parallax } from 'react-scroll-parallax';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
export  const Info2 = () => {
    return(
        <div
        data-aos="fade-up"
        data-aos-delay="200"
        className='items-center my-20 gap-10  lg:px-40 justify-center flex'
        >

                <div
                className='  font-mono'
                >
                    <h1 className='text-4xl  py-4 text-[#fab518] font-bold'>Open Source</h1>
                    <p className='text-xl'>Skeletons are used as a loading state while the user waits for content to load. They create a natural flow on the page while content is being loaded.</p>
                </div>


            <div className="flex items-center  w-full  ">
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