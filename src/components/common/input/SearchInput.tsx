import { PropsWithChildren, RefObject } from "react";

interface SearchInputProps extends PropsWithChildren {
  inputRef?: RefObject<HTMLInputElement>; defaultValue?: string; placeholder?: string;
  handleKeyDown?: any; readOnly?: boolean; required?: boolean; divStyle?: string;
}
export function SearchInput({ inputRef, defaultValue, placeholder, handleKeyDown, readOnly, required, divStyle, children }: SearchInputProps) {
  return (
    <div className={"flex flex-row bg-gray1 px-[8px] py-[4px] gap-[8px] w-full " + (divStyle ?? '')}>
      <input className="w-full text-14 outline-none placeholder:text-gray2" style={{backgroundColor: 'transparent'}} ref={inputRef} defaultValue={defaultValue}
        placeholder={placeholder} readOnly={!!readOnly} required={!!required} onKeyDown={handleKeyDown} />
      {children}
    </div>
  )
}