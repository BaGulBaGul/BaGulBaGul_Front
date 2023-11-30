'use client';
import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { postData } from '@/components/common/Data'
import Slider from "react-slick";

import { ThemeProvider, Divider, IconButton, Dialog, DialogTitle, DialogContent, Chip } from '@mui/material';
import { HashtagButton, shareDialogTheme, accompanyChipTheme, slideChipTheme } from '@/components/common/Themes'
import { FormatDate } from '@/service/Functions';
import { call } from '@/service/ApiService';
import ShareDialog from '@/components/common/ShareDialog';

const index = (props: { data: any }) => {
  const params = useParams()
  const [data, setData] = useState<any>({})

  useEffect(() => {
    let apiURL = `/api/event/recruitment/${params.recruitId}`;
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
  }, [])

  if (Object.keys(data).length === 0) {
    return (<></>)
  } else {
    return (
      <div className='flex flex-col w-full'>
        <DetailRecruitment data={data} />
      </div>
    )
  }
}
export default index;

const DetailRecruitment = (props: { data: any }) => {
  const [popopen, setPopopen] = useState(false);
  const handleOpen = () => { setPopopen(true) }
  const handleClose = () => { setPopopen(false) }

  const pathname = usePathname();
  return (
    <div className='flex flex-col w-full pt-[104px]'>
      <PostSlide />
      <PostTitle title={props.data.title} startDate={props.data.startDate}
        views={props.data.views} username={props.data.username} />
      <Divider />
      <PostInfo headCount={props.data.headCount} />
      <div className='pb-[30px]'>
        <PostContent content={props.data.content} />
        {
          props.data.tags !== undefined && props.data.tags.length > 0
            ? <PostContentTag tags={props.data.tags} />
            : <></>
        }
      </div>
      <Divider />
      <ShareDialog handleClose={handleClose} popopen={popopen} sharingURL={pathname} />
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
  title: string; startDate: any; views: number; username: string;
}
function PostTitle(props: PostTitleProps) {
  return (
    <div className='flex flex-col px-[16px] py-[20px]'>
      <div className='flex flex-row justify-between pt-[10px]'>
        <p className='text-[18px]'>{props.title}</p>
        <IconButton disableRipple className='p-0'><img src='/detail_more.svg' /></IconButton>
      </div>
      <div className='flex flex-row pt-[4px] gap-[8px]'>
        <p className='text-[14px] text-gray3-text'>{FormatDate(props.startDate, 0)}</p>
        <div className='flex flex-row items-center'>
          <a href="/"><img src='/detail_views.svg' /></a>
          <p className='text-[14px] text-gray3-text ps-[4px]'>{props.views.toLocaleString("en-US")}</p>
        </div>
      </div>
      <div className='flex flex-row items-center pt-[4px]'>
          <div className='me-[4px] rounded-full overflow-hidden w-[24px] h-[24px]'>
            <img className='w-[24px] h-[24px]' src="/images/profile_pic.png" />
          </div>
          <p className='text-[14px] text-gray3-text'>{props.username}</p>
      </div>
    </div>
  )
}

function PostInfo(props: { headCount: number }) {
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
      <IconButton disableRipple onClick={props.handleOpen} className='p-0'><img src='/detail_share.svg' /></IconButton>
    </div>
  )
}