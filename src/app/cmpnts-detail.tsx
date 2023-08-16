'use client';
import { useState } from 'react';
import { postData } from '../components/common/Data'
import Slider from "react-slick";
import Image from 'next/image'
import { ThemeProvider, Button, Divider, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { categoryButtonTheme, HashtagButton, shareDialogTheme } from '@/components/common/Themes'
import { PostFooter } from './cmpnts';

export function PostDetail() {
  const [popopen, setPopopen] = useState(false);
  const handleOpen = () => { setPopopen(true) }
  const handleClose = () => { setPopopen(false) }

  return (
    <div className='flex flex-col w-full pb-[76px]'>
      <PostSlide />
      <PostTitle />
      <Divider />
      <PostContent />
      <ShareDialog handleClose={handleClose} popopen={popopen} />
      <PostFooter title='모집글 보러가기' path='/accompany' />
      <PostTools handleOpen={handleOpen} />
    </div>
  )
}

interface ArrowProps {
  className?: any; style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
function ArrowPrev({ onClick }: ArrowProps) {
  return (<div className='slick-arrow slick-prev slick-prev-detail' onClick={onClick} />)
}
function ArrowNext({ onClick }: ArrowProps) {
  return (<div className='slick-arrow slick-next slick-next-detail' onClick={onClick} />)
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
    <Slider {...settings} className='h-[280px] bg-gray1-text slider-detail'>
      {postData.map((post, idx) => <img key={`img-{idx}`} src={post.posterSrc} height="280" className='h-[280px] object-contain' />)}
    </Slider>
  )
}

function PostTitle() {
  return (
    <div className='flex flex-col px-[16px] py-[20px]'>
      <p className='text-lg pt-[10px]'>PEAK FESTIVAL 2023</p>
      <div className='flex flex-row justify-between pt-[4px]'>
        <p className='text-sm text-gray3-text'>23.05.27 - 05.28</p>
        <div className='flex flex-row items-center'>
          <a href="/"><img src='/post_views.svg' /></a>
          <p className='text-sm text-gray3-text ps-[4px]'>2,398</p>
        </div>
      </div>
      <div className='flex flex-row justify-between pt-[4px]'>
        <div className='flex flex-row items-center'>
          <div className='me-[4px] rounded-full overflow-hidden w-[24px] h-[24px]'>
            <Image src="/images/profile_pic.png" alt="프로필 사진" width={24} height={24} />
          </div>
          <p className='text-sm text-gray3-text'>(주)SACOM</p>
        </div>
        <ThemeProvider theme={categoryButtonTheme}>
          <Button disabled>공연전시/행사</Button>
        </ThemeProvider>
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
          ※ 일반 티켓은 2023년 4월 18일(화) 오후 6시부터 예매 가능하며, 한정 수량 소진 시 예매가 조기 마감될 수 있습니다.<br />
          ※ 본 공연은 일일권과 양일권 모두 구매 가능합니다.<br />
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

interface PostToolsProps { handleOpen: any }
function PostTools(props: PostToolsProps) {
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
        <IconButton onClick={props.handleOpen} className='p-0'><img src='/post_share.svg' /></IconButton>
      </div>
    </div>
  )
}

interface ShareDialogProps { handleClose: any, popopen: boolean }
function ShareDialog(props: ShareDialogProps) {
  return (
    <ThemeProvider theme={shareDialogTheme}>
      <Dialog onClose={props.handleClose} open={props.popopen} >
        <DialogTitle className='flex flex-row justify-between'>
          <div className='w-[24px] h-[24px]' />
          <span>공유하기</span>
          <IconButton onClick={props.handleClose}><img src='/popup_close.svg' /></IconButton>
        </DialogTitle>
        <DialogContent className='flex flex-row gap-[48px] justify-center'>
          <div className='flex flex-col items-center'>
            <img className='w-[50px] h-[50.74px]' src='/kakaotalk_sharing_btn.png' />
            <span className='select-none px-[4px] pt-[4px]'>카카오톡</span>
          </div>
          <div className='flex flex-col items-center'>
            <img className='w-[50px] h-[50.74px]' src='/url_sharing_btn.png' />
            <span className='select-none px-[4px] pt-[4px]'>URL 복사</span>
          </div>
        </DialogContent>
      </Dialog>
    </ThemeProvider>

  )
} 