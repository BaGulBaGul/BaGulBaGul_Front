'use client';
import { useEffect, useState } from 'react';
import { postData } from '@/components/common/Data'
import Slider from "react-slick";
import { ThemeProvider, Button, Divider, IconButton, Dialog, DialogTitle, DialogContent, Chip } from '@mui/material';
import { categoryButtonTheme, HashtagButton, shareDialogTheme, accompanyChipTheme, slideChipTheme } from '@/components/common/Themes'
import { PostFooter } from '@/components/layout/footer';

export const DetailFestival = () => {
  const [popopen, setPopopen] = useState(false);
  const handleOpen = () => { setPopopen(true) }
  const handleClose = () => { setPopopen(false) }
  return (
    <div className='flex flex-col w-full pt-[104px] pb-[64px]'>
      <PostSlide />
      <PostTitle />
      <Divider />
      <PostInfoF />
      <PostContent />
      <ShareDialog handleClose={handleClose} popopen={popopen} />
      <PostFooter title='모집글 보러가기' path='/accompany' />
      <PostTools handleOpen={handleOpen} />
    </div>
  )
}

export const DetailAccompany = () => {
  const [popopen, setPopopen] = useState(false);
  const handleOpen = () => { setPopopen(true) }
  const handleClose = () => { setPopopen(false) }
  return (
    <div className='flex flex-col w-full pt-[104px]'>
      <PostSlide />
      <PostTitle />
      <Divider />
      <PostInfoA />
      <div className='pb-[30px]'><PostContent /></div>
      <Divider />
      <ShareDialog handleClose={handleClose} popopen={popopen} />
      <div className='pb-[30px]'><PostTools handleOpen={handleOpen} /></div>
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
  const [index, setIndex] = useState(0);
  const settings = {
    className: "center", infinite: true,
    slidesToShow: 1, slidesToScroll: 1,
    nextArrow: <ArrowNext />, prevArrow: <ArrowPrev />,
    beforeChange: (current: any, next: any) => { setIndex(next); },
  }
  return (
    <div className='relative'>
      <ThemeProvider theme={slideChipTheme}>
        <Chip label={`${index + 1}/${postData.length}`} />
      </ThemeProvider>
      <Slider {...settings} className='h-[280px] bg-gray1-text slider-detail'>
        {postData.map((post, idx) => (
          <img key={`img-{idx}`} src={post.posterSrc} height="280" className='h-[280px] object-cover' />
        ))}
      </Slider>
    </div>
  )
}

function PostTitle() {
  return (
    <div className='flex flex-col px-[16px] py-[20px]'>
      <div className='flex flex-row justify-between pt-[10px]'>
        <p className='text-[18px]'>PEAK FESTIVAL 2023</p>
        <IconButton disableRipple className='p-0'><img src='/detail_more.svg' /></IconButton>
      </div>
      <div className='flex flex-row justify-between pt-[4px]'>
        <p className='text-[14px] text-gray3-text'>23.05.27 - 05.28</p>
        <div className='flex flex-row items-center'>
          <a href="/"><img src='/detail_views.svg' /></a>
          <p className='text-[14px] text-gray3-text ps-[4px]'>2,398</p>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center pt-[4px]'>
        <div className='flex flex-row items-center'>
          <div className='me-[4px] rounded-full overflow-hidden w-[24px] h-[24px]'>
            <img className='w-[24px] h-[24px]' src="/images/profile_pic.png" />
          </div>
          <p className='text-[14px] text-gray3-text'>(주)SACOM</p>
        </div>
        <ThemeProvider theme={categoryButtonTheme}>
          <Button disabled>공연전시/행사</Button>
        </ThemeProvider>
      </div>
    </div>
  )
}

function PostInfoF() {
  return (
    <div className='flex flex-col px-[16px] pt-[30px] text-[14px]' id='p-info'>
      <div className='flex flex-row pb-[6px]'>
        <p className='font-semibold pe-[20px]'>시작일</p>
        <p className='pe-[10px]'>88.88.88(목)</p><p>99:88</p>
      </div>
      <div className='flex flex-row pb-[6px]'>
        <p className='font-semibold pe-[20px]'>종료일</p>
        <p className='pe-[10px]'>88.88.88(목)</p><p>99:88</p>
      </div>
      <div className='flex flex-row'>
        <p className='font-semibold pe-[10px]'>인원(명)</p>
        <p>88명</p>
      </div>
    </div>
  )
}

function PostInfoA() {
  return (
    <div className='flex flex-row px-[16px] pt-[30px]' id='p-info'>
      <p className='text-[14px] leading-[160%] font-semibold pe-[10px]'>인원(명)</p>
      <p className='text-[14px] leading-[160%] pe-[6px]'>88명</p>
      <ThemeProvider theme={accompanyChipTheme}><Chip label="모집 중" /></ThemeProvider>
    </div>
  )
}

function PostContent() {
  return (
    <>
      <div className='flex flex-col px-[16px] pt-[30px]' id='p-content'>
        <p className='text-[14px] leading-[140%]'>
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
          <div className='flex flex-row items-center'>
            <IconButton disableRipple className='p-0 pe-[4px]'><img src='/detail_like.svg' /></IconButton>
            <p className='text-gray3-text text-sm'>88</p>
          </div>
        </div>
        <div className='flex flex-row items-center pe-[10px]'>
          <a href="/comment" className='flex flex-row items-center'>
            <img src='/detail_comment.svg' className='pe-[4px]' />
            <p className='text-gray3-text text-sm'>88</p>
          </a>
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='pe-[10px]'>
          <IconButton disableRipple className='p-0'><img src='/post_calendar.svg' /></IconButton>
        </div>
        <IconButton disableRipple onClick={props.handleOpen} className='p-0'><img src='/detail_share.svg' /></IconButton>
      </div>
    </div>
  )
}

interface ShareDialogProps { handleClose: any, popopen: boolean }
function ShareDialog(props: ShareDialogProps) {
  // useEffect(() => {
  //   if (window.Kakao !== undefined) {
  //     window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO);
  //     console.log(window.Kakao.isInitialized());
  //   }
  // }, [])
  const sharingURL = 'http://localhost:3000/옴뇸뇸'
  const handleURL = async () => {
    // // - using navigator canShare api
    // console.log('- handleURL' + navigator.canShare)
    // const sharingData = {
    //   text: '바글바글',
    //   url: 'http://localhost:3000/',
    // }

    // try {
    //   if (navigator.canShare && navigator.canShare(sharingData)) {
    //     navigator.share(sharingData)
    //     .then(() => {
    //       alert('링크가 복사되었습니다.')
    //     }).catch(() => {
    //       console.log('취소')
    //     })
    //   }
    // } catch (e) {
    //   alert('링크 복사를 실패했습니다.')
    // }

    // - using navigator clipboard api
    try {
      await navigator.clipboard.writeText(sharingURL);
      alert('클립보드에 링크가 복사되었습니다.')
    } catch (err) {
      // alert('링크 복사를 실패했습니다.')
      console.log('링크 복사 실패' + err);
    }
  }

  const handleKakao = () => {
    alert('카카오 공유')
    // // 배포 후 테스트 가능
    // window.Kakao.Share.sendDefault({
    //   objectType: 'feed',
    //   content: {
    //     title: 'PEAK FESTIVAL 2023',
    //     description: '23.05.27 - 05.28\n #10cm #실리카겔 #난지한강공원',
    //     imageUrl:
    //       'https://pbs.twimg.com/media/Ft6VCQ6aMAI2cIC.jpg',
    //     link: {
    //       // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
    //       mobileWebUrl: 'https://developers.kakao.com',
    //       webUrl: 'https://developers.kakao.com',
    //     },
    //   },
    //   buttons: [
    //     {
    //       title: '바글바글에서 확인하기',
    //       link: {
    //         mobileWebUrl: 'https://developers.kakao.com',
    //         webUrl: 'https://developers.kakao.com',
    //       },
    //     },
    //   ],
    // });
  }

  return (
    <ThemeProvider theme={shareDialogTheme}>
      <Dialog onClose={props.handleClose} open={props.popopen} >
        <DialogTitle className='flex flex-row justify-between'>
          <div className='w-[24px] h-[24px]' />
          <span>공유하기</span>
          <IconButton disableRipple onClick={props.handleClose}><img src='/popup_close.svg' /></IconButton>
        </DialogTitle>
        <DialogContent className='flex flex-row gap-[48px] justify-center'>
          <div className='flex flex-col items-center cursor-pointer' onClick={handleKakao}>
            <img className='w-[50px] h-[50.74px]' src='/kakaotalk_sharing_btn.png' />
            <span className='select-none px-[4px] pt-[4px]'>카카오톡</span>
          </div>
          <div className='flex flex-col items-center cursor-pointer' onClick={handleURL}>
            <img className='w-[50px] h-[50.74px]' src='/url_sharing_btn.png' />
            <span className='select-none px-[4px] pt-[4px]'>URL 복사</span>
          </div>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
} 