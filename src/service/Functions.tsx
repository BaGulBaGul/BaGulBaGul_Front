import { useEffect, useMemo, useRef, useState } from "react";
import { Day, DayValue } from "react-modern-calendar-datepicker";

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

const usePrevious = (value: any, initialValue: any) => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useEffectFilter = (dependencies: any, dependencyNames: any = [], setChanged: any) => {
  const previousDeps = usePrevious(dependencies, []);

  const changedDeps = dependencies.reduce((accum: any, dependency: any, index: any) => {
    if (dependency !== previousDeps[index]) {
      const keyName = dependencyNames[index] || index;
      return {
        ...accum,
        [keyName]: {
          before: previousDeps[index],
          after: dependency
        }
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