"use client";
import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button, ThemeProvider, TextField } from '@mui/material';
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { setPageInfo, useEffectComment } from '@/service/Functions';
import { commentTheme } from '@/components/common/Themes';
import { LoadingSkeleton, MoreButton } from '@/components/common';
import { CommentBlock, CommentDrawer, CommentMProps, CommentProps, ModifyInput } from '@/components/common/Comment';

const index = () => {
  const [count, setCount] = useState(0);

  // menu drawer
  const [openD, setOpenD] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => { setOpenD(newOpen); };

  const [openM, setOpenM] = useState(false);
  const [targetM, setTargetM] = useState<CommentMProps | undefined>();

  return (
    <>
      <SubHeaderCnt name='글 댓글' url={"/"} cnt={count} />
      <Comments setCount={setCount} setOpenD={setOpenD} setTargetM={setTargetM} />
      <CommentFooter />
      <CommentDrawer open={openD} toggleDrawer={toggleDrawer} setOpenM={setOpenM} />
      <ModifyInput open={openM} setOpenM={setOpenM} target={targetM} setTarget={setTargetM} />
    </>
  )
}
export default index;

function Comments(props: { setCount: any; setOpenD: any; setTargetM: any; }) {
  const params = useParams()
  const [isLoading, setLoading] = useState(true)

  const [comments, setComments] = useState<CommentProps[]>([]);

  const [page, setPage] = useState({ current: 0, total: 0, });
  const handleMore = () => { setPageInfo(page, setPage, page.current + 1) }

  const initialSet = useRef(false);
  useEffectComment('CMT', `/api/post/${params.postId}/comment?size=10&page=${page.current}`, initialSet, page, setPage,
    props.setCount, setLoading, setComments, comments)

  if (isLoading) { return <LoadingSkeleton type='CMT' /> }
  else {
    return (
      <div className='flex flex-col w-full min-h-[calc(100vh-104px)] pb-[49px] bg-gray1'>
        {comments.map((comment: CommentProps, idx: number) => (
          <div key={`cmt-${idx}`} className={idx % 2 == 0 ? 'bg-[#FFF] px-[16px] py-[12px]' : 'bg-gray1 px-[16px] py-[12px]'}>
            <CommentBlock opt='CMT' data={comment} currentURL={`${params.postId}`} setOpenD={props.setOpenD} setTargetM={props.setTargetM} />
          </div>
        ))
        }
        {page.total > 1 && page.current + 1 < page.total
          ? <MoreButton onClick={handleMore} />
          : <></>
        }
      </div>
    )
  }
}

function CommentFooter() {
  return (
    <ThemeProvider theme={commentTheme}>
      <div className="flex flex-row comment-input">
        <TextField placeholder='댓글을 입력해주세요.' fullWidth multiline />
        <Button className='text-[14px] w-[70px] h-[48px]'>등록</Button>
      </div>
    </ThemeProvider>
  )
}