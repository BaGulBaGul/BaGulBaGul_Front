'use client';
import React, { ReactNode } from "react";
import { CSS } from '@dnd-kit/utilities';

export function DndItem({ sortable, children }: { sortable: any; children: ReactNode }) {
  const { setNodeRef, transform, transition, isDragging } = sortable;
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 100 : undefined }}>
      {children}
    </div>
  )
}

export function DndHandler({ sortable }: { sortable: any }) {
  const { setActivatorNodeRef, listeners, attributes } = sortable;
  return (
    <div ref={setActivatorNodeRef} {...listeners} {...attributes}>
      <DragHandlerIcn />
    </div>
  )
}

const DragHandlerIcn = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.67773 8.07617H19.6777" stroke="#C1C1C1" stroke-linecap="round" />
    <path d="M5.67773 12.0762H19.6777" stroke="#C1C1C1" stroke-linecap="round" />
    <path d="M5.67773 16.0762H19.6777" stroke="#C1C1C1" stroke-linecap="round" />
  </svg>
)