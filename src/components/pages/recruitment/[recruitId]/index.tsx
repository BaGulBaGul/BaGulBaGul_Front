'use client';
import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { postData } from '@/components/common/Data'
import Slider from "react-slick";

import { ThemeProvider, Divider, IconButton, Chip } from '@mui/material';
import { accompanyChipTheme, slideChipTheme } from '@/components/common/Themes'
import { FormatDate } from '@/service/Functions';
import { call } from '@/service/ApiService';
import { ShareDialog, HashtagButton, LoadingSkeleton } from '@/components/common';
import { ArrowNext, ArrowPrev } from '@/components/common/Arrow';

const index = () => {
  const [isLoading, setLoading] = useState(true)
  const params = useParams()
  const [data, setData] = useState<any>({})

  useEffect(() => {
    let apiURL = `/api/event/recruitment/${params.recruitId}`;
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
  }, [])

  if (isLoading) { return <LoadingSkeleton type='DTLR' /> }
  if (Object.keys(data).length > 0) { return <DetailRecruitment data={data} /> }
}
export default index;

const DetailRecruitment = (props: { data: any }) => {
  const [popopen, setPopopen] = useState(false);
  const handleOpen = () => { setPopopen(true) }
  const handleClose = () => { setPopopen(false) }

  const pathname = usePathname();
  let commentURL = `/comment/${props.data.postId}`
  return (
    <div className='flex flex-col w-full min-h-screen pt-[104px] justify-between'>
      <div>
        <PostSlide />
        <PostTitle title={props.data.title} startDate={props.data.startDate}
          views={props.data.views} username={props.data.username} />
        <Divider />
        <PostInfo headCount={props.data.totalHeadCount} currentHeadCount={props.data.currentHeadCount} />
        <div className='pb-[30px]'>
          <PostContent content={props.data.content} />
          {
            props.data.tags !== undefined && props.data.tags.length > 0
              ? <PostContentTag tags={props.data.tags} />
              : <></>
          }
        </div>
      </div>
      <ShareDialog handleClose={handleClose} popopen={popopen} sharingURL={pathname} />
      <div className='pb-[30px]'>
        <Divider />
        <PostTools handleOpen={handleOpen} likeCount={props.data.likeCount} commentCount={props.data.commentCount} commentURL={commentURL} />
      </div>
    </div>
  )
}

function PostSlide() {
  const [index, setIndex] = useState(0);
  const settings = {
    className: "center", infinite: true,
    slidesToShow: 1, slidesToScroll: 1,
    nextArrow: <ArrowNext cN='slick-next-detail' />, prevArrow: <ArrowPrev cN='slick-prev-detail' />,
    beforeChange: (current: any, next: any) => { setIndex(next); },
  }
  return (
    <div className='relative'>
      <ThemeProvider theme={slideChipTheme}>
        <Chip label={`${index + 1}/${postData.length}`} />
      </ThemeProvider>
      <Slider {...settings} className='h-[280px] bg-gray1 slider-detail'>
        {postData.map((post, idx) => (
          <img key={`img-{idx}`} src={post.headImageUrl} height="280" className='h-[280px] object-cover' />
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
      <div className='flex flex-row pt-[4px] gap-[8px] justify-between'>
        <p className='text-[14px] text-gray3'>{FormatDate(props.startDate, 0)}</p>
        <div className='flex flex-row items-center'>
          <a href="/"><img src='/detail_views.svg' /></a>
          <p className='text-[14px] text-gray3 ps-[4px]'>{props.views.toLocaleString("en-US")}</p>
        </div>
      </div>
      <div className='flex flex-row items-center pt-[4px]'>
        <div className='me-[4px] rounded-full overflow-hidden w-[24px] h-[24px]'>
          <img className='w-[24px] h-[24px]' src="/images/profile_pic.png" />
        </div>
        <p className='text-[14px] text-gray3'>{props.username}</p>
      </div>
    </div>
  )
}

function PostInfo(props: { headCount: number; currentHeadCount: number; }) {
  return (
    <div className='flex flex-row px-[16px] pt-[30px]' id='p-info'>
      <p className='text-[14px] leading-[160%] font-semibold pe-[10px]'>모집인원</p>
      <p className='text-[14px] leading-[160%] pe-[6px]'>{props.headCount}명</p>
      <ThemeProvider theme={accompanyChipTheme}><Chip label={`${props.currentHeadCount}명 참여 중`} /></ThemeProvider>
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
        {props.tags.map((tag, idx) => {
          if (tag.length > 0) {
            return (<HashtagButton tag={tag} key={`tag-${idx}`} />)
          }
        })}
      </div>
    </div>
  )

}

interface PostToolsProps { handleOpen: any; likeCount: number; commentCount: number; commentURL: string; }
function PostTools(props: PostToolsProps) {
  return (
    <div className='flex flex-row justify-between pt-[30px] px-[16px]'>
      <div className='flex flex-row gap-[10px]'>
        <div className='flex flex-row items-center'>
          <div className='flex flex-row items-center gap-[4px]'>
            <IconButton disableRipple className='p-0'><img src='/detail_like.svg' /></IconButton>
            <p className='text-gray3 text-[14px]'>{props.likeCount}</p>
          </div>
        </div>
        <div className='flex flex-row items-center'>
          <a className='flex flex-row items-center gap-[4px]' href={props.commentURL}>
            <img src='/detail_comment.svg' />
            <p className='text-gray3 text-[14px]'>{props.commentCount}</p>
          </a>
        </div>
      </div>
      <IconButton disableRipple onClick={props.handleOpen} className='p-0'><img src='/detail_share.svg' /></IconButton>
    </div>
  )
}