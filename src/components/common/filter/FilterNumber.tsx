"use client";
import { useState } from 'react';
import { NumberField } from '@base-ui-components/react';
import { InputCollapse, InputNumber } from '../input';
import { headCountString } from '@/service/Functions';

export function FilterNumber({ prevVal, title }: { prevVal: any; title?: string }) {
  const [ptcp, setPtcp] = useState<number | null>(!!prevVal ? Number(prevVal) : null);
  return (
    <InputCollapse title={title ?? '참여인원'} type="NUM" value={Number(ptcp)} keepMounted={true} >
      <InputNumber value={ptcp ?? undefined} name='ptcp' updateValue={(value) => setPtcp(value)} />
    </InputCollapse>
  )
}

export function FilterNumberRange({ prevMin, prevMax }: { prevMin?: any; prevMax?: any }) {
  const [headCount, setHeadCount] = useState<(number | null)[]>([!!prevMin ? Number(prevMin) : null, !!prevMax ? Number(prevMax) : null])

  return (
    <InputCollapse title={'규모설정'} type="NUM" value={(!headCount[0] && !headCount[1]) ? 0 : headCountString(headCount[0], headCount[1])} keepMounted={true}>
      <div className='flex flex-col gap-[8px]'>
        <div className="flex flex-col gap-[8px]">
          <span className="text-14">최소/최대 설정하기</span>
          <div className="flex flex-row justify-between gap-[22px]">
            <NumberInput title="최소인원" name='hcMin' value={headCount[0]} onChange={(value: any) => { setHeadCount([value, headCount[1]]) }} />
            <NumberInput title="최대인원" name='hcMax' value={headCount[1]} min={headCount[0]} onChange={(value: any) => { setHeadCount([headCount[0], value]) }} />
          </div>
        </div>
        <div className='self-end text-12 text-gray3'>*최대인원 제한 없을 경우 '0'명으로 표기</div>
      </div>
    </InputCollapse>
  )
}

interface NumberInputProps { name?: string; value: number | null; onChange?: any; min?: number | null; }
function NumberInput({ name, title, value, onChange, min }: { title: string } & NumberInputProps) {
  return (
    <div className="flex flex-row justify-between border border-gray2 rounded-[8px] w-full px-[16px] py-[5px] gap-[8px]">
      <span className="text-14 w-[49px] text-wrap">{title}</span>
      <NumberField.Root name={name} defaultValue={value ?? undefined} onValueChange={onChange} min={min ?? undefined}>
        <NumberField.Input placeholder="1명" className="w-full max-w-[85px] text-right text-14" />
      </NumberField.Root>
    </div>
  )
}