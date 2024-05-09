import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import image1 from "../assets/banner/banner1.png";
import image2 from "../assets/banner/banner2.png";
import image3 from "../assets/banner/banner3.png";
import image4 from "../assets/banner/banner4.jpg";
import image5 from "../assets/banner/banner5.jpg";

import image11 from "../assets/banner/mobile1.png";
import image12 from "../assets/banner/mobile2.png";
import image13 from "../assets/banner/mobile3.jpg";
import image14 from "../assets/banner/mobile4.jpg";
import image15 from "../assets/banner/mobile5.jpg";
const desktopImage = [image1, image2, image3, image4, image5];
const mobileImage = [image11, image12, image13, image14, image15];

export default function Banner() {
  const [indexCount, setIndexCount] = useState(0);
  const handleLeft = () => {
    if (indexCount === 0) {
      setIndexCount(desktopImage.length - 1);
    } else {
      setIndexCount((prev) => prev - 1);
    }
  };
  const handleRight = () => {
    if (indexCount === desktopImage.length - 1) {
      setIndexCount(0);
    } else {
      setIndexCount((prev) => prev + 1);
    }
  };
  useEffect(()=>{
   const interval=setInterval(()=>{
   setIndexCount(prev=>(prev===desktopImage.length-1 ? 0 : prev +1))

   },5000)
   return ()=>{
    clearInterval(interval)
   }
  },[])
  return (
    <div className="container mx-auto ">
       
      <div className="h-56 bg-red-300 w-[96%] mx-auto flex overflow-hidden relative">
      <div className="absolute z-10 top-[40%] w-full p-2  mx-auto flex justify-between">
          <button
            className="p-3 rounded-full bg-gray-500 text-white cursor-pointer hover:scale-105 hover:bg-slate-600"
            onClick={handleLeft}
          >
            <FaAngleLeft />
          </button>
          <button
            className="p-3 rounded-full bg-gray-500 text-white cursor-pointer hover:scale-105 hover:bg-slate-600 "
            onClick={handleRight}
          >
            <FaAngleRight />
          </button>
        </div>
        <div className="w-full h-full md:flex hidden  ">
        {desktopImage.map(
          (item, index) =>
            index === indexCount && (
              <div className={`h-full w-full min-w-full min-h-full  ${index === indexCount ? 'transition duration-150 delay-100' : ''}`} key={index}>
                <img src={item} alt="..." className="w-full h-full transition-all duration-300 delay-150"/>
              </div>
            )
        )}
        </div>

        <div className="w-full h-full flex md:hidden">
        {mobileImage.map(
          (item, index) =>
            index === indexCount && (
              <div className="min-w-full min-h-full" key={index}>
                <img src={item} alt="..." className="w-full h-full" />
              </div>
            )
        )}
        </div>
        
      </div>
    </div>
  );
}
