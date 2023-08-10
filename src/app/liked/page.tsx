
import { HeaderNonMain } from "@/components/layout/header";
import { LikedDetail } from "../cmpnts-liked";
import { PostHeader } from "../cmpnts";

export default function Page() {
  return (
    <div>
      <main className="relative z-0 flex min-h-screen flex-col items-center">
        <div className="sticky top-0 relative z-10 w-full">
          <PostHeader title="좋아요" />
        </div>
        <LikedDetail />
      </main>
    </div>
  );
}
