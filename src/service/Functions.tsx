import { tabList } from "@/components/common/Data";
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef } from "react";
import { createSearchParams } from 'react-router-dom'
import { DayValue } from "react-modern-calendar-datepicker";
import { call } from "./ApiService";
import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";
import { CommentProps } from "@/components/common/Comment";

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

export const String2Day = (date: string | null) => {
  if (date === null) { return undefined }
  else {
    // let dateD = new Date(date);
    return { year: Number(date.substring(0, 4)), month: Number(date.substring(4, 6)), day: Number(date.substring(6, 8)) }
  }
}

export const String2ISO = (date: string | null) => {
  if (date === null) { return undefined }
  else {
    let y = date.substring(0, 4);
    let m = date.substring(4, 6);
    let d = date.substring(6, 8);
    const tmp = new Date(Number(y), Number(m) - 1, Number(d));
    return tmp.toISOString().slice(0, -5)
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

export interface PostTabsProps {
  events: never[]; value: number; handleChange: any; filterCnt: number; filters: string[],
  setFilters: Dispatch<SetStateAction<string[]>>; sort: string; setSort: Dispatch<SetStateAction<string>>;
  dayRange: DayRange; setDayRange: any; participants: number; setParticipants: any;
  headCount: { from: undefined | number, to: undefined | number }; setHeadCount: any;
  page: { current: number; total: number; }; setPageInfo: any;
  selectedCate: string[]; setSelectedCate: Dispatch<SetStateAction<string[]>>;
  open?: boolean; setOpen?: any;
}

export interface RangeProps { from: undefined | number, to: undefined | number }

export interface EventProps {
  id: number; abstractLocation: string; categories: string[];
  tags: string[]; title: string; type: string; userName: string; userImage: string;
  startDate: string; endDate: string; lastModifiedAt: string; headImageUrl: string;
  currentHeadCount: number; totalHeadCount: number;
}
export interface RecruitProps {
  title: string; user_profile: string; username: string; state: string;
  startDate: any; tags?: string[]; id?: number; headCount?: number; headCountMax?: number;
}

export function setPageInfo(page: any, setPage: any, currentPage: number, params?: ParamProps, setParams?: any) { 
  setPage({ ...page, current: currentPage }); 
  if (params !== undefined && setParams !== undefined) {
    setParams({ ...params, page: currentPage });
  }
}



// 이벤트 저장 리스트 업데이트
export function setUniqueList(opt: string, currentList: [], setItems: any, items?: EventProps[] | RecruitProps[], itemsC?: CommentProps[]) {
  if (opt === 'EVT' && items) {
    const newItems = items.concat(currentList)
    const ids = newItems.map(({ id }) => id);
    const filtered = newItems.filter(({ id }, index: number) => !ids.includes(id, index + 1));
    setItems(filtered);
  } else if (opt === 'CMT' && itemsC) {
    const newItems = itemsC.concat(currentList)
    const ids = newItems.map(({ commentId }) => commentId);
    const filtered = newItems.filter(({ commentId }, index: number) => !ids.includes(commentId, index + 1));
    setItems(filtered);
  } else if (opt === 'RPL' && itemsC) {
    const newItems = itemsC.concat(currentList)
    const ids = newItems.map(({ commentChildId }) => commentChildId);
    const filtered = newItems.filter(({ commentChildId }, index: number) => !ids.includes(commentChildId, index + 1));
    setItems(filtered);
  }
}

// update parameter
export const useEffectParam = (dependencies: any[], initialSet: MutableRefObject<boolean>, setParams: any, params: any,
  value: number | undefined, selectedCate: string[], sort: string, dayRange: any, participants: number, headCount: any, setEvents?: any, setLoading?: any) => {
  useEffect(() => {
    initialSet.current = false;
    setParams({
      ...params,
      page: 0, type: value !== undefined ? tabList[value] : '',
      categories: selectedCate, sort: sort,
      startDate: dayRange.from === null || dayRange.from === undefined
        ? '' : `${dayRange.from.year}-${String(dayRange.from.month).padStart(2, "0")}-${String(dayRange.from.day).padStart(2, "0")}T00:00:00`,
      endDate: dayRange.to === null || dayRange.to === undefined
        ? '' : `${dayRange.to.year}-${String(dayRange.to.month).padStart(2, "0")}-${String(dayRange.to.day).padStart(2, "0")}T23:59:59`,
      leftHeadCount: participants > 0 ? participants : '',
      totalHeadCountMax: headCount.from === null || headCount.from === undefined ? '' : headCount.from,
      totalHeadCountMin: headCount.to === null || headCount.to === undefined ? '' : headCount.to,
    })
    if (setEvents !== undefined) {
      setEvents([]);
      setLoading(true);
    }
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
      setChanged({ key: Object.keys(changedDeps)[0], value: changedDeps[Object.keys(changedDeps)[0]]['after'] })
    }
  }, dependencies);
};

// update applied filters
export const useEffectFilterApplied = (dependencies: any[], filters: string[], setFilters: any, changed: any, sort: string, setFilterCnt: any) => {
  useEffect(() => {
    console.log(changed.key)
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
      console.log(filters)
      setFilterCnt(filters.length)
    }
  }, dependencies)
}

