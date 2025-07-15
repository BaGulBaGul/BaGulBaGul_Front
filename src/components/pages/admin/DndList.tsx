'use client';
import React, { PropsWithChildren, useState } from "react";
import { DndContext, DragEndEvent, DragStartEvent, MouseSensor, TouchSensor, UniqueIdentifier, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove as dndKitArrayMove } from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";

interface WrapperProps extends PropsWithChildren { id: string, items: any[]; updateItems: (newData: any[]) => void; }
export function DndWrapper({ id, items, updateItems, children }: WrapperProps) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const { setNodeRef } = useDroppable({ id: id });

  const handleDragStart = ({ active }: DragStartEvent) => { setActiveId(active.id); }

  const handleDragEnd = ({ over }: DragEndEvent) => {
    if (over && activeId) {
      if (id === 'banner-card-list') {
        const activeIndex = items.findIndex((item) => item.id === activeId);
        const overIndex = items.findIndex((item) => item.id === over.id);
        updateItems(arrayMove(items, activeIndex, overIndex));
      } else {
        const activeIndex = items.findIndex((item) => item === activeId);
        const overIndex = items.findIndex((item) => item === over.id);
        updateItems(arrayMove(items, activeIndex, overIndex));
      }
    }
    setActiveId(null);
  }

  const arrayMove = (array: any[], oldIndex: number, newIndex: number) => { return dndKitArrayMove(array, oldIndex, newIndex); };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors} modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
      <SortableContext items={items} >
        <div ref={setNodeRef}>
          {children}
        </div>
      </SortableContext>
    </DndContext>
  )
}