import { IconFilter } from "../styles/IconSingleUse";

interface Props { handleOpen: any; cnt: number; fs: 14 | 18; }
export function FilterButton(props: Props) {
  return (
    <button onClick={props.handleOpen} className={`inline-flex justify-between items-center max-w-[67px] break-keep text-gray3 ${props.fs === 14 ? 'text-14 min-w-[49px]' : 'text-18 pb-[3px] min-w-[55px]'}`} >
      <div>필터</div>
      {props.cnt > 0 ? <span>{props.cnt}</span> : <></>}
      <IconFilter />
    </button>
  )
}