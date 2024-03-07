import { valueList } from "@/components/common/Data";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { createSearchParams } from 'react-router-dom'
import { DayValue } from "react-modern-calendar-datepicker";
import { call } from "./ApiService";

export const FormatDate = (dateStr: any, type: number) => {
  const dateD = new Date(dateStr);
  let date, month, year;
  date = dateD.getDate();
  month = dateD.getMonth() + 1;
  year = dateD.getFullYear();

  date = date.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');
  if (type === 0) {
    return `${year.toString().slice(2)}.${month}.${date}`;
  }
}

export const FormatDateTime = (dateStr: any, type: number) => {
  const dateD = new Date(dateStr);
  let date, month, year, time, weekday;
  date = dateD.getDate();
  month = dateD.getMonth() + 1;
  year = dateD.getFullYear();
  time = dateD.toLocaleTimeString("en-GB", { hour: "numeric", minute: "numeric" });
  weekday = dateD.getDay();

  date = date.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');

  const dayText = ['일', '월', '화', '수', '목', '금', '토']

  if (type === 0) {
    return { date: `${year.toString().slice(2)}.${month}.${date}(${dayText[weekday]})`, time: `${time}` };
  } else {
    return { date: `${year.toString().slice(2)}.${month}.${date}`, time: `${time}` };
  }
}

export const FormatDateRange = (startDate: any, endDate: any) => {
  const sDate = new Date(startDate);
  const eDate = new Date(endDate);
  let sDay, sMonth, sYear, eDay, eMonth, eYear;
  sDay = sDate.getDate();
  sMonth = sDate.getMonth() + 1;
  sYear = sDate.getFullYear();

  sDay = sDay.toString().padStart(2, '0');
  sMonth = sMonth.toString().padStart(2, '0');

  eDay = eDate.getDate();
  eMonth = eDate.getMonth() + 1;
  eYear = eDate.getFullYear();

  eDay = eDay.toString().padStart(2, '0');
  eMonth = eMonth.toString().padStart(2, '0');

  if (sYear === eYear) {
    return `${sYear.toString().slice(2)}.${sMonth}.${sDay} - ${eMonth}.${eDay}`;
  } else if (sYear < eYear) {
    return `${sYear.toString().slice(2)}.${sMonth}.${sDay} - ${eYear.toString().slice(2)}.${eMonth}.${eDay}`;
  }
}

// handle datatype Day from calendar package 
export const handleDayData = (date: DayValue, type: number = 0) => {
  if (date !== null && date !== undefined) {
    switch (type) {
      case 0:
        return `${date.year}.${String(date.month).padStart(2, "0")}.${String(date.day).padStart(2, "0")}`
      case 1:
        return `${String(date.month).padStart(2, "0")}.${String(date.day).padStart(2, "0")}`
    }
  }
}

export const sortLabel = (sort: string) => {
  switch (sort) {
    case 'createdAt,desc': return '최신순'
    case 'views,desc': return '조회수'
    case 'likeCount,desc': return '좋아요수'
    case 'commentCount,desc': return '댓글수'
  }
}

export interface RangeProps { from: undefined | number, to: undefined | number }
// 이벤트 저장 리스트 업데이트
export function setEventList(currentEvents: [], events: any, setEvents: any) {
  // setEvents(prevState => [...prevState, ...currentEvents])
  const newEvents = events.concat(currentEvents)
  const newEventsSet = new Set(newEvents)
  const newEventsList = Array.from(newEventsSet);
  setEvents(newEventsList);
}

// update parameter
export const useEffectParam = (dependencies: any[], initialSet: MutableRefObject<boolean>, setParams: any, params: any,
  value: number, selectedCate: string[], sort: string, dayRange: any, setEvents: any) => {
  useEffect(() => {
    initialSet.current = false;
    setParams({
      ...params,
      page: 0, type: valueList[value],
      categories: selectedCate, sort: sort,
      startDate: dayRange.from === null || dayRange.from === undefined
        ? '' : `${dayRange.from.year}-${String(dayRange.from.month).padStart(2, "0")}-${String(dayRange.from.day).padStart(2, "0")}T00:00:00`,
      endDate: dayRange.to === null || dayRange.to === undefined
        ? '' : `${dayRange.to.year}-${String(dayRange.to.month).padStart(2, "0")}-${String(dayRange.to.day).padStart(2, "0")}T23:59:59`
    })
    setEvents([]);
  }, dependencies)
}

// for identifying changed filter
const usePrevious = (value: any, initialValue: any) => {
  const ref = useRef(initialValue);
  useEffect(() => { ref.current = value; });
  return ref.current;
};

export const useEffectFilter = (dependencies: any[], dependencyNames: any = [], setChanged: any) => {
  const previousDeps = usePrevious(dependencies, []);
  const changedDeps = dependencies.reduce((accum: any, dependency: any, index: any) => {
    if (dependency !== previousDeps[index]) {
      const keyName = dependencyNames[index] || index;
      return {
        ...accum,
        [keyName]: { before: previousDeps[index], after: dependency }
      };
    }

    return accum;
  }, {});

  useEffect(() => {
    if (Object.keys(changedDeps).length) {
      // console.log('changedDeps: ', changedDeps)
      setChanged({ key: Object.keys(changedDeps)[0], value: changedDeps[Object.keys(changedDeps)[0]]['after'] })
    }
  }, dependencies);
};

// update applied filters
export const useEffectFilterApplied = (dependencies: any[], filters: string[], setFilters: any, changed: any, sort: string, setFilterCnt: any) => {
  useEffect(() => {
    if (!filters.includes(changed.key)) { // filters에 key가 존재하지 않고 값이 유효 -> filters에 key 추가
      if ((changed.value !== undefined) && JSON.stringify(changed.value) !== JSON.stringify({ from: undefined, to: undefined })) {
        setFilters(filters.concat(changed.key))
      }
    } else { // filters에 key가 존재하고 값이 유효하지 X -> filters에서 key 제외
      if ((changed.value === undefined) || JSON.stringify(changed.value) === JSON.stringify({ from: undefined, to: undefined })) {
        setFilters(filters.filter((f) => f !== changed.key))
      }
    }
  }, [changed])
  // 필터 개수 판단
  useEffect(() => {
    if (filters.length === 1 && sort === 'createdAt,desc') {
      setFilterCnt(0)
    } else if (filters.length > 0) {
      setFilterCnt(filters.length)
    }
  }, dependencies)
}

// call event list api with filters
function getParams(params: any) {
  let sparams = createSearchParams(params);
  let target: any[] = [];
  sparams.forEach((val, key) => { if (val === '') { target.push(key); } })
  target.forEach(key => { sparams.delete(key); })
  return sparams.toString();
}

export const useEffectCallAPI = (params: any, initialSet: MutableRefObject<boolean>, setPage: any, events: any, setEvents: any) => {
  useEffect(() => {
    let apiURL = Object.keys(params).length !== 0 ? `/api/event?size=5&${getParams(params)}` : '/api/event?size=5'
    console.log('** ', apiURL)
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response.data);
        if (response.data.empty === false) {
          // 페이지값 초기설정
          if (!initialSet.current) {
            setPage({ current: 0, total: response.data.totalPages })
            initialSet.current = true;
          }
          setEventList(response.data.content, events, setEvents)
        }
      })
  }, [params])
}
