import { RangeProps } from "..";
import { FilterApplied } from "./FilterApplied";
import { FilterButton } from "./FilterButton";
import { FilterDialog } from "./FilterDialog";
import { FilterCalendar } from "./FilterCalendar";
import { FilterSortRadio } from "./FilterSortRadio";

export {
  FilterApplied, FilterButton,
  FilterDialog, 
  FilterCalendar, FilterSortRadio,
}

export interface FilterProps {
  sort: string; dateRange?: (Date | undefined)[]; date?: (Date | undefined); participants?: number;
  headCount?: RangeProps; proceeding?: boolean; recruiting?: boolean;
}

export const closeFilter = (setOpen: any, func?: () => void) => {
  setOpen(false);
  if (!!func) { func(); }
}

export const handleObjectValue = (setData: any, key: string, value: any) => {
  setData((prev: any) => ({ ...prev, [key]: value }))
}