import { usePathname } from "next/navigation";
import { useState } from "react";
import { DetailProps, RDetailProps, Divider } from "../../common";
import { PostFooter } from "../../layout/footer";
import ShareDialog from "./ShareDialog";
import { PostSlide, PostTitle, PostInfo, PostContentMap, PostContentTag, PostTools, PostDrawer } from "./DetailElements";

interface DetailsProps {
  opt: 'EVT' | 'RCT'; data: DetailProps | RDetailProps; liked: boolean; likeCount?: number; handleLike: any; saved: boolean; handleCalendar: any;
}
export const Detail = (props: DetailsProps) => {
  const [popopen, setPopopen] = useState(false);
  const handleOpen = () => { setPopopen(true) }
  const handleClose = () => { setPopopen(false) }

  const [openD, setOpenD] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => { setOpenD(newOpen); };

  const pathname = usePathname();
  let commentURL = `${pathname}/comments`;

  if (props.opt === 'EVT') {
    let data = props.data as DetailProps
    return (
      <>
        <div className={`flex flex-col w-full min-h-screen pt-[104px] ${data.event.type !== 'PARTY' ? 'pb-[77px]' : ''}`}>
          <PostSlide images={data.post.imageUrls} />
          <PostTitle title={data.post.title} startDate={data.event.startDate} endDate={data.event.endDate} type={data.event.type}
            views={data.post.views} userId={data.post.writer.userId} userName={data.post.writer.userName}
            categories={data.event.categories} toggleDrawer={toggleDrawer} />
          <Divider />
          <PostInfo opt='EVT' type={data.event.type} startDate={data.event.startDate} endDate={data.event.endDate}
            maxHeadCount={data.event.maxHeadCount} currentHeadCount={data.event.currentHeadCount} />
          <div className='flex flex-col px-[16px] pt-[30px]' id='p-content'>
            <p className='text-[14px] leading-[140%]'>{props.data.post.content}</p>
          </div>
          <PostContentMap address={data.event.fullLocation} lat={data.event.latitudeLocation} lng={data.event.longitudeLocation} />
          {data.post.tags !== undefined && data.post.tags.length > 0 ? <PostContentTag tags={data.post.tags} /> : <></>}
          <ShareDialog handleClose={handleClose} popopen={popopen} sharingURL={pathname} />
          <PostTools opt='EVT' handleOpen={handleOpen} likeCount={props.likeCount} liked={props.liked} handleLike={props.handleLike}
            commentCount={data.post.commentCount} commentURL={commentURL} saved={props.saved} handleCalendar={props.handleCalendar} />
        </div>
        <PostDrawer open={openD} toggleDrawer={toggleDrawer} />
        { // 페스티벌, 지역행사는 '모집글 보러가기' 버튼 배치
          data.event.type !== 'PARTY' ? <PostFooter title='모집글 보러가기' path={`/event/${data.event.eventId}/recruitment`} /> : <></>
        }
      </>
    )
  } else if (props.opt === 'RCT') {
    let data = props.data as RDetailProps
    return (
      <>
        <div className='flex flex-col w-full min-h-screen pt-[104px] justify-between'>
          <div className='flex flex-col w-full'>
            <PostSlide images={data.post.imageUrls} />
            <PostTitle title={data.post.title} startDate={data.recruitment.startDate} views={data.post.views}
              userId={data.post.writer.userId} userName={data.post.writer.userName} toggleDrawer={toggleDrawer} />
            <Divider />
            <PostInfo opt='RCT' maxHeadCount={data.recruitment.maxHeadCount} currentHeadCount={data.recruitment.currentHeadCount} />
            <div className='pb-[30px]'>
              <div className='flex flex-col px-[16px] pt-[30px]' id='p-content'>
                <p className='text-[14px] leading-[140%]'>{data.post.content}</p>
              </div>
              {data.post.tags !== undefined && data.post.tags.length > 0 ? <PostContentTag tags={data.post.tags} /> : <></>}
            </div>
          </div>
          <ShareDialog handleClose={handleClose} popopen={popopen} sharingURL={pathname} />
          <div>
            <Divider />
            <PostTools opt='RCT' handleOpen={handleOpen} likeCount={props.likeCount} liked={props.liked} handleLike={props.handleLike}
              commentCount={data.post.commentCount} commentURL={commentURL} saved={props.saved} handleCalendar={props.handleCalendar} />
          </div>
        </div>
        <PostDrawer open={openD} toggleDrawer={toggleDrawer} />
      </>
    )
  }

}