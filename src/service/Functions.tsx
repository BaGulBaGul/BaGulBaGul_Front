import { MutableRefObject, useEffect, useRef } from "react";
import { createSearchParams } from 'react-router-dom'
import { call } from "./ApiService";

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { CalProps, CommentProps, ListProps, ParamProps, RListProps, LikeProps, LikeRProps } from "@/components/common";

// dayjs 설정
dayjs.extend(isSameOrBefore);
dayjs.locale('ko');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

export const tabList = ['FESTIVAL', 'LOCAL_EVENT', 'PARTY']

type typeType = { [key: string]: string; }
export const typeString: typeType = { 'FESTIVAL': '페스티벌', 'LOCAL_EVENT': '지역행사', 'PARTY': '파티' }

export const FormatDateRange = (startDate: any, endDate: any) => {
  if (dayjs(startDate).year() === dayjs(endDate).year()) {
    return `${dayjs(startDate).format('YY.MM.DD')} - ${dayjs(endDate).format('MM.DD')}`;
  } else if (dayjs(startDate).year() < dayjs(endDate).year()) {
    return `${dayjs(startDate).format('YY.MM.DD')} - ${dayjs(endDate).format('YY.MM.DD')}`;
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

export function setPageInfo(page: any, setPage: any, currentPage: number, params?: ParamProps, setParams?: any) {
  setPage({ ...page, current: currentPage });
  if (params !== undefined && setParams !== undefined) {
    setParams({ ...params, page: currentPage });
  }
}

// 이벤트 저장 리스트 업데이트
// export function setUniqueList(opt: string, currentList: any[], setItems: any,
//   items?: ListProps[] | RListProps[], itemsCmt?: CommentProps[], itemsCal?: CalProps[], itemsL?: LikeProps[] | LikeRProps[]) {
//   console.log('opt: ', opt)
//   if (opt === 'EVT' && items) {
//     const newItems = currentList.length > 0 ? items.concat(currentList) : items
//     const ids = newItems.map(({ post }) => post.postId);
//     console.log('ids: ', ids)
//     const filtered = newItems.filter(({ post }, index: number) =>
//       index === 0 || index > 0 && !(ids.slice(0, index)).includes(post.postId)
//     );
//     console.log('filtered: ', filtered)
//     setItems(filtered);
//   }
//   else if (opt === 'L-EVT' && itemsL) {
//     const newItems = currentList.length > 0 ? (itemsL as LikeProps[]).concat(currentList) : itemsL as LikeProps[]
//     const ids = newItems.map(({ eventId }) => eventId);
//     console.log('ids: ', ids)
//     const filtered = newItems.filter(({ eventId }, index: number) =>
//       index === 0 || index > 0 && !(ids.slice(0, index)).includes(eventId)
//     );
//     console.log('filtered: ', filtered)
//     setItems(filtered);
//   } else if (opt === 'L-RCT' && itemsL) {
//     const newItems = currentList.length > 0 ? (itemsL as LikeRProps[]).concat(currentList) : itemsL as LikeRProps[]
//     const ids = newItems.map(({ recruitmentId }) => recruitmentId);
//     console.log('ids: ', ids)
//     const filtered = newItems.filter(({ recruitmentId }, index: number) =>
//       index === 0 || index > 0 && !(ids.slice(0, index)).includes(recruitmentId)
//     );
//     console.log('filtered: ', filtered)
//     setItems(filtered);
//   }
//   else if (opt === 'CMT' && itemsCmt) {
//     console.log('**************** setUniqueList ******************')
//     const newItems = currentList.length > 0 ? itemsCmt.concat(currentList) : itemsCmt
//     console.log('n: ', newItems)
//     const ids = newItems.map(({ commentId }) => commentId);
//     const filtered = newItems.filter(({ commentId }, index: number) =>
//       index === 0 || index > 0 && !(ids.slice(0, index)).includes(commentId)
//     );
//     setItems(filtered);
//     console.log('f: ', filtered)
//   } else if (opt === 'RPL' && itemsCmt) {
//     const newItems = currentList.length > 0 ? itemsCmt.concat(currentList) : itemsCmt
//     const ids = newItems.map(({ commentChildId }) => commentChildId);
//     const filtered = newItems.filter(({ commentChildId }, index: number) =>
//       index === 0 || index > 0 && !(ids.slice(0, index)).includes(commentChildId)
//     );
//     setItems(filtered);
//   } else if (opt === 'CAL' && itemsCal) {
//     const newItems = currentList.length > 0 ? itemsCal.concat(currentList) : itemsCal
//     const ids = newItems.map(({ eventId }) => eventId);
//     const filtered = newItems.filter(({ eventId }, index: number) =>
//       index === 0 || index > 0 && !(ids.slice(0, index)).includes(eventId)
//     );
//     setItems(filtered);
//   }
// }

export function setUniqueList(opt: string, currentList: any[], setItems: any, items?: ListProps[] | RListProps[] | CommentProps[] | CalProps[] | LikeProps[] | LikeRProps[]) {

  function setFilter(itms: any[], id: string, id2?: string,) {
    const newItems = currentList.length > 0 ? itms.concat(currentList) : itms
    const ids = newItems.map((post) => id2 ? post[id][id2] : post[id]);
    console.log('ids: ', ids)
    const filtered = newItems.filter((post, index: number) =>
      index === 0 || index > 0 && !(ids.slice(0, index)).includes(id2 ? post[id][id2] : post[id])
    );
    console.log('filtered: ', filtered)
    setItems(filtered);
  }

  if (items) {
    console.log('opt: ', opt)
    switch (opt) {
      case 'EVT':
        setFilter(items as ListProps[] | RListProps[], 'post', 'postId'); break;
      case 'CMT':
        setFilter(items as CommentProps[], 'commentId'); break;
      case 'RPL':
        setFilter(items as CommentProps[], 'commentChildId'); break;
      case 'CAL':
        setFilter(items as CalProps[], 'eventId'); break;
      case 'L-EVT':
        setFilter(items as LikeProps[], 'eventId'); break;
      case 'L-RCT':
        setFilter(items as LikeRProps[], 'recruitmentId'); break;
    }
  }
}

// update parameter
export const useEffectParam = (dependencies: any[], initialSet: MutableRefObject<boolean>, setParams: any, params: any, value: number | undefined,
  selectedCate: string[], sort: string, dayRange: any, participants: number, headCount: any, setEvents?: any, setLoading?: any) => {
  useEffect(() => {
    initialSet.current = false;
    setParams({
      ...params,
      page: 0, type: value !== undefined ? tabList[value] : '', categories: selectedCate, sort: sort,
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
    if (!filters.includes(changed.key)) { // filters에 key가 존재하지 않고 값이 유효 -> filters에 key 추가
      if ((changed.value !== undefined) && JSON.stringify(changed.value) !== JSON.stringify({ from: undefined, to: undefined })
        && JSON.stringify(changed.value) !== JSON.stringify([null, null])) {
        setFilters(filters.concat(changed.key))
      }
    } else { // filters에 key가 존재하고 값이 유효하지 X -> filters에서 key 제외
      if ((changed.value === undefined) || JSON.stringify(changed.value) === JSON.stringify({ from: undefined, to: undefined })
        && JSON.stringify(changed.value) !== JSON.stringify([null, null])) {
        setFilters(filters.filter((f) => f !== changed.key))
      }
    }
  }, [changed])

  useEffect(() => { // 필터 개수 판단
    if (filters.length === 1 && sort === 'createdAt,desc') { setFilterCnt(0) }
    else if (filters.length > 0) { setFilterCnt(filters.length) }
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
            if (!initialSet.current) {  // 페이지값 초기설정
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
export const useEffectDetail = (
  urlDetail: string, urlCheckLike: string, setData: any, setLoading: any, setLiked: any, setLikeCount: any, setLoginfo: any, setSaved?: any, eventId?: any
) => {
  useEffect(() => {
    call(urlDetail, "GET", null)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLikeCount(response.data.post.likeCount);
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
    if (setSaved !== undefined) {
      call(`/api/user/calendar/event/${eventId}/exists`, "GET", null)
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            setSaved(response.data.exists)
          }
        }).catch((error) => console.error(''));
    }
  }, [])
}

export const applyLike = (loginfo: boolean, liked: boolean, url: string, setLiked: any, setLikeCount?: any) => {
  if (loginfo) {
    call(url, liked ? "DELETE" : "POST", null)
      .then((response) => {
        setLiked(!liked)
        if (setLikeCount !== undefined) { setLikeCount(response.data.likeCount) }
      }).catch((error) => console.error(error));
  }
}

// 댓글 대댓글
export const useEffectRefreshComment = (opt: string, url: string, initialSet: MutableRefObject<boolean>, page: any, setPage: any,
  setCount: any, isLoading: boolean, setLoading: any, setComments: any, tmp: any[], setTmp: any, setTmpP: any, tmpP?: number) => {
  useEffect(() => {
    var tmpA: any[] = [];
    console.log('useEffectRefreshComment (1)')
    async function fetchComment() {
      if (isLoading) {
        for (let p = 0; p < page.current + 1; p++) {
          await call(`${url}&page=${p}`, "GET", null).then((response: any) => {
            console.log(`${url}&page=${p}`)
            if (!response.data.empty) {
              if (p === 0) {
                if (!initialSet.current) { // 페이지값 초기설정
                  setPage({ current: 0, total: response.data.totalPages })
                  initialSet.current = true;
                }
                setCount(response.data.totalElements)
              }
              console.log('response: ', response.data.content)
              response.data.content.forEach(function (d: any) { tmpA.push(d) })
              console.log('(1) - tmpA: ', tmpA)
              setTmpP(p)
            }
          })
        }
        setTmp(tmpA)
      }
    }
    fetchComment();
  }, [page, isLoading])
  useEffect(() => {
    console.log('useEffectRefreshComment (2) ', tmpP, page.current)
    if (tmpP === page.current && tmp.length > 0) {
      setUniqueList(opt, [], setComments, tmp)
      setLoading(false)
    }
  }, [tmp])
}

export const getDaysArray = function (events: CalProps[], setEventDates: any) {
  const arr: Date[] = [];
  events.forEach(function (event) {
    let sD = dayjs(event.startTime).set('hour', 0).set('minute', 0).set('second', 0)
    let eD = dayjs(event.endTime).set('hour', 23).set('minute', 59).set('second', 59)
    for (var dt = sD; dt.isSameOrBefore(eD); dt = dt.add(1, 'day')) {
      // let dtS = dt.format('YYYY-MM-DD')
      let dtd = dt.toDate()
      if (!arr.includes(dtd)) { arr.push(dtd); }
    }
  });
  setEventDates(arr)
};