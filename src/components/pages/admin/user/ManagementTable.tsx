"use client";
import React, { ReactNode, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, getExpandedRowModel, Table, ColumnDef } from '@tanstack/react-table';
import { UserTableExpanded } from '..';

export function ManagementTable({defaultData, columns, expanded}: {defaultData: any[], columns: ColumnDef<any>[], expanded: ReactNode}) {
  const [data, _setData] = useState(() => [...defaultData])
  const table = useReactTable({
    data, columns,
    columnResizeMode: 'onChange',
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  const columnSizeVars = React.useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [table.getState().columnSizingInfo, table.getState().columnSizing]);


  return (
    <div className="bg-p-white h-full overflow-x-auto">
      <div {...{ className: 'divTable', style: { ...columnSizeVars, width: table.getTotalSize() } }}>
        <div className="thead sticky top-0 bg-p-white z-10 px-[16px]">
          {table.getHeaderGroups().map((headerGroup) => (
            <div {...{ key: headerGroup.id, className: 'tr' }}>
              {headerGroup.headers.map((header) => (
                <div {...{
                  key: header.id, className: 'th',
                  style: { width: `calc(var(--header-${header?.id}-size) * 1px)` },
                }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {(header.id !== 'expander') &&
                    <div {...{
                      onMouseDown: header.getResizeHandler(),
                      onTouchStart: header.getResizeHandler(),
                      className: `resizer ${header.id === 'username' || header.id === 'email' ? 'cursor-col-resize' : ''}`,
                    }}>
                      <div className={`resizer-pointer ${header.column.getIsResizing() ? 'isResizing' : ''}`} />
                    </div>}
                </div>
              ))}
            </div>
          ))}
        </div>
        {table.getState().columnSizingInfo.isResizingColumn ? (
          <MemoizedTableBody table={table} />) : (
          <TableBody table={table} />
        )}
      </div>
    </div>
  )
}

function TableBody({ table }: { table: Table<any> }) {
  return (
    <div {...{ className: 'tbody border-t-[8px] border-gray1 px-[16px]' }} >
      {table.getRowModel().rows.map((row) => (
        <>
          <div {...{ key: row.id, className: 'tr' }} >
            {row.getVisibleCells().map((cell) => (
              <div {...{
                key: cell.id, className: `td truncate${cell.column.id !== 'activated' ? '' : !!cell.getValue() ? ' text-primary-blue' : ' text-danger-red'}`,
                style: { width: `calc(var(--col-${cell.column.id}-size) * 1px)` },
              }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            )
            )}
          </div>
          {row.getIsExpanded() && (
            <div {...{ key: `${row.id}-expanded`, className: `tr-expanded`, style: { width: window.innerWidth - 32 } }} >
              <div {...{ className: `td-expanded` }}>
                <UserTableExpanded row={row} />
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
}

// 리사이징 중에는 memoized 테이블 바디 사용 -> 불필요 렌더링 방지
export const MemoizedTableBody = React.memo(
  TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data
) as typeof TableBody;