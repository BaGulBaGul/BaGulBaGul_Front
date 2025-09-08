'use client';
import React from "react";
import { useSortable } from '@dnd-kit/sortable';
import { Toggle, ToggleGroup } from '@base-ui-components/react';
import { DndHandler, DndItem } from "..";
import { IconCheck } from "@/components/common/styles/Icon";

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
          {!!editing && <span className="p-[3px]"><IconCheck checked={selected} /></span>}
          {name}
        </div>
        <DndHandler sortable={sortable} />
      </Toggle>
    </DndItem>
  );
};