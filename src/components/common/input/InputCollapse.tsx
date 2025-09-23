"use client";
import { PropsWithChildren } from "react";
import { Accordion } from '@base-ui-components/react';
import { IconCalendar, IconSmile } from "../styles/IconStatus";
import { InputContainer } from ".";

export function CollapseButton({ type, value, valueText }: { type: 'CAL' | 'NUM'; value?: boolean; valueText?: string }) {
  return (
    <Accordion.Header>
      <Accordion.Trigger className={`flex flex-row items-center gap-[8px] 
      ${type === 'CAL' ? 'px-[8px] py-[4px]' : 'p-[4px] pe-[6px]'} border border-gray2 rounded-[8px] 
      ${!!value && 'border-primary-blue'} text-14 text-black`}>
        <span className={!!value ? "text-primary-blue" : ''}>{type === 'CAL' ? <IconCalendar checked={!!value} /> : <IconSmile checked={!!value} />}</span>
        <span>{valueText}</span>
      </Accordion.Trigger>
    </Accordion.Header>
  )
}

// form에서 닫은 상태에서도 값 유지하기 위한 keepMounted 조건 추가
interface CollapseProps extends PropsWithChildren { title: string; value?: string | Number; type: 'CAL' | 'NUM'; desc?: string; keepMounted?: boolean }
export function InputCollapse(props: CollapseProps) {
  let defaultText = props.type === 'CAL' ? '날짜 선택하기1' : '0명';
  let valueText = !!props.value ? `${props.value}${props.type === 'CAL' ? '' : '명'}` : defaultText;

  return (
    <Accordion.Root keepMounted={!!props.keepMounted}>
      <Accordion.Item>
        <InputContainer title={props.title} desc={props.desc}
          btn={<CollapseButton type={props.type} valueText={valueText} value={!!props.value} />}>
          <Accordion.Panel>
            {props.children}
          </Accordion.Panel>
        </InputContainer>
      </Accordion.Item>
    </Accordion.Root>
  )
}