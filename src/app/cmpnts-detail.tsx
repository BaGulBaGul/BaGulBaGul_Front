'use client';
import { postData } from '../components/common/Data'
import Slider from "react-slick";
import {
  Button, Divider,
} from '@mui/material';

export function PostDetail() {
  return (
    <div className='flex flex-col w-full pb-[76px]'>
      <PostSlide />
      <PostTitle />
      <Divider />
      <PostContent />
      <PostFooter />
      <PostTools />
    </div>
  )
}

// ref. postHeader.tsx (needed non-fixed for now)
export function PostHeader() {
  return (
    <div className="flex-row flex w-full justify-between px-[24px] py-[10px] bg-[#FFFFFF]">
      <a href="/"><img src='/arrow_prev.svg' /></a>
      <div>
        페스티벌
      </div>
      <div className='w-[24px]'></div>
    </div>
  )
}

export function PostFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex-row flex w-full justify-center py-[12px] bg-primary-blue">
      <a href="/" className='text-sm text-white-text'>모집글 보러가기</a>
    </div>
  )
}

interface ArrowProps {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
function ArrowPrev({ className, style, onClick }: ArrowProps) {
  return (<div className={className} onClick={onClick} />)
}
function ArrowNext({ className, style, onClick }: ArrowProps) {
  return (<div className={className} onClick={onClick} />)
}

function PostSlide() {
  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />
  }
  return (
    <Slider {...settings} className='h-[280px]'>
      {postData.map((post, idx) => <img key={`img-{idx}`} src={post.posterSrc} height="280" className='h-[280px] object-contain' />)}
    </Slider>
  )
}

function PostTitle() {
  return (
    <div className='flex flex-col px-[16px] py-[20px]'>
      <p className='text-lg py-[10px]'>PEAK FESTIVAL 2023</p>
      <div className='flex flex-row justify-between pt-[10px]'>
        <p className='text-sm text-gray3-text'>88.88.88 - 88.88</p>
        <Button disabled className='postCate'>공연전시/행사</Button>
      </div>
    </div>
  )
}

function PostContent() {
  return (
    <>
      <div className='flex flex-col px-[16px] pt-[30px]' id='p-info'>
        <div className='flex flex-row pb-[6px]'>
          <p className='text-sm font-semibold pe-[20px]'>시작일</p>
          <p className='text-sm pe-[10px]'>88.88.88(목)</p>
          <p className='text-sm'>99:88</p>
        </div>
        <div className='flex flex-row pb-[6px]'>
          <p className='text-sm font-semibold pe-[20px]'>종료일</p>
          <p className='text-sm pe-[10px]'>88.88.88(목)</p>
          <p className='text-sm'>99:88</p>
        </div>
        <div className='flex flex-row'>
          <p className='text-sm font-semibold pe-[10px]'>인원(명)</p>
          <p className='text-sm pe-[10px]'>88명</p>
        </div>
      </div>
      <div className='flex flex-col px-[16px] pt-[30px]' id='p-content'>
        <p className='text-sm'>
          ※일반 티켓은 2023년 4월 18일(화) 오후 6시부터 예매 가능하며, 한정 수량 소진 시 예매가 조기 마감될 수 있습니다.<br />
          ※본 공연은 일일권과 양일권 모두 구매 가능합니다.<br />
          ※ 양일권은 5월 27일, 28일 이틀간 자유롭게 모든 공연을 관람할 수 있는 티켓을 의미합니다.<br />
          ※ 양일권 구매자분들은 27일(토)에 손목밴드를 교환하시면 28일(일) 공연 입장 시 바로 입장이 가능합니다.<br /><br />

          할인정보<br />
          - 장애인 (1~3급) 30% 할인 (동반1인), 장애인 (4~6급) 30% 할인 (본인만)- 국가유공자 30% 할인 (본인만)- 국민기초생활수급자 30% 할인(본인만)*증빙 미 지참 시 차액 지불
        </p>
      </div>
      <div className='flex flex-col px-[16px] pt-[30px]' id='p-content'>
        <div className='container'>
          <HashtagButton tag='피크페스티벌' /><HashtagButton tag='10cm' />
          <HashtagButton tag='넬' /><HashtagButton tag='볼빨간사춘기' />
        </div>

      </div>
    </>
  )
}

// exists in main
interface HashtagButtonProps { tag: string; }
function HashtagButton(props: HashtagButtonProps) {
  return (
    <Button className='tagBtn'>
      <div className='flex flex-row'>
        <span className='pe-[2px]'>#</span>
        <span>{props.tag}</span>
      </div>
    </Button>
  )
}

function PostTools() {
  return (
    <div className='flex flex-row justify-between pt-[30px] px-[16px]'>
      <div className='flex flex-row'>
        <div className='flex flex-row items-center pe-[10px]'>
          <a href="/" className='flex flex-row items-center'>
            <img src='/post_like.svg' className='pe-[4px]' />
            <p className='text-gray3-text text-sm'>88</p>
          </a>
        </div>
        <div className='flex flex-row items-center pe-[10px]'>
          <a href="/" className='flex flex-row items-center'>
            <img src='/post_comment.svg' className='pe-[4px]' />
            <p className='text-gray3-text text-sm'>88</p>
          </a>
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='pe-[10px]'>
          <a href="/"><img src='/post_calendar.svg' /></a>
        </div>
        <a href="/"><img src='/post_share.svg' /></a>
      </div>
    </div>
  )
}