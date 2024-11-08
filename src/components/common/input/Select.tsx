import { Collapse } from "@mui/material";
import { CmtLikeIcn } from "../styles/Icon";
import { headCountString } from "@/service/Functions";
import { HeadNumberInput, PartiNumberInput } from "./NumberInput";


export const PartiSelect = (props: { openParti: boolean; handleOpenParti: any; participants: number; setParticipants: any }) => (
  <div className="flex flex-col" id="filter-participant">
    <div className="flex flex-row gap-[16px]">
      <span className="text-14 font-semibold">참여인원</span>
      <button onClick={props.handleOpenParti} className={props.participants > 0 ? 'filter-btn border-primary-blue' : 'filter-btn'}>
        <CmtLikeIcn val={props.participants > 0} />
        <span>{props.participants >= 0 ? props.participants : 0}명</span>
      </button>
    </div>
    <Collapse in={props.openParti} timeout="auto" className="filter-collapse">
      <div className="flex flex-row justify-between mt-[8px]">
        <span className="text-14">인원 수</span>
        <PartiNumberInput value={props.participants ?? 0} min={0}
          onInputChange={(event) => {
            props.setParticipants(Number.isNaN(Number(event.target.value)) ? undefined : Number(event.target.value))
          }}
          onChange={(event, newValue) => props.setParticipants(Number.isNaN(Number(newValue)) ? undefined : Number(newValue))} />
      </div>
    </Collapse>
  </div>
)


export const HeadSelect = (props: { openHead: boolean; handleOpenHead: any; headCount: { from?: number, to?: number }; setHeadCount: any }) => (
  <div className="flex flex-col" id="filter-head">
    <div className="flex flex-row gap-[16px]">
      <span className="text-14 font-semibold">규모설정</span>
      <button onClick={props.handleOpenHead}
        className={(props.headCount.from !== undefined && props.headCount.from > 0)
          || (props.headCount.to !== undefined && props.headCount.to > 0) ? 'filter-btn border-primary-blue' : 'filter-btn'}>
        <CmtLikeIcn val={(props.headCount.from !== undefined && props.headCount.from > 0) || (props.headCount.to !== undefined && props.headCount.to > 0)} />
        <span>{headCountString(props.headCount.from, props.headCount.to)}명</span>
      </button>
    </div>
    <Collapse in={props.openHead} timeout="auto" className="filter-collapse">
      <div className="flex flex-col mt-[8px] gap-[8px]">
        <span className="text-14">최소/최대 설정하기</span>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-between border border-gray2 rounded-[8px] w-[180px] px-[16px] py-[5px]">
            <span className="text-14 w-[49px]">최소인원</span>
            <HeadNumberInput placeholder="1명" value={props.headCount.from ?? 0} min={0}
              onInputChange={(event) => {
                props.setHeadCount({ from: Number.isNaN(Number(event.target.value)) ? undefined : Number(event.target.value), to: props.headCount!.to })
              }}
              onChange={(event, newValue) => props.setHeadCount({ from: Number.isNaN(Number(newValue)) ? undefined : Number(newValue), to: props.headCount!.to })} />
          </div>
          <div className="flex flex-row justify-between border border-gray2 rounded-[8px] w-[180px] px-[16px] py-[5px]">
            <span className="text-14">최대인원</span>
            <HeadNumberInput placeholder="10명" value={props.headCount.to ?? 0} min={props.headCount.from}
              onInputChange={(event) => {
                props.setHeadCount({ from: props.headCount!.from, to: Number.isNaN(Number(event.target.value)) ? undefined : Number(event.target.value) })
              }}
              onChange={(event, newValue) => props.setHeadCount({ from: props.headCount!.from, to: Number.isNaN(Number(newValue)) ? undefined : Number(newValue) })}
            />
          </div>
        </div>
      </div>
    </Collapse>
  </div>
)