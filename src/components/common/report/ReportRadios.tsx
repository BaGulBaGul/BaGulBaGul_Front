import { ChangeEvent, RefObject, useState } from "react";
import { RadioGroup, Radio } from '@base-ui-components/react';
import { Divider } from "..";

export function ReportRadios(props: { value?: string; setValue: any; etcRef: RefObject<HTMLTextAreaElement> }) {
  const handleChange = (value: any) => { props.setValue(value); };
  const reportReason = [{ 'value': 'NOT_RELEVANT', 'label': '바글바글과 관련 없는 홍보 내용' }, { 'value': 'OFFENSIVE_CONTENT', 'label': '욕설 및 음란성, 사행성 내용 등 불쾌감을 주는 후기' },
  { 'value': 'DEFAMATORY', 'label': '비방, 비하, 차별성 발언, 모욕 등 명예훼손성 후기' }, { 'value': 'ETC', 'label': '기타' }]

  let [cnt, setCnt] = useState(0)
  const MAX_LENGTH = 5
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setCnt(e.target.value.length);
  };

  return (
    <RadioGroup value={props.value} onValueChange={handleChange} className='flex flex-col' >
      {reportReason.map((item: any) => (
        <>
          <Radio.Root value={item.value} key={item.value}
            className='p-[16px] text-14 text-left data-[checked]:text-primary-blue data-[checked]:ring-1 data-[checked]:ring-inset data-[checked]:ring-primary-blue'>
            {item.label}
          </Radio.Root>
          <Divider />
        </>
      ))}
      <div className="flex flex-col gap-[8px] p-[16px] text-14">
        <textarea placeholder='상세한 설명이 추가로 필요한 경우에만 작성해주세요.' ref={props.etcRef} rows={6} onChange={handleInput}
          className='w-full px-[16px] py-[8px] rounded-[8px] ring-1 ring-inset ring-gray2 placeholder:text-gray2 focus-visible:ring-primary-blue outline-none' />
        <div className="flex flex-row justify-end">
          <p className={cnt >= 20 ? 'text-danger-red' : 'text-gray3'}>{cnt}</p>
          <p className="text-gray2">/{MAX_LENGTH}자</p>
        </div>
      </div>
    </RadioGroup>
  )
}