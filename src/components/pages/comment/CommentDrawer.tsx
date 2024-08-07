import { ThemeProvider, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { menuTheme } from "@/components/common/styles/Themes";
import { Divider } from "@/components/common";

export function CommentDrawer(props: { open: number; toggleDrawer: any; setOpenM: any; handleDelete: any; }) {
  const handleClickOpen = () => { props.setOpenM(true); };
  return (
    <ThemeProvider theme={menuTheme}>
      <Drawer open={props.open > 0 ? true : false} onClose={props.toggleDrawer(0)} anchor='bottom'>
        <div onClick={props.toggleDrawer(0)}>
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
        </div>
      </Drawer>
    </ThemeProvider>
  )
}