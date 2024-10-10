import { ThemeProvider, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { menuTheme } from "@/components/common/styles/Themes";
import { Divider } from "@/components/common";

export function CommentDrawer(props: { open: boolean; opt: 0 | 1; toggleDrawer: any; setOpenM: any; handleDelete: any; }) {
  const handleClickOpen = () => { props.setOpenM(true); };
  const handleReport = () => {
    console.log('신고하기');
  }
  return (
    <ThemeProvider theme={menuTheme}>
      <Drawer open={props.open} onClose={props.toggleDrawer(0)} anchor='bottom'>
        <div onClick={props.toggleDrawer(0)}>
          {
            props.opt === 0 // 0: 작성자인 경우
              ? <>
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
              </>
              : <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleReport} disableRipple><ListItemText primary="신고하기" /></ListItemButton>
                </ListItem>
              </List>
          }
        </div>
      </Drawer>
    </ThemeProvider>
  )
}