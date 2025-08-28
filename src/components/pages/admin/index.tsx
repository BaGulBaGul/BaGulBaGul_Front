import { DndItem, DndHandler } from "./DndItem";
import { DndWrapper } from "./DndList";
import { AdminPage } from "./AdminPage";
import { BannerCardItem } from "./banner/BannerCardItem";
import { BannerPage } from "./banner/BannerPage";
import { BannerTitleInput } from "./banner/BannerTitleInput";
import { LinkedEventPage } from "./banner/_LinkedEventPage";
import { CategoryList } from "./category/CategoryList";
import { CategoryPage } from "./category/CategoryPage";
import { PostManagePage } from "./post/PostManagePage";
import { PostList } from "./post/PostList";
import { ReportManagePage } from "./report/ReportManagePage";
import { UserManagePage } from "./UserManagePage";
import { BannerCardPage } from "./banner/_BannerCardPage";

export {
  AdminPage, 
  BannerPage, BannerCardPage, BannerCardItem, BannerTitleInput, LinkedEventPage,
  CategoryPage, CategoryList,
  PostManagePage, PostList,
  ReportManagePage, 
  UserManagePage,
  DndItem, DndHandler, DndWrapper,
}

// 연결 이벤트 기존 데이터
export interface BannerLinkedEventData { url: string; eventId: number; headImageUrl: string | null; title: string; startDate: any; endDate: any; }
// 관리자 입력 내용 + 연결 이벤트 기존 데이터
export interface BannerData { title: string; headImageUrl: string; headImageKey: Number; linkedEvent: BannerLinkedEventData }
export interface BannerInfo { id: string; data: undefined | BannerData }