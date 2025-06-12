import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import SubHeader from "@/components/layout/subHeader";

interface Props extends PropsWithChildren { title: string; wrapStyle?: string; }
export function DetailWrapper({ title, wrapStyle, children }: Props) {
  const router = useRouter();
  return (
    <>
      <SubHeader name={title} />
      <div className={'flex flex-col w-full min-h-screen pt-[104px] ' + wrapStyle}>
        {children}
      </div>
    </>
  )
}

export function DetailInfoLine({ title, value, children }: { title: string; value: string; children?: React.ReactNode }) {
  return (
    <div className='flex flex-row px-[16px] gap-[20px] items-center text-14'>
      <span className='font-semibold'>{title}</span>
      <div>{value}{children}</div>
    </div>
  )
}