import { ReactNode } from "react";
import dayjs from "dayjs";
import { VerticalMoreIcn } from "@/components/common/styles/Icon";
import { CommentProps } from "@/components/common";
import { UserProfile } from "@/components/common/block";

interface Props {
  data: CommentProps; handleMention?: any; handleToggle: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: any) => void; likeBtn: ReactNode;
}
export function ReplyBlock({data, handleMention, handleToggle, likeBtn}: Props) {
  return (
    <div>
      <div onClick={(e) => { handleMention(data, e) }}>
        <div className='flex flex-row justify-between pb-[10px]' id='comment-head'>
          <UserProfile userId={data.userId} userName={data.userName} userProfileImageUrl={data.userProfileImageUrl} gap='8px' />
          <button onClick={(e) => handleToggle(e, data)}><VerticalMoreIcn /></button>
        </div>
        <div className='text-14 text-gray3 pb-[6px]' id='comment-body'>
          {data.replyTargetUserName
            ? <>
              <span className="text-primary-blue">@{data.replyTargetUserName} </span>
              <span>{
                data.content.startsWith('@') && data.content.slice(1, data.replyTargetUserName.length + 1) === data.replyTargetUserName
                  ? data.content.slice(data.replyTargetUserName.length + 1)
                  : data.content
              }</span>
            </>
            : <span>{data.content}</span>
          }
        </div>
      </div>
      <div className='flex flex-row justify-between items-center' id='comment-foot'>
        <div className='flex flex-row text-12 text-gray3' id='comment-datetime'>
          <p className='pe-[6px]'>{dayjs(data.createdAt).format('YY.MM.DD')}</p><p>{dayjs(data.createdAt).format('HH:mm')}</p>
        </div>
        {likeBtn}
      </div>
    </div>
  )
}