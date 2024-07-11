import CategoryButtons from './CategoryButtons'
import { EventBlock, RecruitBlock, CalendarBlock } from './EventBlock'
import { TabBlock, ResultBlock, SuggestBlock, SearchTabs, SearchBar } from './Search'
import { SearchLayout } from './SearchLayout'
import { CommentBlock, CommentDrawer, ModifyInput, ModifyInputR } from './Comment'
import HashtagAccordion, { HashtagButton } from './HashtagAccordion'
import MoreButton from './MoreButton'
import { NoEvent, NoUser } from './NoEvent'
import PostTab from './PostTab'
import { RecCarousel } from './RecCarousel'
import ScrollToTop from './ScrollToTop'
import ShareDialog from './ShareDialog'
import { TabPanel, TabPanels } from './TabPanel'
import { ViewButton, ViewSelect } from './ViewFilter'
import { ViewFilterApplied } from './ViewFilterApplied'
import { LoadingSkeleton, LoadingCircle } from './Loading'
import { Detail } from './Detail'


export {
  CategoryButtons,
  EventBlock, RecruitBlock, CalendarBlock,
  TabBlock, ResultBlock, SuggestBlock, SearchTabs, SearchBar,
  SearchLayout,
  CommentBlock, CommentDrawer, ModifyInput, ModifyInputR,
  HashtagAccordion, HashtagButton,
  MoreButton,
  NoEvent, NoUser,
  PostTab, TabPanel,TabPanels,
  RecCarousel,
  ViewButton, ViewSelect, ViewFilterApplied,
  ShareDialog,
  ScrollToTop,
  LoadingSkeleton, LoadingCircle,
  Detail,
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

export interface CalProps {
  eventId: number; type: string; title: string; content: string; headImageUrl: string;
  abstractLocation: string; startTime: string; endTime: string;
}

export interface UserInfoProps {
  id: number; nickname: string; email: string; profileMessage: string; imageURI: string;
}