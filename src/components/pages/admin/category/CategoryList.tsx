'use client';
import React from "react";
import { useSortable } from '@dnd-kit/sortable';
import { Toggle, ToggleGroup } from '@base-ui-components/react';
import { DndHandler, DndItem } from "..";

interface ListProps {
  items: string[]; editing: boolean; selectedItems: string[]; handleCategory: (groupValue: any[], e: Event) => void;
}
export function CategoryList({ items, editing, selectedItems, handleCategory }: ListProps) {
  return (
    <ToggleGroup value={selectedItems} onValueChange={handleCategory} toggleMultiple={true} orientation="vertical">
      {items.map(item => (
        <Item key={item} name={item} editing={editing} selected={selectedItems.some(x => x === item)} />
      ))}
    </ToggleGroup>
  )
}

interface ItemProps { name: string; editing: boolean; selected: boolean; }
function Item({ name, editing, selected }: ItemProps) {
  const sortable = useSortable({ id: name });
  return (
    <DndItem sortable={sortable}>
      <Toggle value={name} className="flex flex-row justify-between w-screen text-14 p-[16px] bg-p-white">
        <div className="flex flex-row gap-[16px] items-center">
          {!editing? <></> : <span><CheckboxIcn val={selected} /></span>}
          {name}
        </div>
        <DndHandler sortable={sortable} />
      </Toggle>
    </DndItem>
  );
};

// * 체크박스 아이콘 수정 필요
const CheckboxIcn = (props: { val: boolean }) => {
  if (!props.val) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.575928" width="15" height="15" rx="3.5" stroke="#6C6C6C" />
      </svg>
    )
  } else {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 7.18182L7 11L12.5 5" stroke="#4A6AFE" />
        <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#6C6C6C" />
      </svg>
    )
  }
}