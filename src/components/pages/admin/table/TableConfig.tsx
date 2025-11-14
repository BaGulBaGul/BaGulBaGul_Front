import React from 'react'
import dayjs from 'dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { ExpandButton } from '@/components/common';

export type User = {
  userid: number;
  username: string;
  email: string;
  role: string;
  activated: boolean;
  joinedAt: string;
}

export const userColumns: ColumnDef<User>[] = [
  { accessorKey: 'userid', header: '순번', maxSize: 35 },
  { accessorKey: 'username', header: '이름', minSize: 54, size: (window.innerWidth - 271) * 0.4 },
  { accessorKey: 'email', header: '이메일', minSize: 84, size: (window.innerWidth - 271) * 0.6 },
  { accessorKey: 'role', header: '그룹(역할)', cell: info => info.getValue() === 'ADMIN' ? '관리자' : '사용자', size: 68, enableResizing: false },
  { accessorKey: 'activated', header: '활성화', cell: info => info.getValue() ? 'O' : 'X', size: 48, enableResizing: false },
  { accessorKey: 'joinedAt', header: '가입일자', cell: info => dayjs(info.getValue() as string).format('YY.MM.DD'), size: 78, enableResizing: false },
  {
    id: 'expander', header: () => null, cell: ({ row }) => {
      return row.getCanExpand() && (<ExpandButton handleExpandClick={row.getToggleExpandedHandler()} expanded={row.getIsExpanded()} />)
    }, size: 26, enableResizing: false
  }
]

export type Organizer = {
  userid: number;
  username: string;
  email: string;
  joinedAt: string;
}

export const organizerColumns: ColumnDef<Organizer>[] = [
  { accessorKey: 'userid', header: '순번', maxSize: 35 },
  { accessorKey: 'username', header: '이름', minSize: 54, size: (window.innerWidth - 155) * 0.4 },
  { accessorKey: 'email', header: '이메일', minSize: 84, size: (window.innerWidth - 155) * 0.6 },
  { accessorKey: 'joinedAt', header: '등록일자', cell: info => dayjs(info.getValue() as string).format('YY.MM.DD'), size: 78, enableResizing: false },
  {
    id: 'expander', header: () => null, cell: ({ row }) => {
      return row.getCanExpand() && (<ExpandButton handleExpandClick={row.getToggleExpandedHandler()} expanded={row.getIsExpanded()} />)
    }, size: 26, enableResizing: false
  }
]

