"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import Step1 from "@/components/Step1";
import Step0 from "@/components/Step0";
import Step2 from "@/components/Step2";

export default function Steps() {
  const sliderRef = useRef<Slider>(null);

  return (
    <Slider
      ref={sliderRef}
      {...{
        swipe: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      }}
      className="h-full"
    >
      {[
        {
          key: "step-0",
          page: <Step0 sliderRef={sliderRef} />,
        },
        {
          key: "step-1",
          page: <Step1 sliderRef={sliderRef} />,
        },
        {
          key: "step-2",
          page: <Step2 sliderRef={sliderRef} />,
        },
      ].map(({ page, key }) => (
        <div key={key} className="h-screen">
          {page}
        </div>
      ))}
    </Slider>
  );
}
