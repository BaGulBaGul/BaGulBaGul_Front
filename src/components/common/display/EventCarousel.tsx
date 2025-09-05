'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import { postData } from "@/components/common/Data";
import { FormatDateRange } from "@/service/Functions";
import { IconArrowBack } from "@/components/common/styles/Icon";
import { SkeletonCarousel } from '..';

export function EventCarousel({ title, data, bgImage }: { title?: string; data?: any; bgImage?: string; }) {
  const swiperOptions = {
    spaceBetween: 25, loop: true, centeredSlides: true, slideToClickedSlide: true,
    pagination: { clickable: true }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    modules: [Pagination, Navigation], className: 'rec-carousel pb-[50px]',
  }
  return (
    // <SkeletonCarousel />
    <div className={'flex flex-col w-full h-[430px] bg-secondary-yellow bg-cover bg-center bg-no-repeat'}
      style={{ backgroundImage: `url(${bgImage})` }} >
      <div className='flex flex-col pt-[22px] pb-[20px] px-[16px] text-[26px] leading-[140%]'>
        <p className='font-semibold whitespace-pre-line min-h-[72px]'>{title}</p>
      </div>
      <div className="h-[316px] w-full relative swiper-event">
        <Swiper slidesPerView='auto' {...swiperOptions}>
          {(data ?? postData).map((post: any, idx: number) =>
            <SwiperSlide className='max-w-[40%]'>
              <CarouselBlock post={post} />
            </SwiperSlide>
          )}
          <div className="swiper-button-prev"><IconArrowBack /></div>
          <div className="swiper-button-next rotate-180"><IconArrowBack /></div>
        </Swiper>
      </div>
    </div>
  )
}

export function CarouselBlock({ post }: { post: any }) {
  return (
    <div className="flex flex-col min-w-[170px]">
      {post?.headImageUrl
        ? <img className='rounded-[8px] h-[210px] min-w-[170px] object-cover' src={post.headImageUrl} />
        : <div className='rounded-[8px] h-[210px] min-w-[170px] w-full bg-gray1' />}
      <div className='flex flex-col pt-[12px]'>
        <p className='truncate text-16 text-center'>{post?.title ?? '-'}</p>
        <p className='text-14 text-center'>{FormatDateRange(post?.startDate, post?.endDate)}</p>
      </div>
    </div>
  )
}