"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { FormatDateRange, getParams, headCountString } from '@/service/Functions';
import { FilterCalendar, FilterSortRadio } from '@/components/common/filter';
import { InputNumber, InputCollapse, InputNumberRange } from '@/components/common/input';
import { DialogFilter1 } from '@/components/common/filter/DialogFilter';

export function Filter({ open, closeFilter, url }: { open: boolean; closeFilter: () => void; url: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [dateRange, setDateRange] = useState<(Date | undefined)[]>([undefined, undefined])
  useEffect(() => {
    setDateRange([!!searchParams.get('sD') ? dayjs(searchParams.get('sD'), "YYYYMMDD").toDate() : undefined,
    !!searchParams.get('eD') ? dayjs(searchParams.get('eD'), "YYYYMMDD").toDate() : undefined])
  }, [searchParams.get('sD'), searchParams.get('eD')])

  const [headCount, setHeadCount] = useState<(number | null)[]>([null, null])
  useEffect(() => {
    setHeadCount([searchParams.get('hcMin') ? Number(searchParams.get('hcMin')) : null,
    !!searchParams.get('hcMax') ? Number(searchParams.get('hcMax')) : null])
  }, [searchParams.get('hcMin'), searchParams.get('hcMax')])


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    if (formData.get('state') === 'off') { formData.delete('state') }
    let fd = Object.fromEntries(formData.entries())
    let params = {
      ...fd,
      sD: !!dateRange[0] ? dayjs(dateRange[0]).format('YYYYMMDD') : '', eD: !!dateRange[1] ? dayjs(dateRange[1]).format('YYYYMMDD') : '',
      tab_id: searchParams.get('tab_id'), ct: searchParams.getAll('ct')
    }
    // 변경사항 있는 경우에만 url 이동
    if (searchParams.toString() !== getParams(params).toString()) {
      router.replace(`${url}${Object.keys(params).length > 0 ? `&${getParams(params)}` : ``}`)
    }
    closeFilter()
  }
  return (
    <DialogFilter1 isOpen={open} handleSubmit={handleSubmit} >
      <FilterSortRadio name='sort' defaultValue={searchParams.get('sort') ?? 'createdAt,desc'} />
      <InputCollapse title={'날짜선택'} type='CAL' value={(!dateRange[0] || !dateRange[1]) ? '' : FormatDateRange(dateRange[0], dateRange[1])}>
        <FilterCalendar startDate={dateRange[0]} endDate={dateRange[1]} onChange={(dates: [any, any]) => { setDateRange(dates) }} form='filter-form' />
      </InputCollapse>
      <InputCollapse title={'참여인원'} type="NUM" value={Number(searchParams.get('ptcp'))} keepMounted={true} >
        <InputNumber value={!!searchParams.get('ptcp') ? Number(searchParams.get('ptcp')) : undefined} name='ptcp' />
      </InputCollapse>
      <InputCollapse title={'규모설정'} type="NUM" value={(!headCount[0] || !headCount[1]) ? 0 : headCountString(headCount[0], headCount[1])}>
        <div className='flex flex-col gap-[8px]'>
          <InputNumberRange
            minNumber={{ name: 'hcMin', value: headCount[0], onChange: (value: any) => { setHeadCount([value, headCount[1]]) } }}
            maxNumber={{ name: 'hcMax', value: headCount[1], min: headCount[0], onChange: (value: any) => { setHeadCount([headCount[0], value]) } }} />
          <div className='self-end text-12 text-gray3'>*최대인원 제한 없을 경우 '0'명으로 표기</div>
        </div>
      </InputCollapse>
    </DialogFilter1>
  )
}