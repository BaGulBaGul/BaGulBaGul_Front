'use client';
import React, { useState } from "react";
import { IconPlus } from "@/components/common/styles/Icon";
import { DialogPopup, DialogPopupBody } from "@/components/common";
import { SearchInput } from "@/components/common/input";

export function CategoryAdd({ inputRef, handleAdd }: { inputRef: React.RefObject<HTMLInputElement>, handleAdd: () => void }) {
  const [open, setOpen] = useState(false);

  const AddButton = () => (
    <button onClick={() => setOpen(true)} className="flex flex-row p-[16px] gap-[16px] w-full bg-p-white text-14 font-semibold mb-[8px]">
      <IconPlus />
      <p>카테고리 만들기</p>
    </button>
  )
  return (
    <>
      <AddButton />
      <DialogPopup headText="카테고리 만들기" open={open} handleDialogChange={(open: boolean) => setOpen(open)}>
        <DialogPopupBody
          action={<button className="rounded-[4px] grow basis-0 p-[4px] bg-primary-blue text-gray1" onClick={() => { handleAdd(); setOpen(false) }}>추가하기</button>}>
          <SearchInput inputRef={inputRef} placeholder="카테고리명을 입력하세요." required={true} divStyle="rounded-[2px]" />
        </DialogPopupBody>
      </DialogPopup>
    </>
  )
}