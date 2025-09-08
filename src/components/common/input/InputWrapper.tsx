"use client";
import { PropsWithChildren } from "react";
import { Checkbox } from '@base-ui-components/react';
import { IconCheckBoxS } from "../styles/IconCheck";

export function InputCheck({title, checked, handleChange}: { title: string; checked: boolean; handleChange: any; }) {
  return (
    <label className={`flex flex-row justify-between items-center text-14 ${!!checked ? 'font-semibold text-primary-blue' : 'text-black'}`}>
      {title}
      <Checkbox.Root className='' checked={checked} onCheckedChange={handleChange}>
        <IconCheckBoxS checked={checked} />
      </Checkbox.Root>
    </label>
  )
}

interface InputContainerProps extends PropsWithChildren { title: string; desc?: string; btn?: React.ReactNode; p?: boolean; }
export function InputContainer({ title, desc, btn, p, children }: InputContainerProps) {
  return (
    <div className="flex flex-col">
      <div className={"flex flex-row" + (!!btn ? ' gap-[16px]' : ' gap-[8px] items-center' + (!!p ? ' px-[16px] py-[10px]' : ' pb-[10px]'))}>
        <span className="text-14 font-semibold">{title}</span>
        {!!btn ?
          <div className="flex flex-row items-center gap-[8px]">
            {btn}
            {!!desc && <span className="text-12 text-gray3">{desc}</span>}
          </div>
          : <>{!!desc && <span className="text-12 text-gray3">{desc}</span>}</>
        }
      </div>
      {children}
    </div>
  )
}