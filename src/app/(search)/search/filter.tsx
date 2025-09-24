"use client";
import { useState } from 'react';
import dayjs from 'dayjs';
import { FormatDateRange, headCountString } from '@/service/Functions';
import { DialogFilter, FilterSortRadio, FilterCalendar } from '@/components/common/filter';
import { InputCollapse, InputNumber, InputNumberRange } from '@/components/common/input';

export function Filter({ open, closeFilter, p, updateP }: { open: boolean; closeFilter: () => void; p: any; updateP: (value: Object) => void; }) {
  const [dateRange, setDateRange] = useState<(Date | undefined)[]>([undefined, undefined])
  const [headCount, setHeadCount] = useState<(number | null)[]>([null, null])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let fd = Object.fromEntries(formData.entries())

    let params = {
      ...fd,
      sD: !!dateRange[0] ? dayjs(dateRange[0]).format('YYYYMMDD') : '', eD: !!dateRange[1] ? dayjs(dateRange[1]).format('YYYYMMDD') : '',
      tab_id: p.tab_id ?? 0, ct: p.ct ?? []
    }
    updateP(params)
    closeFilter()
  }

  return (
    <DialogFilter isOpen={open} handleSubmit={handleSubmit} >
      <FilterSortRadio name='sort' defaultValue={p.sort ?? 'createdAt,desc'} />
      <InputCollapse title={'날짜선택'} type='CAL' value={(!dateRange[0] || !dateRange[1]) ? '' : FormatDateRange(dateRange[0], dateRange[1])}>
        <FilterCalendar startDate={dateRange[0]} endDate={dateRange[1]} onChange={(dates: [any, any]) => { setDateRange(dates) }} />
      </InputCollapse>
      <InputCollapse title={'참여인원'} type="NUM" value={Number(p.ptcp)} keepMounted={true} >
        <InputNumber value={!!p.ptcp ? Number(p.ptcp) : undefined} name='ptcp' />
      </InputCollapse>
      <InputCollapse title={'규모설정'} type="NUM" value={(!headCount[0] || !headCount[1]) ? 0 : headCountString(headCount[0], headCount[1])}>
        <div className='flex flex-col gap-[8px]'>
          <InputNumberRange
            minNumber={{ name: 'hcMin', value: headCount[0], onChange: (value: any) => { setHeadCount([value, headCount[1]]) } }}
            maxNumber={{ name: 'hcMax', value: headCount[1], min: headCount[0], onChange: (value: any) => { setHeadCount([headCount[0], value]) } }} />
          <div className='self-end text-12 text-gray3'>*최대인원 제한 없을 경우 '0'명으로 표기</div>
        </div>
      </InputCollapse>
    </DialogFilter>
  )
}