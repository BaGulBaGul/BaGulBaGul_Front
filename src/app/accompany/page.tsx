
import { HeaderNonMain } from "@/components/layout/header";
import { AccompanyList } from "../cmpnts-accompany";
import { PostHeader } from "../cmpnts";

export default function Page() {
  return (
    <div>
      <div className='relative z-10'>
        <HeaderNonMain />
      </div>
      <main className="relative z-0 flex min-h-screen flex-col items-center">
        <div className="sticky top-[44px] relative z-10 mt-[44px] w-full">
          <PostHeader title="모집글" />
        </div>
        <AccompanyList />
      </main>
    </div>
  );
}
