import { ThemeProvider, Drawer, Box, List, ListItem, ListItemButton, ListItemText, Divider, Dialog, AppBar, Toolbar, IconButton, TextField, Button, Checkbox } from "@mui/material";
import { Fragment, useRef, useState, MouseEvent, FocusEvent } from "react";
import { commentMenuTheme, modifyCommentTheme, replyButtonTheme } from "./Themes";
import { FormatDateTime, applyLike } from "@/service/Functions";
import { CmtLikeIcn } from "./Icon";
import { call } from "@/service/ApiService";

export interface CommentProps {
  commentChildCount?: number; commentId?: number; commentChildId?: number; content: string; createdAt: string;
  likeCount: number; myLike: boolean; userId: number; username?: string; userName?: string; userProfileImageUrl?: string;
  replyTargetUserName?: string;
}
export interface CommentMProps { postCommentId: number; content: string; userId?: number; replyTargetUserName?: string; } // 댓글수정용

export function CommentBlock(props: { opt: string; data: CommentProps; currentURL?: string; setOpenD: any; setTargetM: any; handleMention?: any; }) {
  let createdD = FormatDateTime(props.data.createdAt, 1)
  const [liked, setLiked] = useState(props.data.myLike ?? false)
  const [likeCount, setLikeCount] = useState<number>(props.data.likeCount ?? undefined)
  const handleLike = () => {
    let apiURL = props.opt === 'CMT' ? `/api/post/comment/${props.data.commentId}/like` : `/api/post/comment/children/${props.data.commentChildId}/like`
    applyLike(true, liked, apiURL, setLiked, setLikeCount)
  }
  const handleToggle = (e: MouseEvent) => {
    e.stopPropagation();
    props.setOpenD(props.opt === 'CMT' ? 1 : 2)
    props.setTargetM({ postCommentId: props.data.commentId ?? props.data.commentChildId, content: props.data.content, userId: props.data.userId, replyTargetUserName: props.data.replyTargetUserName })
  }
  return (
    <div>
      {
        props.opt === 'CMT'
          ? <>
            <div className='flex flex-row justify-between pb-[10px]' id='comment-head'>
              <div className='flex flex-row items-center'>
                <a className="flex place-items-center" href="/">
                  <img src="/main_profile.svg" width={24} height={24} />
                </a>
                <div className='text-[14px] ps-[8px]'>{props.data.username ?? props.data.userName}</div>
              </div>
              <IconButton disableRipple className='p-0' onClick={(e) => handleToggle(e)}><img src='/comment_etc.svg' width={24} height={24} /></IconButton>
            </div>
            <div className='text-[14px] text-gray3 pb-[6px]' id='comment-body'>{props.data.content}</div>
            <div className='flex flex-row text-[12px] text-gray3' id='comment-datetime'>
              <p className='pe-[6px]'>{createdD.date}</p><p>{createdD.time}</p>
            </div>
          </>
          : <div onClick={(e) => { props.handleMention(props.data) }}>
            <div className='flex flex-row justify-between pb-[10px]' id='comment-head'>
              <div className='flex flex-row items-center'>
                <a className="flex place-items-center" href="/">
                  <img src="/main_profile.svg" width={24} height={24} />
                </a>
                <div className='text-[14px] ps-[8px]'>{props.data.username ?? props.data.userName}</div>
              </div>
              <IconButton disableRipple className='p-0' onClick={(e) => handleToggle(e)}><img src='/comment_etc.svg' width={24} height={24} /></IconButton>
            </div>
            <div className='text-[14px] text-gray3 pb-[6px]' id='comment-body'>
              {
                props.data.replyTargetUserName
                  ? <>
                    <span className="text-primary-blue">@{props.data.replyTargetUserName} </span>
                    <span>{
                      props.data.content.startsWith('@') && props.data.content.slice(1, props.data.replyTargetUserName.length + 1) === props.data.replyTargetUserName
                        ? props.data.content.slice(props.data.replyTargetUserName.length + 1)
                        : props.data.content
                    }</span>
                  </>
                  : <span>{props.data.content}</span>
              }
            </div>
          </div>
      }
      <div className='flex flex-row justify-between items-center pt-[8px]' id='comment-foot'>
        {props.opt === 'CMT'
          ? <a href={props.currentURL !== undefined ? `${props.currentURL}/${props.data.commentId}` : ''}>
            <ThemeProvider theme={replyButtonTheme}>
              {props.data.commentChildCount && props.data.commentChildCount > 0
                ? <Button className={'flex flex-row text-[12px] border-primary-blue text-primary-blue'}>
                  <p>답글</p><p className='ps-[4px]'>{props.data.commentChildCount}</p>
                </Button>
                : <Button className={'flex flex-row text-[12px]'}>답글</Button>
              }
            </ThemeProvider>
          </a>
          : <div className='flex flex-row text-[12px] text-gray3' id='comment-datetime'>
            <p className='pe-[6px]'>{createdD.date}</p><p>{createdD.time}</p>
          </div>
        }
        <div className='flex flex-row items-center' id='comment-likes'>
          <Checkbox icon={<CmtLikeIcn val={false} />} checkedIcon={<CmtLikeIcn val={true} />} checked={liked} onChange={handleLike}
            disableRipple className='p-0' />
          {likeCount > 0 ? <p className='text-[12px] text-gray3 ps-[2px]'>{likeCount}</p> : <></>}
        </div>
      </div>
    </div>
  )
}

export function CommentDrawer(props: { open: number; toggleDrawer: any; setOpenM: any; handleDelete: any; }) {
  const handleClickOpen = () => { props.setOpenM(true); };
  return (
    <ThemeProvider theme={commentMenuTheme}>
      <Drawer open={props.open > 0 ? true : false} onClose={props.toggleDrawer(0)} anchor='bottom'>
        <Box onClick={props.toggleDrawer(0)}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleClickOpen} disableRipple><ListItemText primary="수정하기" /></ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={props.handleDelete} disableRipple><ListItemText primary="삭제하기" className='text-[#FF0000]' /></ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </ThemeProvider>
  )
}


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
              <IconButton edge="start" color="inherit" onClick={handleClose} ><img src='/arrow_prev.svg' /></IconButton>
              <p>댓글 수정</p>
              <p className='w-[24px] h-[24px]'></p>
            </Toolbar>
          </AppBar>
          <Divider />
          <TextField multiline defaultValue={props.target?.content} inputRef={mdfRef} />
          <Button onClick={handleModify}>수정 완료</Button>
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
              <IconButton edge="start" color="inherit" onClick={handleClose} ><img src='/arrow_prev.svg' /></IconButton>
              <p>댓글 수정</p>
              <p className='w-[24px] h-[24px]'></p>
            </Toolbar>
          </AppBar>
          <Divider />
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
          <Button onClick={handleModify}>수정 완료</Button>
        </Dialog>
      </Fragment>
    </ThemeProvider>
  )
}