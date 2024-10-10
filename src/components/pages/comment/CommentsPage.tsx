"use client";
import { useState } from 'react';
import { fetchFromURLWithPage } from "@/service/ApiService";
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { CommentMProps, CommentProps, MoreButton } from '@/components/common';
import { CommentBlock, CommentDrawer, CommentFooter, ModifyInput } from '@/components/pages/comment';
import { useInfiniteQuery } from '@tanstack/react-query';
import { qKey } from '@/hooks/useInCommon';
import useLoginInfo from '@/hooks/useLoginInfo';
import { useDeleteComment } from '@/hooks/useInComment';

export function CommentsPage(props: { origin: 'event' | 'event/recruitment'; postId: any; }) {
  // menu drawer
  const [openD, setOpenD] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => { setOpenD(newOpen); };

  const [openM, setOpenM] = useState(false);
  const [targetM, setTargetM] = useState<CommentMProps | undefined>();

  const userinfo = useLoginInfo()

  let apiURL = `/api/${props.origin}/${props.postId}/comment?sort=createdAt,desc&size=10`
  const { data: comments, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: [qKey(props.origin), props.postId, 'comments'],
    queryFn: (pageParam) => fetchFromURLWithPage(apiURL, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPageParam >= lastPage.totalPages - 1) { return undefined }
      return lastPageParam + 1
    }
  })
  const handleMore = () => { if (hasNextPage) { fetchNextPage() } }

  const mutateDelete = useDeleteComment(`/api/${props.origin}/comment/${targetM?.commentId}`, [qKey(props.origin), props.postId, 'comments'])
  const handleDelete = () => {
    let confirmDelete = confirm("댓글을 삭제하시겠습니까?");
    if (targetM && confirmDelete) { mutateDelete.mutate() }
  }

  let postUrl = `/${props.origin === 'event' ? 'event' : 'recruitment'}/${props.postId}`
  return (
    <>
      <SubHeaderCnt name='글 댓글' cnt={!!comments ? comments.pages[0].totalElements : ''} url={postUrl} />
      <div className='flex flex-col w-full min-h-[calc(100vh-104px)] pb-[88px] bg-gray1'>
        {!!comments && !comments.pages[0].empty
          ? <>{comments.pages.map((comment, i) => (
            comment.content.map((item: CommentProps, idx: number) => (
              <div key={`cmt-${idx}`} className={idx % 2 == 0 ? 'bg-p-white px-[16px] py-[12px]' : 'bg-gray1 px-[16px] py-[12px]'}>
                <CommentBlock opt='CMT' data={item} setOpenD={setOpenD} setTargetM={setTargetM} origin={props.origin} />
              </div>
            ))
          ))}
            {hasNextPage ? <MoreButton onClick={handleMore} /> : <></>}
          </>
          : <></>
        }
      </div>
      <CommentFooter url={`${props.origin}/${props.postId}`} qKey={[qKey(props.origin), props.postId, 'comments']} />
      <CommentDrawer open={openD} opt={!!userinfo && !!targetM && userinfo.id === targetM.userId ? 0 : 1}
        toggleDrawer={toggleDrawer} setOpenM={setOpenM} handleDelete={handleDelete} />
      <ModifyInput open={openM} setOpenM={setOpenM} target={targetM} setTarget={setTargetM} origin={props.origin} qKey={[qKey(props.origin), props.postId, 'comments']} />
    </>
  );
}