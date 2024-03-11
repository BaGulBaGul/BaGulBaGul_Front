'use client';
import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link';
import { postData } from '@/components/common/Data'
import Slider from "react-slick";

import { ThemeProvider, Button, Divider, IconButton, Chip } from '@mui/material';
import { categoryButtonTheme, HashtagButton, slideChipTheme } from '@/components/common/Themes'
import SubHeader from '@/components/layout/subHeader';
import { PostFooter } from '@/components/layout/footer';
import { FormatDate, FormatDateTime, FormatDateRange } from '@/service/Functions';
import { call } from '@/service/ApiService';
import { ShareDialog } from '@/components/common';

interface EventProps {
  title: string; startDate: string; endDate: string; type: string; views: number;
  userName: string; categories: any; headCount: number; content: string; fullLocation: string; 
  latitudeLocation: any; longitudeLocation: any;
}
const index = () => {
  const params = useParams()
  const [data, setData] = useState<any>({})

  type typeType = { [key: string]: string; }
  const typeString: typeType = { 'FESTIVAL': '페스티벌', 'LOCAL_EVENT': '지역행사', 'PARTY': '파티' }

  useEffect(() => {
    let apiURL = `/api/event/${params.eventId}`;
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
  }, [])

  // 페스티벌, 지역행사는 '모집글 보러가기' 버튼 배치
  if (Object.keys(data).length === 0) {
    return (<></>)
  } else {
    if (data.type === 'PARTY') {
      return (
        <>
          <SubHeader name={typeString[data.type as string]} url={"/"} />
          <div className='flex flex-col w-full'>
            <DetailEvent data={data} />
          </div>
        </>
      )
    } else {
      let recruitURL = `/event/${params.eventId}/recruitment`
      return (
        <>
          <SubHeader name={typeString[data.type as string]} url={"/"} />
          <div className='flex flex-col w-full'>
            <div className='pb-[46px]'><DetailEvent data={data} /></div>
            <PostFooter title='모집글 보러가기' path={recruitURL} />
          </div>
        </>
      )
    }
  }
}
export default index;

const DetailEvent = (props: { data: any; }) => {
  const [popopen, setPopopen] = useState(false);
  const handleOpen = () => { setPopopen(true) }
  const handleClose = () => { setPopopen(false) }

  const pathname = usePathname();
  let commentURL = `/comment/${props.data.postId}`
  return (
    <div className='flex flex-col w-full pt-[104px]'>
      {
        props.data.imageUrls.length > 0
        ? <PostSlide />
        : <img className='h-[280px]' src='/default_detail_thumb3x.png' />
      }
      <PostTitle title={props.data.title} startDate={props.data.startDate} endDate={props.data.endDate}
        type={props.data.type} views={props.data.views} userName={props.data.userName} categories={props.data.categories} />
      <Divider />
      <PostInfoF startDate={props.data.startDate} endDate={props.data.endDate} headCount={props.data.headCount} />
      <PostContent content={props.data.content} />
      {/* <PostContentMap address={props.data.fullLocation} lat={props.data.latitudeLocation} lng={props.data.longitudeLocation} /> */}
      <PostContentMap address={props.data.fullLocation} lat={33.450701} lng={126.570667} />
      {
        props.data.tags !== undefined && props.data.tags.length > 0
          ? <PostContentTag tags={props.data.tags} />
          : <></>
      }
      <ShareDialog handleClose={handleClose} popopen={popopen} sharingURL={pathname} />
      {/* <PostFooter title='모집글 보러가기' path='/accompany' /> */}
      <PostTools handleOpen={handleOpen} likeCount={props.data.likeCount} commentCount={props.data.commentCount} commentURL={commentURL} />
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
          <img key={`img-{idx}`} src={post.headImageUrl} height="280" className='h-[280px] object-cover' />
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
                <Button key={`cate-${idx}`}>{cate}</Button>
              ))
            }
          </ThemeProvider>
        </div>

      </div>
    </div>
  )
}

function PostInfoF(props: { startDate: any; endDate: any; headCount: number; }) {
  let startD = FormatDateTime(props.startDate, 0)
  let endD = FormatDateTime(props.endDate, 0)
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

function PostContent(props: { content: string }) {
  return (
    <div className='flex flex-col px-[16px] pt-[30px]' id='p-content'>
      <p className='text-[14px] leading-[140%]'>{props.content}</p>
    </div>
  )
}

// const kakao = window.Kakao;
function PostContentMap(props: { address: string; lat: number; lng: number; }) {
  // const [mapSuccess, setMapSuccess] = useState(true);

  useEffect(() => {
    var container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(props.lat, props.lng),
      level: 4,
    }
    const map = new window.kakao.maps.Map(container, options)
    var coords = new window.kakao.maps.LatLng(props.lat, props.lng);
    var marker = new window.kakao.maps.Marker({ map: map, position: coords });
    // var geocoder = new window.kakao.maps.services.Geocoder();

    // geocoder.addressSearch(props.address, function (result: any, status: any) {
    //   if (status === window.kakao.maps.services.Status.OK) {
    //     setMapSuccess(true);
    //     var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
    //     var marker = new window.kakao.maps.Marker({ map: map, position: coords });
    //     map.setCenter(coords);
    //   } else {
    //     setMapSuccess(false);
    //   }
    // })
  }, [])

  return (
    <div className='pt-[30px] w-full'>
      <div className='w-full h-[246px]' id='map'>
        {/* {
          mapSuccess
          ? <></>
          : <div className=''></div>
        } */}
        <div className=''></div>
      </div>
      <div className='flex flex-row px-[16px] pt-[6px]' id='p-info'>
        <p className='text-[14px] leading-[160%] font-semibold pe-[10px]'>위치</p>
        <p className='text-[14px] leading-[160%] pe-[6px]'>{props.address}</p>
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

interface PostToolsProps { handleOpen: any; likeCount: number; commentCount: number; commentURL: string; }
function PostTools(props: PostToolsProps) {
  return (
    <div className='flex flex-row justify-between py-[30px] px-[16px]'>
      <div className='flex flex-row gap-[10px]'>
        <div className='flex flex-row items-center'>
          <div className='flex flex-row items-center gap-[4px]'>
            <IconButton disableRipple className='p-0'><img src='/detail_like.svg' /></IconButton>
            <p className='text-gray3-text text-14'>{props.likeCount}</p>
          </div>
        </div>
        <div className='flex flex-row items-center'>
          <Link className='flex flex-row items-center gap-[4px]' href={props.commentURL}>
            <img src='/detail_comment.svg' />
            <p className='text-gray3-text text-14'>{props.commentCount}</p>
          </Link>
        </div>
      </div>
      <div className='flex flex-row gap-[10px]'>
        <IconButton disableRipple className='p-0'><img src='/post_calendar.svg' /></IconButton>
        <IconButton disableRipple onClick={props.handleOpen} className='p-0'><img src='/detail_share.svg' /></IconButton>
      </div>
    </div>
  )
}