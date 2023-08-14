import Post from '@/components/pages/post'
import PostHeader from '@/components/layout/postHeader'
import { HeaderNonMain } from '@/components/layout/header'; '@/components/layout/header';

export default function Page() {
    const name = "파티글 작성하기"

    return (
      <>
        <header className='relative z-10'>
          <HeaderNonMain />
          <PostHeader name={name} url={"/"} />
        </header>
        <Post />
      </>
    );
  }