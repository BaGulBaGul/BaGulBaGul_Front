"use client";
import { useEffect, useRef, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';

import { Button, IconButton } from '@mui/material';
import { ThemeProvider, TextField } from '@mui/material';
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { commentData } from '@/components/common/Data';
import { commentTheme, replyButtonTheme } from '@/components/common/Themes';
import { call } from '@/service/ApiService';

interface CommentProps {
  commentChildCount: number; commentId: number; content: string; createdAt: string;
  likeCount: number; myLike: Boolean; userId: number; username: string; user_profile: string;
}
const index = () => {
  const params = useParams()

  const [comments, setComments] = useState<CommentProps[]>([]);
  function setCommentList(currentComments: []) {
    const newComments = comments.concat(currentComments)
    const newCommentsSet = new Set(newComments)
    const newCommentsList = Array.from(newCommentsSet);
    console.log(newComments, ' | ', newCommentsSet)
    setComments(newCommentsList);
  }

  const [page, setPage] = useState({ current: 0, total: 0, });
  function setPageInfo(currentPage: number) {
    setPage({ ...page, current: currentPage });
  }

  const initialSet = useRef(false);
  useEffect(() => {
    // let apiURL = `/api/post/${params.eventId}`;
    // 28530 / 28562 
    let apiURL = '/api/post/28503/comment'
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response.data);
        if (response.data.empty === false) {
          // 페이지값 초기설정
          if (!initialSet.current) {
            setPage({ current: 0, total: response.data.totalPages })
            initialSet.current = true;
          }
          setCommentList(response.data.content)
        }
      })
  }, [page])

  return (
    <>
      <SubHeaderCnt name='글 댓글' url={"/"} cnt={commentData.length} />
      <Comments />
      <CommentFooter />
    </>
  )
}
export default index;

function Comments() {
  return (
    <div className='flex flex-col w-full min-h-[100vh] pb-[76px] bg-gray1-text'>
      {
        commentData.map((comment, idx) => (
          <div className={idx % 2 == 0 ? 'bg-white-text px-[16px] py-[12px]' : 'bg-gray1-text px-[16px] py-[12px]'}>
            <CommentBlock data={comment} key={`cmt-${idx}`} />
          </div>
        ))
      }
    </div>
  )
}

function CommentBlock(props: { data: CommentProps; }) {
  return (
    // <div className={props.idx % 2 == 0 ? 'bg-white-text px-[16px] py-[12px]' : 'bg-gray1-text px-[16px] py-[12px]'}>
    <div className={'px-[16px] py-[12px]'}>
      <div className='flex flex-row justify-between pb-[10px]' id='comment-head'>
        <div className='flex flex-row items-center'>
          <a className="flex place-items-center" href="/">
            <img src="/main_profile.svg" width={24} height={24} />
          </a>
          <div className='text-sm ps-[8px]'>{props.user}</div>
        </div>
        <IconButton disableRipple className='p-0'><img src='/comment_etc.svg' width={24} height={24} /></IconButton>
      </div>
      <div className='text-sm text-gray3-text pb-[6px]' id='comment-body'>
        {props.content}
      </div>
      <div className='text-xs text-gray3-text' id='comment-datetime'>{props.date}</div>
      <div className='flex flex-row justify-between items-center pt-[8px]' id='comment-foot'>
        <ThemeProvider theme={replyButtonTheme}>
          <Button className='text-xs font-normal' href='/comment/reply'>답글</Button>
        </ThemeProvider>
        <div className='flex flex-row items-center' id='comment-likes'>
          {
            props.liked
              ? <img src="/comment_like_1.svg" width={24} height={24} />
              : <img src="/comment_like.svg" width={24} height={24} />
          }
          {
            props.likes !== 0 ? <p className='text-xs text-gray3-text ps-[2px]'>{props.likes}</p> : <></>
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
        <Button className='text-sm w-[70px] h-[48px]'>등록</Button>
      </div>
    </ThemeProvider>
  )
}