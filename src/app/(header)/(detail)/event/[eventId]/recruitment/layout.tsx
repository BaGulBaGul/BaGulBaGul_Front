import { WriteFab } from "@/components/common";

export default function Layout({ children, params }: { children: React.ReactNode, params: { eventId: string } }) {
  return (
    <>
      {children}
      <WriteFab url={`/write?w=r&id=${params.eventId}`} />
    </>
  )
}