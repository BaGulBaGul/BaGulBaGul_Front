"use client";
import { RadioGroup, Radio } from '@base-ui-components/react';
import { IconRadio } from "../styles/IconCheck";
import { InputContainer } from "../input";

export function FilterSortRadio({ name, value, defaultValue, handleChange, order }: { name?: string; value?: string; defaultValue?: string; handleChange?: any; order?: [] }) {
  const defaultOrder = [{ 'value': 'createdAt,desc', 'label': '최신순' }, { 'value': 'views,desc', 'label': '조회수' }, { 'value': 'likeCount,desc', 'label': '좋아요수' }, { 'value': 'commentCount,desc', 'label': '댓글수' }]
  return (
    <InputContainer title="정렬">
      <RadioGroup name={name} value={value} defaultValue={defaultValue} onValueChange={handleChange} className='flex flex-row gap-[8px]' >
        {(order ?? defaultOrder).map((item: any) => (
          <label className='flex flex-row gap-[4px] text-14' key={item.value}>
            <Radio.Root value={item.value} render={((props, state) => (<IconRadio checked={state.checked} />))} />
            {item.label}
          </label>
        ))}
      </RadioGroup>
    </InputContainer >
  )
}