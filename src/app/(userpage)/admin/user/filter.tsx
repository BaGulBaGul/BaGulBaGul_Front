'use client';
import { submitFilter } from "@/hooks/useInFilter";
import { DialogFilter, FilterSortRadio, FilterDateRange } from "@/components/common/filter";

export function Filter({ open, closeFilter, p, updateP }: { open: boolean; closeFilter: () => void; p: any; updateP: (value: Object) => void; }) {
  const sortOrder = [{ 'value': 'createdAt,desc', 'label': '최신순' }, { 'value': 'createdAt,asc', 'label': '오래된 순' }, { 'value': 'activatedAt,desc', 'label': '활성화 순' }, { 'value': 'activatedAt,asc', 'label': '비활성화 순' }]

  return (
    <DialogFilter isOpen={open} handleSubmit={(e: React.FormEvent<HTMLFormElement>) => { submitFilter(e, p, updateP); closeFilter(); }} >
      <FilterSortRadio name='sort' defaultValue={p.sort ?? 'createdAt,desc'} order={sortOrder} />
      <FilterDateRange prevMin={p.sD} prevMax={p.eD} title='가입일자'/>
    </DialogFilter>
  )
}