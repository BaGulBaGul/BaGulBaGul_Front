'use client';
import React, { useRef, useState } from "react";
import { categories } from "@/components/common/input/CategoryButtons"
import { SubTopHeader } from "@/components/layout/subHeader";
import { EditButton, FooterButton } from "@/components/common";
import { CategoryList, DndWrapper, CategoryAdd } from "..";

export function CategoryPage() {
  const [data, setData] = useState(categories);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleEdit = () => {
    if (!!editing && selectedItems.length > 0) { setSelectedItems([]) }
    setEditing(!editing)
  }

  const addCategory = () => {
    if (inputRef.current?.value) {
      if (!data.includes(inputRef.current.value)) {
        setData((prev: any) => [...prev, inputRef.current?.value]);
        inputRef.current.value = '';
      } else {
        alert('이미 존재하는 카테고리입니다.')
      }
    }
  }

  const handleSelected = (value: any[], e: Event) => { setSelectedItems(value); }

  //   if (!!props.edit && (!!prev && !prev.isSuccess)) { return (<SkeletonWrite opt='r' />) }
  return (
    <>
      <SubTopHeader name='카테고리 관리' child={<EditButton editing={editing} handleEdit={handleEdit} />} />
      <div className={`flex flex-col pt-[68px] ${editing && ' pb-[77px]'}`}>
        <CategoryAdd inputRef={inputRef} handleAdd={addCategory} />
        <DndWrapper id="category-list" items={data} updateItems={(newData: string[]) => setData(newData)}>
          <CategoryList items={data} editing={editing} selectedItems={selectedItems} handleCategory={handleSelected} />
        </DndWrapper>
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