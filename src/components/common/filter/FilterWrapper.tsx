"use client";
import { PropsWithChildren, useState } from "react";
import { ThemeProvider, FormControl, FormControlLabel, RadioGroup, Radio, Collapse, Checkbox, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { CalIcn, CmtLikeIcn } from "../styles/Icon";
import { filterCheckTheme } from "./FilterTheme";

export function FilterSortRadio(props: { value: string; handleChange: any; order?: [] }) {
  const defaultOrder = [{ 'value': 'createdAt,desc', 'label': '최신순' }, { 'value': 'views,desc', 'label': '조회수' }, { 'value': 'likeCount,desc', 'label': '좋아요수' }, { 'value': 'commentCount,desc', 'label': '댓글수' }]
  return (
    <div className="flex flex-col" id="filter-sort">
      <div className="pb-[10px] text-14 font-semibold">정렬</div>
      <FormControl>
        <RadioGroup row value={props.value} onChange={props.handleChange}>
          {!!props.order ? props.order.map((item: any) => (
            <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
          )) : defaultOrder.map((item: any) => (
            <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
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

interface CollapseProps extends PropsWithChildren { title: string; value?: string | Number; type: 'CAL' | 'NUM' }
export function FilterCollapse(props: CollapseProps) {
  const [open, setOpen] = useState(false);
  let defaultText = props.type === 'CAL' ? '날짜 선택하기' : '0명';
  let valueText = !!props.value ? `${props.value}${props.type==='CAL' ? '' : '명'}` : defaultText;
  return (
    <div className="flex flex-col" id="filter-date">
      <div className="flex flex-row gap-[16px]">
        <div className="text-14 font-semibold">{props.title}</div>
        <button onClick={() => { setOpen(!open) }} className={`filter-btn px-[8px] gap-[8px] ${!!props.value ? 'border-primary-blue' : ''}`}>
          <span className={!!props.value ? "text-primary-blue" : ''}>{props.type === 'CAL' ? <CalIcn val={!!props.value} /> : <CmtLikeIcn val={!!props.value} />}</span>
          <span>{valueText}</span>
        </button>
      </div>
      <Collapse in={open} timeout="auto" className={props.type === 'CAL' ? "" : "pt-[8px]"}>
        {props.children}
      </Collapse>
    </div>
  )
}