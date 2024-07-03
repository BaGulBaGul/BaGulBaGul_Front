import Liked from '@/components/pages/user/[userId]/liked'
import { SubTopHeader } from '@/components/layout/subHeader';

export default function Page({ params }: { params: { userId: string | number } }) {
  return (
    <div>
      <div className='relative z-30'>
        <SubTopHeader name='좋아요' url={"/"} />
      </div>
      <Liked />
    </div>
  );
}
