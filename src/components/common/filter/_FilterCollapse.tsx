"use client";
import { PropsWithChildren, useState } from "react";
import dayjs from 'dayjs';
import { Collapse } from "@mui/material";
import { CalIcn, CmtLikeIcn } from "../styles/Icon";
import { FilterContainer } from "./FilterWrapper";
import { ScrollPicker } from "@/components/pages/write/ScrollPicker";

export function CollapseButton({ handleOpen, type, value, valueText }: { handleOpen: () => void; type: 'CAL' | 'NUM'; value?: boolean; valueText?: string }) {
  return (
    <button onClick={handleOpen} className={`filter-btn px-[8px] gap-[8px] ${!!value && 'border-primary-blue'}`}>
      <span className={!!value ? "text-primary-blue" : ''}>{type === 'CAL' ? <CalIcn val={!!value} /> : <CmtLikeIcn val={!!value} />}</span>
      <span>{valueText}</span>
    </button>
  )
}

interface CollapseProps extends PropsWithChildren { title: string; value?: string | Number; type: 'CAL' | 'NUM'; desc?: string; }
export function FilterCollapse(props: CollapseProps) {
  const [open, setOpen] = useState(false);
  let defaultText = props.type === 'CAL' ? '날짜 선택하기' : '0명';
  let valueText = !!props.value ? `${props.value}${props.type === 'CAL' ? '' : '명'}` : defaultText;

  return (
    <FilterContainer title={props.title} desc={props.desc}
      btn={<CollapseButton type={props.type} handleOpen={() => setOpen(!open)} valueText={valueText} value={!!props.value} />}>
      <Collapse in={open} timeout="auto">
        {props.children}
      </Collapse>
    </FilterContainer>
  )
}

export const FilterDateSelect = (props: { title: string; date: dayjs.Dayjs | null; setDate: any; }) => {
  const [open, setOpen] = useState(false);
  const handleClose = (data: dayjs.Dayjs | null, open: boolean) => {
    props.setDate(data);
    setOpen(open);
  }
  let valueText = !!props.date ? `${dayjs(props.date).format('YYYY년 M월 DD일 A HH:mm')}` : '날짜 선택하기';
  return (
    <>
      <FilterContainer title={props.title}
        btn={<CollapseButton type={'CAL'} handleOpen={() => setOpen(!open)} value={!!props.date} valueText={valueText} />}>
        <ScrollPicker open={open} data={props.date} handleClose={handleClose} />
      </FilterContainer>
    </>
  )
}