"use client";
import { useState } from "react";
import Slider from "react-slick";
import { ArrowNext, ArrowPrev } from "./Arrow";

export function ImageSlide(props: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const settings = {
    className: "center", infinite: true, slidesToShow: 1, slidesToScroll: 1,
    nextArrow: <ArrowNext cN='slick-next-detail' />, prevArrow: <ArrowPrev cN='slick-prev-detail' />,
    beforeChange: (current: any, next: any) => { setIndex(next); },
  }
  return (
    <div className='relative'>
      <span className="slide-chip">{`${index + 1}/${props.images.length}`}</span>
      <Slider {...settings} className='h-[280px] bg-gray1 slider-detail'>
        {props.images.map((image, idx) => (
          <img key={`img-{idx}`} src={image} height="280" className='h-[280px] object-cover' />
        ))}
      </Slider>
    </div>
  )
}