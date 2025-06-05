import { useState } from "react";
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, ThemeProvider } from "@mui/material";
import { ReportDialog } from "@/components/common/report/ReportDialog";
import { menuTheme } from "../styles/Themes";
import { CommentMProps } from "..";

interface BottomDrawerProps {
  open: boolean; toggleDrawer: any; opt: 'EVT' | 'RCT' | 'CMT'; target: number | CommentMProps; me: boolean;
  handleEdit?: any; handleDelete?: any;
}
export function BottomDrawer(props: BottomDrawerProps) {
  const [openR, setOpenR] = useState(false);
  const handleReport = () => { setOpenR(true); }
  return (
    <>
      <ThemeProvider theme={menuTheme}>
        <Drawer open={props.open} onClose={props.toggleDrawer(false)} anchor='bottom'>
          <div onClick={props.toggleDrawer(false)}>
            {props.me
              ? <>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton onClick={props.handleEdit} disableRipple><ListItemText primary="수정하기" /></ListItemButton>
                  </ListItem>
                  <Divider />
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
      {!!props.target
        ? props.opt !== 'CMT'
          ? <ReportDialog open={openR} setOpen={setOpenR} type={props.opt === 'EVT' ? 'event' : 'recruitment'} target={props.target as number} />
          : <ReportDialog open={openR} setOpen={setOpenR} type={(props.target as CommentMProps).opt === 'CMT' ? "comment" : "comment-child"} target={(props.target as CommentMProps).commentId} />
        : <></>
      }

    </>
  )
}