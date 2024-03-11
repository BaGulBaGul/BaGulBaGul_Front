import Slider from "react-slick";
import { postData } from "./Data";
import { FormatDateRange } from "@/service/Functions";

// - main page carousel
interface PostProps {
  headImageUrl: string; title: string; userImage: string; userName: string;
  startDate: any; endDate: any; categories: string[]; content?: string; tags?: string[];
}
function RecPost(props: { data: PostProps }) {
  return (
    <div className="flex flex-col w-[188px] lg:w-[480px] px-[9px]">
      <img className='rounded-lg h-[210px] w-[170px] lg:w-[480px] object-cover' src={props.data.userImage} />
      <div className='flex flex-col pt-[12px]'>
        <p className='truncate text-base text-center'>{props.data.title}</p>
        <p className='text-sm text-center'>{FormatDateRange(props.data.startDate, props.data.endDate)}</p>
      </div>
    </div>
  )
}

interface ArrowProps {
  className?: any; style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
function ArrowPrev({ onClick }: ArrowProps) {
  return (<div className='slick-arrow slick-prev slick-prev-main' onClick={onClick} />)
}
function ArrowNext({ onClick }: ArrowProps) {
  return (<div className='slick-arrow slick-next slick-next-main' onClick={onClick} />)
}

function RecSlide() {
  const settings = {
    className: "center", infinite: true, dots: true, dotsClass: 'slick-dots',
    slidesToShow: 1, slidesToScroll: 1, centerMode: true, variableWidth: true,
    nextArrow: <ArrowNext />, prevArrow: <ArrowPrev />,
  }
  return (
    <div className='pb-[50px] h-auto'>
      <Slider {...settings}>
        {postData.map((post, idx) => <RecPost data={post} key={`rec-${idx}`} />)}
      </Slider>
    </div>
  )
}

export function RecCarousel() {
  return (
    <div className='flex flex-col bg-secondary-yellow w-full h-[430px] lg:px-[360px] lg:bg-gradient-to-b lg:from-grad-yellow lg:to-grad-blue'>
      <div className='flex flex-col pt-[22px] pb-[20px] px-[24px]'>
        <p className='text-2xl font-semibold'>SUMMER</p>
        <p className='text-2xl'>페스티벌 추천</p>
      </div>
      <RecSlide />
    </div>
  )
}