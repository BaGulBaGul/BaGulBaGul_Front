"use client";
import { ReactNode, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { IconArrowBack, IconTrashFilled } from "../styles/Icon";

// editable : default false
type ImageSlideProps = { images: string[]; default?: ReactNode; } & ({
  editable: true; updateImages: (images: string[]) => void; imageKey: Number[]; updateImageKey: (imageKey: Number[]) => void;
} | { editable?: false; })
export function ImageSlide(props: ImageSlideProps) {
  const [index, setIndex] = useState(0);
  const handleDelete = () => {
    if (!!props.editable) {
      if (props.images.length > 0 && props.images.length === props.imageKey.length) {
        let tmpImgs = (props.images).filter((value, i) => i !== index)
        let tmpKeys = (props.imageKey).filter((value, i) => i !== index)
        props.updateImages(tmpImgs)
        props.updateImageKey(tmpKeys)
      }
    }
  }
  const swiperOptions = {
    loop: true, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'},
    onActiveIndexChange: (e: any) => setIndex(e.realIndex), modules: [Navigation]
  }
  if (props.images.length === 0) {
    return props.default ?? (<img className='h-[280px] object-cover' src='/default_detail_thumb3x.png' />)
  }
  return (
    <div className='relative'>
      <div className="absolute top-[16px] left-[16px] right-[16px] z-10 flex flex-row justify-between">
        <span className="slide-chip">{`${index + 1}/${props.images.length}`}</span>
        {!!props.editable && <button onClick={handleDelete} className="h-[24px] w-[24px]"><IconTrashFilled /></button>}
      </div>
      <div className="h-[280px] w-full relative">
        <Swiper  {...swiperOptions}>
          {props.images.map((image: any, idx: number) =>
            <SwiperSlide>
              <img key={`img-{idx}`} src={image} height="280" className='h-[280px] object-cover' />
            </SwiperSlide>
          )}
          <div className="swiper-button-prev"><IconArrowBack color='white' /></div>
          <div className="swiper-button-next rotate-180"><IconArrowBack color='white' /></div>
        </Swiper>
      </div>
    </div>
  )
}