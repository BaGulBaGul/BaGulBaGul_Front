
import { RecCarousel, PostTab } from './cmpnts-main'
import Header from '@/components/layout/header'

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        {/* 메인화면 */}
        <RecCarousel />
        <PostTab />
      </main>
    </div>
  )
}
