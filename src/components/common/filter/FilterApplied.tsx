import { FormatDateRange, sortLabel } from "@/service/Functions";
import { IconDeleteChip } from "../styles/Icon";
import { ReadonlyURLSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type FilterAppliedProps = { filters: string[]; sp: any; } & (
  { opt: 'REDIRECT'; router: AppRouterInstance; url: string; } |
  { opt: 'UPDATE'; updateSP: (value: Object) => void; }
);
export const FilterApplied = (props: FilterAppliedProps) => {
  const sp = props.sp instanceof ReadonlyURLSearchParams ? Object.fromEntries(props.sp.entries()) : props.sp;
  const handleDelete = (e: React.MouseEvent, value: string) => {
    e.preventDefault();
    const currentSP = new URLSearchParams(sp.toString());
    filterVal(value).forEach((val) => currentSP.delete(val)) // Deletes the 'filter' parameter
    if (props.opt === 'REDIRECT') { props.router.replace(`${props.url}?${currentSP.toString()}`); }
    else { props.updateSP(currentSP) }
  };
  let dateText = FormatDateRange(sp.sD, sp.eD)

  return (
    <div className='overflow-hidden	h-[26px]'>
      <div className='x-scroll-wrap h-[56px] px-[16px]'>
        <div className='filter-chip'><span>{sortLabel(sp.sort ?? '')}</span></div>
        {(props.filters).includes('state') && <FilterChip text={sp.state === 'p' ? '종료행사제외' : sp.state === 'r' ? '모집중' : ''} filter='state' handleDelete={handleDelete} />}
        {(props.filters).includes('dayRange') && <FilterChip text={dateText ?? ''} filter='dayRange' handleDelete={handleDelete} />}
        {(props.filters).includes('ptcp') && <FilterChip text={`참여 ${sp.ptcp}명`} filter='ptcp' handleDelete={handleDelete} />}
        {(props.filters).includes('headCount') && <FilterChip text={`규모 ${sp.hcMin ?? ''} - ${sp.hcMax ?? ''}명`} filter='headCount' handleDelete={handleDelete} />}
      </div>
    </div>
  )
}

const filterVal = (val: string) => {
  switch (val) {
    case 'dayRange': return ['sD', 'eD']
    case 'headCount': return ['hcMin', 'hcMax']
    default: return [val];
  }
}

const FilterChip = ({ text, filter, handleDelete }: { text: string; filter: string; handleDelete: (e: React.MouseEvent, value: string) => void }) => {
  return (
    <div className='filter-chip'>
      <span>{text}</span>
      <button onClick={(e) => handleDelete(e, filter)}><IconDeleteChip /></button>
    </div>
  )
}