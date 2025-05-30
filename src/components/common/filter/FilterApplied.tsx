import { FormatDateRange, sortLabel } from "@/service/Functions";
import { Dispatch, SetStateAction } from "react";
import { FilterProps } from "..";
import { handleFilterValue } from "./Filter";

interface FilterAppliedProps {
  filterCnt: number; filters: string[], setFilters: Dispatch<SetStateAction<string[]>>;
  p: FilterProps; setP: any; handleRt?: any;
}
export const FilterApplied = (props: FilterAppliedProps) => {
  const [startDate, endDate] = props.p.dateRange ?? [null, null];
  const handleDelete = (e: React.MouseEvent, value: string) => {
    e.preventDefault();
    props.setFilters((props.filters).filter((f) => f !== value))
    const initVal = (val: string) => {
      switch(val) {
        case 'state':
          if (!!props.p.proceeding) return {k: 'proceeding', v: false};
          if (!!props.p.recruiting) return {k: 'recruiting', v: false};
        case 'dayRange': return {k: 'dateRange' , v: [null, null]};
        case 'ptcp': return {k: 'participants', v: undefined};
        case 'headCount': return {k: 'headCount', v: { from: undefined, to: undefined }};
      }
    }
    handleFilterValue(props.setP, initVal(value)!.k, initVal(value)!.v)
    if (!!props.handleRt) { props.handleRt() }
  };
  return (
    <>
      {props.filterCnt > 0
        ? <div className='overflow-hidden	h-[26px]'>
          <div className='x-scroll-wrap h-[56px] px-[16px]'>
            <div className='filter-chip'>
              <span>{sortLabel(props.p.sort)}</span>
            </div>
            {!(props.filters).includes('state') ? <></>
              : <FilterChip text={!!props.p.proceeding ? '종료행사제외' : !!props.p.recruiting ? '모집중' : ''} filter='state' handleDelete={handleDelete} />
            }
            {!(props.filters).includes('dayRange') ? <></>
              : <FilterChip text={FormatDateRange(startDate, endDate) ?? ''} filter='dayRange' handleDelete={handleDelete} />
            }
            {!(props.filters).includes('ptcp') ? <></>
              :<FilterChip text={`참여 ${props.p.participants}명`} filter='ptcp' handleDelete={handleDelete} />
            }
            {!((props.filters).includes('headCount') && props.p.headCount !== undefined) ? <></>
              : <FilterChip text={`규모 ${props.p.headCount.from ?? ''} - ${props.p.headCount.to ?? ''}명`} filter='headCount' handleDelete={handleDelete} />
            }
          </div>
        </div>
        : <></>
      }
    </>
  )
}

const FilterChip = ({ text, filter, handleDelete }: { text: string; filter: string; handleDelete: (e: React.MouseEvent, value: string) => void }) => {
  return (
    <div className='filter-chip'>
      <span>{text}</span>
      <button onClick={(e) => handleDelete(e, filter)}><FilterDeleteIcn /></button>
    </div>
  )
}

const FilterDeleteIcn = () => {
  return (
    <svg width="16" height="23" viewBox="0 0 16 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4.14062" y="8.3584" width="1" height="10" rx="0.5" transform="rotate(-44.4738 4.14062 8.3584)" fill="#6C6C6C" />
      <rect width="1" height="10" rx="0.5" transform="matrix(-0.713571 -0.700582 -0.700582 0.713571 11.8594 8.3584)" fill="#6C6C6C" />
    </svg>
  )
}