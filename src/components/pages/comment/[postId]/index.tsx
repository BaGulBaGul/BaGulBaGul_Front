"use client";
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button, IconButton, ThemeProvider, TextField } from '@mui/material';
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { FormatDateTime } from '@/service/Functions';
import { commentTheme, replyButtonTheme } from '@/components/common/Themes';
import { call } from '@/service/ApiService';
import { MoreButton } from '@/components/common';
import { CommentDrawer, CommentMProps, CommentProps, ModifyInput } from '@/components/common/Comment';

const index = () => {
  const params = useParams()
  const [comments, setComments] = useState<CommentProps[]>([]);
  function setCommentList(currentComments: []) {
    const newComments = comments.concat(currentComments)
    const ids = newComments.map(({ commentId }) => commentId);
    const filtered = newComments.filter(({ commentId }, index: number) => !ids.includes(commentId, index + 1));
    setComments(filtered);
  }

  const [page, setPage] = useState({ current: 0, total: 0, });
  function setPageInfo(currentPage: number) {
    setPage({ ...page, current: currentPage });
  }
  const handleMore = () => { setPageInfo(page.current + 1) }

  const [count, setCount] = useState(0);

  // menu drawer
  const [openD, setOpenD] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => { setOpenD(newOpen); };

  const [openM, setOpenM] = useState(false);
  const [targetM, setTargetM] = useState<CommentMProps | undefined>();

  const initialSet = useRef(false);
  useEffect(() => {
    let apiURL = `/api/post/${params.postId}/comment?size=10&page=${page.current}`;
    console.log("$$$", apiURL)
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response.data);
        if (response.data.empty === false) {
          // 페이지값 초기설정
          if (!initialSet.current) {
            setPage({ current: 0, total: response.data.totalPages })
            initialSet.current = true;
            setCount(response.data.totalElements)
          }
          setCommentList(response.data.content)
        }
      })
  }, [page])

  return (
    <>
      <SubHeaderCnt name='글 댓글' url={"/"} cnt={count} />
      <div className='flex flex-col w-full min-h-[calc(100vh-104px)] pb-[49px] bg-gray1'>
        {
          comments.map((comment: CommentProps, idx: number) => (
            <div key={`cmt-${idx}`} className={idx % 2 == 0 ? 'bg-white px-[16px] py-[12px]' : 'bg-gray1 px-[16px] py-[12px]'}>
              <CommentBlock data={comment} currentURL={`${params.postId}`} setOpenD={setOpenD} setTargetM={setTargetM} />
            </div>
          ))
        }
        {
          page.total > 1 && page.current + 1 < page.total
            ? <MoreButton onClick={handleMore} />
            : <></>
        }
      </div>
      <CommentFooter />
      <CommentDrawer open={openD} toggleDrawer={toggleDrawer} setOpenM={setOpenM} />
      <ModifyInput open={openM} setOpenM={setOpenM} target={targetM} setTarget={setTargetM}  />
    </>
  )
}
export default index;

export function CommentBlock(props: { data: CommentProps; currentURL: string; setOpenD: any; setTargetM: any; }) {
  let createdD = FormatDateTime(props.data.createdAt, 1)
  const handleToggle = () => {
    props.setOpenD(true)
    props.setTargetM({postCommentId: props.data.commentId, content: props.data.content})
  }
  return (
    <div>
      <div className='flex flex-row justify-between pb-[10px]' id='comment-head'>
        <div className='flex flex-row items-center'>
          <a className="flex place-items-center" href="/">
            <img src="/main_profile.svg" width={24} height={24} />
          </a>
          <div className='text-[14px] ps-[8px]'>{props.data.username}</div>
        </div>
        <IconButton disableRipple className='p-0' onClick={handleToggle}><img src='/comment_etc.svg' width={24} height={24} /></IconButton>
      </div>
      <div className='text-[14px] text-gray3 pb-[6px]' id='comment-body'>{props.data.content}</div>
      <div className='flex flex-row text-[12px] text-gray3' id='comment-datetime'>
        <p className='pe-[6px]'>{createdD.date}</p><p>{createdD.time}</p>
      </div>
      <div className='flex flex-row justify-between items-center pt-[8px]' id='comment-foot'>
        <a href={`${props.currentURL}/${props.data.commentId}`}>
          <ThemeProvider theme={replyButtonTheme}>
            {
              props.data.commentChildCount > 0
                ? <Button className={'flex flex-row text-[12px] border-primary-blue text-primary-blue'}>
                  <p>답글</p><p className='ps-[4px]'>{props.data.commentChildCount}</p>
                </Button>
                : <Button className={'flex flex-row text-[12px]'}>답글</Button>
            }
          </ThemeProvider>
        </a>
        <div className='flex flex-row items-center' id='comment-likes'>
          {
            props.data.myLike
              ? <img src="/comment_like_1.svg" width={24} height={24} />
              : <img src="/comment_like.svg" width={24} height={24} />
          }
          {
            props.data.likeCount !== 0 ? <p className='text-[12px] text-gray3 ps-[2px]'>{props.data.likeCount}</p> : <></>
          }
        </div>
      </div>
    </div>
  )
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