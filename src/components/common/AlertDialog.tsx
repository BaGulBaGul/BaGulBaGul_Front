"use client";
import { ThemeProvider, Dialog, createTheme, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Link from "next/link";
import React, {PropsWithChildren} from "react";

interface AlertDialogProps extends PropsWithChildren {
  open: boolean; setOpen: any; headerText: string;
  buttonText1: string; buttonText2?: string; buttonLink?: string; buttonAction?: any;
}

export const AlertDialog = (props: AlertDialogProps) => {
  const handleClose = (e: any) => { e.stopPropagation(); props.setOpen(false); }
  return (
    <ThemeProvider theme={dialogTheme}>
      <Dialog open={props.open} onClose={handleClose} >
        <DialogTitle>{props.headerText}</DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>{
          !!props.buttonText2
            ? <>
              <button onClick={handleClose} className='secondary'>{props.buttonText1}</button>
              {!!props.buttonLink ?
                <Link href={props.buttonLink}>{props.buttonText2}</Link>
                : <button onClick={props.buttonAction} >{props.buttonText2}</button>}
            </>
            : <button onClick={handleClose} autoFocus>{props.buttonText1}</button>
        }</DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}


export const dialogTheme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: { margin: 0, borderRadius: '8px', maxHeight: 'unset', maxWidth: 'unset', width: '250px' }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '20px 18px 12px', fontWeight: '600', fontSize: '18px', lineHeight: '140%',
          display: 'flex', flexDirection: 'row', justifyContent: 'center'
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          fontSize: '12px', paddingTop: '4px !important', paddingBottom: '8px', textAlign: 'center',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '12px 15px',
          'button, a': {
            width: '100%', fontSize: '14px', fontWeight: '400', lineHeight: '160%', textAlign: 'center',
            padding: '4px 0px', backgroundColor: '#4A6AFE', color: '#ECECEC', borderRadius: '4px'
          },
          'button.secondary': { backgroundColor: '#ECECEC !important', color: '#1E1E1E !important' }
        }
      }
    },
  }
})