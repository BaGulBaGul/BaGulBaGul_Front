import { useState, useEffect } from "react";
import { applyLike } from "@/service/Functions";
import { IconSmile } from "@/components/common/styles/Icon";
import { CommentProps } from "@/components/common";

export function CommentLikeButton({ data, apiURL }: { data: CommentProps; apiURL: string; }) {
  const [liked, setLiked] = useState(data.myLike ?? false)
  const [likeCount, setLikeCount] = useState<number>(data.likeCount ?? undefined)
  useEffect(() => {
    if (liked !== data.myLike) { setLiked(data.myLike) }
    if (likeCount !== data.likeCount) { setLikeCount(data.likeCount) }
  }, [data])

  return (
    <div className='flex flex-row items-center gap-[2px]' id='comment-likes'>
      <button className="h-[24px] w-[24px]" onClick={() => applyLike(true, liked, apiURL, setLiked, setLikeCount)}>
        <IconSmile checked={liked} />
      </button>
      {likeCount > 0 ? <p className='text-12 text-gray3'>{likeCount}</p> : <></>}
    </div>
  )
}