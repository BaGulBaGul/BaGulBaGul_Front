"use client";
import React, { PropsWithChildren, ReactNode } from "react";
import { Dialog } from "@base-ui-components/react";

interface Props extends PropsWithChildren {
  headText: string; trigger?: ReactNode; handleDialogChange?: any; open?: boolean;
}
export function DialogPopup({ headText, trigger, handleDialogChange, open, children }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={handleDialogChange}>
      {trigger}
      <Dialog.Portal>
        <Dialog.Backdrop className='backdrop' />
        <Dialog.Popup className="fixed inline-block top-[50%] left-[50%] w-[250px] h-fit transform -translate-x-1/2 -translate-y-1/2 bg-p-white rounded-[8px] overflow-y-scroll z-paper place-items-center">
          <Dialog.Title className='text-18 font-semibold pt-[19px] p-[12px]'>{headText}</Dialog.Title>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

interface BodyProps extends PropsWithChildren { action?: ReactNode; closeText?: string; }
export function DialogPopupBody({ action, closeText, children }: BodyProps) {
  return (
    <>
      <Dialog.Description className='text-12 text-center pt-[4px] pb-[8px] px-[10px] w-full'>
        {children}
      </Dialog.Description>
      <div className='flex flex-row w-full p-[12px] gap-[10px] text-14'>
        <Dialog.Close className={'rounded-[4px] grow basis-0 p-[4px] ' + (!!action ? 'bg-gray1 text-black' : 'bg-primary-blue text-gray1')}>{closeText ?? '돌아가기'}</Dialog.Close>
        {action}
      </div>
    </>
  )
}