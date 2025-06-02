"use client";
import { PropsWithChildren } from "react";
import { ThemeProvider, FormControl, FormControlLabel, RadioGroup, Radio, Checkbox } from "@mui/material";
import { MagnifyingIcn } from "../styles/Icon";
import { filterCheckTheme } from "./FilterTheme";

export function FilterSortRadio(props: { value: string; handleChange: any; order?: [] }) {
  const defaultOrder = [{ 'value': 'createdAt,desc', 'label': '최신순' }, { 'value': 'views,desc', 'label': '조회수' }, { 'value': 'likeCount,desc', 'label': '좋아요수' }, { 'value': 'commentCount,desc', 'label': '댓글수' }]
  return (
    <FilterContainer title="정렬">
      <FormControl>
        <RadioGroup row value={props.value} onChange={props.handleChange}>
          {!!props.order ? props.order.map((item: any) => (
            <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
          )) : defaultOrder.map((item: any) => (
            <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
          ))}
        </RadioGroup>
      </FormControl>
    </FilterContainer>
  )
}

export function FilterCheck(props: { title: string; checked: boolean; handleChange: any; }) {
  return (
    <div className="flex flex-row justify-between">
      <div className="text-14">{props.title}</div>
      <ThemeProvider theme={filterCheckTheme}>
        <FormControl>
          <FormControlLabel control={<Checkbox checked={props.checked} onChange={props.handleChange} />} label="" />
        </FormControl>
      </ThemeProvider>
    </div>
  )
}

interface FilterContainerProps extends PropsWithChildren { title: string; desc?: string; btn?: React.ReactNode }
export function FilterContainer({ title, desc, btn, children }: FilterContainerProps) {
  return (
    <div className="flex flex-col">
      <div className={"flex flex-row" + (!!btn ? ' gap-[16px]' : ' gap-[8px] items-center px-[16px] py-[10px]')}>
        <span className="text-14 font-semibold">{title}</span>
        {!!btn ?
          <div className="flex flex-row items-center gap-[8px]">
            {btn}
            {!!desc && <span className="text-12 text-gray3">{desc}</span>}
          </div>
          : <>{!!desc && <span className="text-12 text-gray3">{desc}</span>}</>
        }
      </div>
      {children}
    </div>
  )
}

export function FilterSearchBox({ title, defaultText, value, handleClick }: { title: string; defaultText: string; value?: string; handleClick: () => void }) {
  return (
    <div className='flex flex-row justify-between items-center gap-[16px] px-[16px] py-[10px]'>
      <span className='min-w-[49px] text-14 font-semibold'>{title}</span>
      <div onClick={handleClick} className='flex flex-row items-center gap-[8px] cursor-pointer'>
        {!!value ? <span className='text-14'>{value}</span> : <span className='text-14 text-gray2'>{defaultText}</span>}
        <MagnifyingIcn size={24} />
      </div>
    </div>
  )
}