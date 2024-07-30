"use client";
import { AddIcn, AlarmIcn, CalIcn, Category19, CmtLikeIcn, DividerDot, FilterArrowMore, LikeIcn, MailIcn, PageTop, DeleteIcn, PostEditIcn, RemoveIcn, SmileIcn, TagIcn } from "@/components/styles/Icon";

// svg, icon 확인용
const index = () => {
  return (
    <div className="p-[10px] bg-secondary-yellow h-screen">
      <div className="flex flex-row flex-wrap gap-[8px]">
        <div className="flex flex-col items-center h-min gap-[4px] bg-white p-[4px]">
          <FilterArrowMore /><span className="text-[12px]">FilterArrowMore</span>
        </div>
        <div className="flex flex-col items-center h-min gap-[4px] bg-white p-[4px]">
          <Category19 /><span className="text-[12px]">Category19</span>
        </div>
        
        <div className="flex flex-col items-center h-min gap-[4px] bg-white p-[4px]">
          <AddIcn /><span className="text-[12px]">AddIcn</span>
        </div>
        <div className="flex flex-col items-center h-min gap-[4px] bg-white p-[4px]">
          <RemoveIcn /><span className="text-[12px]">RemoveIcn</span>
        </div>
        <div className="flex flex-col items-center h-min gap-[4px] bg-white p-[4px]">
          <PageTop /><span className="text-[12px]">PageTop</span>
        </div>
        <div className="flex flex-col items-center h-min gap-[4px] bg-white p-[4px]">
          <DividerDot /><span className="text-[12px]">DividerDot</span>
        </div>
        <div className="flex flex-col items-center h-min gap-[4px] bg-white p-[4px]">
          <PostEditIcn /><span className="text-[12px]">PostEditIcn</span>
        </div>
        <div className="flex flex-col items-center h-min gap-[4px] bg-white p-[4px]">
          <DeleteIcn /><span className="text-[12px]">DeleteIcn</span>
        </div>
        <div className="flex flex-col items-center h-min gap-[4px] bg-white p-[4px]">
          <div className="flex flex-row gap-[4px]"><LikeIcn val={true} /><LikeIcn val={false} /></div>
          <span className="text-[12px]">LikeIcn</span>
        </div>
        <div className="flex flex-col items-center h-min gap-[4px] bg-white p-[4px]">
          <div className="flex flex-row gap-[4px]"><CalIcn val={true} /><CalIcn val={false} /></div>
          <span className="text-[12px]">CalIcn</span>
        </div>
        <div className="flex flex-col items-center h-min gap-[4px] bg-white p-[4px]">
          <div className="flex flex-row gap-[4px]"><CmtLikeIcn val={true} /><CmtLikeIcn val={false} /></div>
          <span className="text-[12px]">CmtLikeIcn</span>
        </div>
        <div className="flex flex-col items-center h-min gap-[4px] bg-white p-[4px]">
          <TagIcn /><span className="text-[12px]">TagIcn</span>
        </div>
        <div className="flex flex-col items-center h-min gap-[4px] bg-white p-[4px]">
          <AlarmIcn /><span className="text-[12px]">AlarmIcn</span>
        </div>
        <div className="flex flex-col items-center h-min gap-[4px] bg-white p-[4px]">
          <SmileIcn /><span className="text-[12px]">SmileIcn</span>
        </div>
        <div className="flex flex-col items-center h-min gap-[4px] bg-white p-[4px]">
          <MailIcn /><span className="text-[12px]">MailIcn</span>
        </div>
      </div>

    </div>
  )
}
export default index;