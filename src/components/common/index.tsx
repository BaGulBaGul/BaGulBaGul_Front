import CategoryButtons from './CategoryButtons'
import HashtagAccordion, { HashtagButton } from './HashtagAccordion'
import MoreButton from './MoreButton'
import { NoEvent, NoUser } from './NoEvent'
import PostTab from './PostTab'
import { TabPanel, TabPanels } from './TabPanel'
import { ViewButton, ViewSelect } from './ViewFilter'
import { ViewFilterApplied } from './ViewFilterApplied'
import { LoadingSkeleton, LoadingCircle } from './Loading'

export {
  CategoryButtons,
  HashtagAccordion, HashtagButton,
  MoreButton,
  NoEvent, NoUser,
  PostTab, TabPanel, TabPanels,
  ViewButton, ViewSelect, ViewFilterApplied,
  LoadingSkeleton, LoadingCircle,
}

export const Divider = () => {
  return (<hr className='border-1px border-gray1' />)
}

export interface RangeProps { from: undefined | number, to: undefined | number }

export interface ParamProps {
  title?: string; page: number; categories?: string[] | undefined; type?: string | undefined; sort?: string | undefined;
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
    createdAt: any; lastModifiedAt: any; tags: string[]
  }
}

export interface TabBlockProps {
  opt: 0 | 1; events: never[]; page: { current: number; total: number; }; setPage: any; isLoading: boolean;
  params?: ParamProps, setParams?: any, router?: any;
}

export interface DetailProps {
  event: {
    eventId: number; type: string; currentHeadCount: number; maxHeadCount: number; fullLocation: string; abstractLocation: string;
    latitudeLocation: number; longitudeLocation: number; startDate: any; endDate: any; categories: string[];
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

export interface CommentMProps { postCommentId: number; content: string; userId?: number; replyTargetUserName?: string; } // 댓글수정용


// export interface CalProps {
//   eventId?: number; recruitmentId?: number; type?: string; title: string; content: string; headImageUrl: string;
//   abstractLocation: string; startTime: string; endTime: string;
//   userId?: number; userProfileImageUrl?: string; userName?: string; deleted: boolean;
// }
export interface CalProps {
  eventId?: number; recruitmentId?: number; title: string; type?: string; state?: string;
  abstractLocation?: string; content: string; deleted: boolean;
  startTime: string; endTime: string; headImageUrl: string;
  userId?: number; userProfileImageUrl?: string; userName?: string;
  currentHeadCount?: number; maxHeadCount?: number;
}

export interface UserInfoProps {
  id: number; nickname: string; email: string; profileMessage: string; imageURI: string;
  writingCount: number; postLikeCount?: number; calendarCount?: number;
}

export interface LikeProps {
  eventId: number; startDate: string; endDate: string; title: string; abstractLocation: string;
  content: string; headImageUrl: string;
}

export interface LikeRProps {
  recruitmentId: number; startDate: string; endDate: string; title: string; eventTitle: string;
}

export interface AlarmProps {
  alarmId: number; checked: boolean; message: string; subject: any; time: string; title: string; type: string;
}