import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowNext, ArrowPrev } from "./Arrow";
import { Button, Chip, Divider, IconButton, ThemeProvider } from "@mui/material";
import { accompanyChipTheme, categoryButtonTheme, slideChipTheme } from "./Themes";
import Slider from "react-slick";
import { postData } from "./Data";
import { FormatDateRange } from "@/service/Functions";
import { HashtagButton } from "./HashtagAccordion";
import { LikeIcn, CalIcn } from "./Icon";
import { DetailProps, NoUser, RDetailProps, ShareDialog } from ".";
import { PostFooter } from "../layout/footer";
import dayjs from "dayjs";

export const Detail = (props: { opt: string; data?: DetailProps; dataR?: RDetailProps; liked: boolean; likeCount?: number; handleLike: any; saved?: boolean; handleCalendar?: any; }) => {
  const [popopen, setPopopen] = useState(false);
  const handleOpen = () => { setPopopen(true) }
  const handleClose = () => { setPopopen(false) }

  const pathname = usePathname();
  let commentURL = props.data ? `/comment/${props.data.post.postId}` : props.dataR ? `/comment/${props.dataR.post.postId}` : '';

  if (props.opt === 'EVT' && props.data) {
    return (
      <div>
        <div className={props.data.event.type !== 'PARTY' ? 'flex flex-col w-full pt-[104px] pb-[77px]' : 'flex flex-col w-full pt-[104px]'}>
          {props.data.post.imageUrls.length > 0
            ? <PostSlide />
            : <img className='h-[280px] object-cover' src='/default_detail_thumb3x.png' />
          }
          <PostTitle title={props.data.post.title} startDate={props.data.event.startDate} endDate={props.data.event.endDate} type={props.data.event.type}
            views={props.data.post.views} userId={props.data.post.writer.userId} userName={props.data.post.writer.userName} categories={props.data.event.categories} />
          <Divider />
          <PostInfo opt='EVT' type={props.data.event.type} startDate={props.data.event.startDate} endDate={props.data.event.endDate}
            headCountMax={props.data.event.maxHeadCount} headCount={props.data.event.currentHeadCount} />
          <PostContent content={props.data.post.content} />
          <PostContentMap address={props.data.event.fullLocation} lat={props.data.event.latitudeLocation} lng={props.data.event.longitudeLocation} />
          {props.data.post.tags !== undefined && props.data.post.tags.length > 0
            ? <PostContentTag tags={props.data.post.tags} />
            : <></>
          }
          <ShareDialog handleClose={handleClose} popopen={popopen} sharingURL={pathname} />
          <PostTools opt='EVT' handleOpen={handleOpen} likeCount={props.likeCount} liked={props.liked} handleLike={props.handleLike}
            commentCount={props.data.post.commentCount} commentURL={commentURL} saved={props.saved} handleCalendar={props.handleCalendar} />
        </div>
        { // 페스티벌, 지역행사는 '모집글 보러가기' 버튼 배치
          props.data.event.type !== 'PARTY' ? <PostFooter title='모집글 보러가기' path={`/event/${props.data.event.eventId}/recruitment`} /> : <></>
        }
      </div>
    )
  } else if (props.opt === 'RCT' && props.dataR) {
    return (
      <div className='flex flex-col w-full min-h-screen pt-[104px] justify-between'>
        <div className='flex flex-col w-full'>
          {props.dataR.post.imageUrls.length > 0
            ? <PostSlide /> : <img className='h-[280px] object-cover' src='/default_detail_thumb3x.png' />
          }
          <PostTitle title={props.dataR.post.title} startDate={props.dataR.recruitment.startDate} views={props.dataR.post.views} userId={props.dataR.post.writer.userId} userName={props.dataR.post.writer.userName} />
          <Divider />
          <PostInfo opt='RCT' headCount={props.dataR.recruitment.maxHeadCount} currentHeadCount={props.dataR.recruitment.currentHeadCount} />
          <div className='pb-[30px]'>
            <PostContent content={props.dataR.post.content} />
            {props.dataR.post.tags !== undefined && props.dataR.post.tags.length > 0 ? <PostContentTag tags={props.dataR.post.tags} /> : <></>}
          </div>
        </div>
        <ShareDialog handleClose={handleClose} popopen={popopen} sharingURL={pathname} />
        <div>
          <Divider />
          <PostTools opt='RCT' handleOpen={handleOpen} likeCount={props.likeCount} liked={props.liked} handleLike={props.handleLike}
            commentCount={props.dataR.post.commentCount} commentURL={commentURL} />
        </div>
      </div>
    )
  }

}

