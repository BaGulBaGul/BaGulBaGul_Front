import { getParams, useEffectCntFilter } from "@/service/Functions";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CategoryButtons, PostTab, ViewFilterApplied, ViewSelect } from "@/components/common";
import { Backdrop } from "@mui/material";
import dayjs from 'dayjs';
import { SearchBar } from "./SearchBar";

export const SearchLayout = (props: { opt: 'TTL' | 'TAG'; sp: ReadonlyURLSearchParams; router: AppRouterInstance; children: React.ReactNode; }) => {
  // type
  const [tab, setTab] = useState(Number(props.sp.get('tab_id')) ?? 0);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => { setTab(newValue); };
  // 카테고리 - 정렬기준, 날짜, 참여인원, 규모 - 제목 및 태그
  const [selectedCate, setSelectedCate] = useState<string[]>(props.sp.getAll('ct') ?? []);
  const [p, setP] = useState({
    sort: props.sp.get('sort') ?? 'createdAt,desc',
    dateRange: [
      props.sp.get('sD') !== null ? dayjs(props.sp.get('sD'), "YYYYMMDD").toDate() : undefined,
      props.sp.get('eD') !== null ? dayjs(props.sp.get('eD'), "YYYYMMDD").toDate() : undefined
    ],
    participants: Number(props.sp.get('ptcp')) ?? 0,
    headCount: { from: Number(props.sp.get('hcMin')) ?? undefined, to: Number(props.sp.get('hcMax')) ?? undefined },
  })
  const [title, setTitle] = useState(decodeURIComponent(decodeURIComponent(props.sp.get('query') ?? '')))
  const tag = decodeURIComponent(decodeURIComponent(props.sp.get('tag') ?? ''))

  // 적용된 필터들, 적용된 필터 개수
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  // searchParams로 넘어온 필터 count
  useEffectCntFilter(props.sp, setFilters, setFilterCnt, p.sort)

  const [startDate, endDate] = p.dateRange ?? [null, null];
  const routeToFilter = () => {
    if (props.opt === 'TTL') {
      let params = {
        sort: p.sort ?? '', ct: selectedCate ?? '',
        sD: !!startDate ? dayjs(startDate).format('YYYYMMDD') : '',
        eD: !!endDate ? dayjs(endDate).format('YYYYMMDD') : '',
        ptcp: p.participants > 0 ? p.participants : '',
        hcMin: p.headCount.from === null || p.headCount.from === undefined || p.headCount.from <= 0 ? '' : p.headCount.from,
        hcMax: p.headCount.to === null || p.headCount.to === undefined || p.headCount.to <= 0 ? '' : p.headCount.to,
      }
      if (title.length > 0) {
        props.router.push(Object.keys(params).length > 0 ? `/searched?query=${title}&${getParams(params)}&tab_id=${tab}` : `/searched?query=${title}&tab_id=${tab}`)
      }
    } else if (props.opt === 'TAG') {
      let params = {
        tag: tag, sort: p.sort ?? '', ct: selectedCate ?? '',
        sD: startDate !== null ? dayjs(startDate).format('YYYYMMDD') : '',
        eD: endDate !== null ? dayjs(endDate).format('YYYYMMDD') : '',
        ptcp: p.participants > 0 ? p.participants : '',
        hcMin: p.headCount.from === null || p.headCount.from === undefined || p.headCount.from <= 0 ? '' : p.headCount.from,
        hcMax: p.headCount.to === null || p.headCount.to === undefined || p.headCount.to <= 0 ? '' : p.headCount.to,
      }
      if (tag.length > 0) {
        props.router.push(`/tag?${getParams(params)}&tab_id=${tab}`)
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
      {props.opt === 'TTL'
        ? <SearchBar opt={1} title={title ?? ''} setOpen={setOpen} filterCnt={filterCnt} setTitle={setTitle} handleRt={handleRt} router={props.router} />
        : <SearchBar tag={tag ?? ''} setOpen={setOpen} filterCnt={filterCnt} handleRt={handleRt} router={props.router} />
      }
      <div className='w-full p-0 pt-[66px]'>
        <div className='fixed top-[66px] w-full bg-p-white z-10'>
          <div className='flex justify-between items-center px-[16px] py-[10px]'>
            <PostTab value={tab} handleChange={handleChange} />
          </div>
          <ViewFilterApplied filterCnt={filterCnt} filters={filters} setFilters={setFilters} p={p} setP={setP} handleRt={handleRt} />
          <CategoryButtons selectedCate={selectedCate} setSelectedCate={setSelectedCate} />
        </div>
        <Backdrop open={open ?? false} className='z-paper'>
          <ViewSelect p={p} setP={setP} setOpen={setOpen} routeToFilter={routeToFilter} />
        </Backdrop>
        {<div className={filterCnt > 0 ? 'mt-[120px]' : 'mt-[94px]'}>
          {props.children}
        </div>}
      </div>
    </div>
  );
}