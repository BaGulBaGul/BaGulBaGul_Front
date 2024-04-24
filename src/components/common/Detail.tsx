import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowNext, ArrowPrev } from "./Arrow";
import { Button, Checkbox, Chip, Divider, IconButton, ThemeProvider } from "@mui/material";
import { accompanyChipTheme, categoryButtonTheme, slideChipTheme } from "./Themes";
import Slider from "react-slick";
import { postData } from "./Data";
import { FormatDate, FormatDateRange, FormatDateTime } from "@/service/Functions";
import { HashtagButton } from "./HashtagAccordion";
import { LikeIcn } from "./Icon";
import { ShareDialog } from ".";
import { PostFooter } from "../layout/footer";

export interface PostTitleProps {
  title: string; startDate: any; endDate?: any; type?: string;
  views: number; userName?: string; username?: string; categories?: string[];
}

export const Detail = (props: { opt: string; data: any; eventId?: any; liked: boolean; handleLike: any; }) => {
  const [popopen, setPopopen] = useState(false);
  const handleOpen = () => { setPopopen(true) }
  const handleClose = () => { setPopopen(false) }

  const pathname = usePathname();
  let commentURL = `/comment/${props.data.postId}`

  if (props.opt === 'EVT') {
    return (
      <div>
        <div className={props.data.type !== 'PARTY' ? 'flex flex-col w-full pt-[104px] pb-[46px]' : 'flex flex-col w-full pt-[104px]'}>
          {props.data.imageUrls.length > 0
            ? <PostSlide />
            : <img className='h-[280px] object-cover' src='/default_detail_thumb3x.png' />
          }
          <PostTitle title={props.data.title} startDate={props.data.startDate} endDate={props.data.endDate}
            type={props.data.type} views={props.data.views} userName={props.data.userName} categories={props.data.categories} />
          <Divider />
          <PostInfo opt='EVT' type={props.data.type} startDate={props.data.startDate} endDate={props.data.endDate} headCountMax={props.data.headCountMax} headCount={props.data.headCount} />
          <PostContent content={props.data.content} />
          {/* <PostContentMap address={props.data.fullLocation} lat={props.data.latitudeLocation} lng={props.data.longitudeLocation} /> */}
          <PostContentMap address={props.data.fullLocation} lat={33.450701} lng={126.570667} />
          {props.data.tags !== undefined && props.data.tags.length > 0
            ? <PostContentTag tags={props.data.tags} />
            : <></>
          }
          <ShareDialog handleClose={handleClose} popopen={popopen} sharingURL={pathname} />
          <PostTools opt='EVT' handleOpen={handleOpen} likeCount={props.data.likeCount} liked={props.liked} handleLike={props.handleLike}
            commentCount={props.data.commentCount} commentURL={commentURL} />
        </div>
        { // 페스티벌, 지역행사는 '모집글 보러가기' 버튼 배치
          props.data.type !== 'PARTY' ? <PostFooter title='모집글 보러가기' path={`/event/${props.eventId}/recruitment`} /> : <></>
        }
      </div>
    )
  } else {
    return (
      <div className='flex flex-col w-full min-h-screen pt-[104px] justify-between'>
        <div>
          {props.data.imageUrls.length > 0
            ? <PostSlide /> : <img className='h-[280px] object-cover' src='/default_detail_thumb3x.png' />
          }
          <PostTitle title={props.data.title} startDate={props.data.startDate} views={props.data.views} username={props.data.username} />
          <Divider />
          <PostInfo opt='RCT' headCount={props.data.totalHeadCount} currentHeadCount={props.data.currentHeadCount} />
          <div className='pb-[30px]'>
            <PostContent content={props.data.content} />
            {props.data.tags !== undefined && props.data.tags.length > 0
              ? <PostContentTag tags={props.data.tags} /> : <></>
            }
          </div>
        </div>
        <ShareDialog handleClose={handleClose} popopen={popopen} sharingURL={pathname} />
        <div>
          <Divider />
          <PostTools opt='RCT' handleOpen={handleOpen} likeCount={props.data.likeCount} liked={props.liked} handleLike={props.handleLike}
            commentCount={props.data.commentCount} commentURL={commentURL} />
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

function PostTitle(props: PostTitleProps) {
  const dateString = props.type !== undefined && props.type !== 'PARTY' ? FormatDateRange(props.startDate, props.endDate) : FormatDate(props.startDate, 0)
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
          <div className='me-[4px] rounded-full overflow-hidden w-[24px] h-[24px]'>
            {/* 프로필 이미지 적용 필요 */}
            <img className='w-[24px] h-[24px]' src={"/images/profile_pic.png"} />
          </div>
          <p className='text-[14px] text-gray3'>{props.userName ?? props.username}</p>
        </div>
        {
          props.categories !== undefined
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

function PostInfo(props: { opt: string; type?: string; startDate?: any; endDate?: any; headCount: number; headCountMax?: number; currentHeadCount?: number; }) {
  let startD = FormatDateTime(props.startDate, 0)
  let endD = FormatDateTime(props.endDate, 0)
  return (<>
    {
      props.opt === 'EVT'
        ? <div className='flex flex-col px-[16px] pt-[30px] text-[14px] leading-[160%]' id='p-info'>
          <div className='flex flex-row pb-[6px]'>
            <p className='font-semibold pe-[20px]'>시작일시</p>
            {startD !== undefined
              ? <><p className='pe-[10px]'>{startD.date}</p><p>{startD.time}</p></>
              : <p>—</p>
            }
          </div>
          <div className='flex flex-row pb-[6px]'>
            <p className='font-semibold pe-[20px]'>종료일시</p>
            {endD !== undefined
              ? <><p className='pe-[10px]'>{endD.date}</p><p>{endD.time}</p></>
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
      <div className='flex flex-row px-[16px] pt-[6px] text-[14px] leading-[160%]' id='p-info'>
        <p className='font-semibold pe-[10px]'>위치</p>
        <p className='pe-[6px]'>{props.address}</p>
      </div>
    </div>
  )
}

interface PostToolsProps { opt: string; handleOpen: any; likeCount: number; liked: boolean; handleLike: any; commentCount: number; commentURL: string; }
function PostTools(props: PostToolsProps) {
  return (
    <div className='flex flex-row justify-between py-[30px] px-[16px]'>
      <div className='flex flex-row gap-[10px]'>
        <div className='flex flex-row items-center'>
          <div className='flex flex-row items-center gap-[4px]'>
            <Checkbox icon={<LikeIcn val={false} />} checkedIcon={<LikeIcn val={true} />} checked={props.liked} onChange={props.handleLike}
              disableRipple className='p-0' />
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

      <div className='flex flex-row gap-[10px]'>
        {
          props.opt === 'EVT' ? <IconButton disableRipple className='p-0'><img src='/post_calendar.svg' /></IconButton> : <></>
        }
        <IconButton disableRipple onClick={props.handleOpen} className='p-0'><img src='/detail_share.svg' /></IconButton>
      </div>
    </div>
  )
}