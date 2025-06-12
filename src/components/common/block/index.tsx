import { FormatDateRange } from "@/service/Functions";

import { BlockInfo, BlockInfoDT } from "./BlockInfo";
import { HashtagAccordion, HashtagList, HashtagButton } from "./HashtagAccordion";
import { HeadCount } from "./HeadCount";
import { NoData } from "./NoEvent";
import { SetBlock } from "./SetBlock";
import { UserProfile } from "./UserProfile";
import { UserProfileBlock } from "./UserProfileBlock";


export {
  BlockInfo, BlockInfoDT,
  HashtagAccordion, HashtagList, HashtagButton, HeadCount,
  NoData, UserProfile, UserProfileBlock,
  SetBlock, 
}

export function DateLine({startDate, endDate}: {startDate?: string; endDate?: string}) {
  return (
    <span className="text-14 text-gray3">{`${FormatDateRange(startDate, endDate)}`}</span>
  );
}