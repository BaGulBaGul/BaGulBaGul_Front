import Post from '@/components/pages/post'
import PostHeader from '@/components/layout/postHeader'
import { HeaderNonMain } from '@/components/layout/header'; '@/components/layout/header';

export default function Page() {
    return (
      <>
      <HeaderNonMain />
      <PostHeader />
      <Post />
      </>
    );
  }