import { Dispatch, SetStateAction } from "react";
import { FormatDateRange, sortLabel } from "@/service/Functions";
import { FilterProps, handleObjectValue } from ".";
import { IconDeleteChip } from "../styles/Icon";
import { ReadonlyURLSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type FilterAppliedProps = { filterCnt: number; filters: string[]; setFilters: Dispatch<SetStateAction<string[]>>; } &
  ({ opt: 'REDIRECT'; p: FilterProps; setP: any; handleRt?: any; } |
  { opt: 'UPDATE'; sort: string; joinedDate: Date | undefined; handleDelete: (value: string) => void; });
export const FilterApplied = (props: FilterAppliedProps) => {
  const handleDelete = (e: React.MouseEvent, value: string) => {
    e.preventDefault();
    if (props.opt === 'REDIRECT') {
      props.setFilters((props.filters).filter((f) => f !== value))
      const initVal = (val: string) => {
        switch (val) {
          case 'state':
            if (!!props.p.proceeding) return { k: 'proceeding', v: false };
            if (!!props.p.recruiting) return { k: 'recruiting', v: false };
          case 'dayRange': return { k: 'dateRange', v: [null, null] };
          case 'ptcp': return { k: 'participants', v: undefined };
          case 'headCount': return { k: 'headCount', v: { from: undefined, to: undefined } };
        }
      }
      handleObjectValue(props.setP, initVal(value)!.k, initVal(value)!.v)
      if (!!props.handleRt) { props.handleRt() }
    } else if (props.opt === 'UPDATE') {
      props.handleDelete(value)
    }

  };

  let dateText = props.opt === 'REDIRECT' && props.p.dateRange ? FormatDateRange(props.p.dateRange[0], props.p.dateRange[1])
    : props.opt === 'UPDATE' ? FormatDateRange(props.joinedDate, undefined) : ''

  return (
    <>
      {props.filterCnt > 0
        ? <div className='overflow-hidden	h-[26px]'>
          <div className='x-scroll-wrap h-[56px] px-[16px]'>
            <div className='filter-chip'>
              <span>{sortLabel(props.opt === 'REDIRECT' ? props.p.sort : props.sort)}</span>
            </div>
            {props.opt === 'REDIRECT'
              ? <>
                {!(props.filters).includes('state') ? <></> : <FilterChip text={!!props.p.proceeding ? '종료행사제외' : !!props.p.recruiting ? '모집중' : ''} filter='state' handleDelete={handleDelete} />}
                {!(props.filters).includes('dayRange') ? <></> : <FilterChip text={dateText ?? ''} filter='dayRange' handleDelete={handleDelete} />}
                {!(props.filters).includes('ptcp') ? <></> : <FilterChip text={`참여 ${props.p.participants}명`} filter='ptcp' handleDelete={handleDelete} />}
                {!((props.filters).includes('headCount') && props.p.headCount !== undefined) ? <></> : <FilterChip text={`규모 ${props.p.headCount.from ?? ''} - ${props.p.headCount.to ?? ''}명`} filter='headCount' handleDelete={handleDelete} />}
              </>
              : <>
                {!(props.filters).includes('joinedDate') ? <></> : <FilterChip text={dateText ?? ''} filter='joinedDate' handleDelete={handleDelete} />}
              </>
            }
          </div>
        </div>
        : <></>
      }
    </>
  )
}


type FilterApplied1Props = { filters: string[]; } &
  ({ opt: 'REDIRECT'; sp: ReadonlyURLSearchParams; router: AppRouterInstance; state?: 'p' | 'r'; url: string } |
  { opt: 'UPDATE'; sort: string; joinedDate: Date | undefined; handleDelete: (value: string) => void; });
export const FilterApplied1 = (props: FilterApplied1Props) => {

  const filterVal = (val: string) => {
    switch (val) {
      case 'dayRange': return ['sD', 'eD']
      case 'headCount': return ['hcMin', 'hcMax']
      // case 'headCount': return { k: 'headCount', v: { from: undefined, to: undefined } };
      default: return [val];
    }
  }
  const handleDelete = (e: React.MouseEvent, value: string) => {
    e.preventDefault();
    if (props.opt === 'REDIRECT') {
      console.log(value)
      const currentSP = new URLSearchParams(props.sp.toString());
      filterVal(value).forEach((val) => currentSP.delete(val)) // Deletes the 'filter' parameter
      props.router.replace(`${props.url}?${currentSP.toString()}`);
    } else if (props.opt === 'UPDATE') {
      props.handleDelete(value)
    }
  };

  let dateText = props.opt === 'REDIRECT' ? FormatDateRange(props.sp.get('sD'), props.sp.get('eD'))
    : props.opt === 'UPDATE' ? FormatDateRange(props.joinedDate, undefined) : ''

  return (
    <div className='overflow-hidden	h-[26px]'>
      <div className='x-scroll-wrap h-[56px] px-[16px]'>
        <div className='filter-chip'>
          <span>{sortLabel(props.opt === 'REDIRECT' ? (props.sp.get('sort') ?? '') : props.sort)}</span>
        </div>
        {props.opt === 'REDIRECT'
          ? <>
            {!(props.filters).includes('state') ? <></> : <FilterChip text={props.sp.get('state') === 'p' ? '종료행사제외' : props.sp.get('state') === 'r' ? '모집중' : ''} filter='state' handleDelete={handleDelete} />}
            {!(props.filters).includes('dayRange') ? <></> : <FilterChip text={dateText ?? ''} filter='dayRange' handleDelete={handleDelete} />}
            {!(props.filters).includes('ptcp') ? <></> : <FilterChip text={`참여 ${props.sp.get('ptcp')}명`} filter='ptcp' handleDelete={handleDelete} />}
            {!(props.filters).includes('headCount') ? <></> : <FilterChip text={`규모 ${props.sp.get('hcMin') ?? ''} - ${props.sp.get('hcMax') ?? ''}명`} filter='headCount' handleDelete={handleDelete} />}
            {/* {!((props.filters).includes('headCount') && props.p.headCount !== undefined) ? <></> : <FilterChip text={`규모 ${props.p.headCount.from ?? ''} - ${props.p.headCount.to ?? ''}명`} filter='headCount' handleDelete={handleDelete} />} */}
          </>
          : <>
            {!(props.filters).includes('joinedDate') ? <></> : <FilterChip text={dateText ?? ''} filter='joinedDate' handleDelete={handleDelete} />}
          </>
        }
      </div>
    </div>
  )
}

const FilterChip = ({ text, filter, handleDelete }: { text: string; filter: string; handleDelete: (e: React.MouseEvent, value: string) => void }) => {
  return (
    <div className='filter-chip'>
      <span>{text}</span>
      <button onClick={(e) => handleDelete(e, filter)}><IconDeleteChip /></button>
    </div>
  )
}