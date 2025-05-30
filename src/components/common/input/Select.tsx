import { Collapse } from "@mui/material";
import { CmtLikeIcn } from "../styles/Icon";
import { PartiNumberInput } from "./NumberInput";

interface CountSelectProps { title: string; subtext: string; open: boolean; handleOpen: any; headCount?: number; setHeadCount: any }
export function CountSelect(props: CountSelectProps) {
  return (
    <div className="flex flex-col" id="filter-head">
      <div className="flex flex-row gap-[16px]">
        <span className="text-14 font-semibold">{props.title}</span>
        <div className="flex flex-row items-center gap-[8px]">
          <button onClick={props.handleOpen} className={!!props.headCount ? 'filter-btn border-primary-blue' : 'filter-btn'}>
            <CmtLikeIcn val={!!props.headCount} />
            <span>{!!props.headCount ? props.headCount : 0}명</span>
          </button>
          <span className="text-12 text-gray3">{props.subtext}</span>
        </div>
      </div>
      <Collapse in={props.open} timeout="auto" className="filter-collapse">
        <div className="flex flex-row justify-between mt-[8px]">
          <span className="text-14">인원 수</span>
          <PartiNumberInput value={props.headCount ?? 0} min={0}
            onInputChange={(event) => {
              props.setHeadCount(Number.isNaN(Number(event.target.value)) ? undefined : Number(event.target.value))
            }}
            onChange={(event, newValue) => props.setHeadCount(Number.isNaN(Number(newValue)) ? undefined : Number(newValue))} />
        </div>
      </Collapse>
    </div>
  )
}