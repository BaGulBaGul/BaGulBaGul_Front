"use client";
import { PropsWithChildren, useRef } from "react";
import { BottomDrawer } from "../display/BottomDrawer";
import { Dialog } from "@base-ui-components/react";
import { Divider } from "..";

interface Props extends PropsWithChildren { isOpen: boolean; handleSubmit: (e: any) => void; title?: string; }
export function DialogFilter({ isOpen, handleSubmit, title, children }: Props) {
  const submitRef = useRef<any>();
  const handleChange = (open: boolean) => {
    if (!open) { submitRef.current.requestSubmit() }
  }
  return (
    <BottomDrawer open={isOpen} toggleOpen={handleChange}>
      <Dialog.Title className='text-16 font-semibold px-[16px] py-[20px]'>{title ?? '바글바글 필터'}</Dialog.Title>
      <Divider />
      <form ref={submitRef} onSubmit={handleSubmit} id='filter-form' className="flex flex-col gap-[16px] p-[16px] pb-[40px]">
        {children}
      </form>
    </BottomDrawer>
  );
}