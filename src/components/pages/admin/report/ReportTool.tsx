"use client";
import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@base-ui-components/react';
import { IconCheckBox } from '@/components/common/styles/Icon';
import { ReportPopup } from './ReportPopup';
import { postCmtString } from '@/service/Functions';
import { ReportType } from '..';

export function ReportTool({ opt }: { opt: 'POST' | 'CMT' }) {
  const [actions, setActions] = useState<string[]>([]);
  const [openP, setOpenP] = useState(false);

  const handleActions = (value: string[]) => {
    let newValue = value.filter(item => !actions.includes(item))[0];
    if (newValue === 'cancel-report' && !!actions) {
      setActions(['cancel-report'])
    } else if (!!newValue && actions.includes('cancel-report')) {
      setActions([newValue])
    } else {
      setActions(value)
    }
  }

  const reportActions: { label: string, value: ReportType }[] = [
    { label: `${postCmtString[opt]} 삭제`, value: 'delete-post' },
    { label: '계정 일시 정지', value: 'suspend-account' },
    { label: '해당없음(신고취소)', value: 'cancel-report' }
  ];
  const buttonValues = [
    { text: '처리할 항목을 선택해주세요', style: 'bg-gray1 text-black', props: { disabled: true } },
    {
      text: reportActions.find(a => a.value === actions[0])?.label + '하기',
      style: 'bg-primary-blue text-gray1',
      props: { onClick: () => setOpenP(true) }
    },
    { text: '선택 항목 처리하기', style: 'bg-primary-blue text-gray1', props: { onClick: () => setOpenP(true) } }
  ]

  return (
    <div className='flex flex-col w-full gap-[10px] pt-[10px]'>
      <CheckboxGroup value={actions} onValueChange={handleActions} className='flex flex-row gap-[8px]'>
        {reportActions.map((action) => (
          <label className='flex flex-row gap-[4px] items-center text-14' key={action.value}>
            <Checkbox.Root value={action.value} className='' checked={actions.some(x => x === action.value)}>
              <IconCheckBox checked={actions.some(x => x === action.value)} />
            </Checkbox.Root>
            {action.label}
          </label>
        ))}
      </CheckboxGroup>
      <button {...buttonValues[actions.length].props} className={'w-full p-[4px] text-14 rounded-[4px] ' + buttonValues[actions.length].style}>
        {buttonValues[actions.length].text}
      </button>
      <ReportPopup open={openP} handleOpen={() => setOpenP(false)} value={actions.length > 1 ? 'multiple' : reportActions.find(a => a.value === actions[0])?.value} opt={opt} />
    </div>
  )
}