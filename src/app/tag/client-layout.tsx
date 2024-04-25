"use client";
import { SearchLayout } from "@/components/common";
import { useRouter, useSearchParams } from 'next/navigation'

export function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  return (
    <SearchLayout opt='TAG' sp={searchParams} router={router} children={children} />
  );
}