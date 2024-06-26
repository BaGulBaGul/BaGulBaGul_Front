import UserPost from '@/components/pages/user/[userId]/post'
import { SubTopHeader } from '@/components/layout/subHeader';

export default function Page({ params }: { params: { userId: string | number } }) {
  return (
    <div>
      <div className='relative z-10'>
        <SubTopHeader name='작성글' url={"/"} />
      </div>
      <UserPost />
    </div>
  );
}
