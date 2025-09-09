import { PropsWithChildren, useRef } from "react";
import { IconArrowBack, IconSearchS, IconTag } from "@/components/common/styles/Icon";
import { SearchInput } from "@/components/common/input";

interface Props extends PropsWithChildren {
  title: string; isSearched?: boolean; updateTitle: (t: string) => void; handleRoute?: any; handleBack: () => void;
}
export function SearchBar({ title, isSearched, updateTitle, handleRoute, handleBack, children }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = (event: any) => {
    if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
      if (inputRef.current && inputRef.current.value !== '') {
        event.preventDefault();
        updateTitle(encodeURIComponent(encodeURIComponent(inputRef.current.value)))
        if (isSearched) { handleRoute() }
      }
    }
  }
  return (
    <div className='fixed w-full top-0 bg-p-white z-30'>
      <div className='flex flex-row items-center mx-[16px] my-[18px] gap-[16px]'>
        <button onClick={handleBack}><IconArrowBack /></button>
        <SearchInput inputRef={inputRef} defaultValue={isSearched ? title : undefined}
          placeholder={isSearched ? undefined : '피크페스티벌'} handleKeyDown={handleSearch} required>
          <button onClick={handleSearch}><IconSearchS /></button>
        </SearchInput>
        {children}
      </div>
    </div>
  )
}

interface TagProps extends PropsWithChildren { tag: string; handleBack: () => void; }
export function SearchTagBar({ tag, handleBack, children }: TagProps) {
  return (
    <div className='fixed w-full top-0 bg-p-white z-30 h-[66px]'>
      <div className='flex flex-row items-center mx-[16px] my-[18px] gap-[16px]'>
        <button onClick={handleBack}><IconArrowBack /></button>
        <div className='flex flex-row justify-between w-full'>
          <div className='flex flex-row items-center px-[4px] py-[2px] gap-[2px]'>
            <IconTag />
            <div className="inline-block align-middle text-14">{tag}</div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}