import { Chip, ThemeProvider } from "@mui/material";
import { filterChipTheme } from "./Themes";
import { handleDayData, sortLabel } from "@/service/Functions";
import { Dispatch, SetStateAction } from "react";
import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";

interface FilterAppliedProps {
  filterCnt: number; filters: string[], setFilters: Dispatch<SetStateAction<string[]>>; sort: string;
  dayRange: DayRange; setDayRange: any; participants: number; setParticipants: any;
  headCount?: { from: undefined | number, to: undefined | number }; setHeadCount?: any;
  handleRt?: any;
}
export const ViewFilterApplied = (props: FilterAppliedProps) => {
  const handleDelete = (event: any) => {
    props.setFilters((props.filters).filter((f) => f !== event.target.parentNode.id))
    switch (event.target.parentNode.id) {
      case 'dayRange':
        props.setDayRange({ from: undefined, to: undefined })
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
      {
        props.filterCnt > 0
          ? <div className='overflow-hidden	h-[26px]'>
            <div className='h-[56px] px-[16px] cateBtns'>
              <ThemeProvider theme={filterChipTheme}>
                <Chip label={sortLabel(props.sort)} variant="outlined" />
                {
                  (props.filters).includes('dayRange')
                    ? <Chip id='dayRange' label={props.dayRange.to === undefined || props.dayRange.to === null
                      ? handleDayData(props.dayRange.from, 1) : `${handleDayData(props.dayRange.from, 1)} - ${handleDayData(props.dayRange.to, 1)}`}
                      onDelete={handleDelete} deleteIcon={<img src='/main_delete_filter.svg' />} variant="outlined" />
                    : <></>
                }
                {
                  (props.filters).includes('ptcp')
                    ? <Chip id='ptcp' label={`참여 ${props.participants}명`} onDelete={handleDelete}
                      deleteIcon={<img src='/main_delete_filter.svg' />} variant="outlined" />
                    : <></>
                }
                {
                  (props.filters).includes('headCount') && props.headCount !== undefined
                    ? <Chip id='headCount' label={`규모 ${props.headCount.from ?? ''} - ${props.headCount.to ?? ''}명`}
                      onDelete={handleDelete} deleteIcon={<img src='/main_delete_filter.svg' />} variant="outlined" />
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