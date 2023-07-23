import Post from "../../components/pages/post";
import { HeaderNonMain } from "@/components/layout/header";
import { PostDetail, PostHeader } from "../cmpnts-detail";

export default function Page() {
  return (
    <div>
      <HeaderNonMain />
      <main className="flex min-h-screen flex-col items-center">
        {/* 상세화면 */}
        <PostHeader />
        <PostDetail />
      </main>
    </div>
  );
}
