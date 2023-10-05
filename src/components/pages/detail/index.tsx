'use client';
import { useEffect, useState, useMemo } from 'react';
import { postData } from '@/components/common/Data'
import Slider from "react-slick";

import { ThemeProvider, Button, Divider, IconButton, Dialog, DialogTitle, DialogContent, Chip, Skeleton } from '@mui/material';
import { categoryButtonTheme, HashtagButton, shareDialogTheme, accompanyChipTheme, slideChipTheme } from '@/components/common/Themes'
import { PostFooter } from '@/components/layout/footer';
import { FormatDate, FormatDateTime, FormatDateRange } from '@/service/Functions';

export const DetailFestival = (props: { data: any }) => {
  const [popopen, setPopopen] = useState(false);
  const handleOpen = () => { setPopopen(true) }
  const handleClose = () => { setPopopen(false) }

  return (
    <div className='flex flex-col w-full pt-[104px] pb-[64px]'>
      <PostSlide />
      <PostTitle title={props.data.title} startDate={props.data.startDate} endDate={props.data.endDate}
        type={props.data.type} views={props.data.views} userName={props.data.userName} categories={props.data.categories} />
      <Divider />
      <PostInfoF startDate={props.data.startDate} endDate={props.data.endDate} headCount={props.data.headCount} />
      <PostContent content={props.data.content} />
      <PostContentMap address={props.data.address} />
      {
        props.data.tags !== undefined && props.data.tags.length > 0
          ? <PostContentTag tags={props.data.tags} />
          : <></>
      }
      <ShareDialog handleClose={handleClose} popopen={popopen} />
      <PostFooter title='모집글 보러가기' path='/accompany' />
      <PostTools handleOpen={handleOpen} likeCount={props.data.likeCount} commentCount={props.data.commentCount} />
    </div>
  )
}

export const DetailAccompany = (props: { data: any }) => {
  const [popopen, setPopopen] = useState(false);
  const handleOpen = () => { setPopopen(true) }
  const handleClose = () => { setPopopen(false) }
  return (
    <div className='flex flex-col w-full pt-[104px]'>
      <PostSlide />
      <PostTitle title={props.data.title} startDate={props.data.startDate} endDate={props.data.endDate}
        type={props.data.type} views={props.data.views} userName={props.data.userName} categories={props.data.categories} />
      <Divider />
      <PostInfoA headCount={props.data.headCount} />
      <div className='pb-[30px]'>
        <PostContent content={props.data.content} />
        {
          props.data.tags !== undefined && props.data.tags.length > 0
            ? <PostContentTag tags={props.data.tags} />
            : <></>
        }
      </div>
      <Divider />
      <ShareDialog handleClose={handleClose} popopen={popopen} />
      <div className='pb-[30px]'><PostTools handleOpen={handleOpen} likeCount={props.data.likeCount} commentCount={props.data.commentCount} /></div>
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
          <img key={`img-{idx}`} src={post.img_url} height="280" className='h-[280px] object-cover' />
        ))}
      </Slider>
    </div>
  )
}

interface PostTitleProps {
  title: string; startDate: any; endDate?: any; type: string;
  views: number; userName: string; categories: string[];
}
function PostTitle(props: PostTitleProps) {
  const dateString = props.type === 'FESTIVAL' ? FormatDateRange(props.startDate, props.endDate) : FormatDate(props.startDate, 0)
  return (
    <div className='flex flex-col px-[16px] py-[20px]'>
      <div className='flex flex-row justify-between pt-[10px]'>
        <p className='text-[18px]'>{props.title}</p>
        <IconButton disableRipple className='p-0'><img src='/detail_more.svg' /></IconButton>
      </div>
      <div className='flex flex-row justify-between pt-[4px]'>
        <p className='text-[14px] text-gray3-text'>{`${dateString}`}</p>
        <div className='flex flex-row items-center'>
          <a href="/"><img src='/detail_views.svg' /></a>
          <p className='text-[14px] text-gray3-text ps-[4px]'>{props.views.toLocaleString("en-US")}</p>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center pt-[4px]'>
        <div className='flex flex-row items-center'>
          <div className='me-[4px] rounded-full overflow-hidden w-[24px] h-[24px]'>
            <img className='w-[24px] h-[24px]' src="/images/profile_pic.png" />
          </div>
          <p className='text-[14px] text-gray3-text'>{props.userName}</p>
        </div>
        <div className='flex flex-row gap-[8px]'>
          <ThemeProvider theme={categoryButtonTheme}>
            {
              props.categories.map((cate, idx) => (
                <Button disabled key={`cate-${idx}`}>{cate}</Button>
              ))
            }
          </ThemeProvider>
        </div>

      </div>
    </div>
  )
}

