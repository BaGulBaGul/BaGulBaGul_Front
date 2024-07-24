import { getParams, useEffectCntFilter } from "@/service/Functions";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CategoryButtons, PostTab, RangeProps, SearchBar, ViewFilterApplied, ViewSelect } from ".";
import { Backdrop } from "@mui/material";
import dayjs from 'dayjs';

export const SearchLayout = (props: { opt: string; sp: ReadonlyURLSearchParams; router: AppRouterInstance; children: React.ReactNode; }) => {
  // type
  const [tab, setTab] = useState(Number(props.sp.get('tab_id')) ?? 0);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => { setTab(newValue); };

  // 정렬기준(default 최신순), 날짜, 참여인원, 규모
  const [selectedCate, setSelectedCate] = useState<string[]>(props.sp.getAll('ct') ?? []);
  const [sort, setSort] = useState(props.sp.get('sort') ?? 'createdAt,desc');
  const [dateRange, setDateRange] = useState<[any, any]>([props.sp.get('sD') ?? null, props.sp.get('eD') ?? null]);

  const [participants, setParticipants] = useState(Number(props.sp.get('ptcp')) ?? 0);
  const [headCount, setHeadCount] = useState<RangeProps>({
    from: Number(props.sp.get('hcMin')) ?? undefined, to: Number(props.sp.get('hcMax')) ?? undefined
  });

  const [title, setTitle] = useState(decodeURIComponent(decodeURIComponent(props.sp.get('query') ?? '')))
  const tag = decodeURIComponent(decodeURIComponent(props.sp.get('tag') ?? ''))

  // 적용된 필터들, 적용된 필터 개수
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  // searchParams로 넘어온 필터 count
  useEffectCntFilter(props.sp, setFilters, setFilterCnt, sort)

  const [rt, setRt] = useState(false)
  // 필터 삭제 시 변경대로 redirect
  const handleRt = () => { setRt(!rt) }

  const [startDate, endDate] = dateRange ?? [null, null];
  const routeToFilter = () => {
    if (props.opt === 'TTL') {
      let params = {
        sort: sort ?? '', ct: selectedCate ?? '',
        sD: startDate !== null ? dayjs(startDate).format('YYYYMMDD') : '',
        eD: endDate !== null ? dayjs(endDate).format('YYYYMMDD') : '',
        ptcp: participants > 0 ? participants : '',
        hcMin: headCount.from === null || headCount.from === undefined || headCount.from <= 0 ? '' : headCount.from,
        hcMax: headCount.to === null || headCount.to === undefined || headCount.to <= 0 ? '' : headCount.to,
      }
      if (title.length > 0) {
        props.router.push(Object.keys(params).length > 0 ? `/searched?query=${title}&${getParams(params)}&tab_id=${tab}` : `/searched?query=${title}&tab_id=${tab}`)
      }
    } else if (props.opt === 'TAG') {
      let params = {
        tag: tag, sort: sort ?? '', ct: selectedCate ?? '',
        sD: startDate !== null ? dayjs(startDate).format('YYYYMMDD') : '',
        eD: endDate !== null ? dayjs(endDate).format('YYYYMMDD') : '',
        ptcp: participants > 0 ? participants : '',
        hcMin: headCount.from === null || headCount.from === undefined || headCount.from <= 0 ? '' : headCount.from,
        hcMax: headCount.to === null || headCount.to === undefined || headCount.to <= 0 ? '' : headCount.to,
      }
      if (tag.length > 0) {
        props.router.push(`/tag?${getParams(params)}&tab_id=${tab}`)
      }
    }
  }
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; }
    else { routeToFilter() }
  }, [tab, selectedCate, rt])

  const [open, setOpen] = useState(false);
  return (
    <div className='flex flex-col w-full pb-[10px] h-screen'>
      {props.opt === 'TTL'
        ? <SearchBar opt={1} title={title ?? ''} setOpen={setOpen} filterCnt={filterCnt} setTitle={setTitle} handleRt={handleRt} />
        : <SearchBar tag={tag ?? ''} setOpen={setOpen} filterCnt={filterCnt} handleRt={handleRt} />
      }
      <div className='w-full p-0 pt-[66px]'>
        <div className='fixed top-[66px] w-full bg-[#FFF] z-10'>
          <div className='flex justify-between items-center px-[16px] py-[10px]'>
            <PostTab value={tab} handleChange={handleChange} />
          </div>
          <ViewFilterApplied filterCnt={filterCnt} filters={filters} setFilters={setFilters}
            sort={sort} dateRange={dateRange} setDateRange={setDateRange} participants={participants}
            setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount} handleRt={handleRt} />
          <CategoryButtons selectedCate={selectedCate} setSelectedCate={setSelectedCate} />
        </div>
        <Backdrop open={open ?? false} className='z-paper'>
          <ViewSelect sort={sort} setSort={setSort} setOpen={setOpen} routeToFilter={routeToFilter} dateRange={dateRange} setDateRange={setDateRange}
            participants={participants} setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount} />
        </Backdrop>
        {<div className={filterCnt > 0 ? 'mt-[120px]' : 'mt-[94px]'}>
          {props.children}
        </div>
        }
      </div>
    </div>
  );
}