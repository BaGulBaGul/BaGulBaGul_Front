import { ChangeEvent, PropsWithChildren, useEffect, useRef, useState } from "react";
import { ReadonlyURLSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import dayjs from 'dayjs';
import { FormatDateRange, getParams, headCountString, useEffectCntFilter } from "@/service/Functions";
import { TypeTabs } from "@/components/common";
import { FilterApplied, FilterDialog, closeFilter, FilterSortRadio, handleObjectValue, FilterCalendar } from "@/components/common/filter";
import { CategoryButtons, InputCollapse, InputNumber, InputNumberRange } from "@/components/common/input";
import { SearchBar } from "./SearchBar";

interface Props extends PropsWithChildren {
  opt: 'TTL' | 'TAG'; sp: ReadonlyURLSearchParams; router: AppRouterInstance;
}
export function SearchLayout({ opt, sp, router, children }: Props) {
  // type
  const [tab, setTab] = useState(Number(sp.get('tab_id')) ?? 0);
  const handleChange = (value: any, e: Event | undefined) => { setTab(value); };
  // 카테고리 - 정렬기준, 날짜, 참여인원, 규모 - 제목 및 태그
  const [selectedCate, setSelectedCate] = useState<string[]>(sp.getAll('ct') ?? []);
  const [p, setP] = useState({
    sort: sp.get('sort') ?? 'createdAt,desc',
    dateRange: [
      !!sp.get('sD') ? dayjs(sp.get('sD'), "YYYYMMDD").toDate() : undefined,
      !!sp.get('eD') ? dayjs(sp.get('eD'), "YYYYMMDD").toDate() : undefined
    ],
    participants: Number(sp.get('ptcp')) ?? 0,
    headCount: { from: !!sp.get('hcMin') ? Number(sp.get('hcMin')) : undefined, to: !!sp.get('hcMin') ? Number(sp.get('hcMax')) : undefined },
  })
  const [title, setTitle] = useState(decodeURIComponent(decodeURIComponent(sp.get('query') ?? '')))
  const tag = decodeURIComponent(decodeURIComponent(sp.get('tag') ?? ''))

  // 적용된 필터들, 적용된 필터 개수
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  // searchParams로 넘어온 필터 count
  useEffectCntFilter(sp, setFilters, setFilterCnt, p.sort)

  const [startDate, endDate] = p.dateRange ?? [null, null];
  const routeToFilter = () => {
    if (opt === 'TTL') {
      let params = {
        sort: p.sort ?? '', ct: selectedCate ?? '',
        sD: !!startDate ? dayjs(startDate).format('YYYYMMDD') : '',
        eD: !!endDate ? dayjs(endDate).format('YYYYMMDD') : '',
        ptcp: p.participants > 0 ? p.participants : '',
        hcMin: !!p.headCount.from ? p.headCount.from : '',
        hcMax: !!p.headCount.to ? p.headCount.to : '',
      }
      if (title.length > 0) {
        router.push(Object.keys(params).length > 0 ? `/searched?query=${title}&${getParams(params)}&tab_id=${tab}` : `/searched?query=${title}&tab_id=${tab}`)
      }
    } else if (opt === 'TAG') {
      let params = {
        tag: tag, sort: p.sort ?? '', ct: selectedCate ?? '',
        sD: !!startDate ? dayjs(startDate).format('YYYYMMDD') : '',
        eD: !!endDate ? dayjs(endDate).format('YYYYMMDD') : '',
        ptcp: p.participants > 0 ? p.participants : '',
        hcMin: !!p.headCount.from ? p.headCount.from : '',
        hcMax: !!p.headCount.to ? p.headCount.to : '',
      }
      if (tag.length > 0) {
        router.push(`/tag?${getParams(params)}&tab_id=${tab}`)
      }
    }
  }
  const [rt, setRt] = useState(false)
  // 필터 삭제 시 변경대로 redirect
  const handleRt = () => { setRt(!rt) }
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; }
    else { routeToFilter() }
  }, [tab, selectedCate, rt])

  const [open, setOpen] = useState(false);
  return (
    <div className='flex flex-col w-full h-screen pb-[10px]'>
      {opt === 'TTL'
        ? <SearchBar opt={1} title={title ?? ''} setOpen={setOpen} filterCnt={filterCnt} setTitle={setTitle} handleRt={handleRt} router={router} />
        : <SearchBar tag={tag ?? ''} setOpen={setOpen} filterCnt={filterCnt} handleRt={handleRt} router={router} />
      }
      <div className='w-full p-0 pt-[66px]'>
        <div className='fixed top-[66px] w-full bg-p-white z-10'>
          <TypeTabs val={tab} handleChange={handleChange} />
          <FilterApplied filterCnt={filterCnt} filters={filters} setFilters={setFilters} opt="REDIRECT" p={p} setP={setP} handleRt={handleRt} />
          <CategoryButtons selectedCate={selectedCate} setSelectedCate={setSelectedCate} />
        </div>
        <FilterDialog open={open} handleClose={() => { closeFilter(setOpen, routeToFilter) }} >
          <FilterSortRadio value={p.sort} handleChange={(e: ChangeEvent<HTMLInputElement>, newSort: string) => { handleObjectValue(setP, 'sort', newSort) }} />
          <InputCollapse title={'날짜선택'} type='CAL' value={!startDate ? '' : FormatDateRange(startDate, endDate)}>
            <FilterCalendar startDate={startDate} endDate={endDate} onChange={(dates: [any, any]) => { setP((prev: any) => ({ ...prev, dateRange: dates })) }} />
          </InputCollapse>
          <InputCollapse title={'참여인원'} type="NUM" value={p.participants} >
            <InputNumber value={p.participants} onChange={(newValue) => handleObjectValue(setP, 'participants', newValue)} />
          </InputCollapse>
          <InputCollapse title={'규모설정'} type="NUM" value={!!p.headCount.from || !!p.headCount.to ? headCountString(p.headCount.from, p.headCount.to) : 0}>
            <div className='flex flex-col gap-[8px]'>
              <InputNumberRange
                minNumber={{ value: p.headCount.from, onChange: (newValue: any) => { handleObjectValue(setP, 'headCount', { from: newValue ?? undefined, to: p.headCount.to }) } }}
                maxNumber={{ value: p.headCount.to, min: p.headCount.from, onChange: (newValue: any) => { handleObjectValue(setP, 'headCount', { from: p.headCount.from, to: newValue ?? undefined }) } }} />
              <div className='self-end text-12 text-gray3'>*최대인원 제한 없을 경우 '0'명으로 표기</div>
            </div>
          </InputCollapse>
        </FilterDialog>
        {<div className={filterCnt > 0 ? 'mt-[120px]' : 'mt-[94px]'}>
          {children}
        </div>}
      </div>
    </div>
  );
}