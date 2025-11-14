"use client";
import { DialogPopup, DialogPopupBody } from '@/components/common';
import { postCmtString } from '@/service/Functions';
import { ReportType } from '..';
import { useState } from 'react';
import { SuspendDialog } from '../SuspendDialog';

export function ReportPopup({ open, handleOpen, value, opt }: { open: boolean; handleOpen: () => void; value?: ReportType | 'activate-account' | 'multiple', opt: 'POST' | 'CMT' }) {
  const [openS, setOpenS] = useState(false);
  const PopInfo = {
    'delete-post': {
      title: '삭제하기', body: [`신고 ${postCmtString[opt]}을 삭제하시겠습니까?`, '삭제 후에는 복구할 수 없습니다.'],
      button: '삭제하기', buttonAction: () => { alert('삭제하기') }
    },
    'suspend-account': {
      title: '계정 일시 정지하기', body: ['이 계정을 일시 정지하시겠습니까?', '정지된 계정은 로그인 및 서비스 이용이', '제한되며 추후 다시 활성화할 수 있습니다.'],
      button: '정지하기', buttonAction: () => { setOpenS(true) }
    },
    'activate-account': {
      title: '계정 활성화하기', body: ['해당 계정을 활성화하시겠습니까?', '활성화 후에는 서비스 이용이 가능합니다'],
      button: '계정 활성화', buttonAction: () => { alert('활성화') }
    },
    'cancel-report': {
      title: '신고 취소하기', body: ['신고를 취소하면', `해당 ${postCmtString[opt]}이 다시 보이게 됩니다.`, '계속하시겠습니까?'],
      button: '취소하기', buttonAction: () => { alert('취소하기') }
    },
    'multiple': {
      title: '선택 항목 처리하기', body: ['선택한 항목에 아래 조치를 진행합니다.', `• ${postCmtString[opt]} 삭제`, '• 계정 일시 정지', '조치는 즉시 반영되며, 되돌릴 수 없습니다.'],
      button: '처리하기', buttonAction: () => { alert('처리하기') }
    }
  }

  if (!!value) {
    let info = PopInfo[value]
    return (
      <>
        <DialogPopup headText={info.title} open={open} handleDialogChange={handleOpen} >
          <DialogPopupBody action={<button className="rounded-[4px] grow basis-0 p-[4px] bg-primary-blue text-gray1" onClick={() => { info.buttonAction(); handleOpen(); }}>{info.button}</button>}>
            {info.body.map((line) => (<p>{line}</p>))}
          </DialogPopupBody>
        </DialogPopup>
        <SuspendDialog open={openS} toggleOpen={(open) => { setOpenS(open) }} />
      </>
    )
  }
}