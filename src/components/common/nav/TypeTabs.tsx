import { tabList, typeString } from '@/service/Functions';
import { Tabs } from '@base-ui-components/react/tabs';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  val: number; handleChange: ((value: any, e: Event | undefined) => void);
  types?: string[]; counts?: number[]; wrapStyle?: string;
}
export function TypeTabs({ val, handleChange, types, counts, wrapStyle, children }: Props) {
  let defaultTypes = tabList
  return (
    <Tabs.Root defaultValue={val} onValueChange={(v, e) => handleChange(v, e)} className={'flex px-[16px] py-[10px] w-full justify-between bg-p-white z-10 ' + wrapStyle}>
      <Tabs.List className="flex relative z-0 gap-[16px] text-18">
        {(types ?? defaultTypes).map((type, idx) => (
          <Tabs.Tab value={idx} className="data-[selected]:font-semibold pb-[3px]">
            {typeString[type]}
            {counts && <span className='ps-[4px]'>{counts[idx]}</span>}
          </Tabs.Tab>))}
        <Tabs.Indicator className='absolute left-0 bottom-0 h-[1px] w-[var(--active-tab-width)] bg-black 
        translate-x-[var(--active-tab-left)] translate-y-[-50%] duration-200 ease-in-out' />
      </Tabs.List>
      {children}
    </Tabs.Root>
  )
}