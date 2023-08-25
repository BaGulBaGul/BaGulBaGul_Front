"use client";
import { Button, IconButton } from '@mui/material';
import { ThemeProvider, TextField } from '@mui/material';
import { commentData } from '@/components/common/Data';
import { commentTheme, replyButtonTheme } from '@/components/common/Themes';

const index = () => {
  return (
    <div className='flex flex-col w-full pt-[104px] pb-[76px] bg-gray1-text'>
      {
        commentData.map((comment, idx) => (
          <CommentBlock idx={idx} user={comment.user} content={comment.content}
            date={comment.date} liked={comment.liked} likes={comment.likes} />
        ))
      }
    </div>
  )
}

interface CommentBlockProps {
  idx: number; user: string; content: string;
  date: string; liked: boolean; likes: number;
}
function CommentBlock(props: CommentBlockProps) {
  return (
    <div className={props.idx % 2 == 0 ? 'bg-white-text px-[16px] py-[12px]' : 'bg-gray1-text px-[16px] py-[12px]'}>
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
          <Button className='text-xs font-normal'>답글</Button>
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
export default index;

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