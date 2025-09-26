import { useEffect, useState } from "react";
import { ReadonlyURLSearchParams } from "next/navigation";
import { createSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { getParams } from "@/service/Functions";

export const handleObjectValue = (setData: any, key: string, value: any) => {
  setData((prev: any) => ({ ...prev, [key]: value }))
}

// 필터 상태 관리 생성 훅
export function useFilter() {
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  const updateFilters = (newFilters: string[]) => setFilters(newFilters)
  const updateFilterCnt = (newCnt: number) => setFilterCnt(newCnt)
  return { filters, filterCnt, updateFilters, updateFilterCnt }
}

// 필터 닫을때 '제출'되는 함수
export const submitFilter = (
  e: React.FormEvent<HTMLFormElement>, dateRange: (Date | undefined)[],
  sp: any, updateSp?: (value: Object) => void, router?: any, url?: string, tabCt?: boolean
) => {
  // 페이지 이동 방지
  e.preventDefault();

  let formData = new FormData(e.currentTarget);
  if (formData.get('state') === 'off') { formData.delete('state') }
  let fd = Object.fromEntries(formData.entries())

  let params = {
    ...fd,
    sD: !!dateRange[0] ? dayjs(dateRange[0]).format('YYYYMMDD') : '', eD: !!dateRange[1] ? dayjs(dateRange[1]).format('YYYYMMDD') : '',
    // tab, 카테고리 필요시 params에 포함
    ...(!!tabCt && (sp instanceof ReadonlyURLSearchParams) && { tab_id: sp.get('tab_id') ?? 0, ct: sp.getAll('ct') }),
    ...(!!tabCt && !(sp instanceof ReadonlyURLSearchParams) && { tab_id: sp.tab_id ?? 0, ct: sp.ct ?? [] }),
  }

  // (1) 변경사항 있는 경우 url 이동
  if (!!router && sp.toString() !== getParams(params).toString()) {
    router.replace(`${url ?? ''}${Object.keys(params).length > 0 ? `&${getParams(params)}` : ``}`)
  }
  // (2) state 변경
  else if (!!updateSp) { updateSp(params) }
}

// 날짜, 인원수 범위 변경시 적용
export const useEffectUpdateRange = (opt: 'DATE' | 'HEAD', min: string | undefined | null, max: string | undefined | null, updateRange: (range: [any, any]) => void) => {
  const formatData = (value: string) => {
    if (opt === 'DATE') { return dayjs(value, "YYYYMMDD").toDate() }
    else if (opt === 'HEAD') { return Number(value) }
  }
  useEffect(() => {
    updateRange([!!min ? formatData(min) : min,
    !!max ? formatData(max) : max])
  }, [min, max])
}

// 탭, 카테고리 변경시 url 이동
export const useEffectPushTabCt = (sp: ReadonlyURLSearchParams, tab: number, selectedCate: string[], router: any, opt?: 'query' | 'tag', optVal?: string) => {
  const currentSP = new URLSearchParams(Array.from(sp.entries()))
  let url = !opt ? '?' : `/${opt === 'query' ? 'searched' : 'tag'}?${opt}=${optVal}&`
  const routeToFilter = () => {
    if (!!opt) { currentSP.delete(opt) }
    currentSP.delete('ct')
    currentSP.set('tab_id', tab.toString())
    // router.replace(`?${currentSP.toString()}${selectedCate.length > 0 ? `&${createSearchParams({ ct: selectedCate ?? '' })}` : ''}`)
    if (!opt || (!!optVal && optVal.length > 0)) {
      router.push(`${url}${currentSP.toString()}${selectedCate.length > 0 ? `&${createSearchParams({ ct: selectedCate ?? '' })}` : ''}`)
    }
  }
  useEffect(() => { routeToFilter() }, [tab, selectedCate, optVal])
}

// searchParams로 넘어온 필터를 FilterApplied 컴포넌트에 적용
export const useEffectFilterApplied = (p: any, updateFilters: (filters: string[]) => void, updateFilterCnt: (cnt: number) => void) => {
  const sp = p instanceof ReadonlyURLSearchParams ? Object.fromEntries(p.entries()) : p;
  useEffect(() => {
    let paramFilter: string[] = ['sort']
    if ((!!sp.sD || !!sp.eD) && !paramFilter.includes('dayRange')) {
      paramFilter.push('dayRange')
    } if (!!sp.ptcp && !paramFilter.includes('ptcp')) {
      paramFilter.push('ptcp')
    } if ((!!sp.hcMin || !!sp.hcMax) && !paramFilter.includes('headCount')) {
      paramFilter.push('headCount')
    } if (!!sp.state && !paramFilter.includes('state')) {
      paramFilter.push('state')
    }

    if (paramFilter.length > 0) {
      updateFilters(paramFilter)
      if (paramFilter.length === 1 && (!sp.sort || sp.sort === 'createdAt,desc')) { updateFilterCnt(0) }
      else { updateFilterCnt(paramFilter.length) }
    }
  }, [p])
}