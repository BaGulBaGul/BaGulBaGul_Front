"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import useLoginInfo from '@/hooks/useLoginInfo';
import { AlarmIcn } from "../pages/user";
import { alarmSSE } from "../pages/user/mypage/AlarmSSE";
import { Toast } from '@base-ui-components/react/toast';

export default function AlarmHeader() {
  const data = useLoginInfo()
  if (!!data.data) {
    return (<Toast.Provider timeout={3000}>
      <AlarmToast />
    </Toast.Provider>)
  }
  else { return (<></>) }
}

function AlarmToast() {
  const toastManager = Toast.useToastManager();
  useEffect(() => {
    alarmSSE(toastManager)
  }, [])
  const router = useRouter()

  return (
    <div>
      <Toast.Portal>
        <Toast.Viewport className="fixed top-0 left-[16px] right-[16px] w-full max-w-[390px] m-auto z-paper" >
          {toastManager.toasts.map((toast) => (
            <Toast.Root key={toast.data.alarmId} toast={toast} swipeDirection={["up", 'right']} className="toast"
              onClick={() => { router.push('/mypage/alarm'); toastManager.close(toast.data.alarmId) }} >
              <Toast.Content className="toast-content text-12 flex flex-row gap-[18px]">
                <AlarmIcn type={toast.data.type} checked={false} />
                <div className="flex flex-col gap-[1.5px]">
                  <Toast.Title className="text-black" >{toast.data.title}</Toast.Title>
                  <Toast.Description className="text-gray3">
                    <p>{toast.data.message}</p>
                    <p>{dayjs(toast.data.time).format('YY.MM.DD  HH:mm')}</p>
                  </Toast.Description>
                </div>
              </Toast.Content>
            </Toast.Root>
          ))}
        </Toast.Viewport>
      </Toast.Portal>
    </div>
  )
}