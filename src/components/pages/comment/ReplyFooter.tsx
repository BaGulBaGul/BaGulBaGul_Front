"use client";
import { useState, memo } from 'react';
import { useNewReply } from '@/hooks/useInComment';
import { handleResizeHeight } from '@/service/Functions';
import { CommentFooterWrapper } from '.';

interface Props {
  url: string; qKey: any; mentioning: boolean; updateMentioning: (m: boolean) => void;
  target: any; mentionRef: any; replyRef: any; isLogin: boolean;
}
function ReplyFooter({ url, qKey, mentioning, updateMentioning, target, mentionRef, replyRef, isLogin }: Props) {
  const [value, setValue] = useState('')
  const [cmtEntered, setCmtEntered] = useState(false);

  const mutateReply = useNewReply(url, qKey, replyRef, mentionRef, target, updateMentioning)
  const handleComment = () => {
    if ((mentionRef.current && mentionRef.current.innerText.length > 0 && target)
      || (replyRef.current && replyRef.current.value.length > 0)) {
      mutateReply.mutate()
    }
    else { alert('댓글 내용을 입력해주세요.') }
  }

  const MentionInput = () => {
    const handleInput = (e: any) => {
      if (mentioning && mentionRef.current) {
        if (mentionRef.current.children.length <= 0 || mentionRef.current.children.namedItem('mention-highlight') === null) {
          setValue(e.target.innerText.replace(/\n$/, ''))
          updateMentioning(false);
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
    const handleFocus = (e: any) => {
      var el = e.currentTarget as HTMLInputElement
      moveCaretEnd(el);
      el.focus();
    }

    const handleCaret = (e: any) => {
      let el = mentionRef.current
      let caretOffset = 0;
      let winSel = window.getSelection()
      if (!!winSel) {
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
    return (
      <div className='editor-body'>
        <div className='mx-[24px] my-[13px] overflow-y-auto'>
          <div className='mention-reply-section' ref={mentionRef} contentEditable onInput={handleInput} onFocus={handleFocus}
            onKeyUp={handleCaret} onKeyDown={handleCaret} onMouseUp={handleCaret} suppressContentEditableWarning={true} >
            <span contentEditable={false} id='mention-highlight' className='text-primary-blue'>{`@${target.name} `}</span>
            <span className='w-full' contentEditable></span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <CommentFooterWrapper isLogin={isLogin} entered={cmtEntered} handleComment={handleComment}>
      {mentioning
        ? <MentionInput />
        : <textarea placeholder='댓글을 입력해주세요' rows={1} ref={replyRef}
          onInput={() => handleResizeHeight(replyRef, cmtEntered, (e: boolean) => setCmtEntered(e))}
          defaultValue={value.replace(/\n$/, '')}
          className='w-full max-h-[110px] mx-[24px] my-[13px] text-14 outline-none' />
      }
    </CommentFooterWrapper>
  )
}
// Dialog 열렸을 때 작성 중이던 내용 유지 위해 memo
export const MemoizedReplyFooter = memo(ReplyFooter)