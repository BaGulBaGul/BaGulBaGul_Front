import MyPost from '@/components/pages/mypost'
import { SubTopHeader } from '@/components/layout/subHeader';

export default function Page() {
  return (
    <div>
      <div className='relative z-10'>
        <SubTopHeader name='작성글' url={"/"} />
      </div>
      <MyPost />
    </div>
  );
}
