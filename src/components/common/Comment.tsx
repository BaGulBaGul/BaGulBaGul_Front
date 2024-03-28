import { ThemeProvider, Drawer, Box, List, ListItem, ListItemButton, ListItemText, Divider, Dialog, AppBar, Toolbar, IconButton, TextField, Button } from "@mui/material";
import { Fragment } from "react";
import { commentMenuTheme, modifyCommentTheme } from "./Themes";


export interface CommentProps {
  commentChildCount: number; commentId: number; content: string; createdAt: string;
  likeCount: number; myLike: Boolean; userId: number; username?: string; userName?: string; userImage?: string;
}
export interface CommentMProps { postCommentId: number; content: string; userId?: number; } // 수정용

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
              <IconButton edge="start" color="inherit" onClick={handleClose} >
                <img src='/arrow_prev.svg' />
              </IconButton>
              <p>댓글 수정</p>
              <p className='w-[24px] h-[24px]'></p>
            </Toolbar>
          </AppBar>
          <Divider/>
          <TextField multiline defaultValue={props.target?.content} />
          <Button onClick={handleClose}>수정 완료</Button>
        </Dialog>
      </Fragment>
    </ThemeProvider>
  )
}