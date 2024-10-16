import { fetchFromURL } from '@/service/ApiService';
import { CommentBlock } from '@/components/pages/comment';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { CommentMProps } from '@/components/common';

interface RepliedCommentProps {
  origin: 'event' | 'event/recruitment'; comment: UseQueryResult<any, Error>; userinfo: any; lKey: any[]; apiURL: string;
  setOpenD: Dispatch<SetStateAction<boolean>>; setTargetM: Dispatch<SetStateAction<CommentMProps | undefined>>;
}
export function RepliedComment(props: RepliedCommentProps) {
  const { data: liked } = useQuery({
    queryKey: props.lKey,
    queryFn: () => fetchFromURL(`${props.apiURL}/ismylike`, true),
    select: data => data.myLike, enabled: !!props.userinfo && !!props.comment.data && !props.comment.isError
  })
  return (
    <>{!!props.comment.data
      ? <div className='px-[16px] py-[12px] bg-p-white' id='head-cmt'>
        <CommentBlock opt='CMT' data={{ ...props.comment.data, myLike: liked }} setOpenD={props.setOpenD}
          setTargetM={props.setTargetM} disabled={true} origin={props.origin} />
      </div>
      : <></>
    }</>
  )
}