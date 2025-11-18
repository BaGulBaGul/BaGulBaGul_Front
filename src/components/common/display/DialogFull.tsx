"use client";
import React, { PropsWithChildren, ReactNode } from "react";
import { Dialog } from "@base-ui-components/react";
import { IconArrowBack } from "../styles/Icon";
import { FooterButton } from "@/components/common";

interface Props extends PropsWithChildren {
  trigger?: ReactNode; footerText?: string; handleFooter?: any; handleDialogChange?: any; open?: boolean; fullStyle?: string
}
export function DialogFull({ trigger, footerText, handleFooter, handleDialogChange, open, fullStyle, children }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={handleDialogChange}>
      {trigger}
      <Dialog.Portal>
        <Dialog.Popup className={`fixed w-screen h-screen top-0 left-0 overflow-y-scroll ${fullStyle ?? 'bg-p-white'}`} style={{ zIndex: 1200 }}>
          {children}
          {footerText && <FooterButton text={footerText} handleClick={handleFooter} />}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function DialogHeader({ headerText, headerAction }: { headerText?: string; headerAction?: ReactNode; }) {
  return (
    <div className="header-nav fixed">
      <Dialog.Close><IconArrowBack /></Dialog.Close>
      <Dialog.Title className='text-18'>{headerText}</Dialog.Title>
      {headerAction ?? <div className='w-[24px]' />}
    </div>
  )
}