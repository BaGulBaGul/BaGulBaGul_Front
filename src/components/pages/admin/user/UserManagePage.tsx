'use client';
import { useEffect, useRef, useState } from "react";
import { closeFilter, FilterApplied, FilterButton, FilterCalendar, FilterDialog, FilterSortRadio } from "@/components/common/filter";
import { InputCollapse, SearchInput } from "@/components/common/input";
import { IconSearchS } from "@/components/common/styles/Icon";
import { FormatDateRange } from "@/service/Functions";
import { UserTable } from "..";
import { User } from "./UserTableConfig";
import { Users } from "../_TmpData";

export function UserManagePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('')
  const handleSearch = (event: any) => {
    if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
      if (inputRef.current && inputRef.current.value !== '') {
        event.preventDefault();
        setTitle(encodeURIComponent(encodeURIComponent(inputRef.current.value)))
      }
    }
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true) }

  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  const [sort, setSort] = useState('createdAt,desc')
  const [joinedDate, setJoinedDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    if (!!joinedDate && !filters.includes('joinedDate')) {
      filters.push('joinedDate')
      setFilters(filters)
    }
    if (filters.length === 1 && sort === 'createdAt,desc') { setFilterCnt(0) }
    else if (filters.length > 0 && filters.length !== filterCnt) { setFilterCnt(filters.length) }
    console.log('filters', filters, 'filterCnt', filterCnt, 'sort', sort, 'joinedDate', joinedDate);
  }, [sort, joinedDate])

  const handleDeleteFilter = (value: string) => {
    let newFilters = (filters).filter((f) => f !== value)
    setFilters(newFilters)
    setFilterCnt(newFilters.length)
    switch (value) {
      case 'sort':
        setSort('createdAt,desc')
        break;
      case 'joinedDate':
        setJoinedDate(undefined)
        break;
    }
  }

  const defaultData: User[] = Users

  return (
    <>
      <div className='fixed w-full flex flex-col top-[60px] bg-p-white z-30'>
        <div className='flex flex-row items-center mx-[16px] my-[18px] gap-[16px]'>
          <SearchInput placeholder='검색' inputRef={inputRef}>
            <button onClick={handleSearch}><IconSearchS /></button>
          </SearchInput>
          <FilterButton handleOpen={handleOpen} cnt={filterCnt} fs={18} />
        </div>
        <FilterApplied filterCnt={filterCnt} filters={filters} setFilters={setFilters} opt='UPDATE' sort={sort} joinedDate={joinedDate} handleDelete={handleDeleteFilter} />
      </div>
      <div className={filterCnt > 0 ? "h-[calc(100vh-152px)] mt-[152px]" : "h-[calc(100vh-126px)] mt-[126px]"}>
        <UserTable defaultData={defaultData}/>
      </div>
      <FilterDialog open={open} handleClose={() => { closeFilter(setOpen); }} title='유저관리 상세필터' >
        <FilterSortRadio value={sort} handleChange={(newSort: string) => { setSort(newSort) }} />
        <InputCollapse title={'가입일자'} type='CAL' value={!joinedDate ? '' : FormatDateRange(joinedDate, null)}>
          <FilterCalendar startDate={joinedDate} endDate={undefined} onChange={(date: any) => { setJoinedDate(date) }} range={false} />
        </InputCollapse>
      </FilterDialog>
    </>
  )
}