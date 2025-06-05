'use client';
import React, { useState } from "react";
import { CSS } from '@dnd-kit/utilities';
import { DndContext, DragEndEvent, DragStartEvent, MouseSensor, TouchSensor, UniqueIdentifier, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { useSortable, SortableContext, arrayMove as dndKitArrayMove } from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Checkbox, ToggleButton, ToggleButtonGroup, ThemeProvider, createTheme } from "@mui/material";

interface ListProps { items: string[]; updateItems: (newData: string[]) => void; editing: boolean; selectedItems: string[]; handleCategory: any; }
function CategoryList({ items, updateItems, editing, selectedItems, handleCategory }: ListProps) {
	// for drag and drop
	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
	const { setNodeRef } = useDroppable({ id: 'category-list' });

	const handleDragStart = ({ active }: DragStartEvent) => { setActiveId(active.id); }

	const handleDragEnd = ({ over }: DragEndEvent) => {
		if (over && activeId) {
			const activeIndex = items.indexOf(activeId.toString());
			const overIndex = items.indexOf(over.id.toString());
			updateItems(arrayMove(items, activeIndex, overIndex));
		}
		setActiveId(null);
	}

	const arrayMove = (array: string[], oldIndex: number, newIndex: number) => { return dndKitArrayMove(array, oldIndex, newIndex); };

	return (
		<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors} modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
			<SortableContext items={items} >
				<div ref={setNodeRef}>
					<ToggleButtonGroup value={selectedItems} orientation="vertical">
						{items.map(item => (
							<Item key={item} name={item} editing={editing} selected={selectedItems.some(x => x === item)} handleCategory={handleCategory} />
						))}
					</ToggleButtonGroup>
				</div>
			</SortableContext>
		</DndContext>
	)
}
export default CategoryList

interface ItemProps { name: string; editing: boolean; selected: boolean; handleCategory: any; }
function Item({ name, editing, selected, handleCategory }: ItemProps) {
	const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging, } = useSortable({ id: name });
	return (
		<div ref={setNodeRef}
			style={{ transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? '100' : undefined, }}>
			<ThemeProvider theme={sortableToggleButtonTheme}>
				<ToggleButton value={name} selected={selected} onClick={(e) => handleCategory(e, name)}>
					<div className="flex flex-row gap-[16px] items-center">
						{!editing ? <></> : <Checkbox checked={selected} readOnly inputProps={{ 'aria-label': name }} />}
						{name}
					</div>
					<div ref={setActivatorNodeRef} {...listeners} {...attributes}>
						<DragHandlerIcn />
					</div>
				</ToggleButton>
			</ThemeProvider>
		</div>
	);
};

const DragHandlerIcn = () => (
	<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M5.67773 8.07617H19.6777" stroke="#C1C1C1" stroke-linecap="round" />
		<path d="M5.67773 12.0762H19.6777" stroke="#C1C1C1" stroke-linecap="round" />
		<path d="M5.67773 16.0762H19.6777" stroke="#C1C1C1" stroke-linecap="round" />
	</svg>
)

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

const sortableToggleButtonTheme = createTheme({
	components: {
		MuiButtonBase: { defaultProps: { disableRipple: true, }, },
		MuiToggleButton: {
			styleOverrides: {
				root: {
					display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100vw',
					fontSize: '14px !important', fontWeight: '400', lineHeight: '160%', color: '#1E1E1E!important',
					padding: '16px', backgroundColor: '#FFFFFF !important',
				}
			}
		},
		MuiCheckbox: { defaultProps: { checkedIcon: <CheckboxIcn val={true} />, icon: <CheckboxIcn val={false} />, }, },
	},
});