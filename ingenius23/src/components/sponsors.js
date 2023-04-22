import Image from "next/image";
export const Sponsor = () => {
  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center lg:mt-5">
          <h1 className="text-6xl font-bold text-[#fab518]">Sponsors</h1>
        </div>
        {/* a div for grid of images */}
        <div className="  px-10 my-10  ">
          <div className=" flex justify-center xs:flex-col">
            <Image
              src="/JuliaHub-Logo-color-black.svg"
              alt="Picture of the author"
              width={200}
              height={200}
              className="mx-auto my-6"
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-duration="600"
            />
            <Image
              src="https://media.discordapp.net/attachments/972456002844766228/1095888869720858664/wolfram-language-text-logo.png?width=1420&height=502"
              alt="Picture of the author"
              width={200}
              height={200}
              className="mx-auto my-6"
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-duration="600"
            />

            {/* 
                 <Image
                src="/team.svg"
                alt="Picture of the author"
                width={200}
                height={200}
                className="mx-auto my-6"
                 data-aos="fade-right"
                  data-aos-delay="200"
                  data-aos-duration="600"
                />
                 <Image
                src="/team.svg"
                alt="Picture of the author"
                width={200}
                height={200}
                className="mx-auto my-6"
                 data-aos="fade-right"
                  data-aos-delay="200"
                  data-aos-duration="600"
                /> */}
          </div>
        </div>
      </div>
    </>
  );
};
