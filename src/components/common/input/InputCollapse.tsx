"use client";
import { PropsWithChildren, useState } from "react";
import { Collapse } from "@mui/material";
import { CalIcn, CmtLikeIcn } from "../styles/Icon";
import { InputContainer } from ".";

export function CollapseButton({ handleOpen, type, value, valueText }: { handleOpen: () => void; type: 'CAL' | 'NUM'; value?: boolean; valueText?: string }) {
  return (
    <button onClick={handleOpen} className={`filter-btn px-[8px] gap-[8px] ${!!value && 'border-primary-blue'}`}>
      <span className={!!value ? "text-primary-blue" : ''}>{type === 'CAL' ? <CalIcn val={!!value} /> : <CmtLikeIcn val={!!value} />}</span>
      <span>{valueText}</span>
    </button>
  )
}

interface CollapseProps extends PropsWithChildren { title: string; value?: string | Number; type: 'CAL' | 'NUM'; desc?: string; }
export function InputCollapse(props: CollapseProps) {
  const [open, setOpen] = useState(false);
  let defaultText = props.type === 'CAL' ? '날짜 선택하기' : '0명';
  let valueText = !!props.value ? `${props.value}${props.type === 'CAL' ? '' : '명'}` : defaultText;

  return (
    <InputContainer title={props.title} desc={props.desc}
      btn={<CollapseButton type={props.type} handleOpen={() => setOpen(!open)} valueText={valueText} value={!!props.value} />}>
      <Collapse in={open} timeout="auto">
        {props.children}
      </Collapse>
    </InputContainer>
  )
}