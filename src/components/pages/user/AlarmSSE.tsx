export const alarmSSE = () => {
  const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_ALARM_BASE_URL}/alarm/subscribe`);
  console.info("Listenting on SEE", eventSource);
  eventSource.onmessage = (e: MessageEvent) => {
    console.log(e.data);
  }

  return {
    close: () => {
      console.info("Closing SSE");
      eventSource.close();
    }
  }
}