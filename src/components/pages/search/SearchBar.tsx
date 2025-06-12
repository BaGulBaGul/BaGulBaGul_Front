import { useRef } from "react";
import { HeaderBackIcn, MagnifyingIcn } from "@/components/common/styles/Icon";
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
          <button onClick={() => props.router.back()}><HeaderBackIcn /></button>
          <SearchInput inputRef={inputRef} defaultValue={props.opt === 0 ? undefined : props.title}
            placeholder={props.opt === 0 ? '피크페스티벌' : undefined} handleKeyDown={handleSearch} required>
            <button onClick={handleSearch}><MagnifyingIcn size={20} /></button>
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
          <button onClick={() => props.router.back()}><HeaderBackIcn /></button>
          <div className='flex flex-row justify-between w-full'>
            <div className='flex flex-row items-center px-[4px] py-[2px] gap-[2px]'>
              <TagIcn />
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

const TagIcn = () => (
  <svg width="18px" height="18px" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.94922 11.1641H7.46094L7.00977 13.8984H6.01172L6.46289 11.1641H5L5.16406 10.1797H6.62012L7.03027 7.71875H5.58789L5.73828 6.73438H7.1875L7.63867 4H8.63672L8.18555 6.73438H10.6738L11.125 4H12.123L11.6719 6.73438H13.1484L12.9844 7.71875H11.5146L11.1045 10.1797H12.5605L12.3965 11.1641H10.9473L10.4961 13.8984H9.49805L9.94922 11.1641ZM10.1064 10.1797L10.5166 7.71875H8.02832L7.61816 10.1797H10.1064Z" fill="#1E1E1E" />
    <circle cx="9" cy="9" r="8.75" stroke="#1E1E1E" strokeWidth="0.5" />
  </svg>
)