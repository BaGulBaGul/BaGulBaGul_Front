import { ThemeProvider, Drawer, Box, List, ListItem, ListItemButton, ListItemText, Divider, Dialog, AppBar, Toolbar, IconButton, TextField, Button, Checkbox } from "@mui/material";
import { Fragment, useState } from "react";
import { commentMenuTheme, modifyCommentTheme, replyButtonTheme } from "./Themes";
import { FormatDateTime, applyLike } from "@/service/Functions";
import { CmtLikeIcn } from "./Icon";

export interface CommentProps {
  commentChildCount?: number; commentId?: number; commentChildId?: number; content: string; createdAt: string;
  likeCount: number; myLike: boolean; userId: number; username?: string; userName?: string; userImage?: string;
}
export interface CommentMProps { postCommentId: number; content: string; userId?: number; } // 댓글수정용

export function CommentBlock(props: { opt: string; data: CommentProps; currentURL?: string; setOpenD: any; setTargetM: any; handleMention?: any; }) {
  let createdD = FormatDateTime(props.data.createdAt, 1)
  const [liked, setLiked] = useState(props.data.myLike ?? false)
  const handleLike = () => {
    let apiURL = props.opt === 'CMT' ? `/api/post/comment/${props.data.commentId}/like` : `/api/post/comment/children/${props.data.commentChildId}/like`
    // applyLike(loginfo, liked, `/api/post/comment/${props.data.commentId}/like`, setLiked)
    applyLike(true, liked, apiURL, setLiked)
  }
  const handleToggle = () => {
    props.setOpenD(true)
    props.setTargetM({ postCommentId: props.data.commentId ?? props.data.commentChildId, content: props.data.content })
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
              <IconButton disableRipple className='p-0' onClick={handleToggle}><img src='/comment_etc.svg' width={24} height={24} /></IconButton>
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
              <IconButton disableRipple className='p-0' onClick={handleToggle}><img src='/comment_etc.svg' width={24} height={24} /></IconButton>
            </div>
            <div className='text-[14px] text-gray3 pb-[6px]' id='comment-body'>{props.data.content}</div>
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
          {props.data.likeCount !== 0 ? <p className='text-[12px] text-gray3 ps-[2px]'>{props.data.likeCount}</p> : <></>}
        </div>
      </div>
    </div>
  )
}

export function CommentDrawer(props: { open: boolean; toggleDrawer: any; setOpenM: any; }) {
  const handleClickOpen = () => { props.setOpenM(true); };
  return (
    <ThemeProvider theme={commentMenuTheme}>
      <Drawer open={props.open} onClose={props.toggleDrawer(false)} anchor='bottom'>
        <Box onClick={props.toggleDrawer(false)}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleClickOpen} disableRipple><ListItemText primary="수정하기" /></ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton disableRipple><ListItemText primary="삭제하기" className='text-[#FF0000]' /></ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </ThemeProvider>
  )
}

export function ModifyInput(props: { open: boolean; setOpenM: any; target?: CommentMProps; setTarget: any; }) {
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
              <IconButton edge="start" color="inherit" onClick={handleClose} ><img src='/arrow_prev.svg' /></IconButton>
              <p>댓글 수정</p>
              <p className='w-[24px] h-[24px]'></p>
            </Toolbar>
          </AppBar>
          <Divider />
          <TextField multiline defaultValue={props.target?.content} />
          <Button onClick={handleClose}>수정 완료</Button>
        </Dialog>
      </Fragment>
    </ThemeProvider>
  )
}