function PostSlide() {
  const [index, setIndex] = useState(0);
  const settings = {
    className: "center", infinite: true, slidesToShow: 1, slidesToScroll: 1,
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
  title: string; startDate: any; endDate?: any; type?: string;
  views: number; userId: number; userName: string; categories?: string[];
}
function PostTitle(props: PostTitleProps) {
  const dateString = props.type !== undefined && props.type !== 'PARTY' ? FormatDateRange(props.startDate, props.endDate) : dayjs(props.startDate).format('YY.MM.DD')
  return (
    <div className='flex flex-col px-[16px] py-[20px]'>
      <div className='flex flex-row justify-between pt-[10px]'>
        <p className='text-[18px]'>{props.title}</p>
        <IconButton disableRipple className='p-0'><img src='/detail_more.svg' /></IconButton>
      </div>
      <div className='flex flex-row justify-between pt-[4px]'>
        <p className='text-[14px] text-gray3'>{`${dateString}`}</p>
        <div className='flex flex-row items-center'>
          <a href="/"><img src='/detail_views.svg' /></a>
          <p className='text-[14px] text-gray3 ps-[4px]'>{props.views.toLocaleString("en-US")}</p>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center pt-[4px]'>
        <div className='flex flex-row items-center'>
          {props.userId === null ? <NoUser />
            : <>
              <div className='me-[4px] rounded-full overflow-hidden w-[24px] h-[24px]'>
                <img className='w-[24px] h-[24px]' src={"/images/profile_pic.png"} />
              </div>
              <p className='text-[14px] text-gray3'>{props.userName}</p>
            </>
          }
        </div>
        {props.categories !== undefined
          ? <div className='flex flex-row gap-[8px]'>
            <ThemeProvider theme={categoryButtonTheme}>
              {props.categories.map((cate, idx) => (<Button key={`cate-${idx}`}>{cate}</Button>))}
            </ThemeProvider>
          </div>
          : <></>
        }
      </div>
    </div>
  )
}

interface PostInfoProps {
  opt: string; type?: string; startDate?: any; endDate?: any; headCount: number; headCountMax?: number; currentHeadCount?: number;
}
function PostInfo(props: PostInfoProps) {
  return (<>
    {props.opt === 'EVT'
      ? <div className='flex flex-col px-[16px] pt-[30px] text-[14px] leading-[160%]' id='p-info'>
        <div className='flex flex-row pb-[6px]'>
          <p className='font-semibold pe-[20px]'>시작일시</p>
          {props.startDate !== undefined
            ? <><p className='pe-[10px]'>{dayjs(props.startDate).format('YY.MM.DD(dd)')}</p><p>{dayjs(props.startDate).format('HH:mm')}</p></>
            : <p>—</p>
          }
        </div>
        <div className='flex flex-row pb-[6px]'>
          <p className='font-semibold pe-[20px]'>종료일시</p>
          {props.endDate !== undefined
            ? <><p className='pe-[10px]'>{dayjs(props.endDate).format('YY.MM.DD(dd)')}</p><p>{dayjs(props.endDate).format('HH:mm')}</p></>
            : <p>—</p>
          }
        </div>
        <div className='flex flex-row items-center'>
          <p className='font-semibold pe-[20px]'>참여인원</p>
          <p>{props.headCountMax ?? '-'}명</p>
          {props.type === 'PARTY'
            ? <p className='ps-[4px]'>
              <ThemeProvider theme={accompanyChipTheme}><Chip label={`${props.headCount ?? 0}명 참여 중`} /></ThemeProvider>
            </p>
            : <></>
          }
        </div>
      </div>
      : <div className='flex flex-row px-[16px] pt-[30px] text-[14px] leading-[160%]' id='p-info'>
        <p className='font-semibold pe-[10px]'>모집인원</p>
        <p className='pe-[6px]'>{props.headCount}명</p>
      </div>
    }
  </>
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
          if (tag.length > 0) { return (<HashtagButton tag={tag} key={`tag-${idx}`} />) }
        })}
      </div>
    </div>
  )
}

function PostContentMap(props: { address: string; lat: number; lng: number; }) {
  useEffect(() => {
    var container = document.getElementById('map');
    let options = { center: new window.kakao.maps.LatLng(props.lat, props.lng), level: 4, }
    const map = new window.kakao.maps.Map(container, options)
    var coords = new window.kakao.maps.LatLng(props.lat, props.lng);
    var marker = new window.kakao.maps.Marker({ map: map, position: coords });
    window.kakao.maps.event.addListener(marker, 'click', function () {
      window.open(`https://map.kakao.com/link/map/${String(props.lat)},${String(props.lng)}`);
    });
  }, [])

  return (
    <div className='pt-[30px] w-full'>
      <div className='w-full h-[246px]' id='map'>
        <div className=''></div>
      </div>
      <div className='flex flex-row px-[16px] pt-[6px] text-[14px] leading-[160%]' id='p-info'>
        <p className='font-semibold pe-[10px]'>위치</p>
        <p className='pe-[6px]'>{props.address}</p>
      </div>
    </div>
  )
}

interface PostToolsProps {
  opt: string; handleOpen: any; likeCount?: number; liked: boolean; handleLike: any; commentCount: number;
  commentURL: string; saved?: boolean; handleCalendar?: any;
}
function PostTools(props: PostToolsProps) {
  return (
    <div className='flex flex-row justify-between py-[30px] px-[16px]'>
      <div className='flex flex-row gap-[10px]'>
        <Button className="flex flex-row items0center gap-[4px] p-0 min-w-fit" disableRipple onClick={props.handleLike}>
          <LikeIcn val={props.liked} />
          <p className='text-gray3 text-[14px] font-normal'>{props.likeCount}</p>
        </Button>
        <Button className="flex flex-row items0center gap-[4px] p-0 min-w-fit" disableRipple href={props.commentURL}>
          <img src='/detail_comment.svg' />
          <p className='text-gray3 text-[14px] font-normal'>{props.commentCount}</p>
        </Button>
      </div>

      <div className='flex flex-row gap-[10px]'>
        {props.opt === 'EVT' && props.saved !== undefined ? <IconButton disableRipple onClick={props.handleCalendar} className='p-0'><CalIcn val={props.saved} /></IconButton> : <></>}
        <IconButton disableRipple onClick={props.handleOpen} className='p-0'><img src='/detail_share.svg' /></IconButton>
      </div>
    </div>
  )
}