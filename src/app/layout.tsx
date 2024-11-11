import './globals.css'
import './animation.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Viewport } from 'next'
import ReactQueryProviders from '@/hooks/useReactQuery';

export const metadata = {
  title: '바글바글',
  description: '모여봐요 바글바글',
}

export const viewport: Viewport = {
  width: 'device-width', height: 'device-height',
  initialScale: 1, minimumScale: 1, maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-dynamic-subset.css" />
        <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js" integrity="sha384-70k0rrouSYPWJt7q9rSTKpiTfX6USlMYjZUtr1Du+9o4cGvhPAWxngdtVZDdErlh" crossOrigin="anonymous"></script>
        {/* <script>
          Kakao.init('259ba7c5a3c1b705d7453032900a4b16');
          console.log(Kakao.isInitialized());
        </script> */}
        <script type="text/javascript" src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO}&libraries=services`}></script>
      </head>
      <body>
        <ReactQueryProviders>
          {/* <AlarmHeader /> */}
          {children}
        </ReactQueryProviders>
      </body>
    </html>
  )
}
