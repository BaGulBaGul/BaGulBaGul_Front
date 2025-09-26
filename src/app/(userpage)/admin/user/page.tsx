'use client';
import { useState, useRef } from 'react';
import { FilterButton, FilterApplied } from '@/components/common/filter';
import { SearchInput } from '@/components/common/input';
import { IconSearchS } from '@/components/common/styles/Icon';
import { UserTable } from '@/components/pages/admin';
import { Users } from '@/components/pages/admin/_TmpData';
import { User } from '@/components/pages/admin/user/UserTableConfig';
import { useFilter, useEffectFilterApplied } from '@/hooks/useInFilter';
import { getParams } from '@/service/Functions';
import { Filter } from './filter';

export default function Page() {
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