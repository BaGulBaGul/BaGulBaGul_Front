"use client";
import { submitFilter } from '@/hooks/useInFilter';
import { DialogFilter, FilterSortRadio, FilterNumber, FilterNumberRange, FilterDateRange } from '@/components/common/filter';

export function Filter({ open, closeFilter, p, updateP }: { open: boolean; closeFilter: () => void; p: any; updateP: (value: Object) => void; }) {
  return (
    <DialogFilter isOpen={open} handleSubmit={(e: React.FormEvent<HTMLFormElement>) => { submitFilter(e, p, updateP, undefined, undefined, true); closeFilter(); }} >
      <FilterSortRadio name='sort' defaultValue={p.sort ?? 'createdAt,desc'} />
      <FilterDateRange prevMin={p.sD} prevMax={p.eD} />
      <FilterNumber prevVal={p.ptcp} />
      <FilterNumberRange prevMin={p.hcMin ?? null} prevMax={p.hcMax ?? null} />
    </DialogFilter>
  )
}