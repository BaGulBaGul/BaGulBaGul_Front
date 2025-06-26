import { FormatDateRange, typeString } from "@/service/Functions";

import { BlockInfo, BlockInfoDT } from "./BlockInfo";
import { HashtagAccordion, HashtagList, HashtagButton } from "./HashtagAccordion";
import { HeadCount } from "./HeadCount";
import { NoData } from "./NoEvent";
import { SetBlock } from "./SetBlock";
import { UserProfile } from "./UserProfile";
import { UserProfileBlock } from "./UserProfileBlock";
import { BlockBodyAD, BlockBodyD, BlockBodyN } from "./_BlockBody";
import { BlockWrapper, BlockContainer } from "./_BlockWrapper";


export {
  BlockInfo, BlockInfoDT,
  HashtagAccordion, HashtagList, HashtagButton, HeadCount,
  NoData, UserProfile, UserProfileBlock,
  SetBlock,
  BlockWrapper, BlockContainer,
  BlockBodyAD, BlockBodyD, BlockBodyN,
}

export function DateLine({ startDate, endDate }: { startDate?: string; endDate?: string }) {
  return (
    <span className="text-14 text-gray3">{`${FormatDateRange(startDate, endDate)}`}</span>
  );
}

export function TypeChip({ type }: { type: string }) {
  return (
    <span className="text-12 text-black bg-gray1 px-[4px] py-[2px] rounded-[2px] w-fit">
      {typeString[type]}</span>
  );
}