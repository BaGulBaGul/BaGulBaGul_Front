
import { SubTopHeader } from "@/components/layout/subHeader";
import Alarm from '@/components/pages/user/[userId]/alarm'

export default function Page({ params }: { params: { userId: string | number } }) {
  if (params.userId === 'mypage') {
    return (
      <div>
        <div className="relative z-50">
          <SubTopHeader name={"알림"} url={'/mypage'} />
        </div>
        <Alarm />
      </div>
    );
  }
}
