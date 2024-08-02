"use client";
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, } from 'next/navigation';
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { call } from '@/service/ApiService';
import { CommentMProps, CommentProps, LoadingSkeleton, Divider } from '@/components/common';
import { Replies, MemoizedReplyFooter, CommentBlock, CommentDrawer, ModifyInputR } from '@/components/pages/comment';

export default function Page() {
  const [count, setCount] = useState(0);
  const [isLoadingC, setLoadingC] = useState(true)
  const [isLoadingR, setLoadingR] = useState(true)
  // menu drawer
  // 0: closed 1: for comment 2: for reply
  const [openD, setOpenD] = useState(0);
  const toggleDrawer = (newOpen: number) => () => { setOpenD(newOpen); };

  const [openM, setOpenM] = useState(false);
  const [targetM, setTargetM] = useState<CommentMProps | undefined>();

  const params = useParams()
  const router = useRouter()

  // 코멘트
  const [comment, setComment] = useState<CommentProps>()
  useEffect(() => {
    if (isLoadingC) {
      let apiURL = `/api/post/comment/${params.postCommentId}`;
      console.log("###", apiURL)
      call(apiURL, "GET", null)
        .then((response) => {
          if (response.data !== null) {
            console.log(response);
            setComment(response.data);
            setLoadingC(false)
          } else {
            router.replace(`/comment/${params.postId}`)
          }
        })
    }
  }, [isLoadingC])
  // 멘션 관련 처리
  const [mentioning, setMentioning] = useState(false)
  const [mentionTarget, setMentionTarget] = useState<{ id: number, name: string } | undefined>(undefined)
  const [tmpTarget, setTmpTarget] = useState<{ id: number, name: string } | undefined>(undefined)  // Dialog 오픈 시 타겟값 임시 저장
  const mentionRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLInputElement>(null);

  // const handleClose = () => { setOpen(false); };
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

  const [tmp, setTmp] = useState<any[]>([])
  const [tmpP, setTmpP] = useState<number>();

  const handleDelete = () => { // * 삭제되는게 코멘트인 경우 어떻게 처리할지??
    let confirmDelete = confirm("댓글을 삭제하시겠습니까?");
    if (targetM && confirmDelete) {
      let apiURL = openD > 1 ? `/api/post/comment/children/${targetM.postCommentId}` : `/api/post/comment/${targetM.postCommentId}`
      console.log(apiURL)
      call(apiURL, "DELETE", null)
        .then((response) => {
          console.log(response)
          setTmp([])
          setTmpP(undefined)
          setLoadingC(true)
          setLoadingR(true)
        }).catch((error) => console.error(error));
    }
  }

  return (
    <>
      <SubHeaderCnt name='답글' cnt={count} />
      {!isLoadingC && comment !== undefined
        ? <div className='flex flex-col w-full min-h-[calc(100vh-104px)] pb-[88px] bg-gray1'>
          <div className='px-[16px] py-[12px] mb-[2px] bg-p-white'>
            <CommentBlock opt='CMT' data={comment} setOpenD={setOpenD} setTargetM={setTargetM} disabled={true} />
          </div>
          <Replies setCount={setCount} setOpenD={setOpenD} setTargetM={setTargetM} handleMention={handleMention} postCommentId={params.postCommentId}
            isLoadingR={isLoadingR} setLoadingR={setLoadingR} tmp={tmp} setTmp={setTmp} setTmpP={setTmpP} tmpP={tmpP} />
        </div>
        : <div className='flex flex-col gap-[2px]'>
          <LoadingSkeleton type='CMT' />
          <Divider />
          <LoadingSkeleton type='RPL' />
        </div>
      }
      <MemoizedReplyFooter mentioning={mentioning} setMentioning={setMentioning} postCommentId={params.postCommentId} target={mentionTarget}
        mentionRef={mentionRef} replyRef={replyRef} setLoadingC={setLoadingC} setLoadingR={setLoadingR} setTmp={setTmp} setTmpP={setTmpP} />
      <CommentDrawer open={openD} toggleDrawer={toggleDrawer} setOpenM={setOpenM} handleDelete={handleDelete} />
      <ModifyInputR open={openM} setOpenM={setOpenM} target={targetM} setTarget={setTargetM} setLoading={setLoadingR} setTmp={setTmp} setTmpP={setTmpP} />
    </>
  );
}