export const useEffectCntFilter = (searchParams: any, setFilters: any, setFilterCnt: any, sort: string) => {
  useEffect(() => {
    let paramFilter: string[] = []
    for (const key of searchParams.keys()) {
      if ((key === 'sD' || key === 'eD') && !paramFilter.includes('dayRange')) {
        paramFilter.push('dayRange')
      } else if ((key === 'hcMin' || key === 'hcMax') && !paramFilter.includes('headCount')) {
        paramFilter.push('headCount')
      } else if ((key === 'sort' || key === 'ptcp') && !paramFilter.includes(key)) {
        paramFilter.push(key)
      }
    }

    if (paramFilter.length > 0) {
      setFilters(paramFilter)
      if (paramFilter.length === 1 && sort === 'createdAt,desc') { setFilterCnt(0) }
      else { setFilterCnt(paramFilter.length) }
    }
  }, [searchParams])
}

export interface ParamProps {
  title?: string; page: number; categories?: string[] | undefined; type?: string | undefined; sort?: string | undefined;
  tag?: string; startDate?: string | undefined; endDate?: string | undefined; leftHeadCount?: string | undefined;
  totalHeadCountMax?: string | undefined; totalHeadCountMin?: string | undefined;
}

// call event list api with filters
export function getParams(params: any) {
  let sparams = createSearchParams(params);
  let target: any[] = [];
  sparams.forEach((val, key) => { if (val === '') { target.push(key); } })
  target.forEach(key => { sparams.delete(key); })
  console.log('^^^^^ ', sparams.toString())
  return sparams.toString();
}

export const useEffectCallAPI = (params: any, initialSet: MutableRefObject<boolean>, setPage: any, events: any, setEvents: any, setLoading: any) => {
  useEffect(() => {
    if (params) {
      console.log('useEffect - useEffectCallAPI')
      let apiURL = Object.keys(params).length > 0 ? `/api/event?size=10&${getParams(params)}` : '/api/event?size=10&type=FESTIVAL'
      console.log('** ', apiURL)
      call(apiURL, "GET", null)
        .then((response) => {
          console.log(response.data);
          if (!response.data.empty) {
            // 페이지값 초기설정
            if (!initialSet.current) {
              console.log(' -- pageset for initialSet.current')
              setPage({ current: 0, total: response.data.totalPages })
              initialSet.current = true;
            }
            setUniqueList('EVT', response.data.content, setEvents, events)
          }
          setLoading(false)
        })
    }
  }, [params])
}


// 상세화면
export const useEffectDetail = (urlDetail: string, urlCheckLike: string, setData: any, setLoading: any, setLiked: any, setLoginfo: any) => {
  useEffect(() => {
    call(urlDetail, "GET", null)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
    call(urlCheckLike, "GET", null)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setLiked(response.data.myLike)
          setLoginfo(true)
        }
      }).catch((error) => console.error('not signed in'));
  }, [])
}

export const applyLike = (loginfo: boolean, liked: boolean, url: string, setLiked: any,) => {
  if (loginfo) {
    if (!liked) {
      call(url, "POST", null)
        .then((response) => {
          console.log('liked')
          setLiked(true)
        }).catch((error) => console.error(error));
    } else {
      call(url, "DELETE", null)
        .then((response) => {
          console.log('unliked')
          setLiked(false)
        }).catch((error) => console.error(error));
    }
  }
}

// 댓글 대댓글
export const useEffectComment = (opt: string, url: string, initialSet: MutableRefObject<boolean>, page: any, setPage: any, 
  setCount: any, isLoading: boolean, setLoading: any, setComments: any, comments: CommentProps[], cmtEndRef?: any) => {
    useEffect(() => {
      call(url, "GET", null)
        .then((response: any) => {
          console.log(response.data);
          if (response.data.empty === false) {
            // 페이지값 초기설정
            if (!initialSet.current) {
              setPage({ current: 0, total: response.data.totalPages })
              initialSet.current = true;
              setCount(response.data.totalElements)
            }
            setUniqueList(opt, response.data.content, setComments, undefined, comments)
          }
          setLoading(false)
          
          if (cmtEndRef) { cmtEndRef.current?.scrollIntoView({ behavior: "instant" }) }
        })
    }, [page, isLoading])
  }