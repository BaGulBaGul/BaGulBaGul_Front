import Slider from "react-slick";
import { postData } from "@/components/common/Data";
import { FormatDateRange } from "@/service/Functions";
import { ArrowNext, ArrowPrev, SkeletonCarousel } from "@/components/common";


export function RecCarousel({ title }: { title?: string; }) {
  return (
    // <SkeletonCarousel />
    <div className='flex flex-col bg-secondary-yellow w-full h-[430px] lg:px-[360px] lg:bg-gradient-to-b lg:from-grad-yellow lg:to-grad-blue'>
      <div className='flex flex-col pt-[22px] pb-[20px] px-[16px] text-[26px] leading-[140%]'>
        <p className='font-semibold whitespace-pre-line min-h-[72px]'>{title}</p>
      </div>
      <RecSlide />
    </div>
  )
}

interface PostProps { headImageUrl: string; title: string; startDate: any; endDate: any; }
export function RecPost({ headImageUrl, title, startDate, endDate }: PostProps) {
  return (
    <div className="flex flex-col w-[188px] lg:w-[480px] px-[9px]">
      <img className='rounded-[4px] h-[210px] w-[170px] lg:w-[480px] object-cover' src={headImageUrl} />
      <div className='flex flex-col pt-[12px]'>
        <p className='truncate text-16 text-center'>{title}</p>
        <p className='text-14 text-center'>{FormatDateRange(startDate, endDate)}</p>
      </div>
    </div>
  )
}

function RecSlide() {
  const settings = {
    className: "center", infinite: true, dots: true, dotsClass: 'slick-dots',
    slidesToShow: 1, slidesToScroll: 1, centerMode: true, variableWidth: true,
    initialSlide: 0, lazyLoading: true,
    nextArrow: <ArrowNext cN='slick-next-main' />, prevArrow: <ArrowPrev cN='slick-prev-main' />
  }
  return (
    <div className='pb-[50px] h-[316px]'>
      <Slider {...settings}>
        {postData.map((post, idx) =>
          <RecPost headImageUrl={post.headImageUrl} title={post.title} startDate={post.startDate} endDate={post.endDate} key={`rec-${idx}`} />)}
      </Slider>
    </div>
  )
}