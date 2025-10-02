'use client';
import { Radio, RadioGroup } from "@base-ui-components/react";
import { EventType } from "../../common";
import { tabList, typeString } from "@/service/Functions";

interface TypeToggleProps { type: EventType | undefined; }
export function TypeToggle({ type }: TypeToggleProps) {
  return (
    <div className='pb-[10px] px-[16px]'>
      <RadioGroup name='type' defaultValue={type} className='flex gap-[4px]'>
        {tabList.map((t, idx) =>
          <Radio.Root value={t} key={`type-${t}`} className='toggle-chip-btn'
            render={((props) => (
              <button type='button' {...props}>{typeString[t]}</button>
            ))}
          />
        )}
      </RadioGroup>
    </div>
  )
}