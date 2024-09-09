import { ThemeProvider, Dialog, AppBar, Toolbar, TextField, createTheme } from "@mui/material";
import React, { Fragment, useRef, FocusEvent } from "react";
import { CommentMProps, Divider } from "@/components/common";
import { call } from "@/service/ApiService";
import { HeaderBackIcn } from "@/components/common/styles/Icon";

interface ModifyProps {
  open: boolean; setOpenM: any; target?: CommentMProps; setTarget: any; setLoading?: any; setTmp: any; setTmpP: any; origin: 'event' | 'event/recruitment';
}

export function ModifyInput(props: ModifyProps) {
  const mdfRef = useRef<HTMLInputElement>(null);
  const handleModify = () => {
    console.log(props.target?.commentId)
    console.log(mdfRef.current?.value)
    if (mdfRef.current?.value.replace(/\n$/, '').replace(/ /g, '').length === 0) { alert('댓글 내용을 입력해주세요.') }
    else if (mdfRef.current && mdfRef.current.value.length > 0 && props.target) {
      call(`/api/${props.origin}/comment/${props.target.commentId}`, "PATCH", { "content": mdfRef.current.value })
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
    <ModifyFragment child={<TextField multiline defaultValue={props.target?.content} inputRef={mdfRef} />}
      setTarget={props.setTarget} open={props.open} setOpenM={props.setOpenM} handleModify={handleModify} />
  )
}

export function ModifyInputR(props: ModifyProps) {
  const mdfRef = useRef<HTMLDivElement>(null);
  const handleModify = () => {
    if (mdfRef.current?.innerText.replace(/\n$/, '').replace(/ /g, '').length === 0) { alert('댓글 내용을 입력해주세요.') }
    else if (mdfRef.current && mdfRef.current.innerText.length > 0 && props.target) {
      let mentionTag = mdfRef.current.children.namedItem('mention-highlight')
      console.log(`/api/${props.origin}/comment/children/${props.target.commentId}`)
      console.log(`{ "content": ${mdfRef.current.innerText}, "replyTargetUserId": ${(props.target.replyTargetUserName !== undefined && mentionTag === null) ? null : 0}}`)
      call(`/api/${props.origin}/comment/children/${props.target.commentId}`, "PATCH",
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

  const ReplyField = () => {
    return (
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
    )
  }

  return (
    <ModifyFragment child={<ReplyField />} setTarget={props.setTarget} open={props.open} setOpenM={props.setOpenM} handleModify={handleModify} />
  )
}

const ModifyFragment = (props: { child: React.JSX.Element, setTarget: any, open: boolean, setOpenM: any, handleModify: any }) => {
  const handleClose = () => {
    props.setTarget(undefined);
    props.setOpenM(false);
  };
  return (
    <ThemeProvider theme={modifyCommentTheme}>
      <Fragment>
        <Dialog fullScreen open={props.open} onClose={handleClose} >
          <AppBar>
            <Toolbar>
              <button onClick={handleClose} ><HeaderBackIcn /></button>
              <p>댓글 수정</p>
              <p className='w-[24px] h-[24px]'></p>
            </Toolbar>
          </AppBar>
          <Divider />
          {props.child}
          <button className='footer-btn' onClick={props.handleModify}>수정 완료</button>
        </Dialog>
      </Fragment>
    </ThemeProvider>
  )
}

const modifyCommentTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFF', boxShadow: 'unset',
          color: '#1E1E1E', fontSize: '18px', lineHeight: '160%',
          position: 'relative', padding: '0px !important'
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: 'flex', justifyContent: 'space-between', flexDirection: 'row', padding: '15.5px 17px !important',
          minHeight: 'unset !important'
        }
      }
    },
    MuiTextField: { styleOverrides: { root: { height: '100%' } } },
    MuiInputBase: {
      styleOverrides: {
        root: { padding: '12px 16px !important', },
        input: {
          height: 'calc(100vh - 161px) !important', fontSize: '14px', lineHeight: '160%', color: '#6C6C6C',
        }
      }
    },
    MuiOutlinedInput: { styleOverrides: { root: { border: 'none', "& fieldset": { border: 'none' }, } } }
  }
})