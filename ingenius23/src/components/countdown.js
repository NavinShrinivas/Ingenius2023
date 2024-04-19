import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";

export const Countdown = ({minutesLeft}) => {
    // minutes better for us for easy update, but we need seconds to properly display countdown
    const secondsLeft = minutesLeft * 60;
    const [count, setCount] = useState(secondsLeft); // Initial seconds to review
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
  
    function secondsToTime(secs){
        let hours = Math.floor(secs/(60*60));
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

    return {
      h: hours,
      m: minutes,
      s: seconds
    };
    }
  useEffect(() => {
    AOS.init();
  }, []);

   useEffect(() => {
    if (count >= 0) {
      const secondsLeft = setInterval(() => {
        setCount((c) => c - 1);
        let timeLeftVar = secondsToTime(count);
        setHour(timeLeftVar.h);
        setMinute(timeLeftVar.m);
        setSecond(timeLeftVar.s);
      }, 1000);
      return () => clearInterval(secondsLeft);
    } else {
      console.log("timeout");
    }
  }, [count]);

  return (
     <div
      data-aos="flip-up"
      data-aos-delay="200"
      className="items-center lg:my-40 my-24  lg:px-40 justify-center flex"
    >
      <div className={`flex flex-col items-center justify-center font mono lg:text-7xl text-3xl ${count > 6000 ? "text-[#fac518]" : "text-red-600"} font-bold`}>
       <h1 className="mb-4 ">TIME UNTIL HACK</h1>
         <h1 className="mb-4">
        {hour < 10 ? "0" + hour : hour} : {minute < 10 ? "0" + minute : minute} :
        {" "}{second < 10 ? "0" + second : second}
      </h1>
            </div>
            </div>
  )
}