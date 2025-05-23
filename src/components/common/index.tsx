'use client';
import { Backdrop, CircularProgress } from "@mui/material"
import CategoryButtons from './input/CategoryButtons'
import { PartiSelect, HeadSelect, CountSelect } from './input/Select'
import { ImageUploader } from './input/ImageUploader'
import { EditButton } from "./input/EditButton";
import HashtagAccordion, { HashtagButton } from './block/HashtagAccordion'
import { NoData } from './block/NoEvent'
import { UserProfile } from './block/UserProfile'
import { HeadCount } from './block/HeadCount'
import { BlockInfo, BlockInfoDT } from './block/BlockInfo'
import PostTab from './tabs/PostTab'
import { TabPanel, TabPanels } from './tabs/TabPanel'
import { ViewButton, ViewSelect } from './filter/ViewFilter'
import { ViewFilterApplied } from './filter/ViewFilterApplied'
import MoreButton from './MoreButton'
import { ImageSlide } from './ImageSlide'
import { WriteFab } from './WriteFab';
import { FullscreenDialog } from './FullscreenDialog'
import { AlertDialog } from './AlertDialog'
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'
import { SkeletonCarousel } from "./loading/SkeletonCarousel";
import { SkeletonComments, SkeletonReplies, SkeletonComment } from "./loading/SkeletonComments";
import { SkeletonList } from "./loading/SkeletonList";
import { SkeletonDetail } from "./loading/SkeletonDetail";
import { SkeletonWrite } from "./loading/SkeletonWrite";

export {
  CategoryButtons, EditButton, PartiSelect, HeadSelect, CountSelect, ImageUploader,
  HashtagAccordion, HashtagButton, NoData, UserProfile, HeadCount, BlockInfo, BlockInfoDT,
  PostTab, TabPanel, TabPanels,
  ViewButton, ViewSelect, ViewFilterApplied,
  MoreButton, ImageSlide, WriteFab,
  FullscreenDialog, AlertDialog,
  SkeletonCarousel,SkeletonComments, SkeletonReplies, SkeletonComment,
  SkeletonList, SkeletonDetail, SkeletonWrite,
}

export const Divider = (props: { color?: string; }) => {
  return (<hr className={`${props.color ? `border-${props.color}` : 'border-gray1'}`} />)
}

export function LoadingCircle() {
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export type EventType = 'FESTIVAL' | 'LOCAL_EVENT' | 'PARTY'

export interface RangeProps { from: undefined | number, to: undefined | number }

export interface ParamProps {
  title?: string; page?: number; categories?: string[] | undefined; type?: string | undefined; sort?: string | undefined;
  state?: string; tags?: string; startDate?: string | undefined; endDate?: string | undefined; leftHeadCount?: string | undefined;
  totalHeadCountMax?: string | undefined; totalHeadCountMin?: string | undefined;
}

export interface ListProps {
  event: {
    eventId: number; type: string; abstractLocation: string; currentHeadCount: number; maxHeadCount: number;
    startDate: any; endDate: any; categories: string[];
  };
  post: {
    postId: number; writer: { userId: number; userName: string; userProfileImageUrl: string; }; title: string; headImageUrl: string;
    createdAt: any; lastModifiedAt: any; tags: string[]
  }
}

export interface RListProps {
  recruitment: {
    recruitmentId: number; state: string; currentHeadCount: number; maxHeadCount: number;
    startDate: any; endDate: any;
  };
  post: {
    postId: number; writer: { userId: number; userName: string; userProfileImageUrl: string; }; title: string; headImageUrl: string;
    createdAt: any; lastModifiedAt: any; tags: string[];
  }
}

export interface FilterProps {
  sort: string; dateRange: (Date | undefined)[]; participants: number;
  headCount?: RangeProps; proceeding?: boolean; recruiting?: boolean;
}

export interface TabBlockProps {
  opt: 0 | 1; events: UseInfiniteQueryResult<InfiniteData<any, unknown>, Error>; tab?: number
}

export interface DetailProps {
  event: {
    eventId: number; type: string; currentHeadCount: number; maxHeadCount: number; fullLocation: string; abstractLocation: string;
    latitudeLocation: number; longitudeLocation: number; ageLimit: boolean; startDate: any; endDate: any; categories: string[];
  };
  post: {
    postId: number; writer: { userId: number; userName: string; userProfileImageUrl: string; }; title: string; headImageUrl: string;
    content: string; tags: string[]; imageIds: any[]; imageUrls: string[]; likeCount: number; commentCount: number; views: number;
    createdAt: any; lastModifiedAt: any;
  }
}

export interface RDetailProps {
  recruitment: {
    recruitmentId: number; eventId: number; state: string; currentHeadCount: number; maxHeadCount: number;
    startDate: any; endDate: any;
  };
  post: {
    postId: number; writer: { userId: number; userName: string; userProfileImageUrl: string; }; title: string; headImageUrl: string;
    content: string; tags: string[]; imageIds: any[]; imageUrls: string[]; likeCount: number; commentCount: number; views: number;
    createdAt: any; lastModifiedAt: any;
  }
}

export interface CommentProps {
  commentChildCount?: number; commentId?: number; commentChildId?: number; content: string; createdAt: string;
  likeCount: number; myLike: boolean; userId: number; username?: string; userName?: string; userProfileImageUrl?: string;
  replyTargetUserName?: string;
}

export interface CommentMProps { commentId: number; content: string; userId?: number; replyTargetUserName?: string; opt?: 'CMT' | 'RPL' } // 댓글수정용

export interface CalProps {
  eventId?: number; recruitmentId?: number; title: string; type?: string; state?: string;
  abstractLocation?: string; content: string; deleted: boolean;
  startTime: string; endTime: string; headImageUrl: string;
  userId?: number; userProfileImageUrl?: string; userName?: string;
  currentHeadCount?: number; maxHeadCount?: number;
}

// export interface UserInfoProps {
//   id: number; nickname: string; email: string; profileMessage: string; imageURI: string;
//   writingCount: number; postLikeCount?: number; calendarCount?: number;
// }

export interface LikeProps {
  eventId: number; startDate: string; endDate: string; title: string; abstractLocation: string;
  content: string; eventWriterProfileImageUrl: string; eventWriterId?: number; userName?: string;
}

export interface LikeRProps {
  recruitmentId: number; startDate: string; endDate: string; title: string; eventTitle: string;
}

export interface AlarmProps {
  alarmId: number; checked: boolean; message: string; subject: any; time: string; title: string; type: string;
}