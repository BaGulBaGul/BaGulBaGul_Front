import { useQuery, useQueryClient } from '@tanstack/react-query';
import { call } from '@/service/ApiService';
import dayjs from 'dayjs';
import { CalProps } from '@/components/common';

export const useCalendarData = (date: { y: number, m: number }) => {
  const queryClient = useQueryClient()
  return useQuery({ queryKey: ['calendar', `${date.y}-${date.m}`], queryFn: () => getCalendarEvents(date) })
}

// 캘린더 : 디스플레이 되는 달의 이벤트 처리
export const getCalendarEvents = (date: { y: number, m: number }) => {
  let sD = `${date.y}-${String(date.m).padStart(2, "0")}-01`
  let eD = `${date.y}-${String(date.m).padStart(2, "0")}-${dayjs(sD).daysInMonth()}`

  let apiURL1 = `/api/user/calendar/event?searchStartTime=${sD}T00:00:00&searchEndTime=${eD}T23:59:59`
  let apiURL2 = `/api/user/calendar/recruitment?searchStartTime=${sD}T00:00:00&searchEndTime=${eD}T23:59:59`
  async function getCalData() {
    let fetchedData: CalProps[] = []
    let result: { [key: string]: any[] } | undefined = undefined
    try {
      const dataE = await call(apiURL1, "GET", null);
      const dataR = await call(apiURL2, "GET", null);
      fetchedData = dataE.data.concat(dataR.data)
      if (fetchedData.length > 0) {
        fetchedData.forEach(function (event) {
          let startDate = dayjs(event.startTime).set('hour', 0).set('minute', 0).set('second', 0)
          let endDate = dayjs(event.endTime).set('hour', 23).set('minute', 59).set('second', 59)
          for (var dt = startDate; dt.isBefore(endDate); dt = dt.add(1, 'day')) {
            let dtS = dt.format('YYYY-MM-DD')
            if (result === undefined) { result = { [dtS]: [event] } }
            else if (result[dtS] === undefined) { result[dtS] = [event] }
            else if (result[dtS].length > 0) { result[dtS].push(event) }
          }
        });

        if (!!result) {  // 시작일 기준으로 정렬 후 반환
          Object.keys(result).forEach((key) => {
            if (!!result && result[key].length > 1) {
              result[key].sort((a, b) => Date.parse(a.startTime) - Date.parse(b.startTime))
            }
          })
          return { dates: Object.keys(result).map(date => new Date(date)), events: result }
        }
      } return { dates: undefined, events: undefined }
    } catch (error) { throw new Error }
  }
  return getCalData();
}