import Image from "next/image";
export const Sponsor = () => {
    return (
        <>
        <div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-6xl font-bold text-[#fab518]">Sponsors</h1>
            </div>
            {/* a div for grid of images */}
            <div className="  px-10 my-10  ">
                <div className=" grid grid-cols-1  lg:grid-cols-4  ">
                <Image
                src="/team.svg"
                alt="Picture of the author"
                width={200}
                height={200}
                className="mx-auto my-6"
                 data-aos="fade-right"
                  data-aos-delay="200"
                  data-aos-duration="500"
                />
                 <Image
                src="/team.svg"
                alt="Picture of the author"
                width={200}
                height={200}
                className="mx-auto my-6"
                 data-aos="fade-right"
                  data-aos-delay="200"
                  data-aos-duration="500"
                />
                 <Image
                src="/team.svg"
                alt="Picture of the author"
                width={200}
                height={200}
                className="mx-auto my-6"
                 data-aos="fade-right"
                  data-aos-delay="200"
                  data-aos-duration="500"
                />
                 <Image
                src="/team.svg"
                alt="Picture of the author"
                width={200}
                height={200}
                className="mx-auto my-6"
                 data-aos="fade-right"
                  data-aos-delay="200"
                  data-aos-duration="500"
                />
                </div>
                </div>

        </div>
            
            
        </>
    );
    }