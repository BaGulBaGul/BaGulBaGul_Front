import { flexRender, Table } from '@tanstack/react-table';
import React from 'react';
import { UserTableExpanded } from './UserTableExpanded';
import { OrganizerTableExpanded } from './OrganizerTableExpanded';


export function TableBody({ type, table }: { type: 'USR' | 'ORG', table: Table<any> }) {
  return (
    <div {...{ className: 'tbody border-t-[8px] border-gray1 px-[16px]' }} >
      {table.getRowModel().rows.map((row) => (
        <div key={row.id}>
          <div {...{ className: 'tr' }} >
            {row.getVisibleCells().map((cell) => (
              <div key={cell.id} {...{
                className: `td truncate${cell.column.id !== 'activated' ? '' : !!cell.getValue() ? ' text-primary-blue' : ' text-danger-red'}`,
                style: { width: `calc(var(--col-${cell.column.id}-size) * 1px)` },
              }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            )
            )}
          </div>
          {row.getIsExpanded() && (
            <div key={`${row.id}-expanded`} {...{ className: `tr-expanded`, style: { width: window.innerWidth - 32 } }} >
              <div {...{ className: `td-expanded` }}>
                {type === 'USR' ? <UserTableExpanded row={row} /> : <OrganizerTableExpanded row={row} />}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// 리사이징 중에는 memoized 테이블 바디 사용 -> 불필요 렌더링 방지
export const MemoizedTableBody = React.memo(
  TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data
) as typeof TableBody;