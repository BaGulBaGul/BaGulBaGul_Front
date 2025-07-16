"use client";
import React, { PropsWithChildren, ReactNode } from "react";
import { Dialog } from "@base-ui-components/react";
import { HeaderBackIcn } from "@/components/common/styles/Icon";
import { FooterButton } from "@/components/common";

interface Props extends PropsWithChildren {
  headerText?: string; triggerStyle: string; dialogBody?: ReactNode; footerText: string;
}

export function DialogFull({ headerText, triggerStyle, dialogBody, footerText, children }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={triggerStyle}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup className="fixed w-screen h-screen top-0 left-0 bg-p-white overflow-y-scroll z-paper">
          <div className="header-nav fixed">
            <Dialog.Close><HeaderBackIcn /></Dialog.Close>
            <Dialog.Title className='text-18'>{headerText}</Dialog.Title>
            <div className='w-[24px]'/>
          </div>
          {dialogBody}
          <FooterButton text={footerText} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}