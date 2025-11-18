"use client";
import React, { useCallback, useMemo, useRef } from 'react'
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useReactTable, getCoreRowModel, flexRender, getExpandedRowModel } from '@tanstack/react-table';
import { userColumns, organizerColumns } from '../table/TableConfig';
import { MemoizedTableBody, TableBody } from '../table/TableBody';
import { LoadingCircle } from '@/components/common';

export function Table({ type, fetchedData }: { type: 'USR' | 'ORG'; fetchedData: UseInfiniteQueryResult<InfiniteData<any, unknown>, Error> }) {
  const { data, fetchNextPage, isFetching, hasNextPage, isFetchingNextPage } = fetchedData
  const flatData = useMemo(
    () => data?.pages?.flatMap(page => page.content) ?? [],
    [data]
  )
  const totalCount = data?.pages?.[0]?.totalElements ?? 0

  const table = useReactTable({
    data: flatData,
    columns: type === 'USR' ? userColumns : organizerColumns,
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

  const observer = useRef<IntersectionObserver | null>(null);
  const lastRowRef = useCallback(
    (node: any) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return (
    <div className="bg-p-white h-full overflow-x-auto">
      <div className='divTable' {...{ style: { ...columnSizeVars, width: table.getTotalSize() } }}>
        <div className="thead sticky top-0 bg-p-white z-10 px-[16px]">
          {table.getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id} className='tr'>
              {headerGroup.headers.map((header) => (
                <div key={header.id} className='th' style={{ width: `calc(var(--header-${header?.id}-size) * 1px)` }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {(header.id !== 'expander') &&
                    <div className={`resizer ${header.id === 'username' || header.id === 'email' ? 'cursor-col-resize' : ''}`}
                      onMouseDown={header.getResizeHandler()} onTouchStart={header.getResizeHandler()}>
                      <div className={`resizer-pointer ${header.column.getIsResizing() ? 'isResizing' : ''}`} />
                    </div>}
                </div>
              ))}
            </div>
          ))}
        </div>
        {totalCount > 0 && <>
          {table.getState().columnSizingInfo.isResizingColumn ? (
            <MemoizedTableBody type={type} table={table} lastRowRef={lastRowRef} />) : (
            <TableBody type={type} table={table} lastRowRef={lastRowRef} />
          )}
        </>}
        {isFetching && <LoadingCircle />}
      </div>
    </div>
  )
}