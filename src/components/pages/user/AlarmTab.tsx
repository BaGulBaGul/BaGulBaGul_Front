"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlarmProps } from "@/components/common";
import { call } from "@/service/ApiService";
import { setUniqueList } from "@/service/Functions";
import { alarmSSE } from "./AlarmSSE";
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
            alarmSSE();
          }
          setUniqueList('ALRM', response.data.content, setAlarms, alarms)
        }
        setLoading(false)
      })
  }, [isLoading, page])

  const handleClick = (e: any, alarmId: number, checked: boolean, subject: any, type: string) => {
    const urlLink = (() => {
      let subjectJson = JSON.parse(subject);
      switch (type) {
        case "NEW_COMMENT": return `/comment/${subjectJson.postId}`;
        case "NEW_COMMENT_LIKE":
        case "NEW_COMMENT_CHILD":
        case "NEW_COMMENT_CHILD_LIKE": return `/comment/c/${subjectJson.commentId}`;
        case "NEW_EVENT_LIKE": return `/event/${subjectJson.eventId}`;
        case "NEW_RECRUITMENT_LIKE": return `/event/${subjectJson.recruitmentId}`;
        default: return '';
      }
    })()
    console.log('alarm: ', urlLink)
    if (!checked) {
      call(`/api/user/alarm/${alarmId}/check`, "POST", null)
        .then((response) => {
          console.log(response);
          if (response.errorCode === 'C00000') {
            router.push(urlLink);
          }
        })
    } else {
      router.push(urlLink);
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