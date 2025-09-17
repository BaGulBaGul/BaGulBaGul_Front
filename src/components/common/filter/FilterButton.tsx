import { IconFilter } from "../styles/IconSingleUse";

export function FilterButton({ handleOpen, cnt }: { handleOpen: any; cnt: number; }) {
  return (
    <button onClick={handleOpen} className='inline-flex justify-between items-center max-w-[67px] break-keep text-gray3 text-14 min-w-[49px]' >
      <div>필터</div>
      {cnt > 0 && <span>{cnt}</span>}
      <IconFilter />
    </button>
  )
}