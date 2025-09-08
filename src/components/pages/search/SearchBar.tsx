import { useRef } from "react";
import { IconArrowBack, IconSearchS, IconTag } from "@/components/common/styles/Icon";
import { Divider } from "@/components/common";
import { FilterButton } from "@/components/common/filter";
import { SearchInput } from "@/components/common/input";

interface SearchBarProps {
  opt?: 0 | 1; title?: string; tag?: string; setOpen: any; filterCnt: number; setTitle?: any; handleRt?: any; router: any;
}
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
      <div className='fixed w-full top-0 bg-p-white z-30'>
        <div className='flex flex-row items-center mx-[16px] my-[18px] gap-[16px]'>
          <button onClick={() => props.router.back()}><IconArrowBack /></button>
          <SearchInput inputRef={inputRef} defaultValue={props.opt === 0 ? undefined : props.title}
            placeholder={props.opt === 0 ? '피크페스티벌' : undefined} handleKeyDown={handleSearch} required>
            <button onClick={handleSearch}><IconSearchS /></button>
          </SearchInput>
          <FilterButton handleOpen={handleOpen} cnt={props.filterCnt} fs={14} />
        </div>
      </div>
    )
  }
  else if (props.tag) {
    return (
      <div className='fixed w-full top-0 bg-p-white z-30 h-[66px]'>
        <div className='flex flex-row items-center mx-[16px] my-[18px] gap-[16px]'>
          <button onClick={() => props.router.back()}><IconArrowBack /></button>
          <div className='flex flex-row justify-between w-full'>
            <div className='flex flex-row items-center px-[4px] py-[2px] gap-[2px]'>
              <IconTag />
              <div className="inline-block align-middle text-14">{props.tag}</div>
            </div>
            <FilterButton handleOpen={handleOpen} cnt={props.filterCnt} fs={14} />
          </div>
        </div>
        <Divider />
      </div>
    )
  }
}