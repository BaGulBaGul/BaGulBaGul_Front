import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAddLike, useAddSave, useDetailLike, useDetailSave } from '@/hooks/useInDetail';
import { IconComment, IconCalendar, IconHeart } from "@/components/common/styles/Icon";
import { ShareDialog } from ".";

interface ToolProps {
  origin: 'event' | 'event/recruitment'; postId: any; userinfo?: any;
  commentCount: number; likeCount: number;
}
export function DetailTools({ origin, postId, userinfo, commentCount, likeCount }: ToolProps) {
  const pathname = usePathname();
  let commentURL = `${pathname}/comments`;

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
            <IconHeart checked={!!liked} /><p>{likeCount}</p>
          </button>
          <Link className="flex flex-row items-center gap-[4px]" href={commentURL}>
            <span className="text-black active:text-primary-blue"><IconComment /></span>
            <p>{commentCount}</p>
          </Link>
        </div>
        <div className="flex flex-row gap-[10px]">
          <button onClick={handleCalendar}><IconCalendar checked={saved} /></button>
          <ShareDialog sharingURL={pathname} />
        </div>
      </div>
    </>
  )
}