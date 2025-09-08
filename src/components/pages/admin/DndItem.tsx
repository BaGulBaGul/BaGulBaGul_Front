'use client';
import React, { ReactNode } from "react";
import { CSS } from '@dnd-kit/utilities';
import { IconHamburger } from "@/components/common/styles/Icon";

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
      <IconHamburger />
    </div>
  )
}