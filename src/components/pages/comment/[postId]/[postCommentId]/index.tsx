"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState, FocusEvent, memo } from 'react';
import { useParams } from 'next/navigation';
import { ThemeProvider, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, Divider } from '@mui/material';
import { commentTheme, mentionDialogTheme } from '@/components/common/Themes';
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { call } from '@/service/ApiService';
import { setPageInfo, useEffectComment } from '@/service/Functions';
import { LoadingSkeleton, MoreButton } from '@/components/common';
import { CommentBlock, CommentDrawer, CommentMProps, CommentProps, ModifyInput } from '@/components/common/Comment';

const index = () => {
  const [count, setCount] = useState(0);

  // menu drawer
  const [openD, setOpenD] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => { setOpenD(newOpen); };

  const [openM, setOpenM] = useState(false);
  const [targetM, setTargetM] = useState<CommentMProps | undefined>();

  const params = useParams()
  const [isLoadingC, setLoadingC] = useState(true)
  const [comment, setComment] = useState<CommentProps>()

  useEffect(() => {
    let apiURL = `/api/post/comment/${params.postCommentId}`;
    console.log("###", apiURL)
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response.data);
        setComment(response.data);
        setLoadingC(false)
      })
  }, [])

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
  const handleMention = (data: CommentProps) => {
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

  return (
    <>
      <SubHeaderCnt name='답글' url={"/"} cnt={count} />
      {
        !isLoadingC && comment !== undefined
          ? <div className='flex flex-col w-full min-h-[calc(100vh-104px)] pb-[49px] bg-gray1'>
            <div className='bg-[#FFF] px-[16px] py-[12px] mb-[2px]'>
              <CommentBlock opt='CMT' data={comment} currentURL='' setOpenD={setOpenD} setTargetM={setTargetM} />
            </div>
            <Replies setCount={setCount} setOpenD={setOpenD} setTargetM={setTargetM} handleMention={handleMention} postCommentId={params.postCommentId} />
          </div>
          : <div className='flex flex-col gap-[2px]'>
            <LoadingSkeleton type='CMT' />
            <Divider />
            <LoadingSkeleton type='RPL' />
          </div>
      }
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
export default index;

function Replies(props: { setCount: any; setOpenD: any; setTargetM: any; handleMention: any; postCommentId: any; }) {
  const [isLoadingR, setLoadingR] = useState(true)

  const [children, setChildren] = useState<CommentProps[]>([]);

  const [page, setPage] = useState({ current: 0, total: 0, });
  const handleMore = () => { setPageInfo(page, setPage, page.current + 1) }

  const initialSet = useRef(false);
  useEffectComment('RPL', `/api/post/comment/${props.postCommentId}/children?size=10&page=${page.current}`, initialSet, page, setPage,
    props.setCount, setLoadingR, setChildren, children)

  if (isLoadingR) { return <LoadingSkeleton type='RPL' /> }
  else {
    return (
      <div className='flex flex-col w-full'>
        {children.map((comment: CommentProps, idx: number) => (
          <div className={idx % 2 == 0 ? 'bg-[#FFF] ps-[48px] pe-[16px] py-[12px]' : 'bg-gray1 ps-[48px] pe-[16px] py-[12px]'} key={`reply-${idx}`} >
            <CommentBlock opt="RPL" data={comment} key={`cmt-${idx}`} setOpenD={props.setOpenD} setTargetM={props.setTargetM} handleMention={props.handleMention} />
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