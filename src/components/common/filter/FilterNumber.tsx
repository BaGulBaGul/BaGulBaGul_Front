"use client";
import { useState } from 'react';
import { InputCollapse, InputNumber } from '../input';
import { headCountString } from '@/service/Functions';
import { NumberInput1 } from '../input/InputNumber';

export function FilterNumber({ prevVal }: { prevVal: any }) {
  const [ptcp, setPtcp] = useState<number | null>(!!prevVal ? Number(prevVal) : null);
  return (
    <InputCollapse title={'참여인원'} type="NUM" value={Number(ptcp)} keepMounted={true} >
      <InputNumber value={ptcp ?? undefined} name='ptcp' updateValue={(value) => setPtcp(value)} />
    </InputCollapse>
  )
}

export function FilterNumberRange({ prevMin, prevMax }: { prevMin?: any; prevMax?: any }) {
  const [headCount, setHeadCount] = useState<(number | null)[]>([Number(prevMin) ?? null, Number(prevMax) ?? null])

  return (
    <InputCollapse title={'규모설정'} type="NUM" value={(!headCount[0] && !headCount[1]) ? 0 : headCountString(headCount[0], headCount[1])} keepMounted={true}>
      <div className='flex flex-col gap-[8px]'>
        <div className="flex flex-col gap-[8px]">
          <span className="text-14">최소/최대 설정하기</span>
          <div className="flex flex-row justify-between gap-[22px]">
            <NumberInput1 title="최소인원" name='hcMin' value={headCount[0]} onChange={(value: any) => { setHeadCount([value, headCount[1]]) }} />
            <NumberInput1 title="최대인원" name='hcMax' value={headCount[1]} min={headCount[0]} onChange={(value: any) => { setHeadCount([headCount[0], value]) }} />
          </div>
        </div>
        <div className='self-end text-12 text-gray3'>*최대인원 제한 없을 경우 '0'명으로 표기</div>
      </div>
    </InputCollapse>
  )
}