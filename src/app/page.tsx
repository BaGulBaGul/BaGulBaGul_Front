
import { RecCarousel, PostTab } from './cmpnts-main'
import Header from '@/components/layout/header'
import { PostHeader, PostDetail } from './cmpnts-detail'

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        {/* 메인화면 */}
        <RecCarousel />
        <PostTab />

        {/* 상세화면 */}
        {/* <PostHeader />
        <PostDetail /> */}
      </main>
    </div>
  )
}
