import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '마이페이지 • 바글바글',
  description: '모여봐요 바글바글',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{backgroundColor: '#ECECEC'}}>{children}</body>
    </html>
  );
}