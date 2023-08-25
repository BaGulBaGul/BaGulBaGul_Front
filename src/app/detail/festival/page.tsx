
import { HeaderNonMain } from "@/components/layout/header";
import { DetailFestival } from '@/components/pages/detail';
import SubHeader from '@/components/layout/subHeader';
import { PostFooter } from '@/components/layout/footer';

export default function Page() {
  return (
    <div>
      <div className='relative z-30'>
        <HeaderNonMain />
        <SubHeader name='페스티벌' url={"/"} />
      </div>
      <DetailFestival />
      <PostFooter title='모집글 보러가기' path='/accompany' />
    </div>
  );
}