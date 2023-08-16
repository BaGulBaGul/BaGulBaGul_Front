'use client';
import {
  InputBase, InputBaseProps, Button
} from '@mui/material';
import { styled, ThemeProvider } from '@mui/material/styles';
import { commentData } from '@/components/common/Data';
import { commentButtonTheme, replyButtonTheme } from '@/components/common/Themes';

export function CommentDetail() {
  return (
    <div className='flex flex-col w-full pb-[76px]'>
      {
        commentData.map((comment, idx) => (
          <CommentBlock idx={idx} user={comment.user} content={comment.content}
            date={comment.date} liked={comment.liked} likes={comment.likes} />
        ))
      }
    </div>
  )
}

const CommentInput = styled(InputBase)<InputBaseProps>(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 0,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    padding: '13px 24px',
    '&::placeholder': { color: '#C1C1C1' }
  },
}));

export function CommentFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex-row flex min-h-[48px] comment-input bg-[#FFF]">
      <CommentInput placeholder='댓글을 입력해주세요.' fullWidth multiline className='py-0' />
      <ThemeProvider theme={commentButtonTheme}>
        <Button className='text-sm w-[70px] h-[48px]'>등록</Button>
      </ThemeProvider>
    </div>
  )
}

interface CommentBlockProps {
  idx: number; user: string; content: string;
  date: string; liked: boolean; likes: number;
}
export function CommentBlock(props: CommentBlockProps) {
  return (
    <div className={props.idx % 2 == 0 ? 'bg-white-text px-[16px] py-[12px]' : 'bg-gray1-text px-[16px] py-[12px]'}>
      <div className='flex flex-row justify-between pb-[10px]' id='comment-head'>
        <div className='flex flex-row items-center'>
          <a className="flex place-items-center" href="/">
            <img src="/main_profile.svg" width={24} height={24} />
          </a>
          <div className='text-sm ps-[8px]'>{props.user}</div>
        </div>
        <a href="/"><img src='/comment_etc.svg' width={24} height={24} /></a>
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
            props.likes !== 0
              ? <p className='text-xs text-gray3-text ps-[2px]'>{props.likes}</p>
              : <></>
          }
        </div>
      </div>
    </div>
  )
}