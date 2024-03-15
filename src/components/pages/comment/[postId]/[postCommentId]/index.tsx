"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { ThemeProvider, TextField, Button, IconButton } from '@mui/material';
import { CommentProps, CommentBlock } from '../index';
import { commentData } from '@/components/common/Data';
import { commentTheme } from '@/components/common/Themes';
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { call } from '@/service/ApiService';
import { FormatDateTime } from '@/service/Functions';


// * API 파라미터 업데이트 필요
export interface CommentProps1 {
  commentChildCount: number; commentId: number; content: string; createdAt: string;
  likeCount: number; userId: number; username: string;
}
const index = () => {
  const params = useParams()
  const [comment, setComment] = useState<CommentProps>()

  const [children, setChildren] = useState<CommentProps[]>([]);
  function setChildrenList(currentChildren: []) {
    const newChildren = children.concat(currentChildren)
    const newChildrenSet = new Set(newChildren)
    const newChildrenList = Array.from(newChildrenSet);
    console.log(newChildren, ' | ', newChildrenSet)
    setChildren(newChildrenList);
  }

  const [page, setPage] = useState({ current: 0, total: 0, });
  function setPageInfo(currentPage: number) {
    setPage({ ...page, current: currentPage });
  }
  const [count, setCount] = useState(0);

  const initialSet = useRef(false);
  useEffect(() => {
    let apiURL = `/api/post/comment/${params.postCommentId}`;
    console.log("###", apiURL)
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response.data);
        setComment(response.data);
      })
  }, [])
  useEffect(() => {
    let apiURL = `/api/post/comment/${params.postCommentId}/children?size=10&page=${page.current}`;
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
          setChildrenList(response.data.content)
        }
      })
  }, [page])

  const [mentioning, setMentioning] = useState(false)
  const [mentionTarget, setMentionTarget] = useState<{ id: Number, name: string } | undefined>(undefined)
  const handleMention = (data: CommentProps) => {
    setMentioning(true)
    setMentionTarget({ id: data.userId, name: data.userName ?? '' })
  }

  if (comment !== undefined) {
    return (
      <>
        <SubHeaderCnt name='답글' url={"/"} cnt={commentData.length} />
        <div className='flex flex-col w-full min-h-[100vh] pb-[49px] bg-gray1'>
          <div className='bg-white px-[16px] py-[12px] mb-[2px]'>
            <CommentBlock data={comment} currentURL='' />
          </div>
          <div className='flex flex-col w-full min-h-[100vh] pb-[76px] bg-gray1'>
            {
              children.map((comment: CommentProps, idx: number) => (
                <div className={idx % 2 == 0 ? 'bg-white ps-[48px] pe-[16px] py-[12px]' : 'bg-gray1 ps-[48px] pe-[16px] py-[12px]'}
                  onClick={(e) => { handleMention(comment) }}>
                  <ReplyBlock data={comment} key={`cmt-${idx}`} />
                </div>
              ))
            }
          </div>
        </div>
        <ReplyFooter mentioning={mentioning} setMentioning={setMentioning} target={mentionTarget} />
      </>
    )
  }

}
export default index;

function ReplyBlock(props: { data: CommentProps }) {
  let createdD = FormatDateTime(props.data.createdAt, 1)
  return (
    <div>
      <div className='flex flex-row justify-between pb-[10px]' id='comment-head'>
        <div className='flex flex-row items-center'>
          <a className="flex place-items-center" href="/">
            <img src="/main_profile.svg" width={24} height={24} />
          </a>
          <div className='text-sm ps-[8px]'>{props.data.userName}</div>
        </div>
        <IconButton disableRipple className='p-0'><img src='/comment_etc.svg' width={24} height={24} /></IconButton>
      </div>
      <div className='text-sm text-gray3 pb-[6px]' id='comment-body'>
        {props.data.content}
      </div>
      <div className='flex flex-row justify-between items-center pt-[8px]' id='comment-foot'>
        <div className='flex flex-row text-xs text-gray3' id='comment-datetime'>
          <p className='pe-[6px]'>{createdD.date}</p><p>{createdD.time}</p>
        </div>
        <div className='flex flex-row items-center' id='comment-likes'>
          {
            props.data.myLike
              ? <img src="/comment_like_1.svg" width={24} height={24} />
              : <img src="/comment_like.svg" width={24} height={24} />
          }
          {
            props.data.likeCount !== 0 ? <p className='text-xs text-gray3 ps-[2px]'>{props.data.likeCount}</p> : <></>
          }
        </div>
      </div>
    </div>
  )
}

export function ReplyFooter(props: { mentioning: boolean; setMentioning: Dispatch<SetStateAction<boolean>>; target: any; }) {
  const [value, setValue] = useState('')
  const mentionRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    if (props.mentioning && mentionRef.current) {
      console.log(mentionRef.current.children.length, ' | ', mentionRef.current.children)
      if (mentionRef.current.children.length < 0 ||
        (mentionRef.current.children.length === 1 && mentionRef.current.children[0].tagName === 'BR')) {
        props.setMentioning(false);
      }
    }
  }

  function MentionInput() {
    return (
      <div className='editor-body wrapper'>
        {props.mentioning
          ? <div className='mention-reply-section' ref={mentionRef} contentEditable onInput={handleInput}>
            <span contentEditable={false}
              className='text-primary-blue'>{`@${props.target.name} `}</span>
          </div>
          : <TextField placeholder='댓글을 입력해주세요.' fullWidth multiline className='bg-secondary-yellow' />
        }
      </div>
    )
  }

  return (
    <ThemeProvider theme={commentTheme}>
      <div className="flex flex-row comment-input">
        <MentionInput />
        <Button className='text-sm w-[70px] h-[48px]'>등록</Button>
      </div>
    </ThemeProvider>
  )
}