import { TextField } from "@mui/material";
import React, { useRef, FocusEvent } from "react";
import { CommentMProps, FullscreenDialog } from "@/components/common";
import { useModify, useModifyR } from "@/hooks/useInComment";


interface ModifyProps {
  open: boolean; setOpenM: any; target?: CommentMProps; setTarget: any; origin: 'event' | 'event/recruitment'; qKey: any;
}

export function ModifyInput(props: ModifyProps) {
  const mdfRef = useRef<HTMLInputElement>(null);
  const mutateModify = useModify(`/api/${props.origin}/comment/${props.target?.commentId}`, props.qKey, mdfRef, props.setTarget, props.setOpenM)

  const handleModify = () => {
    if (mdfRef.current?.value.replace(/\n$/, '').replace(/ /g, '').length === 0) { alert('댓글 내용을 입력해주세요.') }
    else if (!!mdfRef.current && mdfRef.current.value.length > 0 && !!props.target) { mutateModify.mutate() }
  }
  const handleClose = () => {
    props.setTarget(undefined);
    props.setOpenM(false);
  };

  return (
    <FullscreenDialog child={<TextField multiline defaultValue={props.target?.content} inputRef={mdfRef} />}
      open={props.open} handleClose={handleClose} handleDone={handleModify} headerText='댓글 수정' footerText='수정 완료' />
  )
}

export function ModifyInputR(props: ModifyProps) {
  const mdfRef = useRef<HTMLDivElement>(null);
  const mutateModify = useModifyR(`/api/${props.origin}/comment/children/${props.target?.commentId}`, props.qKey, mdfRef, props.setTarget, props.setOpenM)

  const handleModify = () => {
    if (mdfRef.current?.innerText.replace(/\n$/, '').replace(/ /g, '').length === 0) { alert('댓글 내용을 입력해주세요.') }
    else if (mdfRef.current && mdfRef.current.innerText.length > 0 && props.target) {
      let mentionTag = mdfRef.current.children.namedItem('mention-highlight')
      let replying = props.target.replyTargetUserName !== undefined && mentionTag === null
      mutateModify.mutate(replying)
    }
  }

  const moveCaretEnd = (el: HTMLDivElement) => {
    var range = document.createRange();
    var sel = window.getSelection();
    if (el.childNodes && el.children.namedItem('mention-highlight') !== null) {
      if (el.childNodes.length > 1) { range.setStart(el.childNodes[1], 0); }
      range.collapse(true);
      if (sel !== null) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    var el = e.currentTarget as HTMLInputElement
    moveCaretEnd(el);
    el.focus();
  }

  const handleCaret = (e: any) => {
    let el = mdfRef.current
    let caretOffset = 0;
    let winSel = window.getSelection()
    if (!!winSel && el !== null) {
      var range = winSel.getRangeAt(0);
      var preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(el);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;

      if (caretOffset === 0) { moveCaretEnd(el) }
      else if (props.target && props.target.replyTargetUserName) {
        if (caretOffset === (props.target.replyTargetUserName.length + 1)) {
          if (e.type === 'keydown' && e.code === 'ArrowLeft') {
            e.preventDefault();
            return false;
          }
        }
      }
    }
  }

  function ReplyField() {
    return (
      <div className="py-[12px] px-[16px]">
        <div className='mention-reply-section' ref={mdfRef} contentEditable onFocus={handleFocus}
          onKeyUp={handleCaret} onKeyDown={handleCaret} onMouseUp={handleCaret} suppressContentEditableWarning={true} >
          {props.target && props.target.replyTargetUserName
            ? <>
              <span contentEditable={false} id='mention-highlight' className='text-primary-blue'>{`@${props.target.replyTargetUserName} `}</span>
              {props.target.content.startsWith('@') && props.target.content.slice(1, props.target.replyTargetUserName.length + 1) === props.target.replyTargetUserName
                ? props.target.content.slice(props.target.replyTargetUserName.length + 2)
                : props.target.content ?? ''
              }
            </>
            : <span className='w-full' contentEditable suppressContentEditableWarning={true}>{props.target?.content ?? ''}</span>
          }
        </div>
      </div>
    )
  }

  const handleClose = () => {
    props.setTarget(undefined);
    props.setOpenM(false);
  };

  return (
    <FullscreenDialog child={<ReplyField />} open={props.open} handleClose={handleClose} handleDone={handleModify} headerText='댓글 수정' footerText='수정 완료' />
  )
}