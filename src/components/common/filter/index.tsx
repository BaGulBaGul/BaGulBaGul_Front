import { useEffect, useState } from "react";
import { ReadonlyURLSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { getParams } from "@/service/Functions";

import { FilterApplied } from "./FilterApplied";
import { FilterButton } from "./FilterButton";
import { DialogFilter } from "./DialogFilter";
import { FilterCalendar } from "./FilterCalendar";
import { FilterSortRadio } from "./FilterSortRadio";

export {
  FilterApplied, FilterButton,
  DialogFilter,
  FilterCalendar, FilterSortRadio,
}

export const handleObjectValue = (setData: any, key: string, value: any) => {
  setData((prev: any) => ({ ...prev, [key]: value }))
}

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