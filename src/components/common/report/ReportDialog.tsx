import { FullscreenDialog } from "../FullscreenDialog";
import { useRef, useState } from "react";
import { ReportRadios } from "./ReportRadios";
import { Divider } from "..";
import { useReport } from "@/hooks/useInReport";

export function ReportDialog(props: { open: boolean; setOpen: any; type: 'comment' | 'comment-child' | 'event' | 'recruitment'; target: number; }) {
  const [value, setValue] = useState<string | undefined>(undefined)
  const handleClose = () => { props.setOpen(false); };
  const etcRef = useRef<HTMLInputElement>(null);

  const mutateReport = useReport(props.type, setValue, props.setOpen)
  const handleReport = () => {
    if (!value) { alert('신고하는 이유를 반드시 선택해주세요.') }
    else if (value === 'ETC' && !!etcRef.current && etcRef.current.value.length === 0) {
      alert('기타를 선택한 경우 설명을 반드시 작성해주세요.')
    } else {
      mutateReport.mutate({ [targetKey(props.type)]: props.target, "reportType": value, "message": etcRef.current?.value ?? '' })
    }
  }

  function ReportTab() {
    return (
      <>
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-col gap-[4px] px-[16px] py-[18px] bg-p-white">
            <p className="text-16 text-black font-semibold">신고하는 이유를 선택해주세요.</p>
            <p className="text-14 text-gray3">아래의 항목에서 알맞은 유형을 선택해주세요.</p>
          </div>
          <ReportRadios value={value} setValue={setValue} etcRef={etcRef} />
        </div>
        <Divider />
        <button className="p-[16px] bg-white text-14 text-primary-blue text-left">작성자 신고하기</button>
      </>
    )
  }

  return (
    <FullscreenDialog child={<ReportTab />} open={props.open} handleClose={handleClose} handleDone={handleReport} headerText='신고하기' footerText='제출하기' bg='#ECECEC' />
  )
}

const targetKey = (type: 'comment' | 'comment-child' | 'event' | 'recruitment') => {
  switch (type) {
    case 'comment': return 'commentId'
    case 'comment-child': return 'commentChildId'
    case 'event': return 'eventId'
    case 'recruitment': return 'recruitmentId'
  }
}