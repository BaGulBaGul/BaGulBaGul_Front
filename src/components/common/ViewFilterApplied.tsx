import { Chip, ThemeProvider } from "@mui/material";
import { filterChipTheme } from "./ViewFilterTheme";
import { sortLabel } from "@/service/Functions";
import { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";

interface FilterAppliedProps {
  filterCnt: number; filters: string[], setFilters: Dispatch<SetStateAction<string[]>>; sort: string;
  dateRange: [any, any]; setDateRange: any; participants: number; setParticipants: any;
  headCount?: { from: undefined | number, to: undefined | number }; setHeadCount?: any; handleRt?: any;
}
export const ViewFilterApplied = (props: FilterAppliedProps) => {
  const [startDate, endDate] = props.dateRange ?? [null, null];
  const handleDelete = (event: any) => {
    props.setFilters((props.filters).filter((f) => f !== event.target.parentNode.id))
    switch (event.target.parentNode.id) {
      case 'dayRange':
        props.setDateRange([null, null])
        break;
      case 'ptcp':
        props.setParticipants(undefined)
        break;
      case 'headCount':
        props.setHeadCount({ from: undefined, to: undefined })
        break;
    }
    if (props.handleRt !== undefined) { props.handleRt() }
  };
  return (
    <>
      {props.filterCnt > 0
        ? <div className='overflow-hidden	h-[26px]'>
          <div className='x-scroll-wrap h-[56px] px-[16px]'>
            <ThemeProvider theme={filterChipTheme}>
              <Chip label={sortLabel(props.sort)} variant="outlined" />
              {(props.filters).includes('dayRange')
                ? <Chip id='dayRange' label={startDate !== null && endDate === null ?
                  dayjs(startDate).format('YY.MM.DD') : `${dayjs(startDate).format('YY.MM.DD')} - ${dayjs(endDate).format('YY.MM.DD')}`}
                  onDelete={handleDelete} deleteIcon={<FilterDeleteIcn />} variant="outlined" />
                : <></>
              }
              {(props.filters).includes('ptcp')
                ? <Chip id='ptcp' label={`참여 ${props.participants}명`} onDelete={handleDelete}
                  deleteIcon={<FilterDeleteIcn />} variant="outlined" />
                : <></>
              }
              {(props.filters).includes('headCount') && props.headCount !== undefined
                ? <Chip id='headCount' label={`규모 ${props.headCount.from ?? ''} - ${props.headCount.to ?? ''}명`}
                  onDelete={handleDelete} deleteIcon={<FilterDeleteIcn />} variant="outlined" />
                : <></>
              }
            </ThemeProvider>
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