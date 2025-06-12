'use client';
import React, { useRef, useState } from "react";
import { categories } from "@/components/common/input/CategoryButtons"
import { SubTopHeader } from "@/components/layout/subHeader";
import { AlertDialog, EditButton } from "@/components/common";
import CategoryList from "./CategoryList";
import { SearchInput } from "@/components/common/input";


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

	const handleCategory = (e: React.MouseEvent<HTMLElement>, newItem: string) => {
		console.log('newItem', newItem);
		if (editing) {
			if (selectedItems.some(x => x === newItem)) { // 선택 해제
				setSelectedItems(selectedItems.filter(function (itm) { return itm !== newItem }))
			} else {  // 선택
				setSelectedItems(selectedItems.concat(newItem));
			}
		}
	}
	console.log('selectedItems', selectedItems);

	//   if (!!props.edit && (!!prev && !prev.isSuccess)) { return (<SkeletonWrite opt='r' />) }
	return (
		<>
			<SubTopHeader name='카테고리 관리' child={<EditButton editing={editing} handleEdit={handleEdit} />} />
			<div className="flex flex-col pt-[68px]">
				<button onClick={() => { setOpen(true) }} className="flex flex-row p-[16px] gap-[16px] w-full bg-p-white text-14 font-semibold mb-[8px]">
					<CategoryAddIcn />
					<p>카테고리 만들기</p>
				</button>
				<CategoryList items={data} updateItems={(newData: string[]) => setData(newData)} editing={editing} selectedItems={selectedItems} handleCategory={handleCategory} />
				<AlertDialog open={open} setOpen={setOpen} headerText='카테고리 만들기' buttonText1='닫기' buttonText2='추가하기' buttonAction={addCategory} >
					<SearchInput inputRef={inputRef} placeholder="카테고리명을 입력하세요." required={true} divStyle="rounded-[2px]" />
				</AlertDialog>
			</div>
		</>
	)
}
const CategoryAddIcn = () => (
	<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M18.6777 13.0761H13.6777V18.0761C13.6777 18.6261 13.2277 19.0761 12.6777 19.0761C12.1277 19.0761 11.6777 18.6261 11.6777 18.0761V13.0761H6.67773C6.12773 13.0761 5.67773 12.6261 5.67773 12.0761C5.67773 11.5261 6.12773 11.0761 6.67773 11.0761H11.6777V6.07614C11.6777 5.52614 12.1277 5.07614 12.6777 5.07614C13.2277 5.07614 13.6777 5.52614 13.6777 6.07614V11.0761H18.6777C19.2277 11.0761 19.6777 11.5261 19.6777 12.0761C19.6777 12.6261 19.2277 13.0761 18.6777 13.0761Z" fill="black" />
	</svg>

)

export const removeAtIndex = (array: [], index: number) => {
	return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = (array: [], index: number, item: any) => {
	return [...array.slice(0, index), item, ...array.slice(index)];
};