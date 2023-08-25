import Liked from '@/components/pages/liked'
import { SubTopHeader } from '@/components/layout/subHeader';

export default function Page() {
  return (
    <div>
      <div className='relative z-10'>
        <SubTopHeader name='좋아요' url={"/"} />
      </div>
      <Liked />
    </div>
  );
}
