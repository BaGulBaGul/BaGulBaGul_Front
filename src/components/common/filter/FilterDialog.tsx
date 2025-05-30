"use client";
import { PropsWithChildren } from "react";
import { ThemeProvider, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { filterTheme } from "./FilterTheme";

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