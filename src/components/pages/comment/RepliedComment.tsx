import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchFromURL } from '@/service/ApiService';
import { CommentBlock, CommentLikeButton } from '@/components/pages/comment';

interface RepliedCommentProps {
  origin: 'event' | 'event/recruitment'; comment: UseQueryResult<any, Error>; userinfo: any; 
  lKey: any[]; apiURL: string; handleToggle: any;
}
export function RepliedComment({origin, comment, userinfo, lKey, apiURL, handleToggle}: RepliedCommentProps) {
  const { data: liked } = useQuery({
    queryKey: lKey,
    queryFn: () => fetchFromURL(`${apiURL}/ismylike`, true),
    select: data => data.myLike, enabled: !!userinfo && !!comment.data && !comment.isError
  })

  return (
    <>{!!comment.data
      ? <div className='px-[16px] py-[12px] bg-p-white' id='head-cmt'>
        <CommentBlock data={{ ...comment.data, myLike: liked }} disabled={true} handleToggle={(e) => handleToggle(e, comment.data, 'CMT')}
          likeBtn={<CommentLikeButton data={{ ...comment.data, myLike: liked }} apiURL={`/api/${origin}/comment/${comment.data.commentId}/like`} />}
        />
      </div>
      : <></>
    }</>
  )
}