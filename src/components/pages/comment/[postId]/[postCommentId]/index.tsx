"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState, FocusEvent, memo } from 'react';
import { useParams, useRouter, } from 'next/navigation';
import { ThemeProvider, TextField, Button, Divider } from '@mui/material';
import { commentTheme } from '@/components/common/Themes';
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { call } from '@/service/ApiService';
import { setPageInfo, useEffectRefreshComment } from '@/service/Functions';
import { LoadingSkeleton, MoreButton, ScrollToTop } from '@/components/common';
import { CommentBlock, CommentDrawer, CommentMProps, CommentProps, ModifyInputR } from '@/components/common/Comment';

const index = () => {
  const [count, setCount] = useState(0);

  // menu drawer
  // 0: closed 1: for comment 2: for reply
  const [openD, setOpenD] = useState(0);
  const toggleDrawer = (newOpen: number) => () => { setOpenD(newOpen); };

  const [openM, setOpenM] = useState(false);
  const [targetM, setTargetM] = useState<CommentMProps | undefined>();

  const params = useParams()
  const [isLoadingC, setLoadingC] = useState(true)
  const [isLoadingR, setLoadingR] = useState(true)
  const [comment, setComment] = useState<CommentProps>()

  const router = useRouter()

  useEffect(() => {
    if (isLoadingC) {
      let apiURL = `/api/post/comment/${params.postCommentId}`;
      console.log("###", apiURL)
      call(apiURL, "GET", null)
        .then((response) => {
          if (response.data !== null) {
            console.log(response);
            setComment(response.data);
            setLoadingC(false)
          } else {
            router.replace(`/comment/${params.postId}`)
          }
        })
    }
  }, [isLoadingC])

  const [mentioning, setMentioning] = useState(false)
  const [mentionTarget, setMentionTarget] = useState<{ id: number, name: string } | undefined>(undefined)
  const [tmpTarget, setTmpTarget] = useState<{ id: number, name: string } | undefined>(undefined)  // Dialog 오픈 시 타겟값 임시 저장
  const mentionRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLInputElement>(null);

  // const handleClose = () => { setOpen(false); };
  // 멘션 대상 설정
  const switchMention = (data: { id: number, name: string }) => {
    setMentioning(true)
    setMentionTarget(data)
    setTmpTarget(undefined)
  }
  const handleMention = (data: CommentProps, e: any) => {
    e.stopPropagation();
    // 입력창에 작성 중인 댓글 있는 경우 타겟 임시 저장 후 Dialog
    if ((!mentioning && replyRef && replyRef.current !== null && replyRef.current.value.length > 0)
      || (mentioning && mentionRef && mentionRef.current !== null && mentionRef.current.children.namedItem('mention-highlight') !== null
        && mentionRef.current.innerText.length + 1 > (mentionRef.current.children.namedItem('mention-highlight')?.innerHTML.length ?? 0))) {
      setTmpTarget({ id: data.userId, name: data.userName ?? '' })
      let confirmSwitch = confirm("작성 중이던 댓글을 삭제하고 새로운 댓글을 작성하시겠습니까?");
      if (tmpTarget !== undefined && confirmSwitch) {
        switchMention(tmpTarget)
      }
    } // 없는 경우 바로 멘션 대상 설정 및 변경
    else if (data.commentChildId) { switchMention({ id: data.commentChildId, name: data.userName ?? '' }) }
  }

  useEffect(() => {
    if (mentioning && mentionRef && mentionRef.current) { mentionRef.current.focus() }
  }, [mentionTarget])

  const [tmp, setTmp] = useState<any[]>([])
  const [tmpP, setTmpP] = useState<number>();

  const handleDelete = () => { // * 삭제되는게 코멘트인 경우 어떻게 처리할지??
    let confirmDelete = confirm("댓글을 삭제하시겠습니까?");
    if (targetM && confirmDelete) {
      let apiURL = openD > 1 ? `/api/post/comment/children/${targetM.postCommentId}` : `/api/post/comment/${targetM.postCommentId}`
      console.log(apiURL)
      call(apiURL, "DELETE", null)
        .then((response) => {
          console.log(response)
          setTmp([])
          setTmpP(undefined)
          setLoadingC(true)
          setLoadingR(true)
        }).catch((error) => console.error(error));
    }
  }

  return (
    <>
      <SubHeaderCnt name='답글' cnt={count} />
      {
        !isLoadingC && comment !== undefined
          ? <div className='flex flex-col w-full min-h-[calc(100vh-104px)] pb-[88px] bg-gray1'>
            <div className='bg-[#FFF] px-[16px] py-[12px] mb-[2px]'>
              <CommentBlock opt='CMT' data={comment} currentURL='' setOpenD={setOpenD} setTargetM={setTargetM} />
            </div>
            <Replies setCount={setCount} setOpenD={setOpenD} setTargetM={setTargetM} handleMention={handleMention} postCommentId={params.postCommentId}
              isLoadingR={isLoadingR} setLoadingR={setLoadingR} tmp={tmp} setTmp={setTmp} setTmpP={setTmpP} tmpP={tmpP} />
          </div>
          : <div className='flex flex-col gap-[2px]'>
            <LoadingSkeleton type='CMT' />
            <Divider />
            <LoadingSkeleton type='RPL' />
          </div>
      }
      <MemoizedReplyFooter mentioning={mentioning} setMentioning={setMentioning} postCommentId={params.postCommentId} target={mentionTarget}
        mentionRef={mentionRef} replyRef={replyRef} setLoadingC={setLoadingC} setLoadingR={setLoadingR} setTmp={setTmp} setTmpP={setTmpP} />
      <CommentDrawer open={openD} toggleDrawer={toggleDrawer} setOpenM={setOpenM} handleDelete={handleDelete} />
      <ModifyInputR open={openM} setOpenM={setOpenM} target={targetM} setTarget={setTargetM} setLoading={setLoadingR} setTmp={setTmp} setTmpP={setTmpP} />
    </>
  )
}
export default index;

