"use client";
import { Dispatch, SetStateAction, useEffect, useState, FocusEvent, memo } from 'react';
import { ThemeProvider, TextField, Button } from '@mui/material';
import { commentTheme } from '@/components/common/styles/Themes';
import ScrollToTop from './ScrollToTop';
import { useNewReply } from '@/hooks/useInComment';

function ReplyFooter(props: {
  url: string; qKey: any; mentioning: boolean; setMentioning: Dispatch<SetStateAction<boolean>>; 
  target: any; setMentionTarget?: Dispatch<SetStateAction<any>>; mentionRef: any; replyRef: any;
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

  const mutateReply = useNewReply(props.url, props.qKey, props.replyRef, props.mentionRef, props.target, props.setMentioning)
  const handleComment = () => {
    if ((props.mentionRef.current && props.mentionRef.current.innerText.length > 0 && props.target)
      || (props.replyRef.current && props.replyRef.current.value.length > 0)) {
      mutateReply.mutate()
    }
    else { alert('댓글 내용을 입력해주세요.') }
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
      <div className='editor-body'>
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
        <div className="comment-input flex flex-row">
          <MentionInput />
          <Button onClick={handleComment}>등록</Button>
        </div>
      </ThemeProvider>
    </div>
  )
}
// Dialog 열렸을 때 작성 중이던 내용 유지 위해 memo
export const MemoizedReplyFooter = memo(ReplyFooter)