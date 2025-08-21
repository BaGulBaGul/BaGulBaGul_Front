"use client";
import { useRef, useState } from "react";
import { useReport } from "@/hooks/useInReport";
import { ReportRadios } from "./ReportRadios";
import { AlertDialog, DialogFull, DialogHeader } from "..";

interface Props { open: boolean; toggleOpen: (open: boolean) => void; type: 'comment' | 'comment-child' | 'event' | 'recruitment'; target?: number; }
export function ReportDialog({ open, toggleOpen, type, target }: Props) {
  const [value, setValue] = useState<string | undefined>(undefined)
  const closeDialog = () => { toggleOpen(false) }
  const etcRef = useRef<HTMLInputElement>(null);
  // 중복 신고 alert
  const [openA, setOpenA] = useState(false)
  const openAlert = () => { setOpenA(true); }

  const mutateReport = useReport(type, (newValue: any) => setValue(newValue), closeDialog, openAlert)
  const handleReport = () => {
    if (!value) { alert('신고하는 이유를 반드시 선택해주세요.') }
    else { mutateReport.mutate({ [targetKey(type)]: target, "reportType": value, "message": etcRef.current?.value ?? '' }) }
  }

  function ReportTab() {
    return (
      <div className="flex flex-col gap-[8px] pt-[60px] pb-[77px]">
        <div className="flex flex-col gap-[4px] px-[16px] py-[18px] bg-p-white">
          <p className="text-16 text-black font-semibold">신고하는 이유를 선택해주세요.</p>
          <p className="text-14 text-gray3">아래의 항목에서 알맞은 유형을 선택해주세요.</p>
        </div>
        <ReportRadios value={value} setValue={setValue} etcRef={etcRef} />
      </div>
    )
  }
  if (!!target) {
    return (
      <>
        <DialogFull open={open} footerText='제출하기' handleFooter={handleReport}
          handleDialogChange={(open: boolean) => {
            if (!open) { setValue(undefined) }
            toggleOpen(open);
          }}>
          <DialogHeader headerText='신고하기' />
          <ReportTab />
        </DialogFull>
        <AlertDialog open={openA} setOpen={setOpenA} headerText='이미 신고한 게시글입니다' buttonText1='확인'>
          <p>이 글은 이미 신고되었어요!</p>
          <p>더 꺠끗한 바글바글, 함께 만들어요</p>
        </AlertDialog>
      </>
    )
  } else { return <></> }
}

const targetKey = (type: 'comment' | 'comment-child' | 'event' | 'recruitment') => {
  switch (type) {
    case 'comment': return 'commentId'
    case 'comment-child': return 'commentChildId'
    case 'event': return 'eventId'
    case 'recruitment': return 'recruitmentId'
  }
}