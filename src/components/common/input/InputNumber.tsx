"use client";
import { NumberField } from '@base-ui-components/react/number-field';
import { IconMinus, IconPlus } from '../styles/Icon';

// interface InputNumberProps { value: number; onChange: (value: number | null, event: Event | undefined) => void }
interface InputNumberProps { value?: number; name?: string }

export function InputNumber({ value, name }: InputNumberProps) {
  return (
    <div className="flex flex-row justify-between pt-[8px]">
      <span className="text-14">인원 수</span>
      <NumberField.Root defaultValue={value} min={1} name={name}>
        <NumberField.Group className='flex'>
          <NumberField.Decrement>
            <IconMinus />
          </NumberField.Decrement>
          <NumberField.Input placeholder="1" className="w-[35px] text-center text-14 text-black" />
          <NumberField.Increment>
            <IconPlus />
          </NumberField.Increment>
        </NumberField.Group>
      </NumberField.Root>
    </div>
  )
}

interface NumberInputProps { name?: string; value: number | null; onChange?: any; min?: number | null; }
interface InputNumberRangeProps { minNumber: NumberInputProps; maxNumber: NumberInputProps; }
export function InputNumberRange({ minNumber, maxNumber }: InputNumberRangeProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <span className="text-14">최소/최대 설정하기</span>
      <div className="flex flex-row justify-between gap-[22px]">
        <NumberInput title="최소인원" {...minNumber} />
        <NumberInput title="최대인원" {...maxNumber} />
      </div>
    </div>
  )
}

function NumberInput({ name, title, value, onChange, min }: { title: string } & NumberInputProps) {
  return (
    <div className="flex flex-row justify-between border border-gray2 rounded-[8px] w-full px-[16px] py-[5px] gap-[8px]">
      <span className="text-14 w-[49px] text-wrap">{title}</span>
      <NumberField.Root name={name} value={value} onValueChange={onChange} min={min ?? undefined}>
        <NumberField.Input placeholder="1명" className="w-full max-w-[85px] text-right text-14" />
      </NumberField.Root>
    </div>
  )
}