import Post from "../../components/pages/post";
import Header from "@/components/layout/header";
import { PostDetail } from "../cmpnts-detail";
import { PostHeader } from "../cmpnts";

export default function Page() {
  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        {/* 상세화면 */}
        <PostHeader title='페스티벌' />
        <PostDetail />
      </main>
    </div>
  );
}
