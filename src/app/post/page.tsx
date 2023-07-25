import Post from '@/components/pages/post'
import PostHeader from '@/components/layout/postHeader'
import { HeaderNonMain } from '@/components/layout/header'; '@/components/layout/header';

export default function Page() {
    return (
      <>
        <header className='relative z-10'>
          <HeaderNonMain />
          <PostHeader />
        </header>
        <Post />
      </>
    );
  }