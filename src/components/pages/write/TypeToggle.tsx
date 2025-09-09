'use client';
import { Toggle, ToggleGroup } from "@base-ui-components/react";
import { EventType } from "../../common";
import { tabList, typeString } from "@/service/Functions";

interface TypeToggleProps {
  type: EventType | undefined; handleType: (newType: string[]) => void;
}
export function TypeToggle({ type, handleType }: TypeToggleProps) {
  return (
    <div className='pb-[10px] px-[16px]'>
      <ToggleGroup value={[type]} onValueChange={handleType} className='flex gap-[4px]'>
        {tabList.map((t, idx) =>
          <Toggle value={t} key={`type-${t}`} className='toggle-chip-btn'
            render={((props) => (
              <button type='button' {...props}>{typeString[t]}</button>
            ))}
          />
        )}
      </ToggleGroup>
    </div>
  )
}