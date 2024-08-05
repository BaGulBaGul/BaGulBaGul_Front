import { ClientRootLayout } from "./client-layout";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '댓글 • 바글바글',
  description: '모여봐요 바글바글',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{backgroundColor: '#ECECEC'}}>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  )
}