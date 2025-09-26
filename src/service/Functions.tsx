"use client"
import { RefObject } from "react";
import { createSearchParams } from 'react-router-dom'
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { call } from "./ApiService";

import { EventType } from "@/components/common";

// dayjs 설정
dayjs.extend(isSameOrBefore);
dayjs.locale('ko');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

export const tabList: EventType[] = ['FESTIVAL', 'LOCAL_EVENT', 'PARTY']

export const typeString: { [key: string]: string; } = {
  'FESTIVAL': '페스티벌', 'LOCAL_EVENT': '지역행사', 'PARTY': '파티', 'RCT': '모집글'
}

export const FormatDateRange = (startDate: any, endDate: any) => {
  if (!!startDate && !!endDate) {
    if (dayjs(startDate).year() === dayjs(endDate).year()) {
      return `${dayjs(startDate).format('YY.MM.DD')} - ${dayjs(endDate).format('MM.DD')}`;
    } else if (dayjs(startDate).year() < dayjs(endDate).year()) {
      return `${dayjs(startDate).format('YY.MM.DD')} - ${dayjs(endDate).format('YY.MM.DD')}`;
    }
  } else if (!!startDate || !!endDate) {
    return `${dayjs(startDate ?? endDate).format('YY.MM.DD')}`;
  } else { return '-' }
}

export const sortLabel = (sort: string) => {
  switch (sort) {
    case 'createdAt,desc': return '최신순'
    case 'views,desc': return '조회수'
    case 'likeCount,desc': return '좋아요수'
    case 'commentCount,desc': return '댓글수'
    // for UserManagePage
    case 'createdAt,asc': return '오래된 순'
    case 'activatedAt,desc': return '활성화 순'
    case 'activatedAt,asc': return '비활성화 순'
  }
}

// call event list api with filters
export function getParams(params: any) {
  let sparams = createSearchParams(params);
  let target: any[] = [];
  sparams.forEach((val, key) => { if (val === '') { target.push(key); } })
  target.forEach(key => { sparams.delete(key); })
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
  if (!!from || !!to) {
    if (!from) { return ` - ${to}` }
    else if (!to) { return `${from} - ` }
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

export const handleResizeHeight = (
  inputRef: RefObject<HTMLTextAreaElement>, entered?: boolean, updateEntered?: (entered: boolean) => void,
  e?: React.ChangeEvent<HTMLTextAreaElement>, updateTitle?: (e: any) => void
) => {
  if (inputRef.current) {
    inputRef.current.style.height = 'auto'; //height 초기화
    inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    if (entered !== undefined && !!updateEntered) {
      if (inputRef.current.value.length > 0) {
        if (!entered) { updateEntered(true) }
      } else {
        if (!!entered) { updateEntered(false) }
      }
    }
    if (!!e && !!updateTitle) {
      updateTitle(e);
    }
  }
};