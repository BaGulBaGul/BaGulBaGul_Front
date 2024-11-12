"use client";
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { fetchFromURL } from '@/service/ApiService';
import { CommentMProps, CommentProps, LoadingSkeleton, Divider } from '@/components/common';
import { RepliedComment, Replies, MemoizedReplyFooter, CommentDrawer, ModifyInputR } from '@/components/pages/comment';
import { useQuery } from '@tanstack/react-query';
import useLoginInfo from '@/hooks/useLoginInfo';
import { originText, useDelete } from '@/hooks/useInCommon';

export function RepliesPage(props: { origin: 'event' | 'event/recruitment'; commentId: any; postId: any; }) {
  // 댓글
  const userinfo = useLoginInfo().data
  let cKey = ['comment', props.commentId];
  let rKey = ['comment', props.commentId, 'replies'];
  let lKey = ['comment', props.commentId, 'liked']
  let apiURL = `/api/${props.origin}/comment/${props.commentId}`
  const comment = useQuery({
    queryKey: cKey,
    queryFn: () => fetchFromURL(apiURL, false, true),
    retry: false
  })

  const router = useRouter()
  if (comment.isError) {
    router.replace(`/${originText(props.origin)}/${props.postId}/comments`)
  }
  const [rCnt, setRCnt] = useState<number>();

  // menu drawer
  const [openD, setOpenD] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => { setOpenD(newOpen); };
  // for modifying
  const [openM, setOpenM] = useState(false);
  const [targetM, setTargetM] = useState<CommentMProps | undefined>();
  let deleteURL = !targetM ? '' : targetM.opt === 'CMT' ? `/api/${props.origin}/comment/${targetM?.commentId}` : `/api/${props.origin}/comment/children/${targetM?.commentId}`
  let dKey = !targetM ? '' : targetM.opt === 'CMT' ? cKey : rKey
  const mutateDelete = useDelete(deleteURL, dKey, '댓글')
  const handleDelete = () => {
    let confirmDelete = confirm("댓글을 삭제하시겠습니까?");
    if (targetM && confirmDelete) { mutateDelete.mutate(); }
  }

  // 멘션 관련 처리
  const [mentioning, setMentioning] = useState(false)
  const [mentionTarget, setMentionTarget] = useState<{ id?: number, name: string } | undefined>(undefined)
  const mentionRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLInputElement>(null);

  // 멘션 대상 설정
  const switchMention = (data: { id?: number, name: string }) => {
    setMentioning(true)
    setMentionTarget(data)
  }
  const handleMention = (data: CommentProps, e: any) => {
    e.stopPropagation();
    // 입력창에 작성 중인 댓글 있는 경우 타겟 임시 저장 후 Dialog
    if ((!mentioning && replyRef && replyRef.current !== null && replyRef.current.value.length > 0)
      || (mentioning && mentionRef && mentionRef.current !== null && mentionRef.current.children.namedItem('mention-highlight') !== null
        && mentionRef.current.innerText.length + 1 > (mentionRef.current.children.namedItem('mention-highlight')?.innerHTML.length ?? 0))) {
      let tmpTarget = { id: data.commentChildId, name: data.userName ?? '' }
      let confirmSwitch = confirm("작성 중이던 댓글을 삭제하고 새로운 댓글을 작성하시겠습니까?");
      if (confirmSwitch) {
        switchMention(tmpTarget)
      }
    } // 없는 경우 바로 멘션 대상 설정 및 변경
    else if (data.commentChildId) { switchMention({ id: data.commentChildId, name: data.userName ?? '' }) }
  }
  useEffect(() => {
    if (mentioning && mentionRef && mentionRef.current) { mentionRef.current.focus() }
  }, [mentionTarget])

  let postUrl = `/${originText(props.origin)}/${props.postId}`
  return (
    <>
      <SubHeaderCnt name='답글' cnt={rCnt ?? ''} url={postUrl} />
      <div className='flex flex-col w-full min-h-[calc(100vh-104px)] pb-[88px] bg-gray1'>
        {comment.isLoading ? <LoadingSkeleton type='CMT' /> : !comment.data || comment.isError ? <></>
          : <RepliedComment origin={props.origin} comment={comment} userinfo={userinfo} lKey={lKey} apiURL={apiURL} setOpenD={setOpenD} setTargetM={setTargetM} />}
        <Divider />
        {!comment.data || comment.isError ? <></>
          : <Replies origin={props.origin} rKey={rKey} apiURL={apiURL} setOpenD={setOpenD} setTargetM={setTargetM} setRCnt={setRCnt} handleMention={handleMention} />}
      </div>
      <MemoizedReplyFooter url={`${apiURL}/children`} qKey={rKey} mentioning={mentioning} setMentioning={setMentioning}
        target={mentionTarget} setMentionTarget={setMentionTarget} mentionRef={mentionRef} replyRef={replyRef} />
      <CommentDrawer open={openD} opt={!!userinfo && !!targetM && userinfo.id === targetM.userId ? 0 : 1}
        toggleDrawer={toggleDrawer} setOpenM={setOpenM} handleDelete={handleDelete} />
      <ModifyInputR open={openM} setOpenM={setOpenM} target={targetM} setTarget={setTargetM} origin={props.origin} qKey={rKey} />
    </>
  );
}