import { ReactNode } from "react";
import Link from "next/link";
import { IconPlus } from "../styles/Icon";

export function WriteFab({ url, handleClick, children }: { url?: string; handleClick?: () => void; children?: ReactNode }) {
  function FabBody() {
    return (
      <div className='flex flex-row items-center h-[38px] text-white mx-[12px] my-[6px]'>
        <IconPlus />
        {children}
      </div>
    )
  }

  let wrapStyle = 'fab fixed bottom-[19px] right-[19px] bg-primary-blue hover:outline-primary-blue'
  if (!!url) {
    return <Link href={url} className={wrapStyle}><FabBody /></Link>
  } else {
    return <button onClick={handleClick} className={wrapStyle}><FabBody /></button>
  }
}