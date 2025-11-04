import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { IconMore } from "@/components/common/styles/Icon";
import { CommentProps } from "@/components/common";
import { UserProfile } from "@/components/common/block";

interface Props {
  data: CommentProps; disabled?: boolean; handleToggle: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: any) => void; likeBtn: ReactNode;
}
export function CommentBlock({ data, disabled, handleToggle, likeBtn }: Props) {
  const router = useRouter()
  return (
    <>
      <div className='flex flex-row justify-between pb-[10px] text-black' id='comment-head'>
        <UserProfile userId={data.userId} userName={data.username} userProfileImageUrl={data.userProfileImageUrl} gap='8px' />
        <button onClick={(e) => handleToggle(e, data)}><IconMore /></button>
      </div>
      <div className='text-14 text-gray3 pb-[6px]' id='comment-body'>{data.content}</div>
      <div className='flex flex-row text-12 text-gray3 pb-[8px]' id='comment-datetime'>
        <p className='pe-[6px]'>{dayjs(data.createdAt).format('YY.MM.DD')}</p><p>{dayjs(data.createdAt).format('HH:mm')}</p>
      </div>
      <div className='flex flex-row justify-between items-center' id='comment-foot'>
        <button onClick={() => { if (!disabled) { router.push(`comments/${data.commentId}`) } }}
          className={'reply-btn' + (!!data.commentChildCount ? ' border-primary-blue text-primary-blue' : '')}>
          <p>답글</p>{!!data.commentChildCount && <p>{data.commentChildCount}</p>}
        </button>
        {likeBtn}
      </div>
    </>
  )
}