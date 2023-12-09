
import { SubTopHeader } from "@/components/layout/subHeader";
import Alarm from '@/components/pages/alarm'

export default function Page() {
  return (
    <div>
      <div className="relative z-50">
        <SubTopHeader name={"알림"} url={'/mypage'} />
      </div>
      <Alarm />
    </div>
  );
}
