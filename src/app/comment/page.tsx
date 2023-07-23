import Post from "../../components/pages/post";
import { HeaderNonMain } from "@/components/layout/header";
import { PostHeader } from "../cmpnts";
import { CommentDetail, CommentFooter } from "../cmpnts-comment";
import { commentData } from '@/components/common/Data';

export default function Page() {
  return (
    <div>
      <div className="relative z-10">
        <HeaderNonMain />
      </div>
      <main className="flex min-h-screen flex-col items-center bg-gray1-text">
        <PostHeader title="글 댓글" count={commentData.length} />
        <CommentDetail />
        <CommentFooter />
      </main>
    </div>
  );
}
