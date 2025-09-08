"use client";
import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@base-ui-components/react';
import { IconCheckBox } from '@/components/common/styles/Icon';

export function ReportTool() {
  const [actions, setActions] = useState<string[]>([]);
  const reportActions = [
    { label: '게시글 삭제', value: 'delete-post' },
    { label: '계정 일시 정지', value: 'suspend-account' },
    { label: '해당없음(신고취소)', value: 'cancel-report' }
  ];
  const buttonValues = [
    { text: '처리할 항목을 선택해주세요', style: 'bg-gray1 text-black' },
    { text: reportActions.find(a => a.value === actions[0])?.label + '하기', style: 'bg-primary-blue text-gray1' },
    { text: '선택 항목 처리하기', style: 'bg-primary-blue text-gray1' }
  ]

  return (
    <div className='flex flex-col w-full gap-[10px] pt-[10px]'>
      <CheckboxGroup value={actions} onValueChange={setActions} className='flex flex-row gap-[8px]'>
        {reportActions.map((action) => (
          <label className='flex flex-row gap-[4px] items-center text-14'>
            <Checkbox.Root value={action.value} className='' checked={actions.some(x => x === action.value)}>
              <IconCheckBox checked={actions.some(x => x === action.value)} />
            </Checkbox.Root>
            {action.label}
          </label>
        ))}
      </CheckboxGroup>
      <button className={'w-full p-[4px] text-14 rounded-[4px] ' + buttonValues[actions.length].style}>{buttonValues[actions.length].text}</button>
    </div>
  )
}