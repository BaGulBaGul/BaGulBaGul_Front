"use client";
import { Button, IconButton } from '@mui/material';
import { ThemeProvider, TextField } from '@mui/material';
import { CommentProps, CommentBlock } from '../index';
import { commentData } from '@/components/common/Data';
import { commentTheme, replyButtonTheme } from '@/components/common/Themes';
import { SubHeaderCnt } from '@/components/layout/subHeader';

const index = () => {
  const comment = commentData[0]
  return (
    <>
      <SubHeaderCnt name='답글' url={"/"} cnt={commentData.length} />
      <div className='flex flex-col w-full min-h-[100vh] pb-[49px] bg-gray1-text '>
        {/* <CommentBlock user={comment.user} content={comment.content}
        date={comment.date} liked={comment.liked} likes={comment.likes} /> */}
        {
          commentData.map((comment, idx) => (
            <div className={idx % 2 == 0 ? 'bg-white-text ps-[48px] pe-[16px] py-[12px]' : 'bg-gray1-text ps-[48px] pe-[16px] py-[12px]'}>
              {/* <ReplyBlock data={comment} /> */}
            </div>
          ))
        }
      </div>
      <CommentFooter />
    </>
  )
}
export default index;

function ReplyBlock(props: { data: CommentProps }) {
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
      <div className='text-sm text-gray3-text pb-[6px]' id='comment-body'>
        {props.data.content}
      </div>
      <div className='text-xs text-gray3-text' id='comment-datetime'>{props.data.createdAt}</div>
      <div className='flex flex-row justify-between items-center pt-[8px]' id='comment-foot'>
        <ThemeProvider theme={replyButtonTheme}>
          <Button className='text-xs font-normal'>답글</Button>
        </ThemeProvider>
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

export function CommentFooter() {
  return (
    <ThemeProvider theme={commentTheme}>
      <div className="flex flex-row comment-input">
        <TextField placeholder='댓글을 입력해주세요.' fullWidth multiline />
        <Button className='text-sm w-[70px] h-[48px]'>등록</Button>
      </div>
    </ThemeProvider>
  )
}