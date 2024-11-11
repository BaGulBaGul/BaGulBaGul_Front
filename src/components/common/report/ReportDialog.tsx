import { FullscreenDialog } from "../FullscreenDialog";
import { useRef, useState } from "react";
import { ReportRadios } from "./ReportRadios";
import { Divider } from "..";

export function ReportDialog(props: { open: boolean, setOpen: any }) {
  const [value, setValue] = useState<string | undefined>(undefined)
  const handleClose = () => { props.setOpen(false); };
  const etcRef = useRef<HTMLInputElement>(null);

  const handleReport = () => {
    if (value === 'etc' && !!etcRef.current && etcRef.current.value.length === 0) {
      alert('신고하는 이유를 반드시 작성해주세요.')
    } else {
      console.log(value, etcRef.current?.value)
      alert('제출되었습니다.')
      setValue(undefined);
      props.setOpen(false);
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