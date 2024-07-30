import { ClientRootLayout } from "./client-layout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{backgroundColor: '#ECECEC'}}>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  )
}