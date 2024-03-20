"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState, FocusEvent } from 'react';
import { useParams } from 'next/navigation';
import { ThemeProvider, TextField, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { CommentProps, CommentBlock } from '../index';
import { commentData } from '@/components/common/Data';
import { commentTheme } from '@/components/common/Themes';
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { call } from '@/service/ApiService';
import { FormatDateTime } from '@/service/Functions';

// * API 파라미터 업데이트 필요
export interface CommentProps1 {
  commentChildCount: number; commentId: number; content: string; createdAt: string; likeCount: number; userId: number; username: string;
}
export interface ReplyProps {
  commentChildId: number; content: string; createdAt: string; likeCount: number; userId: number; userName: string; myLike: boolean;
}
const index = () => {
  const params = useParams()
  const [comment, setComment] = useState<CommentProps>()

  const [children, setChildren] = useState<ReplyProps[]>([]);
  function setChildrenList(currentChildren: []) {
    const newChildren = children.concat(currentChildren)
    const ids = newChildren.map(({ commentChildId }) => commentChildId);
    const filtered = newChildren.filter(({ commentChildId }, index) => !ids.includes(commentChildId, index + 1));
    setChildren(filtered);
  }

  const [page, setPage] = useState({ current: 0, total: 0, });
  function setPageInfo(currentPage: number) { // handleMore 적용시 사용
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
  const mentionRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLInputElement>(null);

  const handleMention = (data: ReplyProps) => {
    setMentioning(true)
    setMentionTarget({ id: data.userId, name: data.userName ?? '' })
  }

  useEffect(() => {
    if (mentioning && mentionRef && mentionRef.current) {
      mentionRef.current.focus()
    }
  }, [mentionTarget])

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
              children.map((comment: ReplyProps, idx: number) => (
                <div className={idx % 2 == 0 ? 'bg-white ps-[48px] pe-[16px] py-[12px]' : 'bg-gray1 ps-[48px] pe-[16px] py-[12px]'}
                  onClick={(e) => { handleMention(comment) }}>
                  <ReplyBlock data={comment} key={`cmt-${idx}`} />
                </div>
              ))
            }
          </div>
        </div>
        <ReplyFooter mentioning={mentioning} setMentioning={setMentioning} target={mentionTarget}
          mentionRef={mentionRef} replyRef={replyRef} />
      </>
    )
  }
}
export default index;

function ReplyBlock(props: { data: ReplyProps }) {
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

export function ReplyFooter(props: {
  mentioning: boolean; setMentioning: Dispatch<SetStateAction<boolean>>; target: any; mentionRef: any; replyRef: any;
}) {
  const [value, setValue] = useState('')

  const handleInput = (e: any) => {
    if (props.mentioning && props.mentionRef.current) {
      if (props.mentionRef.current.children.length <= 0 || props.mentionRef.current.children.namedItem('mention-highlight') === null) {
        setValue(e.target.innerText.replace(/\n$/, ''))
        props.setMentioning(false);
      }
    }
  }

  const moveCaretEnd = (el: HTMLInputElement) => {
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(el.childNodes[1], 0);
    range.collapse(true);
    if (sel !== null) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    var el = e.currentTarget as HTMLInputElement
    moveCaretEnd(el)
    el.focus();
  }

  const handleCaret = (e: any) => {
    let el = props.mentionRef.current
    let caretOffset = 0;
    let winSel = window.getSelection()
    if (winSel !== null && winSel !== undefined) {
      var range = winSel.getRangeAt(0);
      var preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(el);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
      // console.log(caretOffset)
      if (caretOffset === 0) {
        moveCaretEnd(el)
      }
      else if (caretOffset === (el.children.namedItem('mention-highlight').innerText.replace(/ $/, '').length + 1)) {
        if (e.type === 'keydown' && e.code === 'ArrowLeft') {
          e.preventDefault();
          return false;
        }
      }
    }
  }

  function MentionInput() {
    return (
      <div className='editor-body wrapper'>
        {props.mentioning
          ? <div className='mention-reply-section' ref={props.mentionRef} contentEditable onInput={handleInput} onFocus={handleFocus}
            onKeyUp={handleCaret} onKeyDown={handleCaret} onMouseUp={handleCaret} suppressContentEditableWarning={true} >
            <span contentEditable={false} id='mention-highlight' className='text-primary-blue'>{`@${props.target.name} `}</span>
            <span className='w-full' contentEditable></span>
          </div>
          : <TextField placeholder='댓글을 입력해주세요.' defaultValue={value.replace(/\n$/, '')} inputRef={props.replyRef} fullWidth multiline />
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