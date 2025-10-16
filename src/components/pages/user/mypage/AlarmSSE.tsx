import { Toast } from "@base-ui-components/react";

export const alarmSSE = async (toastManager: Toast.useToastManager.ReturnValue) => {
  let eventSource: EventSource;
  try {
    eventSource = new EventSource(`${process.env.NEXT_PUBLIC_ALARM_BASE_URL}/alarm/subscribe`, { withCredentials: true });
    console.info("Listenting on SEE", eventSource);

    eventSource.addEventListener("message", async (e: MessageEvent) => {
      const res = await e.data;
      if (res !== 'HB') {
        const alarmData = JSON.parse(res)
        toastManager.add({ data: alarmData })
      }
    })
  } catch (error) { }

  return {
    close: () => {
      console.info("Closing SSE");
      eventSource.close();
    }
  }
}