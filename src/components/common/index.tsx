'use client';
import { Backdrop, CircularProgress } from "@mui/material"
import { UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";
import { ArrowPrev, ArrowNext } from "./button/Arrow";
import { EditButton } from "./button/EditButton";
import { ExpandButton } from "./button/ExpandButton";
import { FooterButton } from "./button/FooterButton";
import MoreButton from "./button/MoreButton";
import { WriteFab } from "./button/WriteFab";
import { AlertDialog } from "./display/AlertDialog";
import { BottomDrawer } from "./display/BottomDrawer";
import { FullscreenDialog } from "./display/FullscreenDialog";
import { ImageSlide } from "./display/ImageSlide";
import { ReportDialog } from "./report/ReportDialog";
import { ReportRadios } from "./report/ReportRadios";
import { TabPanel, TabPanels } from "./tabs/TabPanel";
import { SkeletonCarousel } from "./loading/SkeletonCarousel";
import { SkeletonComments, SkeletonReplies, SkeletonComment } from "./loading/SkeletonComments";
import { SkeletonDetail } from "./loading/SkeletonDetail";
import { SkeletonList } from "./loading/SkeletonList";
import { SkeletonWrite } from "./loading/SkeletonWrite";
import { TypeTabs } from "./tabs/_TypeTabs";

export {
  // button
  ArrowPrev, ArrowNext, EditButton, ExpandButton, FooterButton, MoreButton, WriteFab,
  // display
  AlertDialog, BottomDrawer, FullscreenDialog, ImageSlide,
  // tabs
  TypeTabs, TabPanel, TabPanels,
  // report
  ReportDialog, ReportRadios,
  // loading
  SkeletonCarousel, SkeletonComments, SkeletonReplies, SkeletonComment, SkeletonDetail, SkeletonList, SkeletonWrite,
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

export interface WriterProps { userId: number, userName: string, userProfileImageUrl: string };

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