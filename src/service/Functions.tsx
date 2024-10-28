"use client"
import { useEffect } from "react";
import { createSearchParams } from 'react-router-dom'
import { call } from "./ApiService";

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { CalProps, CommentProps, ListProps, RListProps, LikeProps, LikeRProps, AlarmProps, FilterProps } from "@/components/common";

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

// 이벤트 저장 리스트 업데이트
export function setUniqueList(opt: string, currentList: any[], setItems: any, items?: ListProps[] | RListProps[] | CommentProps[] | CalProps[] | LikeProps[] | LikeRProps[] | AlarmProps[]) {

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
      case 'ALRM':
        setFilter(items as AlarmProps[], 'alarmId'); break;
    }
  }
}

// update applied filters
export const useEffectFilterApplied = (p: FilterProps, setFilters: any, setFilterCnt: any) => {
  useEffect(() => {
    let paramFilter: string[] = ['sort']
    if (JSON.stringify(p.dateRange) !== JSON.stringify([undefined, undefined]) && !paramFilter.includes('dayRange')) {
      paramFilter.push('dayRange')
    } if (p.participants > 0 && !paramFilter.includes('ptcp')) {
      paramFilter.push('ptcp')
    } if (JSON.stringify(p.headCount) !== JSON.stringify({ from: undefined, to: undefined }) && !paramFilter.includes('headCount')) {
      paramFilter.push('headCount')
    }

    if (paramFilter.length > 0) {
      setFilters(paramFilter)
      if (paramFilter.length === 1 && p.sort === 'createdAt,desc') { setFilterCnt(0) }
      else if (paramFilter.length > 0) { setFilterCnt(paramFilter.length) }
    }
  }, [p])
}

export const useEffectCntFilter = (searchParams: any, setFilters: any, setFilterCnt: any, sort: string) => {
  useEffect(() => {
    let paramFilter: string[] = ['sort']
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

export const applyLike = (loginfo: boolean, liked: boolean, url: string, setLiked: any, setLikeCount?: any) => {
  if (loginfo) {
    call(url, liked ? "DELETE" : "POST", null)
      .then((response) => {
        setLiked(!liked)
        if (setLikeCount !== undefined) { setLikeCount(response.data.likeCount) }
      }).catch((error) => console.error(error));
  }
}

export const headCountString = (from?: number | null, to?: number | null) => {
  if ((from !== undefined && from !== null && from > 0) || (to !== undefined && to !== null && to > 0)) {
    if (from === undefined) { return ` - ${to}` }
    else if (to === undefined) { return `${from} - ` }
    return `${from} - ${to}`
  } else { return '0' }
}

export const handleClickAlarm = async (e: any, router: any, alarmId: number, checked: boolean, subject: any, type: string) => {
  const urlLink = (async () => {
    let subjectJson = JSON.parse(subject);
    async function getPostId(type: 'event' | 'recruitment', commentId: any) {
      try {
        let api = type === 'event' ? `/api/event/comment/${commentId}/eventId` : `/api/event/recruitment/comment/${commentId}/recruitmentId`
        console.log(api)
        const postId = await call(api, "GET", null)
        if (postId.errorCode === 'C00000' && postId.data !== null) {
          console.log(`comment ${commentId} is child of post #`, postId.data.eventId ?? postId.data.recruitmentId)
          return postId.data.eventId ?? postId.data.recruitmentId
        }
      } catch (error) {
        return null;
      }
    }
    switch (type) {
      case "NEW_EVENT_COMMENT": return `/event/${subjectJson.eventId}/comments`;
      case "NEW_EVENT_COMMENT_LIKE":
      case "NEW_EVENT_COMMENT_CHILD":
      case "NEW_EVENT_COMMENT_CHILD_LIKE":
        let eventId = await getPostId('event', subjectJson.commentId)
        if (eventId > 0) {
          return `/event/${eventId}/comments/${subjectJson.commentId}`;
        } else return ''
      case "NEW_RECRUITMENT_COMMENT": return `/recruitment/${subjectJson.recruitmentId}/comments`;
      case "NEW_RECRUITMENT_COMMENT_LIKE":
      case "NEW_RECRUITMENT_COMMENT_CHILD":
      case "NEW_RECRUITMENT_COMMENT_CHILD_LIKE":
        let recruitmentId = await getPostId('recruitment', subjectJson.commentId)
        if (recruitmentId > 0) {
          return `/recruitment/${recruitmentId}/comments/${subjectJson.commentId}`;
        } else return ''
      case "NEW_EVENT_LIKE": return `/event/${subjectJson.eventId}`;
      case "NEW_RECRUITMENT_LIKE": return `/event/${subjectJson.recruitmentId}`;
      default: return '';
    }
  })()
  if (await urlLink !== '') {
    if (!checked) {
      call(`/api/user/alarm/${alarmId}/check`, "POST", null)
        .then(async (response) => {
          console.log(response);
          if (response.errorCode === 'C00000') {
            router.push(await urlLink);
          }
        })
    } else { router.push(await urlLink); }
  }
}