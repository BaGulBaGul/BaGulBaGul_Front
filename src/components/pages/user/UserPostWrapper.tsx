import { PropsWithChildren, ReactNode } from "react";
import { TypeTabs } from "@/components/common";

interface Props extends PropsWithChildren { profile?: ReactNode, value: number; handleChange: ((value: any, e: Event | undefined) => void); }
export function UserPostWrapper({ profile, value, handleChange, children }: Props) {
  return (
    <div className="flex flex-col pt-[60px]">
      {profile}
      <div className='flex flex-col w-full'>
        <TypeTabs val={value} handleChange={handleChange} types={['PARTY', 'RCT']} wrapStyle='sticky top-[60px]' />
        {children}
      </div>
    </div>
  )
}