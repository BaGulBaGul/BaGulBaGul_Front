"use client";
import { PropsWithChildren } from "react";
import { ThemeProvider, Dialog, DialogTitle, DialogContent, createTheme } from "@mui/material";
import { RadioIcn } from "../styles/Icon";

interface Props extends PropsWithChildren { open: boolean; handleClose: any; title?: string }
export function FilterDialog({ open, handleClose, title, children }: Props) {
  return (
    <ThemeProvider theme={filterTheme}>
      <Dialog open={open} onClose={handleClose} scroll="paper">
        <DialogTitle>{title ?? '바글바글 필터'}</DialogTitle>
        <DialogContent dividers={true}>
          {children}
        </DialogContent>
      </Dialog>
    </ThemeProvider >
  );
}

export const filterTheme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '8px 8px 0 0', margin: '72px 0 0', position: 'absolute', bottom: '0',
          maxHeight: 'calc(100vh-72px)', maxWidth: 'unset', width: '100vw'
        }
      }
    },
    MuiDialogTitle: { styleOverrides: { root: { fontWeight: '600', fontSize: '16px', lineHeight: '140%', padding: '20px 16px', } } },
    MuiDialogContent: { styleOverrides: { root: { display: 'flex', flexDirection: 'column', padding: '16px 16px 40px', gap: '16px' } } },
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiFormControlLabel: {
      defaultProps: { labelPlacement: 'end', },
      styleOverrides: { root: { margin: 0, marginRight: '8px !important', }, label: { fontSize: '14px !important' } }
    },
    MuiRadio: {
      defaultProps: { checkedIcon: <RadioIcn val={true} />, icon: <RadioIcn val={false} />, },
      styleOverrides: { root: { padding: 0, paddingRight: '4px !important' }, }
    },
  }
})