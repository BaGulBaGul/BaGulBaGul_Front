export const alarmSSE = async (setOpen: any, setSnackPack: any) => {
  let eventSource: EventSource;
  try {
    eventSource = new EventSource(`${process.env.NEXT_PUBLIC_ALARM_BASE_URL}/alarm/subscribe`, { withCredentials: true });
    console.info("Listenting on SEE", eventSource);

    eventSource.addEventListener("message", async (e: MessageEvent) => {
      const res = await e.data;
      if (res !== 'HB') {
        const alarmData = JSON.parse(res)
        setOpen(true)
        setSnackPack((prev: any) => [...prev, alarmData]);
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