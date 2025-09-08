'use client';
import React, { useRef, useState } from "react";
import { categories } from "@/components/common/input/CategoryButtons"
import { SubTopHeader } from "@/components/layout/subHeader";
import { AlertDialog, EditButton, FooterButton } from "@/components/common";
import { SearchInput } from "@/components/common/input";
import { CategoryList, DndWrapper } from "..";
import { IconPlus } from "@/components/common/styles/Icon";

//  * ====== 250522 : AlertDialog UI 추가 수정 필요
export function CategoryPage() {
  const [data, setData] = useState(categories);
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleEdit = () => {
    if (!!editing && selectedItems.length > 0) { setSelectedItems([]) }
    setEditing(!editing)
  }

  const addCategory = () => {
    if (inputRef.current?.value) {
      setData((prev: any) => [...prev, inputRef.current?.value]);
      inputRef.current.value = '';
    }
    setOpen(false);
  }

  const handleSelected = (value: any[], e: Event) => { setSelectedItems(value); }

  //   if (!!props.edit && (!!prev && !prev.isSuccess)) { return (<SkeletonWrite opt='r' />) }
  return (
    <>
      <SubTopHeader name='카테고리 관리' child={<EditButton editing={editing} handleEdit={handleEdit} />} />
      <div className="flex flex-col pt-[68px]">
        <button onClick={() => { setOpen(true) }} className="flex flex-row p-[16px] gap-[16px] w-full bg-p-white text-14 font-semibold mb-[8px]">
          <IconPlus />
          <p>카테고리 만들기</p>
        </button>
        <DndWrapper id="category-list" items={data} updateItems={(newData: string[]) => setData(newData)}>
          <CategoryList items={data} editing={editing} selectedItems={selectedItems} handleCategory={handleSelected} />
        </DndWrapper>
        <AlertDialog open={open} setOpen={setOpen} headerText='카테고리 만들기' buttonText1='닫기' buttonText2='추가하기' buttonAction={addCategory} >
          <SearchInput inputRef={inputRef} placeholder="카테고리명을 입력하세요." required={true} divStyle="rounded-[2px]" />
        </AlertDialog>
      </div>
      {editing && <FooterButton text='삭제하기' />}
    </>
  )
}

export const removeAtIndex = (array: [], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = (array: [], index: number, item: any) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};