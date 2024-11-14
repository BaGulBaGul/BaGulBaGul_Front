import { useEffect, useState } from "react";
import { ArrowNext, ArrowPrev } from "../../common/Arrow";
import { Drawer, List, ListItem, ListItemButton, ListItemText, ThemeProvider } from "@mui/material";
import { menuTheme } from "../../common/styles/Themes";
import Slider from "react-slick";
import { postData } from "../../common/Data";
import { FormatDateRange } from "@/service/Functions";
import { HashtagButton, UserProfile } from "../../common";
import { LikeIcn, CalIcn, VerticalMoreIcn } from "../../common/styles/Icon";
import dayjs from "dayjs";
import Link from "next/link";
import { ReportDialog } from "@/components/common/report/ReportDialog";

export function PostSlide(props: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const settings = {
    className: "center", infinite: true, slidesToShow: 1, slidesToScroll: 1,
    nextArrow: <ArrowNext cN='slick-next-detail' />, prevArrow: <ArrowPrev cN='slick-prev-detail' />,
    beforeChange: (current: any, next: any) => { setIndex(next); },
  }
  if (props.images.length > 0) {
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
  } else {
    return (<img className='h-[280px] object-cover' src='/default_detail_thumb3x.png' />)
  }
}

interface PostTitleProps {
  title: string; startDate: any; endDate?: any; type?: string; views: number;
  userId: number; userName: string; categories?: string[]; toggleDrawer: any;
}
export function PostTitle(props: PostTitleProps) {
  const dateString = props.type !== undefined && props.type !== 'PARTY' ? FormatDateRange(props.startDate, props.endDate) : dayjs(props.startDate).format('YY.MM.DD')
  return (
    <div className='flex flex-col px-[16px] py-[20px]'>
      <div className='flex flex-row justify-between pt-[10px]'>
        <p className='text-18'>{props.title}</p>
        <button onClick={props.toggleDrawer(true)}><VerticalMoreIcn opt='DTL' /></button>
      </div>
      <div className='flex flex-row justify-between pt-[4px] text-14 text-gray3'>
        <p>{`${dateString}`}</p>
        <div className='flex flex-row items-center'>
          <ViewIcn />
          <p className='ps-[4px]'>{props.views.toLocaleString("en-US")}</p>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center pt-[4px]'>
        <UserProfile userId={props.userId} userName={props.userName} userProfileImageUrl={"/images/profile_pic.png"} color='gray3' />
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
  opt: 'EVT' | 'RCT'; type?: string; startDate?: any; endDate?: any; maxHeadCount?: number; currentHeadCount?: number;
}
export function PostInfo(props: PostInfoProps) {
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

export function PostContentTag(props: { tags: string[] }) {
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

export function PostContentMap(props: { address: string; lat: number; lng: number; }) {
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
  opt: 'EVT' | 'RCT'; handleOpen: any; likeCount?: number; liked: boolean; handleLike: any;
  commentCount: number; commentURL: string; saved: boolean; handleCalendar: any;
}
export function PostTools(props: PostToolsProps) {
  return (
    <div className='flex flex-row justify-between py-[30px] px-[16px]'>
      <div className='flex flex-row gap-[10px] text-gray3 text-14'>
        <button className="flex flex-row items-center gap-[4px]" onClick={props.handleLike}>
          <LikeIcn val={props.liked} />
          <p>{props.likeCount}</p>
        </button>
        <Link className="flex flex-row items-center gap-[4px]" href={props.commentURL}>
          <CmtIcn />
          <p>{props.commentCount}</p>
        </Link>
      </div>
      <div className='flex flex-row gap-[10px]'>
        {/* {props.opt === 'EVT' && props.saved !== undefined ? <button onClick={props.handleCalendar}><CalIcn val={props.saved} /></button> : <></>} */}
        <button onClick={props.handleCalendar}><CalIcn val={props.saved} /></button>
        <button onClick={props.handleOpen}><ShareIcn /></button>
      </div>
    </div>
  )
}

export function PostDrawer(props: { open: boolean; toggleDrawer: any; opt: 'EVT' | 'RCT'; target: number; }) {
  const [openD, setOpenD] = useState(false);
  const handleReport = () => { setOpenD(true); }
  return (
    <>
      <ThemeProvider theme={menuTheme}>
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
      <ReportDialog open={openD} setOpen={setOpenD} type={props.opt === 'EVT' ? 'event' : 'recruitment'} target={props.target} />
    </>
  )
}

const ViewIcn = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.643 8.48295C15.7386 4.47112 12.8598 2.45215 9.0006 2.45215C5.13944 2.45215 2.26266 4.47112 0.358194 8.48496C0.281805 8.64671 0.242188 8.82338 0.242188 9.00226C0.242188 9.18114 0.281805 9.35781 0.358194 9.51956C2.26266 13.5314 5.14145 15.5504 9.0006 15.5504C12.8618 15.5504 15.7386 13.5314 17.643 9.51755C17.7977 9.1921 17.7977 8.81443 17.643 8.48295ZM9.0006 14.1039C5.7602 14.1039 3.38766 12.4606 1.71422 9.00126C3.38766 5.54188 5.7602 3.89858 9.0006 3.89858C12.241 3.89858 14.6136 5.54188 16.287 9.00126C14.6156 12.4606 12.243 14.1039 9.0006 14.1039ZM8.92025 5.46554C6.96757 5.46554 5.38453 7.04858 5.38453 9.00126C5.38453 10.9539 6.96757 12.537 8.92025 12.537C10.8729 12.537 12.456 10.9539 12.456 9.00126C12.456 7.04858 10.8729 5.46554 8.92025 5.46554ZM8.92025 11.2513C7.67672 11.2513 6.67025 10.2448 6.67025 9.00126C6.67025 7.75773 7.67672 6.75126 8.92025 6.75126C10.1638 6.75126 11.1702 7.75773 11.1702 9.00126C11.1702 10.2448 10.1638 11.2513 8.92025 11.2513Z" fill="#6C6C6C" />
  </svg>
)

const ShareIcn = () => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.5859 16.6884C17.8259 16.6884 17.1459 16.9884 16.6259 17.4584L9.49594 13.3084C9.54594 13.0784 9.58594 12.8484 9.58594 12.6084C9.58594 12.3684 9.54594 12.1384 9.49594 11.9084L16.5459 7.7984C17.0859 8.2984 17.7959 8.6084 18.5859 8.6084C20.2459 8.6084 21.5859 7.2684 21.5859 5.6084C21.5859 3.9484 20.2459 2.6084 18.5859 2.6084C16.9259 2.6084 15.5859 3.9484 15.5859 5.6084C15.5859 5.8484 15.6259 6.0784 15.6759 6.3084L8.62594 10.4184C8.08594 9.9184 7.37594 9.6084 6.58594 9.6084C4.92594 9.6084 3.58594 10.9484 3.58594 12.6084C3.58594 14.2684 4.92594 15.6084 6.58594 15.6084C7.37594 15.6084 8.08594 15.2984 8.62594 14.7984L15.7459 18.9584C15.6959 19.1684 15.6659 19.3884 15.6659 19.6084C15.6659 21.2184 16.9759 22.5284 18.5859 22.5284C20.1959 22.5284 21.5059 21.2184 21.5059 19.6084C21.5059 17.9984 20.1959 16.6884 18.5859 16.6884ZM18.5859 4.6084C19.1359 4.6084 19.5859 5.0584 19.5859 5.6084C19.5859 6.1584 19.1359 6.6084 18.5859 6.6084C18.0359 6.6084 17.5859 6.1584 17.5859 5.6084C17.5859 5.0584 18.0359 4.6084 18.5859 4.6084ZM6.58594 13.6084C6.03594 13.6084 5.58594 13.1584 5.58594 12.6084C5.58594 12.0584 6.03594 11.6084 6.58594 11.6084C7.13594 11.6084 7.58594 12.0584 7.58594 12.6084C7.58594 13.1584 7.13594 13.6084 6.58594 13.6084ZM18.5859 20.6284C18.0359 20.6284 17.5859 20.1784 17.5859 19.6284C17.5859 19.0784 18.0359 18.6284 18.5859 18.6284C19.1359 18.6284 19.5859 19.0784 19.5859 19.6284C19.5859 20.1784 19.1359 20.6284 18.5859 20.6284Z" fill="#1E1E1E" />
  </svg>
)

const CmtIcn = () => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.5859 2.6084H4.58594C3.48594 2.6084 2.58594 3.5084 2.58594 4.6084V22.6084L6.58594 18.6084H20.5859C21.6859 18.6084 22.5859 17.7084 22.5859 16.6084V4.6084C22.5859 3.5084 21.6859 2.6084 20.5859 2.6084ZM20.5859 16.6084H5.75594L4.58594 17.7784V4.6084H20.5859V16.6084ZM7.58594 9.6084H9.58594V11.6084H7.58594V9.6084ZM15.5859 9.6084H17.5859V11.6084H15.5859V9.6084ZM11.5859 9.6084H13.5859V11.6084H11.5859V9.6084Z" fill="#1E1E1E" />
  </svg>
)