function Replies(props: {
  setCount: any; setOpenD: any; setTargetM: any; handleMention: any; postCommentId: any; isLoadingR: boolean; setLoadingR: any
  tmp: any[]; setTmp: any; setTmpP: any; tmpP?: number;
}) {
  const [children, setChildren] = useState<CommentProps[]>([]);

  const [page, setPage] = useState({ current: 0, total: 0, });
  const handleMore = () => {
    props.setLoadingR(true)
    setPageInfo(page, setPage, page.current + 1)
  }

  const initialSet = useRef(false);
  useEffectRefreshComment('RPL', `/api/post/comment/${props.postCommentId}/children?sort=createdAt,desc&size=10`, initialSet, page, setPage,
    props.setCount, props.isLoadingR, props.setLoadingR, setChildren, props.tmp, props.setTmp, props.setTmpP, props.tmpP)

  // if (props.isLoadingR) { return <LoadingSkeleton type='RPL' /> }
  // else {
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
// }

function ReplyFooter(props: {
  mentioning: boolean; setMentioning: Dispatch<SetStateAction<boolean>>; postCommentId: any; target: any; mentionRef: any; replyRef: any;
  setLoadingC: any; setLoadingR: any; setTmp: any; setTmpP: any;
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

  const handleComment = () => {
    if (props.mentionRef.current && props.mentionRef.current.innerText.length > 0 && props.target) {
      console.log('mention: ', props.mentionRef.current.innerText, props.target.id)
      call(`/api/post/comment/${props.postCommentId}/children`, "POST",
        { "content": props.mentionRef.current.innerText, "replyTargetPostCommentChildId": props.target.id })
        .then((response) => {
          console.log(response)
          props.setTmp([])
          props.setTmpP(undefined)
          props.setLoadingC(true)
          props.setLoadingR(true)
          if (props.mentionRef.current) { props.mentionRef.current.innerText = '' }
          props.setMentioning(false);
        }).catch((error) => console.error(error));
    } else if (props.replyRef.current && props.replyRef.current.value.length > 0) {
      call(`/api/post/comment/${props.postCommentId}/children`, "POST",
        { "content": props.replyRef.current.value })
        .then((response) => {
          console.log(response)
          props.setTmp([])
          props.setTmpP(undefined)
          props.setLoadingC(true)
          props.setLoadingR(true)
          if (props.replyRef.current) { props.replyRef.current.value = '' }
        }).catch((error) => console.error(error));
    } else {
      alert('댓글 내용을 입력해주세요.')
    }
  }

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = (e: any) => {
      setScrolled(e.target.documentElement.scrollTop > 150);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function MentionInput() {
    return (
      <div className='editor-body wrapper'>
        {props.mentioning
          ? <div className='mx-[24px] my-[13px] overflow-y-auto'>
            <div className='mention-reply-section' ref={props.mentionRef} contentEditable onInput={handleInput} onFocus={handleFocus}
              onKeyUp={handleCaret} onKeyDown={handleCaret} onMouseUp={handleCaret} suppressContentEditableWarning={true} >
              <span contentEditable={false} id='mention-highlight' className='text-primary-blue'>{`@${props.target.name} `}</span>
              <span className='w-full' contentEditable></span>
            </div>
          </div>
          : <TextField placeholder='댓글을 입력해주세요.' defaultValue={value.replace(/\n$/, '')} autoFocus inputRef={props.replyRef} fullWidth multiline maxRows={5} />
        }
      </div>
    )
  }

  return (
    <div className='comment-wrap'>
      <ThemeProvider theme={commentTheme}>
        {!scrolled ? <></> :
          <div className='flex justify-end pb-[16px] pe-[15px]'><ScrollToTop /></div>}
        <div className="flex flex-row comment-input">
          <MentionInput />
          <Button className='text-[16px] w-[70px] h-[48px]' onClick={handleComment}>등록</Button>
        </div>
      </ThemeProvider>
    </div>
  )
}
// Dialog 열렸을 때 작성 중이던 내용 유지 위해 memo
const MemoizedReplyFooter = memo(ReplyFooter)