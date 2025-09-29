"use client";
import { NumberField } from '@base-ui-components/react/number-field';
import { IconMinus, IconPlus } from '../styles/Icon';

interface InputNumberProps { value?: number; name?: string; updateValue?: (value: number | null) => void; }
export function InputNumber({ value, name, updateValue }: InputNumberProps) {
  return (
    <div className="flex flex-row justify-between pt-[8px]">
      <span className="text-14">인원 수</span>
      <NumberField.Root defaultValue={value} min={1} name={name} onValueChange={updateValue}>
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