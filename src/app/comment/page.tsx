import Post from "../../components/pages/post";
import { HeaderNonMain } from "@/components/layout/header";
import { PostHeader } from "../cmpnts";
import { CommentDetail, CommentFooter } from "../cmpnts-comment";
import { commentData } from '@/components/common/Data';

export default function Page() {
  return (
    <div>
      <div className='relative'>
        <HeaderNonMain />
      </div>
      <div className="sticky top-0 mt-[44px] relative z-10">
        <PostHeader title="글 댓글" count={commentData.length} />
      </div>
      <main className="flex min-h-screen flex-col items-center bg-gray1-text">
        <CommentDetail />
        <CommentFooter />
      </main>
    </div>
  );
}
