"use client";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import Slider from "react-slick";
import { TrashIcn } from "../styles/Icon";
import { ArrowNext, ArrowPrev } from "..";

interface ImageSlideProps {
  images: string[]; setImages?: Dispatch<SetStateAction<string[]>>;
  imageKey?: Number[]; setImageKey?: Dispatch<SetStateAction<Number[]>>;
  default?: ReactNode;
}
export function ImageSlide(props: ImageSlideProps) {
  const [index, setIndex] = useState(0);
  const handleDelete = () => {
    if (!!props.setImages && !!props.imageKey && !!props.setImageKey) {
      if (props.images.length > 0 && props.imageKey.length > 0 && props.images.length === props.imageKey.length) {
        let tmpImgs = (props.images).filter((value, i) => i !== index)
        props.setImages(tmpImgs)
        let tmpKeys = (props.imageKey).filter((value, i) => i !== index)
        props.setImageKey(tmpKeys)
      }
    }
  }
  const settings = {
    className: "center", infinite: true, slidesToShow: 1, slidesToScroll: 1,
    nextArrow: <ArrowNext cN='slick-next-detail' />, prevArrow: <ArrowPrev cN='slick-prev-detail' />,
    beforeChange: (current: any, next: any) => { setIndex(next); },
  }
  if (props.images.length === 0) {
    return props.default ?? (<img className='h-[280px] object-cover' src='/default_detail_thumb3x.png' />)
  }
  return (
    <div className='relative'>
      {/* * check if works */}
      <div className="absolute top-[16px] left-[16px] right-[16px] z-10 flex flex-row justify-between">
        <span className="slide-chip">{`${index + 1}/${props.images.length}`}</span>
        {!!props.setImages ? <button onClick={handleDelete}><TrashIcn btn={true} /></button> : <></>}
      </div>
      <Slider {...settings} className='h-[280px] bg-gray1 slider-detail'>
        {props.images.map((image, idx) => (
          <img key={`img-{idx}`} src={image} height="280" className='h-[280px] object-cover' />
        ))}
      </Slider>
    </div>
  )
}