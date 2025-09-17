"use client";
import { PropsWithChildren } from "react";
import { BottomDrawer } from "../display/BottomDrawer";
import { Dialog } from "@base-ui-components/react";
import { Divider } from "..";

interface Props extends PropsWithChildren { isOpen: boolean; handleClose: () => void; title?: string; }
export function DialogFilter({ isOpen, handleClose, title, children }: Props) {
  const handleChange = (open: boolean) => {
    if (!open) { handleClose() }
  }
  return (
    <BottomDrawer open={isOpen} toggleOpen={handleChange}>
      <Dialog.Title className='text-16 font-semibold px-[16px] py-[20px]'>{title ?? '바글바글 필터'}</Dialog.Title>
      <Divider />
      <div className="flex flex-col gap-[16px] p-[16px] pb-[40px]">
        {children}
      </div>
    </BottomDrawer>
  );
}