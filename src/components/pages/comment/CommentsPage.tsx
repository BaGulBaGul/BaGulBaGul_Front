"use client";
import { useState } from 'react';
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { CommentMProps, CommentProps, MoreButton, AlertDialog } from '@/components/common';
import { CommentBlock, CommentDrawer, CommentFooter, ModifyInput } from '@/components/pages/comment';
import { handleMore, originText, useDelete, useListWithPage } from '@/hooks/useInCommon';
import useLoginInfo from '@/hooks/useLoginInfo';

export function CommentsPage(props: { origin: 'event' | 'event/recruitment'; postId: any; }) {
  // menu drawer
  const [openD, setOpenD] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => { setOpenD(newOpen); };
  // 수정창
  const [openM, setOpenM] = useState(false);
  const [targetM, setTargetM] = useState<CommentMProps | undefined>();
  // 로그인 안내창
  const [openA, setOpenA] = useState(false);

  const userinfo = useLoginInfo().data

  let apiURL = `/api/${props.origin}/${props.postId}/comment?sort=createdAt,desc&size=10`
  let qKey = [originText(props.origin), props.postId, 'comments']
  const { data: comments, fetchNextPage, hasNextPage, status } = useListWithPage(apiURL, qKey)

  const mutateDelete = useDelete(`/api/${props.origin}/comment/${targetM?.commentId}`, qKey, '댓글')
  const handleDelete = () => {
    let confirmDelete = confirm("댓글을 삭제하시겠습니까?");
    if (targetM && confirmDelete) { mutateDelete.mutate() }
  }

  let postUrl = `/${originText(props.origin)}/${props.postId}`
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
            {hasNextPage ? <MoreButton onClick={() => handleMore(hasNextPage, fetchNextPage)} /> : <></>}
          </>
          : <></>
        }
      </div>
      <CommentFooter url={`${props.origin}/${props.postId}`} qKey={qKey} isLogin={!!userinfo} setOpenA={setOpenA} />
      <CommentDrawer open={openD} opt={!!userinfo && !!targetM && userinfo.id === targetM.userId ? 0 : 1} target={targetM}
        toggleDrawer={toggleDrawer} setOpenM={setOpenM} handleDelete={handleDelete} />
      <ModifyInput open={openM} setOpenM={setOpenM} target={targetM} setTarget={setTargetM} origin={props.origin} qKey={qKey} />
      <AlertDialog open={openA} setOpen={setOpenA} headerText='잠깐! 로그인이 필요해요' contextText={['함께 소통하려면 로그인해 주세요.', '금방 끝나요!']}
        buttonText1='닫기' buttonText2='로그인 하러가기' buttonLink='/signin' />
    </>
  );
}