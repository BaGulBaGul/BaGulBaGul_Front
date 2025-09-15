'use client';
import { Backdrop, CircularProgress } from "@mui/material"
import { AlarmButton } from "./button/AlarmButton";
import { EditButton } from "./button/EditButton";
import { ExpandButton } from "./button/ExpandButton";
import { FooterButton } from "./button/FooterButton";
import { LogoutButton } from "./button/LogoutButton";
import MoreButton from "./button/MoreButton";
import { WriteFab } from "./button/WriteFab";
import { BottomDrawer, BottomDrawerBody } from "./display/BottomDrawer";
import { DialogPopup, DialogPopupBody } from "./display/DialogPopup";
import { FullscreenDialog } from "./display/FullscreenDialog";
import { ImageSlide } from "./display/ImageSlide";
import { ImagePreview } from "./display/ImagePreview";
import { DialogFull, DialogHeader } from "./display/_DialogFull";
import { EventCarousel, CarouselBlock } from "./display/EventCarousel";
import { ReportDialog } from "./report/ReportDialog";
import { ReportRadios } from "./report/ReportRadios";
import { SkeletonCarousel } from "./loading/SkeletonCarousel";
import { SkeletonComments, SkeletonReplies, SkeletonComment } from "./loading/SkeletonComments";
import { SkeletonDetail } from "./loading/SkeletonDetail";
import { SkeletonList } from "./loading/SkeletonList";
import { SkeletonWrite } from "./loading/SkeletonWrite";
import { TypeTabs } from "./nav/TypeTabs";
import { TypeSwitch } from "./nav/TypeSwitch";
import { ListWrapper } from "./ListWrapper";

export {
  // button
  AlarmButton, EditButton, ExpandButton, FooterButton, LogoutButton, MoreButton, WriteFab,
  // display
  BottomDrawer, BottomDrawerBody, DialogPopup, DialogPopupBody, FullscreenDialog, ImageSlide, ImagePreview, DialogFull, DialogHeader, EventCarousel, CarouselBlock,
  // nav
  TypeTabs, TypeSwitch,
  // report
  ReportDialog, ReportRadios,
  // loading
  SkeletonCarousel, SkeletonComments, SkeletonReplies, SkeletonComment, SkeletonDetail, SkeletonList, SkeletonWrite,
  ListWrapper,
}

export function Divider({ color }: { color?: string; }) {
  return (<hr className={`${color ? `border-${color}` : 'border-gray1'}`} />)
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