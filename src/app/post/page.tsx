import Post from '@/components/pages/post'
import SubHeader from '@/components/layout/subHeader'
import Header from '@/components/layout/header'

export default function Page() {
    const name = "파티글 작성하기"

    return (
      <>
        <header className='relative z-10'>
          <Header />
          <SubHeader name={name} />
        </header>
        <Post />
      </>
    );
  }