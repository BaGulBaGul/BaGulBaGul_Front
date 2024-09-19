"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlarmProps } from "@/components/common";
import { call } from "@/service/ApiService";
import { setUniqueList } from "@/service/Functions";
import { AlarmBlock } from "./AlarmBlock";

export function AlarmTab() {
  const [isLoading, setLoading] = useState(true)
  const [alarms, setAlarms] = useState<AlarmProps[]>([]);
  const [page, setPage] = useState({ current: 0, total: 0, });
  const initialSet = useRef(false);
  const router = useRouter()

  useEffect(() => {
    let apiURL = `/api/user/alarm/`
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response.data);
        if (!response.data.empty) {
          if (!initialSet.current) {  // 페이지값 초기설정
            setPage({ current: 0, total: response.data.totalPages })
            initialSet.current = true;
          }
          setUniqueList('ALRM', response.data.content, setAlarms, alarms)
        }
        setLoading(false)
      })
  }, [isLoading, page])

  const handleClick = async (e: any, alarmId: number, checked: boolean, subject: any, type: string) => {
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
    console.log('alarm: ', urlLink)
    if (await urlLink !== '') {
      if (!checked) {
        call(`/api/user/alarm/${alarmId}/check`, "POST", null)
          .then(async (response) => {
            console.log(response);
            if (response.errorCode === 'C00000') {
              router.push(await urlLink);
            }
          })
      } else {
        router.push(await urlLink);
      }
    }

  }

  const handleDelete = (e: any, alarmId: number) => {
    call(`/api/user/alarm/${alarmId}`, "DELETE", null)
      .then((response) => {
        console.log(response);
        if (response.errorCode === 'C00000') {
          setLoading(true)
        } else {
          alert('알림 삭제를 실패했습니다. 다시 시도해주세요.');
        }
      })
  }

  const handleDeleteAll = () => {
    let confirmDelete = confirm("모든 알림을 삭제하시겠습니까?");
    if (confirmDelete) {
      call(`/api/user/alarm/`, "DELETE", null)
        .then((response) => {
          if (response.errorCode === 'C00000') {
            setAlarms([])
            setLoading(true)
          } else {
            alert('알림 삭제를 실패했습니다. 다시 시도해주세요.');
          }
        })
    }
  }

  return (
    <div className="mt-[60px]">
      <div className="fixed flex justify-end items-center w-full h-[48px] px-[16px] bg-p-white">
        <button onClick={handleDeleteAll} className="text-12 text-gray3">전체삭제</button>
      </div>
      <div className="pt-[48px] bg-p-white">
        {alarms.map((item, index) => (
          <div key={index}>
            <AlarmBlock data={item} handleClick={handleClick} handleDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};