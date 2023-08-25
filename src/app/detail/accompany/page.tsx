
import { HeaderNonMain } from "@/components/layout/header";
import { DetailAccompany } from '@/components/pages/detail';
import SubHeader from '@/components/layout/subHeader';

export default function Page() {
  return (
    <div>
      <div className='relative z-30'>
        <HeaderNonMain />
        <SubHeader name='모집글' url={"/"} />
      </div>
      <DetailAccompany />
    </div>
  );
}