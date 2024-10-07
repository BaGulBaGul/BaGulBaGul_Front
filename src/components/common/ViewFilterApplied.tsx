import { sortLabel } from "@/service/Functions";
import { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";
import { FilterProps } from ".";

interface FilterAppliedProps {
  filterCnt: number; filters: string[], setFilters: Dispatch<SetStateAction<string[]>>;
  p: FilterProps; setP: any; handleRt?: any;
}
export const ViewFilterApplied = (props: FilterAppliedProps) => {
  const [startDate, endDate] = props.p.dateRange ?? [null, null];
  const handleDelete = (e: React.MouseEvent, value: string) => {
    e.preventDefault();
    console.log('delete')
    props.setFilters((props.filters).filter((f) => f !== value))
    switch (value) {
      case 'dayRange':
        props.setP((prev: any) => ({ ...prev, dateRange: [null, null] }))
        break;
      case 'ptcp':
        props.setP((prev: any) => ({ ...prev, participants: undefined }))
        break;
      case 'headCount':
        props.setP((prev: any) => ({ ...prev, headCount: { from: undefined, to: undefined } }))
        break;
    }
    if (props.handleRt !== undefined) { props.handleRt() }
  };
  return (
    <>
      {props.filterCnt > 0
        ? <div className='overflow-hidden	h-[26px]'>
          <div className='x-scroll-wrap h-[56px] px-[16px]'>
            <div className='filter-chip'>
              <span>{sortLabel(props.p.sort)}</span>
            </div>
            {!(props.filters).includes('dayRange') ? <></>
              : <div className='filter-chip'>
                <span>{startDate !== null && endDate === null ?
                  dayjs(startDate).format('YY.MM.DD') : `${dayjs(startDate).format('YY.MM.DD')} - ${dayjs(endDate).format('YY.MM.DD')}`}</span>
                <button onClick={(e) => handleDelete(e, 'dayRange')}><FilterDeleteIcn /></button>
              </div>
            }
            {!(props.filters).includes('ptcp') ? <></>
              : <div className='filter-chip'>
                <span>{`참여 ${props.p.participants}명`}</span>
                <button onClick={(e) => handleDelete(e, 'ptcp')}><FilterDeleteIcn /></button>
              </div>
            }
            {!((props.filters).includes('headCount') && props.p.headCount !== undefined) ? <></>
              : <div className='filter-chip'>
                <span>{`규모 ${props.p.headCount.from ?? ''} - ${props.p.headCount.to ?? ''}명`}</span>
                <button onClick={(e) => handleDelete(e, 'headCount')}><FilterDeleteIcn /></button>
              </div>
            }
          </div>
        </div>
        : <></>
      }
    </>
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