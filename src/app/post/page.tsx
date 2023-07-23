import Post from '@/components/pages/post'
import PostHeader from '@/components/layout/postHeader'
import Header from '@/components/layout/header';

export default function Page() {
    return (
      <>
      <Header />
      <PostHeader />
      <Post />
      </>
    );
  }