function PostInfoF(props: { startDate: any; endDate: any; headCount: number; }) {
  const startD = FormatDateTime(props.startDate)
  const endD = FormatDateTime(props.endDate)
  return (
    <div className='flex flex-col px-[16px] pt-[30px] text-[14px]' id='p-info'>
      <div className='flex flex-row pb-[6px]'>
        <p className='font-semibold pe-[20px]'>시작일</p>
        {
          startD !== undefined
            ? <><p className='pe-[10px]'>{startD.date}</p><p>{startD.time}</p></>
            : <p>—</p>
        }
      </div>
      <div className='flex flex-row pb-[6px]'>
        <p className='font-semibold pe-[20px]'>종료일</p>
        {
          endD !== undefined
            ? <><p className='pe-[10px]'>{endD.date}</p><p>{endD.time}</p></>
            : <p>—</p>
        }
      </div>
      <div className='flex flex-row'>
        <p className='font-semibold pe-[10px]'>인원(명)</p>
        <p>{props.headCount}명</p>
      </div>
    </div>
  )
}

function PostInfoA(props: { headCount: number }) {
  return (
    <div className='flex flex-row px-[16px] pt-[30px]' id='p-info'>
      <p className='text-[14px] leading-[160%] font-semibold pe-[10px]'>인원(명)</p>
      <p className='text-[14px] leading-[160%] pe-[6px]'>{props.headCount}명</p>
      <ThemeProvider theme={accompanyChipTheme}><Chip label="모집 중" /></ThemeProvider>
    </div>
  )
}

function PostContent(props: { content: string }) {
  return (
    <div className='flex flex-col px-[16px] pt-[30px]' id='p-content'>
      <p className='text-[14px] leading-[140%]'>{props.content}</p>
    </div>
  )
}

// const kakao = window.Kakao;
function PostContentMap(props: { address: string }) {
  const [mapSuccess, setMapSuccess] = useState(true);

  useEffect(() => {
    var container = document.getElementById('map');
    let options = { 
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), 
      level: 4, 
    }
    const map = new window.kakao.maps.Map(container, options)
    var geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(props.address, function (result:any, status:any) {
      if (status === window.kakao.maps.services.Status.OK) {
        setMapSuccess(true);
        var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        var marker = new window.kakao.maps.Marker({ map: map, position: coords });
        map.setCenter(coords);
      } else {
        setMapSuccess(false);
      }
    })
  }, [])

  return (
    <div className='pt-[30px] w-full'>
      <div className='w-full h-[246px]' id='map'>
        {/* {
          mapSuccess
          ? <></>
          : <div className=''></div>
        } */}
      </div>
    </div>
  )
}
function PostContentTag(props: { tags: string[] }) {
  return (
    <div className='flex flex-col px-[16px] pt-[30px]' id='p-content-tag'>
      <div className='container'>
        {
          props.tags.map((tag, idx) => (
            <HashtagButton tag={tag} key={`tag-${idx}`} />
          ))
        }
      </div>
    </div>
  )

}

interface PostToolsProps { handleOpen: any; likeCount: number; commentCount: number; }
function PostTools(props: PostToolsProps) {
  return (
    <div className='flex flex-row justify-between pt-[30px] px-[16px]'>
      <div className='flex flex-row'>
        <div className='flex flex-row items-center pe-[10px]'>
          <div className='flex flex-row items-center'>
            <IconButton disableRipple className='p-0 pe-[4px]'><img src='/detail_like.svg' /></IconButton>
            <p className='text-gray3-text text-sm'>{props.likeCount}</p>
          </div>
        </div>
        <div className='flex flex-row items-center pe-[10px]'>
          <a href="/comment" className='flex flex-row items-center'>
            <img src='/detail_comment.svg' className='pe-[4px]' />
            <p className='text-gray3-text text-sm'>{props.commentCount}</p>
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
    // // - using navigator canShare api : 크롬 작동 X, 사파리 작동 O
    // console.log('- handleURL' + navigator.canShare)
    // const sharingData = {
    //   text: '바글바글',
    //   url: 'http://localhost:3000/',
    // }

    // try {
    //   if (navigator.canShare && navigator.canShare(sharingData)) {
    //     navigator.share(sharingData)
    //     .then(() => {
    //       alert('URL이 복사되었습니다.\n공유할 곳에 붙여넣기 해주세요.')
    //     }).catch(() => {
    //       console.log('취소')
    //     })
    //   }
    // } catch (e) {
    //   alert('URL 복사를 실패했습니다.')
    // }

    // - using navigator clipboard api
    try {
      await navigator.clipboard.writeText(sharingURL);
      alert('클립보드에 URL이 복사되었습니다.\n공유할 곳에 붙여넣기 해주세요.')
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