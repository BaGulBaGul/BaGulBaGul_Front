import { RangeProps, String2Day, getParams, useEffectCntFilter } from "@/service/Functions";
import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CategoryButtons, PostTab, SearchBar, ViewFilterApplied, ViewSelect } from ".";
import { Box, Backdrop } from "@mui/material";

export const SearchLayout = (props: { opt: string; sp: ReadonlyURLSearchParams; router: AppRouterInstance; children: React.ReactNode; }) => {
  // type
  const [tab, setTab] = useState(Number(props.sp.get('tab_id')) ?? 0);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => { setTab(newValue); };

  // 정렬기준(default 최신순), 날짜, 참여인원, 규모
  const [selectedCate, setSelectedCate] = useState<string[]>(props.sp.getAll('ct') ?? []);
  const [sort, setSort] = useState(props.sp.get('sort') ?? 'createdAt,desc');
  const [dayRange, setDayRange] = useState<DayRange>({ from: String2Day(props.sp.get('sD')), to: String2Day(props.sp.get('eD')) });
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

  const routeToFilter = () => {
    if (props.opt === 'TTL') {
      let params = {
        sort: sort ?? '', ct: selectedCate ?? '',
        sD: dayRange.from === null || dayRange.from === undefined
          ? '' : `${dayRange.from.year}${String(dayRange.from.month).padStart(2, "0")}${String(dayRange.from.day).padStart(2, "0")}`,
        eD: dayRange.to === null || dayRange.to === undefined
          ? '' : `${dayRange.to.year}${String(dayRange.to.month).padStart(2, "0")}${String(dayRange.to.day).padStart(2, "0")}`,
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
        sD: dayRange.from === null || dayRange.from === undefined
          ? '' : `${dayRange.from.year}${String(dayRange.from.month).padStart(2, "0")}${String(dayRange.from.day).padStart(2, "0")}`,
        eD: dayRange.to === null || dayRange.to === undefined
          ? '' : `${dayRange.to.year}${String(dayRange.to.month).padStart(2, "0")}${String(dayRange.to.day).padStart(2, "0")}`,
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
    else {
      routeToFilter()
    }
  }, [tab, selectedCate, rt])

  const [open, setOpen] = useState(false);
  return (
    <div className='flex flex-col w-full pb-[10px] h-screen bg-gray1'>
      {props.opt === 'TTL'
        ? <SearchBar title={title ?? ''} setOpen={setOpen} filterCnt={filterCnt} setTitle={setTitle} handleRt={handleRt} />
        : <SearchBar tag={tag ?? ''} setOpen={setOpen} filterCnt={filterCnt} handleRt={handleRt} />
      }
      <Box className='w-full p-0 pt-[66px]'>
        <Box className='sticky top-[66px] bg-[#FFF] relative z-10 px-[16px] pt-[10px] pb-[10px]'>
          <div className='flex justify-between items-center'>
            <PostTab value={tab} handleChange={handleChange} />
          </div>
        </Box>
        <div className='sticky top-[114px] bg-[#FFF] relative z-10'>
          <ViewFilterApplied filterCnt={filterCnt} filters={filters} setFilters={setFilters}
            sort={sort} dayRange={dayRange} setDayRange={setDayRange} participants={participants}
            setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount} handleRt={handleRt} />
          <CategoryButtons selectedCate={selectedCate} setSelectedCate={setSelectedCate} />
        </div>
        <Backdrop open={open ?? false} className='z-paper'>
          <ViewSelect sort={sort} setSort={setSort} setOpen={setOpen} routeToFilter={routeToFilter} dayRange={dayRange} setDayRange={setDayRange}
            participants={participants} setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount} />
        </Backdrop>
        {props.children}
      </Box>
    </div>
  );
}