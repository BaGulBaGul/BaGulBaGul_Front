import { ReactNode } from "react";
import Link from "next/link";
import { IconPlus } from "../styles/Icon";

export function WriteFab({ url, children }: { url: string; children?: ReactNode }) {
  return (
     <Link href={url} className='fab fixed bottom-[19px] right-[19px] bg-primary-blue hover:outline-primary-blue'>
      <div className='flex flex-row items-center h-[38px] text-white mx-[12px] my-[6px]'>
        <IconPlus />
        {children}
      </div>
    </Link>
  )
}