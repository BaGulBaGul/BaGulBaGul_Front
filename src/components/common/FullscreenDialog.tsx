"use client";
import { ThemeProvider, Dialog, AppBar, Toolbar, createTheme } from "@mui/material";
import React, { Fragment } from "react";
import { Divider } from "@/components/common";
import { HeaderBackIcn } from "@/components/common/styles/Icon";

interface FullscreenDialogProps {
  child: React.JSX.Element; open: boolean; handleClose: any; handleDone: any; headerText: string; footerText: string;
  bg?: string;
}
export const FullscreenDialog = (props: FullscreenDialogProps) => {
  return (
    <ThemeProvider theme={fullscreenDialogTheme}>
      <Fragment>
        <Dialog fullScreen open={props.open} onClose={props.handleClose}
          PaperProps={props.bg ? { style: { backgroundColor: props.bg } } : undefined} >
          <AppBar>
            <Toolbar>
              <button onClick={props.handleClose} ><HeaderBackIcn /></button>
              <p>{props.headerText}</p>
              <p className='w-[24px] h-[24px]'></p>
            </Toolbar>
          </AppBar>
          <Divider />
          {props.child}
          <button className='footer-btn' onClick={props.handleDone}>{props.headerText}</button>
        </Dialog>
      </Fragment>
    </ThemeProvider>
  )
}

const fullscreenDialogTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFF', boxShadow: 'unset', color: '#1E1E1E', fontSize: '18px', lineHeight: '160%',
          position: 'relative', padding: '0px !important'
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: 'flex', justifyContent: 'space-between', flexDirection: 'row', padding: '15.5px 17px !important', minHeight: 'unset !important'
        }
      }
    },
    MuiTextField: { styleOverrides: { root: { height: '100%' } } },
    MuiInputBase: {
      styleOverrides: {
        root: { padding: '12px 16px !important', },
        input: { height: 'calc(100vh - 161px) !important', fontSize: '14px', lineHeight: '160%', color: '#6C6C6C', }
      }
    },
    MuiOutlinedInput: { styleOverrides: { root: { border: 'none', "& fieldset": { border: 'none' }, } } }
  }
})