"use client";
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { fetchFromURL, fetchFromURLWithPage } from '@/service/ApiService';
import { CommentMProps, CommentProps, LoadingSkeleton, Divider, MoreButton } from '@/components/common';
import { MemoizedReplyFooter, CommentBlock, CommentDrawer, ModifyInputR } from '@/components/pages/comment';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import useLoginInfo from '@/hooks/useLoginInfo';
import { useDeleteComment } from '@/hooks/useInComment';


export function RepliesPage(props: { origin: 'event' | 'event/recruitment'; commentId: any; postId: any; }) {
  // menu drawer
  const [openD, setOpenD] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => { setOpenD(newOpen); };

  const [openM, setOpenM] = useState(false);
  const [targetM, setTargetM] = useState<CommentMProps | undefined>();

  // 댓글 / 좋아요여부
  const userinfo = useLoginInfo()
  const { data: comment, isLoading: isLoadingC, isError: isErrorC } = useQuery({
    queryKey: ['comment', props.commentId],
    queryFn: () => fetchFromURL(`/api/${props.origin}/comment/${props.commentId}`, false, true),
    retry: false
  })
  console.log('isErrorC:', isErrorC)
  const router = useRouter()
  if (isErrorC) {
    let urlRoot = props.origin === 'event' ? 'event' : 'recruitment'
    router.replace(`/${urlRoot}/${props.postId}/comments`)
  }
  const { data: liked, isLoading: isLoadingL, isError: isErrorL } = useQuery({
    queryKey: ['comment', props.commentId, 'liked'],
    queryFn: () => fetchFromURL(`/api/${props.origin}/comment/${props.commentId}/ismylike`, true),
    select: data => data.myLike, enabled: !!userinfo && !!comment && !isErrorC
  })
  // 답글
  const { data: replies, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ['comment', props.commentId, 'replies'],
    queryFn: (pageParam) => fetchFromURLWithPage(`/api/${props.origin}/comment/${props.commentId}/children?sort=createdAt,desc&size=10`, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPageParam >= lastPage.totalPages - 1) { return undefined }
      return lastPageParam + 1
    }, enabled: !!comment && !isErrorC
  })
  const handleMore = () => { if (hasNextPage) { fetchNextPage() } }

  console.log('targetM: ', targetM)
  let apiURL = !targetM ? '' : targetM.opt === 'CMT' ? `/api/${props.origin}/comment/${targetM?.commentId}` : `/api/${props.origin}/comment/children/${targetM?.commentId}`
  let dKey = !targetM ? '' : targetM.opt === 'CMT' ? ['comment', props.commentId] : ['comment', props.commentId, 'replies']
  const mutateDelete = useDeleteComment(apiURL, dKey)
  const handleDelete = () => {
    let confirmDelete = confirm("댓글을 삭제하시겠습니까?");
    if (targetM && confirmDelete) { mutateDelete.mutate(); }//setTargetM(undefined)
  }

  // 멘션 관련 처리
  const [mentioning, setMentioning] = useState(false)
  const [mentionTarget, setMentionTarget] = useState<{ id: number, name: string } | undefined>(undefined)
  const [tmpTarget, setTmpTarget] = useState<{ id: number, name: string } | undefined>(undefined)  // Dialog 오픈 시 타겟값 임시 저장
  const mentionRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLInputElement>(null);

  // 멘션 대상 설정
  const switchMention = (data: { id: number, name: string }) => {
    setMentioning(true)
    setMentionTarget(data)
    setTmpTarget(undefined)
  }
  const handleMention = (data: CommentProps, e: any) => {
    e.stopPropagation();
    // 입력창에 작성 중인 댓글 있는 경우 타겟 임시 저장 후 Dialog
    if ((!mentioning && replyRef && replyRef.current !== null && replyRef.current.value.length > 0)
      || (mentioning && mentionRef && mentionRef.current !== null && mentionRef.current.children.namedItem('mention-highlight') !== null
        && mentionRef.current.innerText.length + 1 > (mentionRef.current.children.namedItem('mention-highlight')?.innerHTML.length ?? 0))) {
      setTmpTarget({ id: data.userId, name: data.userName ?? '' })
      let confirmSwitch = confirm("작성 중이던 댓글을 삭제하고 새로운 댓글을 작성하시겠습니까?");
      if (tmpTarget !== undefined && confirmSwitch) {
        switchMention(tmpTarget)
      }
    } // 없는 경우 바로 멘션 대상 설정 및 변경
    else if (data.commentChildId) { switchMention({ id: data.commentChildId, name: data.userName ?? '' }) }
  }

  useEffect(() => {
    if (mentioning && mentionRef && mentionRef.current) { mentionRef.current.focus() }
  }, [mentionTarget])


  let postUrl = `/${props.origin === 'event' ? 'event' : 'recruitment'}/${props.postId}`
  return (
    <>
      <SubHeaderCnt name='답글' cnt={!!replies ? replies.pages[0].totalElements : ''} url={postUrl} />
      {!isLoadingC && !!comment && !isLoadingL
        ? <div className='flex flex-col w-full min-h-[calc(100vh-104px)] pb-[88px] bg-gray1'>
          <div className='px-[16px] py-[12px] mb-[2px] bg-p-white' id='head-cmt'>
            <CommentBlock opt='CMT' data={{ ...comment, myLike: liked }} setOpenD={setOpenD} setTargetM={setTargetM} disabled={true} origin={props.origin} />
          </div>
          {!!replies && !replies.pages[0].empty
            ? <div className='flex flex-col w-full'>
              {replies.pages.map((reply) => (
                reply.content.map((item: CommentProps, idx: number) => (
                  <div className={idx % 2 == 0 ? 'bg-p-white ps-[48px] pe-[16px] py-[12px]' : 'bg-gray1 ps-[48px] pe-[16px] py-[12px]'} key={`reply-${idx}`} id={`reply-${idx}`} >
                    <CommentBlock opt="RPL" data={item} key={`cmt-${idx}`} setOpenD={setOpenD} setTargetM={setTargetM} handleMention={handleMention} origin={props.origin} />
                  </div>
                ))
              ))}
              {hasNextPage ? <MoreButton onClick={handleMore} /> : <></>}
            </div>
            : <></>
          }
        </div>
        : <div className='flex flex-col gap-[2px]'>
          <LoadingSkeleton type='CMT' />
          <Divider />
          <LoadingSkeleton type='RPL' />
        </div>
      }
      <MemoizedReplyFooter url={`/api/${props.origin}/comment/${props.commentId}/children`} qKey={['comment', props.commentId, 'replies']}
        mentioning={mentioning} setMentioning={setMentioning} target={mentionTarget} mentionRef={mentionRef} replyRef={replyRef} />
      <CommentDrawer open={openD} opt={!!userinfo && !!targetM && userinfo.id === targetM.userId ? 0 : 1}
        toggleDrawer={toggleDrawer} setOpenM={setOpenM} handleDelete={handleDelete} />
      <ModifyInputR open={openM} setOpenM={setOpenM} target={targetM} setTarget={setTargetM} origin={props.origin} qKey={['comment', props.commentId, 'replies']} />
    </>
  );
}