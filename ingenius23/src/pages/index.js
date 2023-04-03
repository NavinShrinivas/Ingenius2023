import Link from "next/link"
import { ParallaxBanner } from 'react-scroll-parallax';
import { useState } from "react"
import { Banner } from "@/components/hero";
import { Info1 } from "@/components/info1";
import {Info2} from "@/components/info2";
import { Sponsor } from "@/components/sponsors";
export default function Home() {
  const [userid, setUserid] = useState('')
  const handleChane = (e) => {
    setUserid(e.target.value)
  }

  return (
    
    <>
    <div 
    className="  px-4  items-center  min-h-screen py-2"
    >
      <Banner />
      <div
      className="flex flex-col gap-8"
      >
      <Info1 />
      <Info2/>
      <Sponsor/>
      
        </div>
      
     
    </div>
   
    {/* <div 
    className="flex bg-gradient-to-r from-cyan-500 to-blue-500 flex-col items-center justify-center min-h-screen py-2"
    >
        <div
        className="heading text-5xl font-lovelo-line-light lg:text-9xl font-bold text-white text-center"
        >
          <h1>INGENIUS 2023</h1>
        </div>
    </div> */}
   </>
  )
}