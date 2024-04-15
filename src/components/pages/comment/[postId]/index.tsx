"use client";
import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { call } from "@/service/ApiService";
import { Button, ThemeProvider, TextField } from '@mui/material';
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { setPageInfo, useEffectComment } from '@/service/Functions';
import { commentTheme } from '@/components/common/Themes';
import { LoadingSkeleton, MoreButton } from '@/components/common';
import { CommentBlock, CommentDrawer, CommentMProps, CommentProps, ModifyInput } from '@/components/common/Comment';

const index = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(true)

  // menu drawer
  const [openD, setOpenD] = useState(0);
  const toggleDrawer = (newOpen: number) => () => { setOpenD(newOpen); };

  const [openM, setOpenM] = useState(false);
  const [targetM, setTargetM] = useState<CommentMProps | undefined>();

  const params = useParams()

  const handleDelete = () => {
    if (targetM) {
      console.log(targetM.content)
      call(`/api/post/comment/${targetM.postCommentId}`, "DELETE", null)
        .then((response) => {
          console.log(response)
          setLoading(true)
        }).catch((error) => console.error(error));
    }
  }

  return (
    <>
      <SubHeaderCnt name='글 댓글' cnt={count} />
      <Comments postId={params.postId} setCount={setCount} setOpenD={setOpenD} setTargetM={setTargetM}
        isLoading={isLoading} setLoading={setLoading} />
      <CommentFooter postId={params.postId} setLoading={setLoading} />
      <CommentDrawer open={openD} toggleDrawer={toggleDrawer} setOpenM={setOpenM} handleDelete={handleDelete} />
      <ModifyInput open={openM} setOpenM={setOpenM} target={targetM} setTarget={setTargetM} setLoading={setLoading} />
    </>
  )
}
export default index;

function Comments(props: { postId: any; setCount: any; setOpenD: any; setTargetM: any; isLoading: boolean; setLoading: any; }) {
  const [comments, setComments] = useState<CommentProps[]>([]);

  const [page, setPage] = useState({ current: 0, total: 0, });
  const handleMore = () => { setPageInfo(page, setPage, page.current + 1) }
  const cmtEndRef = useRef(null)  // 댓글 등록 시 밑으로 스크롤하는 용도

  const initialSet = useRef(false);
  useEffectComment('CMT', `/api/post/${props.postId}/comment?size=10&page=${page.current}`, initialSet, page, setPage,
    props.setCount, props.isLoading, props.setLoading, setComments, comments, cmtEndRef)

  if (props.isLoading) { return <LoadingSkeleton type='CMT' /> }
  else {
    return (
      <>
        <div className='flex flex-col w-full min-h-[calc(100vh-104px)] pb-[49px] bg-gray1'>
          {comments.map((comment: CommentProps, idx: number) => (
            <div key={`cmt-${idx}`} className={idx % 2 == 0 ? 'bg-[#FFF] px-[16px] py-[12px]' : 'bg-gray1 px-[16px] py-[12px]'}>
              <CommentBlock opt='CMT' data={comment} currentURL={`${props.postId}`} setOpenD={props.setOpenD} setTargetM={props.setTargetM} />
            </div>
          ))
          }
          {page.total > 1 && page.current + 1 < page.total
            ? <MoreButton onClick={handleMore} />
            : <></>
          }
          {/* <div ref={cmtEndRef} /> */}
        </div>
        <div ref={cmtEndRef} />
      </>
    )
  }
}

function CommentFooter(props: { postId: any; setLoading: any; }) {
  const cmtRef = useRef<HTMLInputElement>(null);
  const handleComment = () => {
    if (cmtRef.current && cmtRef.current.value.length > 0) {
      console.log(cmtRef.current.value)
      call(`/api/post/${props.postId}/comment`, "POST", { "content": cmtRef.current.value })
        .then((response) => {
          console.log(response)
          props.setLoading(true)
          if (cmtRef.current) { cmtRef.current.value = '' }
        }).catch((error) => console.error(error));
    }
  }

  return (
    <ThemeProvider theme={commentTheme}>
      <div className="flex flex-row comment-input">
        <TextField placeholder='댓글을 입력해주세요.' fullWidth multiline inputRef={cmtRef} />
        <Button className='text-[14px] w-[70px] h-[48px]' onClick={handleComment}>등록</Button>
      </div>
    </ThemeProvider>
  )
}