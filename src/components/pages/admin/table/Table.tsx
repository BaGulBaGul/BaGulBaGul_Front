"use client";
import React, { useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, getExpandedRowModel } from '@tanstack/react-table';
import { userColumns, organizerColumns } from '../table/TableConfig';
import { MemoizedTableBody, TableBody } from '../table/TableBody';

export function Table({ type, defaultData }: { type: 'USR' | 'ORG'; defaultData: any[] }) {
  const [data, _setData] = useState(() => [...defaultData])
  const table = useReactTable({
    data, columns: type === 'USR' ? userColumns : organizerColumns,
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
            <div key={headerGroup.id} {...{ className: 'tr' }}>
              {headerGroup.headers.map((header) => (
                <div key={header.id} {...{
                  className: 'th',
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
          <MemoizedTableBody type={type} table={table} />) : (
          <TableBody type={type} table={table} />
        )}
      </div>
    </div>
  )
}