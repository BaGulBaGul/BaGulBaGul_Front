
import AlarmHeader from '@/components/common/AlarmHeader';
import { ClientRootLayout } from './client-layout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <AlarmHeader />
      <ClientRootLayout>{children}</ClientRootLayout>
    </html>
  )
}