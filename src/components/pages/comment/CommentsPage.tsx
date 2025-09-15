"use client";
import { useState } from 'react';
import { originText, useDelete, useListWithPage } from '@/hooks/useInCommon';
import useLoginInfo from '@/hooks/useLoginInfo';
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { CommentMProps, CommentProps, SkeletonComments, ListWrapper, ReportDialog, BottomDrawer, BottomDrawerBody } from '@/components/common';
import { CommentBlock, CommentFooter, ModifyInput, CommentLikeButton } from '@/components/pages/comment';

export function CommentsPage({origin, postId}: { origin: 'event' | 'event/recruitment'; postId: any; }) {
  // flag for bottom drawer, report dialog
  const [openD, setOpenD] = useState(false);
  const [openR, setOpenR] = useState(false);
  // 수정창
  const [openM, setOpenM] = useState(false);
  const [targetM, setTargetM] = useState<CommentMProps | undefined>();

  const userinfo = useLoginInfo().data

  let apiURL = `/api/${origin}/${postId}/comment?sort=createdAt,desc&size=10`
  let qKey = [originText(origin), postId, 'comments']
  const comments = useListWithPage(apiURL, qKey)

  const mutateDelete = useDelete(`/api/${origin}/comment/${targetM?.commentId}`, qKey, '댓글')
  const handleDelete = () => {
    let confirmDelete = confirm("댓글을 삭제하시겠습니까?");
    if (targetM && confirmDelete) { setOpenD(false); mutateDelete.mutate() }
  }

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>, value: any) => {
    e.stopPropagation();
    setOpenD(true)
    setTargetM({
      commentId: value.commentId ?? value.commentChildId, content: value.content, userId: value.userId,
      replyTargetUserName: value.replyTargetUserName, opt: 'CMT'
    })
  }

  let postUrl = `/${originText(origin)}/${postId}`
  return (
    <>
      <SubHeaderCnt name='글 댓글' cnt={!!comments.data ? comments.data.pages[0].totalElements : ''} url={postUrl} />
      <div className='flex flex-col w-full min-h-[calc(100vh-104px)] pb-[88px] bg-gray1'>
        <ListWrapper res={comments} skeleton={<SkeletonComments />}
          nodata={<></>}>
          {comments.data?.pages.map((comment, i) => (
            comment.content.map((item: CommentProps, idx: number) => (
              <div key={`cmt-${idx}`} className={idx % 2 == 0 ? 'bg-p-white px-[16px] py-[12px]' : 'bg-gray1 px-[16px] py-[12px]'}>
                <CommentBlock data={item} handleToggle={handleToggle}
                  likeBtn={<CommentLikeButton data={item} apiURL={`/api/${origin}/comment/${item.commentId}/like`} />} />
              </div>
            ))
          ))}
        </ListWrapper>
      </div>
      <CommentFooter url={`${origin}/${postId}`} qKey={qKey} isLogin={!!userinfo} />
      <BottomDrawer open={openD} toggleOpen={(open) => { setOpenD(open) }}>
        {!!userinfo && !!targetM && userinfo.id === targetM.userId
          ? <BottomDrawerBody me={true} handleDelete={handleDelete} handleEdit={() => { setOpenM(true); setOpenD(false); }} />
          : <BottomDrawerBody me={false} handleReport={() => { setOpenR(true); setOpenD(false); }} />
        }
      </BottomDrawer>
      <ReportDialog open={openR} toggleOpen={(open) => { setOpenR(open); }} type={'comment'} target={targetM?.commentId} />
      <ModifyInput open={openM} setOpenM={setOpenM} target={targetM} setTarget={setTargetM} origin={origin} qKey={qKey} />
    </>
  );
}