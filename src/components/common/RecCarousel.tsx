import Slider from "react-slick";
import { postData } from "./Data";
import { FormatDateRange } from "@/service/Functions";
import { ArrowNext, ArrowPrev } from "./Arrow";

// - main page carousel
interface PostProps {
  headImageUrl: string; title: string; userImage: string; userName: string;
  startDate: any; endDate: any; categories: string[]; content?: string; tags?: string[];
}
function RecPost(props: { data: PostProps }) {
  return ( 
    <div className="flex flex-col w-[188px] lg:w-[480px] px-[9px]">
      <img className='rounded-[4px] h-[210px] w-[170px] lg:w-[480px] object-cover' src={props.data.headImageUrl} />
      <div className='flex flex-col pt-[12px]'>
        <p className='truncate text-[16px] text-center'>{props.data.title}</p>
        <p className='text-[14px] text-center'>{FormatDateRange(props.data.startDate, props.data.endDate)}</p>
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
        {postData.map((post, idx) => <RecPost data={post} key={`rec-${idx}`} />)}
      </Slider>
    </div>
  )
}

export function RecCarousel() {
  return (
    <div className='flex flex-col bg-secondary-yellow w-full h-[430px] lg:px-[360px] lg:bg-gradient-to-b lg:from-grad-yellow lg:to-grad-blue'>
      <div className='flex flex-col pt-[22px] pb-[20px] px-[16px] text-[26px] leading-[140%]'>
        <p className='font-semibold'>SUMMER</p>
        <p>페스티벌 추천</p>
      </div>
      <RecSlide />
    </div>
  )
}