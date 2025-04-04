"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { AlarmProps, MoreButton, NoData } from "@/components/common";
import { useDeleteAlarm } from "@/hooks/useInAlarm";
import { handleMore, useDelete, useListWithPage } from "@/hooks/useInCommon";
import { AlarmBlock } from ".";

export function AlarmTab() {
  const { data: alarms, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status, } = useListWithPage('/api/user/alarm/?', ['alarms'])
  const router = useRouter()

  const mutateDelete = useDeleteAlarm()
  const handleDelete = (e: any, alarmId: number) => { mutateDelete.mutate(alarmId) }
  const mutateDeleteAll = useDelete('/api/user/alarm/', ['alarms'], '알림')
  const handleDeleteAll = () => {
    let confirmDelete = confirm("모든 알림을 삭제하시겠습니까?");
    if (confirmDelete) { mutateDeleteAll.mutate() }
  }

  return (
    <div className="mt-[60px]">
      {!!alarms && !alarms.pages[0].empty
        ? <><div className="fixed flex justify-end items-center w-full h-[48px] px-[16px] bg-p-white">
          <button onClick={handleDeleteAll} className="text-12 text-gray3">전체삭제</button>
        </div>
          <div className="pt-[48px] bg-p-white">
            {alarms.pages.map((item) => (
              item.content.map((v: AlarmProps) => (
                <div key={v.alarmId}>
                  <AlarmBlock data={v} handleDelete={handleDelete} router={router} />
                </div>
              ))
            ))}
          </div>
          {hasNextPage ? <MoreButton onClick={() => handleMore(hasNextPage, fetchNextPage)} /> : <></>}
        </>
        : <div className="py-[50px]"><NoData text1="아직 새로운 소식이 없어요" text2="알람이 오면 빠르게 알려드릴게요!" /></div>
      }
    </div>
  );
};