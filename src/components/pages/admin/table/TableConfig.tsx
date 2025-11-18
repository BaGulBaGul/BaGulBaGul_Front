import React from 'react'
import dayjs from 'dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { ExpandButton } from '@/components/common';

export type User = {
  userid: number;
  username: string;
  email: string;
  role: string;
  suspend: boolean;
  joinedAt: string;
}

const roleString = (roles: string[]) => {
  if (roles.includes('ADMIN')) {
    return '관리자'
  } else if (roles.includes('EVENT_HOST')) {
    return '주최자'
  } else {
    return '사용자'
  }
}
export const userColumns: ColumnDef<User>[] = [
  { accessorKey: 'userId', header: '순번', maxSize: 35 },
  { accessorKey: 'username', header: '이름', minSize: 54, size: (window.innerWidth - 287) * 0.4 },
  { accessorKey: 'email', header: '이메일', minSize: 84, size: (window.innerWidth - 287) * 0.6 },
  { accessorKey: 'roles', header: '그룹(역할)', cell: info => roleString(info.getValue() as string[]), size: 68, enableResizing: false },
  { accessorKey: 'suspend', header: '활성화', cell: info => info.getValue() ? 'X' : 'O', size: 48, enableResizing: false },
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
  { accessorKey: 'userId', header: '순번', maxSize: 35 },
  { accessorKey: 'username', header: '이름', minSize: 54, size: (window.innerWidth - 155) * 0.4 },
  { accessorKey: 'email', header: '이메일', minSize: 84, size: (window.innerWidth - 155) * 0.6 },
  { accessorKey: 'joinedAt', header: '등록일자', cell: info => dayjs(info.getValue() as string).format('YY.MM.DD'), size: 78, enableResizing: false },
  {
    id: 'expander', header: () => null, cell: ({ row }) => {
      return row.getCanExpand() && (<ExpandButton handleExpandClick={row.getToggleExpandedHandler()} expanded={row.getIsExpanded()} />)
    }, size: 26, enableResizing: false
  }
]

