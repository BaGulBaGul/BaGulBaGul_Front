
import { HeaderNonMain } from "@/components/layout/header";
import { PostDetail } from "../cmpnts-detail";
import { PostHeader } from "../cmpnts";

export default function Page() {
  return (
    <div>
      <div className="relative z-10">
        <HeaderNonMain />
      </div>
      <main className="flex min-h-screen flex-col items-center">
        {/* 상세화면 */}
        <PostHeader title='페스티벌' />
        <PostDetail />
      </main>
    </div>
  );
}
