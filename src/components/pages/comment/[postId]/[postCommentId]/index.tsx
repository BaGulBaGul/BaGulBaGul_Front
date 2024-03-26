"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState, FocusEvent, memo } from 'react';
import { useParams } from 'next/navigation';
import { ThemeProvider, TextField, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { CommentBlock } from '../index';
import { commentTheme, mentionDialogTheme } from '@/components/common/Themes';
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { call } from '@/service/ApiService';
import { FormatDateTime } from '@/service/Functions';
import { MoreButton } from '@/components/common';
import { CommentDrawer, CommentMProps, CommentProps, ModifyInput } from '@/components/common/Comment';

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
  function setPageInfo(currentPage: number) {
    setPage({ ...page, current: currentPage });
  }
  const handleMore = () => { setPageInfo(page.current + 1) }

  // menu drawer
  const [openD, setOpenD] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => { setOpenD(newOpen); };

  const [openM, setOpenM] = useState(false);
  const [targetM, setTargetM] = useState<CommentMProps | undefined>();

  const initialSet = useRef(false);
  // 댓글 조회 후 대댓글 조회
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
          }
          setChildrenList(response.data.content)
        }
      })
  }, [page])

  const [mentioning, setMentioning] = useState(false)
  const [mentionTarget, setMentionTarget] = useState<{ id: number, name: string } | undefined>(undefined)
  const [tmpTarget, setTmpTarget] = useState<{ id: number, name: string } | undefined>(undefined)  // Dialog 오픈 시 타겟값 임시 저장
  const mentionRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  // 멘션 대상 설정
  const switchMention = (data: { id: number, name: string }) => {
    setMentioning(true)
    setMentionTarget(data)
    setTmpTarget(undefined)
  }
  const handleMention = (data: ReplyProps) => {
    // 입력창에 작성 중인 댓글 있는 경우 타겟 임시 저장 후 Dialog
    if ((!mentioning && replyRef && replyRef.current !== null && replyRef.current.value.length > 0)
      || (mentioning && mentionRef && mentionRef.current !== null && mentionRef.current.children.namedItem('mention-highlight') !== null
        && mentionRef.current.innerText.length + 1 > (mentionRef.current.children.namedItem('mention-highlight')?.innerHTML.length ?? 0))) {
      setTmpTarget({ id: data.userId, name: data.userName ?? '' })
      handleClickOpen()
    } // 없는 경우 바로 멘션 대상 설정 및 변경
    else { switchMention({ id: data.userId, name: data.userName ?? '' }) }
  }

  const handleDialog = () => {
    if (tmpTarget !== undefined) {
      switchMention(tmpTarget)
      handleClose()
    }
  }

  useEffect(() => {
    if (mentioning && mentionRef && mentionRef.current) { mentionRef.current.focus() }
  }, [mentionTarget])

  if (comment !== undefined) {
    return (
      <>
        <SubHeaderCnt name='답글' url={"/"} cnt={comment.commentChildCount} />
        <div className='flex flex-col w-full min-h-[calc(100vh-104px)] pb-[49px] bg-gray1'>
          <div className='bg-white px-[16px] py-[12px] mb-[2px]'>
            <CommentBlock data={comment} currentURL='' setOpenD={setOpenD} setTargetM={setTargetM} />
          </div>
          <div className='flex flex-col w-full'>
            {
              children.map((comment: ReplyProps, idx: number) => (
                <div className={idx % 2 == 0 ? 'bg-white ps-[48px] pe-[16px] py-[12px]' : 'bg-gray1 ps-[48px] pe-[16px] py-[12px]'}
                  key={`reply-${idx}`} onClick={(e) => { handleMention(comment) }}>
                  <ReplyBlock data={comment} key={`cmt-${idx}`} setOpenD={setOpenD} setTargetM={setTargetM} />
                </div>
              ))
            }
            {
              page.total > 1 && page.current + 1 < page.total
                ? <MoreButton onClick={handleMore} />
                : <></>
            }
          </div>
        </div>
        <ThemeProvider theme={mentionDialogTheme}>
          <Dialog open={open} onClose={handleClose} >
            <DialogContent>
              <DialogContentText>작성 중이던 댓글을 삭제하고<br /> 새로운 댓글을 작성하시겠습니까?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} className='btn-mention-keep'>계속 작성</Button>
              <Button onClick={handleDialog} className='btn-mention-delete'>삭제</Button>
            </DialogActions>
          </Dialog >
        </ThemeProvider>
        <MemoizedReplyFooter mentioning={mentioning} setMentioning={setMentioning} target={mentionTarget} mentionRef={mentionRef} replyRef={replyRef} />
        <CommentDrawer open={openD} toggleDrawer={toggleDrawer} setOpenM={setOpenM} />
        <ModifyInput open={openM} setOpenM={setOpenM} target={targetM} setTarget={setTargetM} />
      </>
    )
  }
}
export default index;

function ReplyBlock(props: { data: ReplyProps; setOpenD: any; setTargetM: any; }) {
  let createdD = FormatDateTime(props.data.createdAt, 1)
  const handleToggle = () => {
    props.setOpenD(true)
    props.setTargetM({ postCommentId: props.data.commentChildId, content: props.data.content })
  }
  return (
    <div>
      <div className='flex flex-row justify-between pb-[10px]' id='comment-head'>
        <div className='flex flex-row items-center'>
          <a className="flex place-items-center" href="/">
            <img src="/main_profile.svg" width={24} height={24} />
          </a>
          <div className='text-[14px] ps-[8px]'>{props.data.userName}</div>
        </div>
        <IconButton disableRipple className='p-0' onClick={handleToggle}><img src='/comment_etc.svg' width={24} height={24} /></IconButton>
      </div>
      <div className='text-[14px] text-gray3 pb-[6px]' id='comment-body'>
        {props.data.content}
      </div>
      <div className='flex flex-row justify-between items-center pt-[8px]' id='comment-foot'>
        <div className='flex flex-row text-[12px] text-gray3' id='comment-datetime'>
          <p className='pe-[6px]'>{createdD.date}</p><p>{createdD.time}</p>
        </div>
        <div className='flex flex-row items-center' id='comment-likes'>
          {props.data.myLike
            ? <img src="/comment_like_1.svg" width={24} height={24} />
            : <img src="/comment_like.svg" width={24} height={24} />
          }
          {props.data.likeCount !== 0 ? <p className='text-[12px] text-gray3 ps-[2px]'>{props.data.likeCount}</p> : <></>}
        </div>
      </div>
    </div>
  )
}

function ReplyFooter(props: {
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
    moveCaretEnd(el);
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
          : <TextField placeholder='댓글을 입력해주세요.' defaultValue={value.replace(/\n$/, '')} autoFocus inputRef={props.replyRef} fullWidth multiline />
        }
      </div>
    )
  }

  return (
    <ThemeProvider theme={commentTheme}>
      <div className="flex flex-row comment-input">
        <MentionInput />
        <Button className='text-[16px] w-[70px] h-[48px]'>등록</Button>
      </div>
    </ThemeProvider>
  )
}
// Dialog 열렸을 때 작성 중이던 내용 유지 위해 memo
const MemoizedReplyFooter = memo(ReplyFooter)