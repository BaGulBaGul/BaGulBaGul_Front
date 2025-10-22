import React from 'react'
import dayjs from 'dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { ExpandButton } from '@/components/common';


export type Organizer = {
  id: number;
  name: string;
  email: string;
  addedAt: string;
}

export const columns: ColumnDef<Organizer>[] = [
  { accessorKey: 'id', header: '순번', maxSize: 35 },
  { accessorKey: 'name', header: '이름', minSize: 54, size: (window.innerWidth - 271) * 0.4 },
  { accessorKey: 'email', header: '이메일', minSize: 84, size: (window.innerWidth - 271) * 0.6 },
  { accessorKey: 'addedAt', header: '등록일자', cell: info => dayjs(info.getValue() as string).format('YY.MM.DD'), size: 78, enableResizing: false },
  {
    id: 'expander', header: () => null, cell: ({ row }) => {
      return row.getCanExpand() && (<ExpandButton handleExpandClick={row.getToggleExpandedHandler()} expanded={row.getIsExpanded()} />)
    }, size: 26, enableResizing: false
  }
]