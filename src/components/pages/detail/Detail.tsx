import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowNext, ArrowPrev } from "../../common/Arrow";
import { Drawer, List, ListItem, ListItemButton, ListItemText, ThemeProvider } from "@mui/material";
import { commentMenuTheme } from "../../styles/Themes";
import Slider from "react-slick";
import { postData } from "../../common/Data";
import { FormatDateRange } from "@/service/Functions";
import { HashtagButton } from "../../common/HashtagAccordion";
import { LikeIcn, CalIcn } from "../../styles/Icon";
import { DetailProps, NoUser, RDetailProps, Divider } from "../../common";
import { PostFooter } from "../../layout/footer";
import dayjs from "dayjs";
import ShareDialog from "./ShareDialog";

export const Detail = (props: { opt: string; data?: DetailProps; dataR?: RDetailProps; liked: boolean; likeCount?: number; handleLike: any; saved?: boolean; handleCalendar?: any; }) => {
  const [popopen, setPopopen] = useState(false);
  const handleOpen = () => { setPopopen(true) }
  const handleClose = () => { setPopopen(false) }

  const [openD, setOpenD] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => { setOpenD(newOpen); };

  const pathname = usePathname();
  let commentURL = props.data ? `/comment/${props.data.post.postId}` : props.dataR ? `/comment/${props.dataR.post.postId}` : '';

  if (props.opt === 'EVT' && props.data) {
    return (
      <div>
        <div className={`flex flex-col w-full pt-[104px] ${props.data.event.type !== 'PARTY' ? 'pb-[77px]' : ''}`}>
          {props.data.post.imageUrls.length > 0
            ? <PostSlide />
            : <img className='h-[280px] object-cover' src='/default_detail_thumb3x.png' />
          }
          <PostTitle title={props.data.post.title} startDate={props.data.event.startDate} endDate={props.data.event.endDate} type={props.data.event.type}
            views={props.data.post.views} userId={props.data.post.writer.userId} userName={props.data.post.writer.userName}
            categories={props.data.event.categories} toggleDrawer={toggleDrawer} />
          <Divider />
          <PostInfo opt='EVT' type={props.data.event.type} startDate={props.data.event.startDate} endDate={props.data.event.endDate}
            maxHeadCount={props.data.event.maxHeadCount} currentHeadCount={props.data.event.currentHeadCount} />
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
        <PostDrawer open={openD} toggleDrawer={toggleDrawer} />
        { // 페스티벌, 지역행사는 '모집글 보러가기' 버튼 배치
          props.data.event.type !== 'PARTY' ? <PostFooter title='모집글 보러가기' path={`/event/${props.data.event.eventId}/recruitment`} /> : <></>
        }
      </div>
    )
  } else if (props.opt === 'RCT' && props.dataR) {
    return (
      <>
        <div className='flex flex-col w-full min-h-screen pt-[104px] justify-between'>
          <div className='flex flex-col w-full'>
            {props.dataR.post.imageUrls.length > 0
              ? <PostSlide /> : <img className='h-[280px] object-cover' src='/default_detail_thumb3x.png' />
            }
            <PostTitle title={props.dataR.post.title} startDate={props.dataR.recruitment.startDate} views={props.dataR.post.views}
              userId={props.dataR.post.writer.userId} userName={props.dataR.post.writer.userName} toggleDrawer={toggleDrawer} />
            <Divider />
            <PostInfo opt='RCT' maxHeadCount={props.dataR.recruitment.maxHeadCount} currentHeadCount={props.dataR.recruitment.currentHeadCount} />
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
        <PostDrawer open={openD} toggleDrawer={toggleDrawer} />
      </>
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
      <span className="slide-chip">{`${index + 1}/${postData.length}`}</span>
      <Slider {...settings} className='h-[280px] bg-gray1 slider-detail'>
        {postData.map((post, idx) => (
          <img key={`img-{idx}`} src={post.headImageUrl} height="280" className='h-[280px] object-cover' />
        ))}
      </Slider>
    </div>
  )
}

interface PostTitleProps {
  title: string; startDate: any; endDate?: any; type?: string; views: number;
  userId: number; userName: string; categories?: string[]; toggleDrawer: any;
}
function PostTitle(props: PostTitleProps) {
  const dateString = props.type !== undefined && props.type !== 'PARTY' ? FormatDateRange(props.startDate, props.endDate) : dayjs(props.startDate).format('YY.MM.DD')
  return (
    <div className='flex flex-col px-[16px] py-[20px]'>
      <div className='flex flex-row justify-between pt-[10px]'>
        <p className='text-18'>{props.title}</p>
        <button onClick={props.toggleDrawer(true)}><img src='/detail_more.svg' /></button>
      </div>
      <div className='flex flex-row justify-between pt-[4px] text-14 text-gray3'>
        <p>{`${dateString}`}</p>
        <div className='flex flex-row items-center'>
          <a href="/"><img src='/detail_views.svg' /></a>
          <p className='ps-[4px]'>{props.views.toLocaleString("en-US")}</p>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center pt-[4px]'>
        {props.userId === null ? <NoUser />
          : <a href={`/user/${props.userId}`} className='flex flex-row items-center gap-[4px]'>
            <img className='w-[24px] h-[24px] rounded-full' src={"/images/profile_pic.png"} />
            <p className='text-14 text-gray3'>{props.userName}</p>
          </a>
        }
        {props.categories !== undefined
          ? <div className='flex flex-row gap-[8px]'>
            {props.categories.map((cate, idx) => (<button className="cate-btn" key={`cate-${idx}`}>{cate}</button>))}
          </div>
          : <></>
        }
      </div>
    </div>
  )
}

interface PostInfoProps {
  opt: string; type?: string; startDate?: any; endDate?: any; maxHeadCount?: number; currentHeadCount?: number;
}
function PostInfo(props: PostInfoProps) {
  return (<>
    {props.opt === 'EVT'
      ? <div className='flex flex-col px-[16px] pt-[30px] text-14' id='p-info'>
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
          <p>{props.maxHeadCount ?? '-'}명</p>
          {props.type === 'PARTY'
            ? <p className="recruit-chip">{`${props.currentHeadCount ?? 0}명 참여 중`}</p>
            : <></>
          }
        </div>
      </div>
      : <div className='flex flex-row px-[16px] pt-[30px] text-14' id='p-info'>
        <p className='font-semibold pe-[8px]'>모집인원</p>
        <p className='pe-[6px]'>{props.maxHeadCount}명</p>
        <p className="recruit-chip">{`${props.currentHeadCount ?? 0}명 참여 중`}</p>
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
      <div className='flex flex-row px-[16px] pt-[6px] text-14' id='p-info'>
        <p className='font-semibold pe-[10px]'>위치</p>
        <p>{props.address}</p>
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
      <div className='flex flex-row gap-[10px] text-gray3 text-14'>
        <button className="flex flex-row items-center gap-[4px]" onClick={props.handleLike}>
          <LikeIcn val={props.liked} />
          <p>{props.likeCount}</p>
        </button>
        <a className="flex flex-row items-center gap-[4px]" href={props.commentURL}>
          <img src='/detail_comment.svg' />
          <p>{props.commentCount}</p>
        </a>
      </div>
      <div className='flex flex-row gap-[10px]'>
        {props.opt === 'EVT' && props.saved !== undefined ? <button onClick={props.handleCalendar}><CalIcn val={props.saved} /></button> : <></>}
        <button onClick={props.handleOpen}><img src='/detail_share.svg' /></button>
      </div>
    </div>
  )
}

function PostDrawer(props: { open: boolean; toggleDrawer: any; }) {
  const handleReport = () => {
    console.log('신고하기');
  }
  return (
    <ThemeProvider theme={commentMenuTheme}>
      <Drawer open={props.open} onClose={props.toggleDrawer(false)} anchor='bottom'>
        <div onClick={props.toggleDrawer(false)}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleReport} disableRipple><ListItemText primary="신고하기" /></ListItemButton>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </ThemeProvider>
  )
}