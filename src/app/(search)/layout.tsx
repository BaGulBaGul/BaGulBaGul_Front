import AlarmHeader from "@/components/common/AlarmHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <AlarmHeader />
      <body style={{backgroundColor: '#ECECEC'}}>{children}</body>
    </html>
  );
}