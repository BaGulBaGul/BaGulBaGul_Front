
import { HeaderNonMain } from "@/components/layout/header";
import { FestivalDetail } from "../../cmpnts-detail";
import { PostHeader } from "../../cmpnts";

export default function Page() {
  return (
    <div>
      <div className='relative z-30'>
        <HeaderNonMain />
      </div>
      <main className="relative flex min-h-screen flex-col items-center">
        <div className="sticky top-[44px] relative z-20 mt-[44px] w-full">
          <PostHeader title="페스티벌" />
        </div>
        <FestivalDetail />
      </main>
    </div>
  );
}
