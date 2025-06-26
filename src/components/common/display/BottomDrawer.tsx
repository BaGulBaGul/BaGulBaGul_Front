import { useState } from "react";
import { createTheme, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, ThemeProvider } from "@mui/material";
import { ReportDialog } from "@/components/common";

type Props = {
  open: boolean; toggleDrawer: (open: boolean) => () => void; type: 'comment' | 'comment-child' | 'event' | 'recruitment'; target: number | undefined;
} & ({ me: true; handleEdit: any; handleDelete: any; } | { me: false; });

export function BottomDrawer(props: Props) {
  const [openR, setOpenR] = useState(false);
  if (props.target === undefined) { return <></> }
  return (
    <>
      <ThemeProvider theme={menuTheme}>
        <Drawer open={props.open} onClose={props.toggleDrawer(false)} anchor='bottom'>
          <div onClick={props.toggleDrawer(false)}>
            <List>
              {!!props.me
                ? <>
                  <DrawerBlock title='수정하기' handleClick={props.handleEdit} />
                  <Divider />
                  <DrawerBlock title='삭제하기' handleClick={props.handleDelete} itemStyle="text-[#FF0000]" />
                </>
                : <DrawerBlock title='신고하기' handleClick={() => setOpenR(true)} />
              }
            </List>
          </div>
        </Drawer>
      </ThemeProvider>
      <ReportDialog open={openR} setOpen={setOpenR} type={props.type} target={props.target} />
    </>
  )
}

const menuTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderTopLeftRadius: '8px !important', borderTopRightRadius: '8px !important',
          paddingBottom: '40px !important',
        },
      }
    },
    MuiList: { styleOverrides: { root: { padding: '0px' } } },
    MuiListItemButton: { styleOverrides: { root: { padding: '20px 16px' } } },
    MuiListItemText: {
      styleOverrides: { root: { margin: '0px' }, primary: { fontSize: '14px', }, }
    },
  },
});

function DrawerBlock({ title, handleClick, itemStyle }: { title: string; handleClick: () => void; itemStyle?: string }) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick} disableRipple><ListItemText primary={title} className={itemStyle} /></ListItemButton>
    </ListItem>
  )
}