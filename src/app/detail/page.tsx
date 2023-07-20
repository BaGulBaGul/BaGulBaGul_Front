import Post from "../../components/pages/post";
import Header from "@/components/layout/header";
import { PostDetail, PostHeader } from "../cmpnts-detail";

export default function Page() {
  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        {/* 상세화면 */}
        <PostHeader />
        <PostDetail />
      </main>
    </div>
  );
}
