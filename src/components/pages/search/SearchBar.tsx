import { ViewButton } from "@/components/common";
import { TagIcn } from "@/components/styles/Icon";
import { useRef } from "react";

interface SearchBarProps { opt?: number; title?: string; tag?: string; setOpen: any; filterCnt: number; setTitle?: any; handleRt?: any; router?: any; }
export function SearchBar(props: SearchBarProps) {
  // opt 0: search / opt 1: searched
  const handleOpen = () => { props.setOpen(true) }
  if (props.title !== undefined) {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSearch = (event: any) => {
      if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
        if (inputRef.current && inputRef.current.value !== '') {
          event.preventDefault();
          props.setTitle(encodeURIComponent(encodeURIComponent(inputRef.current.value)))
          if (props.opt === 1) { props.handleRt() }
        }
      }
    }
    return (
      <div className='fixed w-full top-0 bg-p-white z-paper'>
        <div className='flex flex-row items-center mx-[16px] my-[18px] gap-[16px]'>
          <button><img src='/search_back.svg' /></button>
          <div className='flex flex-row justify-between w-full'>
            <div className='search-wrap'>
              <input className='search-input' defaultValue={props.opt === 0 ? undefined : props.title}
                placeholder={props.opt === 0 ? '피크페스티벌' : undefined} ref={inputRef} onKeyDown={handleSearch} required />
              <button onClick={handleSearch}><img src='/search_magnifying.svg' /></button>
            </div>
            <ViewButton handleOpen={handleOpen} cnt={props.filterCnt} fs={14} />
          </div>
        </div>
      </div>
    )
  }
  else if (props.tag) {
    return (
      <div className='fixed w-full top-0 bg-p-white z-paper border-b-[1px] border-gray1'>
        <div className='flex flex-row items-center mx-[16px] my-[18px] gap-[16px]'>
          <button><img src='/search_back.svg' /></button>
          <div className='flex flex-row justify-between w-full'>
            <div className='flex flex-row items-center px-[4px] py-[2px] gap-[2px]'>
              <TagIcn />
              <div className="inline-block align-middle text-14">{props.tag}</div>
            </div>
            <ViewButton handleOpen={handleOpen} cnt={props.filterCnt} fs={14} />
          </div>
        </div>
      </div>
    )
  }
}