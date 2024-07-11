export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{backgroundColor: '#ECECEC'}}>{children}</body>
    </html>
  );
}