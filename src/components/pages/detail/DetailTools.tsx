import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAddLike, useAddSave, useDetailLike, useDetailSave } from '@/hooks/useInDetail';
import { CalIcn, LikeIcn } from "@/components/common/styles/Icon";
import { ShareDialog } from ".";

interface ToolProps {
  origin: 'event' | 'event/recruitment'; postId: any; userinfo?: any;
  commentCount: number; likeCount: number;
}
export function DetailTools({ origin, postId, userinfo, commentCount, likeCount }: ToolProps) {
  const [popopen, setPopopen] = useState(false);
  const pathname = usePathname();
  let commentURL = `${pathname}/comments`;
  // * mutation component 안에 둬도 되는지 확인
  const { data: liked } = useDetailLike(origin, postId, userinfo)
  const { data: saved } = useDetailSave(origin, postId, userinfo)
  const mutateLike = useAddLike(origin, postId, liked)
  const handleLike = () => { if (!!userinfo) { mutateLike.mutate() } }
  const mutateSave = useAddSave(origin, postId, saved)
  const handleCalendar = () => { if (!!userinfo) { mutateSave.mutate() } }

  return (
    <>
      <div className="flex flex-row justify-between p-[16px]">
        <div className="flex flex-row gap-[10px] text-14 text-gray3">
          <button className="flex flex-row items-center gap-[4px]" onClick={handleLike}>
            <LikeIcn val={!!liked} /><p>{likeCount}</p>
          </button>
          <Link className="flex flex-row items-center gap-[4px]" href={commentURL}>
            <CmtIcn /><p>{commentCount}</p>
          </Link>
        </div>
        <div className="flex flex-row gap-[10px]">
          <button onClick={handleCalendar}><CalIcn val={saved} /></button>
          <button onClick={() => setPopopen(true)}><ShareIcn /></button>
        </div>
      </div>
      <ShareDialog handleClose={() => setPopopen(false)} popopen={popopen} sharingURL={pathname} />
    </>
  )
}

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