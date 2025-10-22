import { ReactNode } from "react";
import { Dialog } from "@base-ui-components/react";
import { Divider } from "@/components/common";

export function BottomDrawer({ open, toggleOpen, children }: { open: boolean; toggleOpen: (open: boolean) => void; children: ReactNode }) {
  // if (props.target === undefined) { return <></> }
  return (
    <Dialog.Root open={open} onOpenChange={toggleOpen}>
      <Dialog.Portal >
        <Dialog.Backdrop forceRender className='backdrop' />
        <Dialog.Popup className="fixed w-screen max-h-[calc(100vh-72px)] bottom-0 left-0 rounded-t-[8px] bg-p-white overflow-y-scroll z-paper">
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type Props = { me: true; handleEdit: any; handleDelete: any; } | { me: false; handleReport: any; }
export function BottomDrawerBody(props: Props) {
  return (
    <ul>
      {!!props.me
        ? <>
          <DrawerBlock title='수정하기' handleClick={props.handleEdit} />
          <Divider />
          <DrawerBlock title='삭제하기' handleClick={props.handleDelete} itemStyle="text-[#FF0000]" />
        </>
        : <DrawerBlock title='신고하기' handleClick={props.handleReport} />
      }
    </ul>
  )
}

export function DrawerBlock({ title, handleClick, itemStyle }: { title: string; handleClick: () => void; itemStyle?: string }) {
  return (
    <li>
      <button className={"w-full text-left px-[16px] py-[20px] text-14 " + itemStyle} onClick={handleClick}>{title}</button>
    </li>
  )
}