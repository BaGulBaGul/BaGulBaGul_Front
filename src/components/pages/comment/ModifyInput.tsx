import { ThemeProvider, Dialog, AppBar, Toolbar, TextField } from "@mui/material";
import { Fragment, useRef, FocusEvent } from "react";
import { modifyCommentTheme } from "@/components/styles/Themes";
import { CommentMProps, Divider } from "@/components/common";
import { call } from "@/service/ApiService";

interface ModifyProps {
  open: boolean; setOpenM: any; target?: CommentMProps; setTarget: any; setLoading?: any; setTmp: any; setTmpP: any;
}
export function ModifyInput(props: ModifyProps) {
  const mdfRef = useRef<HTMLInputElement>(null);
  const handleClose = () => {
    props.setTarget(undefined);
    props.setOpenM(false);
  };
  const handleModify = () => {
    console.log(props.target?.postCommentId)
    console.log(mdfRef.current?.value)
    if (mdfRef.current?.value.replace(/\n$/, '').replace(/ /g, '').length === 0) { alert('댓글 내용을 입력해주세요.') }
    else if (mdfRef.current && mdfRef.current.value.length > 0 && props.target) {
      call(`/api/post/comment/${props.target.postCommentId}`, "PATCH", { "content": mdfRef.current.value })
        .then((response) => {
          console.log(response)
          props.setTmp([])
          props.setTmpP(undefined)
          props.setLoading(true)
          props.setTarget(undefined);
          props.setOpenM(false);
        }).catch((error) => console.error(error));
    }
  }

  return (
    <ThemeProvider theme={modifyCommentTheme}>
      <Fragment>
        <Dialog fullScreen open={props.open} onClose={handleClose} >
          <AppBar>
            <Toolbar>
              <button onClick={handleClose} ><img src='/arrow_prev.svg' /></button>
              <p>댓글 수정</p>
              <p className='w-[24px] h-[24px]'></p>
            </Toolbar>
          </AppBar>
          <Divider />
          <TextField multiline defaultValue={props.target?.content} inputRef={mdfRef} />
          <button className='footer-btn' onClick={handleModify}>수정 완료</button>
        </Dialog>
      </Fragment>
    </ThemeProvider>
  )
}

export function ModifyInputR(props: ModifyProps) {
  const mdfRef = useRef<HTMLDivElement>(null);
  const handleClose = () => {
    props.setTarget(undefined);
    props.setOpenM(false);
  };
  const handleModify = () => {
    if (mdfRef.current?.innerText.replace(/\n$/, '').replace(/ /g, '').length === 0) { alert('댓글 내용을 입력해주세요.') }
    else if (mdfRef.current && mdfRef.current.innerText.length > 0 && props.target) {
      let mentionTag = mdfRef.current.children.namedItem('mention-highlight')
      console.log(`/api/post/comment/children/${props.target.postCommentId}`)
      console.log(`{ "content": ${mdfRef.current.innerText}, "replyTargetUserId": ${(props.target.replyTargetUserName !== undefined && mentionTag === null) ? null : 0}}`)
      call(`/api/post/comment/children/${props.target.postCommentId}`, "PATCH",
        { "content": mdfRef.current.innerText, "replyTargetUserId": (props.target.replyTargetUserName !== undefined && mentionTag === null) ? null : 0 })
        .then((response) => {
          console.log(response);
          props.setTmp([])
          props.setTmpP(undefined)
          props.setLoading(true)
          props.setTarget(undefined);
          props.setOpenM(false);
        }).catch((error) => console.error(error));
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
    if (winSel !== null && winSel !== undefined && el !== null) {
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
  // 

  return (
    <ThemeProvider theme={modifyCommentTheme}>
      <Fragment>
        <Dialog fullScreen open={props.open} onClose={handleClose} >
          <AppBar>
            <Toolbar>
              <button onClick={handleClose} ><img src='/arrow_prev.svg' /></button>
              <p>댓글 수정</p>
              <p className='w-[24px] h-[24px]'></p>
            </Toolbar>
          </AppBar>
          <Divider />
          <div className="py-[12px] px-[16px]">
            <div className='mention-reply-section' ref={mdfRef} contentEditable onFocus={handleFocus}
              onKeyUp={handleCaret} onKeyDown={handleCaret} onMouseUp={handleCaret} suppressContentEditableWarning={true} >
              {
                props.target && props.target.replyTargetUserName
                  ? <>
                    <span contentEditable={false} id='mention-highlight' className='text-primary-blue'>{`@${props.target.replyTargetUserName} `}</span>
                    {
                      props.target.content.startsWith('@') && props.target.content.slice(1, props.target.replyTargetUserName.length + 1) === props.target.replyTargetUserName
                        ? props.target.content.slice(props.target.replyTargetUserName.length + 2)
                        : props.target.content ?? ''
                    }
                  </>
                  : <span className='w-full' contentEditable suppressContentEditableWarning={true}>{props.target?.content ?? ''}</span>
              }
            </div>
          </div>
          <button className='footer-btn' onClick={handleModify}>수정 완료</button>
        </Dialog>
      </Fragment>
    </ThemeProvider>
  )
}