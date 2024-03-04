"use client";
import { useEffect, useRef, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';

import { Button, IconButton, ThemeProvider, TextField, Input } from '@mui/material';
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { FormatDateTime } from '@/service/Functions';
import { commentTheme, replyButtonTheme } from '@/components/common/Themes';
import { call } from '@/service/ApiService';

import { commentData } from '@/components/common/Data';

export interface CommentProps {
  commentChildCount: number; commentId: number; content: string; createdAt: string;
  likeCount: number; myLike: Boolean; userId: number; username: string; user_profile?: string;
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
  const [count, setCount] = useState(0);

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

  console.log(comments[0])
  return (
    <>
      <SubHeaderCnt name='글 댓글' url={"/"} cnt={count} />
      <div className='flex flex-col w-full min-h-[100vh] pb-[76px] bg-gray1-text'>
        {
          comments.map((comment: CommentProps, idx: number) => (
            <div className={idx % 2 == 0 ? 'bg-white-text px-[16px] py-[12px]' : 'bg-gray1-text px-[16px] py-[12px]'}>
              <CommentBlock data={comment} key={`cmt-${idx}`} currentURL={`comment/${params.postId}`} />
            </div>
          ))
        }
      </div>
      {/* <ReplyPage data={comments[0]} count={count} /> */}
      <CommentFooter />
    </>
  )
}
export default index;

export function CommentBlock(props: { data: CommentProps; currentURL: string; }) {
  let createdD = FormatDateTime(props.data.createdAt, 1)
  return (
    <div>
      <div className='flex flex-row justify-between pb-[10px]' id='comment-head'>
        <div className='flex flex-row items-center'>
          <a className="flex place-items-center" href="/">
            <img src="/main_profile.svg" width={24} height={24} />
          </a>
          <div className='text-sm ps-[8px]'>{props.data.username}</div>
        </div>
        <IconButton disableRipple className='p-0'><img src='/comment_etc.svg' width={24} height={24} /></IconButton>
      </div>
      <div className='text-sm text-gray3-text pb-[6px]' id='comment-body'>{props.data.content}</div>
      <div className='flex flex-row text-xs text-gray3-text' id='comment-datetime'>
        <p className='pe-[6px]'>{createdD.date}</p><p>{createdD.time}</p>
      </div>
      <div className='flex flex-row justify-between items-center pt-[8px]' id='comment-foot'>
        {/* <Link href={`${props.currentURL}/${props.data.commentId}`}> */}
        <Link href={{
          pathname: `${props.currentURL}/${props.data.commentId}`,
          query: { comment: JSON.stringify(props.data) }
        }}
          as={`${props.currentURL}/${props.data.commentId}`}>
          <ThemeProvider theme={replyButtonTheme}>
            {
              props.data.commentChildCount > 0
                ? <Button className={'flex flex-row text-[12px] border-primary-blue text-primary-blue'}>
                  <p>답글</p><p className='ps-[4px]'>{props.data.commentChildCount}</p>
                </Button>
                : <Button className={'flex flex-row text-[12px]'}>답글</Button>
            }
          </ThemeProvider>
        </Link>
        <div className='flex flex-row items-center' id='comment-likes'>
          {
            props.data.myLike
              ? <img src="/comment_like_1.svg" width={24} height={24} />
              : <img src="/comment_like.svg" width={24} height={24} />
          }
          {
            props.data.likeCount !== 0 ? <p className='text-xs text-gray3-text ps-[2px]'>{props.data.likeCount}</p> : <></>
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


// ******************************************
// *************  답글창 작업중  ***************
// ******************************************
// function ReplyPage(props: { data: CommentProps; count: number; }) {
//   const [replyTo, setReplyTo] = useState({ userId: '1', username: 'user1' })
//   const onReply = () => {

//   }
//   return (
//     <>
//       {/* <SubHeaderCnt name='답글' url={"/"} cnt={props.data.commentChildCount} /> */}
//       <SubHeaderCnt name='답글' url={"/"} cnt={props.count} />
//       <div className='flex flex-col w-full min-h-[100vh] pb-[76px] bg-gray1-text'>
//         <div className='px-[16px] py-[12px]'>
//           <CommentBlock data={props.data} currentURL={`comment/`} />
//         </div>
//         <div className='flex flex-col w-full min-h-[100vh] pb-[76px] bg-gray1-text'>
//           {
//             commentData.map((comment: CommentProps, idx: number) => (
//               <div className={idx % 2 == 0 ? 'bg-white-text ps-[48px] pe-[16px] py-[12px]'
//                 : 'bg-gray1-text ps-[48px] pe-[16px] py-[12px]'} key={`reply-${idx}`}>
//                 <ReplyBlock data={comment} />
//               </div>
//             ))
//           }
//         </div>
//       </div>
//       <ThemeProvider theme={commentTheme}>
//         <div className="flex flex-row reply-input">
//           <Input placeholder='댓글을 입력해주세요.' fullWidth multiline />
//           <Button className='text-sm w-[70px] h-[48px]'>등록</Button>
//         </div>
//       </ThemeProvider>
//     </>
//   )
// }

// export function ReplyBlock(props: { data: CommentProps }) {
//   let createdD = FormatDateTime(props.data.createdAt, 1)
//   return (
//     <div>
//       <div className='flex flex-row justify-between pb-[10px]' id='comment-head'>
//         <div className='flex flex-row items-center'>
//           <a className="flex place-items-center" href="/">
//             <img src="/main_profile.svg" width={24} height={24} />
//           </a>
//           <div className='text-sm ps-[8px]'>{props.data.username}</div>
//         </div>
//         <IconButton disableRipple className='p-0'><img src='/comment_etc.svg' width={24} height={24} /></IconButton>
//       </div>
//       <div className='text-sm text-gray3-text pb-[6px]' id='comment-body'>{props.data.content}</div>
//       <div className='flex flex-row justify-between'>
//         <div className='flex flex-row text-[12px] text-gray3-text' id='comment-datetime'>
//           <p className='pe-[6px]'>{createdD.date}</p><p>{createdD.time}</p>
//         </div>
//         <div className='flex flex-row items-center' id='comment-likes'>
//           {
//             props.data.myLike
//               ? <img src="/comment_like_1.svg" width={24} height={24} />
//               : <img src="/comment_like.svg" width={24} height={24} />
//           }
//           {
//             props.data.likeCount !== 0 ? <p className='text-xs text-gray3-text ps-[2px]'>{props.data.likeCount}</p> : <></>
//           }
//         </div>
//       </div>
//     </div>
//   )
// }