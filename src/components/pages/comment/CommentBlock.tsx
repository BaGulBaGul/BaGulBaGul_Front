import { Checkbox } from "@mui/material";
import { useState, MouseEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { applyLike } from "@/service/Functions";
import { CmtLikeIcn, VerticalMoreIcn } from "@/components/common/styles/Icon";
import { CommentProps } from "@/components/common";
import { UserProfile } from "@/components/common/block";

const handleToggle = (e: MouseEvent, setOpenD: any, setTargetM: any, value: any) => {
  e.stopPropagation();
  console.log('handleToggle: ', value)
  setOpenD(true)
  setTargetM(value)
}

interface CommentBlockProps {
  opt: 'CMT' | 'RPL'; data: CommentProps; setOpenD: any; setTargetM: any; handleMention?: any; disabled?: boolean;
  origin: 'event' | 'event/recruitment';
}
export function CommentBlock(props: CommentBlockProps) {
  const router = useRouter()
  const [liked, setLiked] = useState(props.data.myLike ?? false)
  const [likeCount, setLikeCount] = useState<number>(props.data.likeCount ?? undefined)
  useEffect(() => {
    if (liked !== props.data.myLike) { setLiked(props.data.myLike) }
    if (likeCount !== props.data.likeCount) { setLikeCount(props.data.likeCount) }
  }, [props.data])

  let apiURL = props.opt === 'CMT' ? `/api/${props.origin}/comment/${props.data.commentId}/like`
    : `/api/${props.origin}/comment/children/${props.data.commentChildId}/like`
  const toggleValue = {
    commentId: props.data.commentId ?? props.data.commentChildId, content: props.data.content, userId: props.data.userId,
    replyTargetUserName: props.data.replyTargetUserName, opt: props.opt
  }

  return (
    <div>
      {props.opt === 'CMT'
        ? <>
          <div className='flex flex-row justify-between pb-[10px]' id='comment-head'>
            <UserProfile userId={props.data.userId} userName={props.data.username} userProfileImageUrl={props.data.userProfileImageUrl} gap='8px' />
            <button onClick={(e) => handleToggle(e, props.setOpenD, props.setTargetM, toggleValue)}><VerticalMoreIcn opt='CMT' /></button>
          </div>
          <div className='text-14 text-gray3 pb-[6px]' id='comment-body'>{props.data.content}</div>
          <div className='flex flex-row text-12 text-gray3 pb-[8px]' id='comment-datetime'>
            <p className='pe-[6px]'>{dayjs(props.data.createdAt).format('YY.MM.DD')}</p><p>{dayjs(props.data.createdAt).format('HH:mm')}</p>
          </div>
        </>
        : <div onClick={(e) => { props.handleMention(props.data, e) }}>
          <div className='flex flex-row justify-between pb-[10px]' id='comment-head'>
            <UserProfile userId={props.data.userId} userName={props.data.userName} userProfileImageUrl={props.data.userProfileImageUrl} gap='8px' />
            <button onClick={(e) => handleToggle(e, props.setOpenD, props.setTargetM, toggleValue)}><VerticalMoreIcn opt='CMT' /></button>
          </div>
          <div className='text-14 text-gray3 pb-[6px]' id='comment-body'>
            {props.data.replyTargetUserName
              ? <>
                <span className="text-primary-blue">@{props.data.replyTargetUserName} </span>
                <span>{
                  props.data.content.startsWith('@') && props.data.content.slice(1, props.data.replyTargetUserName.length + 1) === props.data.replyTargetUserName
                    ? props.data.content.slice(props.data.replyTargetUserName.length + 1)
                    : props.data.content
                }</span>
              </>
              : <span>{props.data.content}</span>
            }
          </div>
        </div>
      }
      <div className='flex flex-row justify-between items-center' id='comment-foot'>
        {props.opt === 'CMT'
          ? <>
            {props.data.commentChildCount && props.data.commentChildCount > 0
              ? <button onClick={() => { if (!props.disabled) { router.push(`comments/${props.data.commentId}`) } }} className='reply-btn border-primary-blue text-primary-blue'>
                <p>답글</p><p>{props.data.commentChildCount}</p>
              </button>
              : <button onClick={() => { if (!props.disabled) { router.push(`comments/${props.data.commentId}`) } }} className='reply-btn'>답글</button>
            }
          </>
          : <div className='flex flex-row text-12 text-gray3' id='comment-datetime'>
            <p className='pe-[6px]'>{dayjs(props.data.createdAt).format('YY.MM.DD')}</p><p>{dayjs(props.data.createdAt).format('HH:mm')}</p>
          </div>
        }
        <div className='flex flex-row items-center gap-[2px]' id='comment-likes'>
          <Checkbox icon={<CmtLikeIcn val={false} />} checkedIcon={<CmtLikeIcn val={true} />} checked={liked}
            onChange={() => applyLike(true, liked, apiURL, setLiked, setLikeCount)}
            // onChange={handleLike}
            disableRipple className='p-0' />
          {likeCount > 0 ? <p className='text-12 text-gray3'>{likeCount}</p> : <></>}
        </div>
      </div>
    </div>
  )
}