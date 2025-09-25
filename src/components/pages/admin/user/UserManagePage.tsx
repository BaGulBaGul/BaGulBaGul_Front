'use client';
import { useRef, useState } from "react";
import { DialogFilter, FilterButton, FilterApplied, FilterCalendar, FilterSortRadio, useFilter, submitFilter, useEffectUpdateRange } from "@/components/common/filter";
import { InputCollapse, SearchInput } from "@/components/common/input";
import { IconSearchS } from "@/components/common/styles/Icon";
import { FormatDateRange, getParams, useEffectFilterApplied } from "@/service/Functions";
import { UserTable } from "..";
import { User } from "./UserTableConfig";
import { Users } from "../_TmpData";
import { useListWithPageE } from "@/hooks/useInCommon";

export function UserManagePage() {
  const [p, setP] = useState<any>({ sort: 'createdAt,desc' })
  const [open, setOpen] = useState(false);

  // 적용된 필터들, 적용된 필터 개수
  const { filters, filterCnt, updateFilters, updateFilterCnt } = useFilter();
  // searchParams로 넘어온 필터 count
  useEffectFilterApplied(p, updateFilters, updateFilterCnt)

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: any) => {
    if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
      if (inputRef.current && inputRef.current.value !== '') {
        event.preventDefault();
        setP({ ...p, query: encodeURIComponent(encodeURIComponent(inputRef.current.value)) })
      }
    }
  }
  // * 유저 정보 API 연결 필요
  let apiURL = !!p && Object.keys(p).length > 0 ? `/api/event?size=10&type=FESTIVAL&${getParams(p)}` : '/api/event?size=10&type=FESTIVAL'
  console.log(apiURL)
  // const users = useListWithPageE(apiURL, ['users', p], true)
  const defaultData: User[] = Users
  return (
    <>
      <div className='fixed w-full flex flex-col top-[60px] bg-p-white z-30'>
        <div className='flex flex-row items-center mx-[16px] my-[18px] gap-[16px]'>
          <SearchInput placeholder='검색' inputRef={inputRef}>
            <button onClick={handleSearch}><IconSearchS /></button>
          </SearchInput>
          <FilterButton handleOpen={() => { setOpen(true) }} cnt={filterCnt} />
        </div>
        {filterCnt > 0 && <FilterApplied opt='UPDATE' filters={filters} sp={p} updateSP={(value: Object) => setP(value)} />}
      </div>
      <div className={filterCnt > 0 ? "h-[calc(100vh-152px)] mt-[152px]" : "h-[calc(100vh-126px)] mt-[126px]"}>
        <UserTable defaultData={defaultData} />
      </div>
      <Filter open={open} closeFilter={() => setOpen(false)} p={p} updateP={(value: Object) => setP(value)} />
    </>
  )
}

function Filter({ open, closeFilter, p, updateP }: { open: boolean; closeFilter: () => void; p: any; updateP: (value: Object) => void; }) {
  const [dateRange, setDateRange] = useState<(Date | undefined)[]>([undefined, undefined])
  useEffectUpdateRange('DATE', p.sD, p.eD, (date: [any, any]) => setDateRange(date))
  
  const sortOrder = [{ 'value': 'createdAt,desc', 'label': '최신순' }, { 'value': 'createdAt,asc', 'label': '오래된 순' }, { 'value': 'activatedAt,desc', 'label': '활성화 순' }, { 'value': 'activatedAt,asc', 'label': '비활성화 순' }]

  return (
    <DialogFilter isOpen={open} handleSubmit={(e: React.FormEvent<HTMLFormElement>) => { submitFilter(e, dateRange, p, updateP); closeFilter(); }} >
      <FilterSortRadio name='sort' defaultValue={p.sort ?? 'createdAt,desc'} order={sortOrder} />
      <InputCollapse title={'가입일자'} type='CAL' value={(!dateRange[0] || !dateRange[1]) ? '' : FormatDateRange(dateRange[0], dateRange[1])}>
        <FilterCalendar startDate={dateRange[0]} endDate={dateRange[1]} onChange={(dates: [any, any]) => { setDateRange(dates) }} />
      </InputCollapse>
    </DialogFilter>
  )
}