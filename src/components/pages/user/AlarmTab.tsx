"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { AlarmProps, MoreButton } from "@/components/common";
import { fetchFromURLWithPage } from "@/service/ApiService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDeleteAlarm, useDeleteAlarmAll } from "@/hooks/useInAlarm";
import { AlarmBlock } from ".";

export function AlarmTab() {
  const { data: alarms, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status, } = useInfiniteQuery({
    queryKey: ['alarms'],
    queryFn: (pageParam) => fetchFromURLWithPage('/api/user/alarm/?', pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPageParam >= lastPage.totalPages - 1) { return undefined }
      return lastPageParam + 1
    },
  })
  const router = useRouter()

  const mutateDelete = useDeleteAlarm()
  const handleDelete = (e: any, alarmId: number) => { mutateDelete.mutate(alarmId) }
  const mutateDeleteAll = useDeleteAlarmAll()
  const handleDeleteAll = () => {
    let confirmDelete = confirm("모든 알림을 삭제하시겠습니까?");
    if (confirmDelete) { mutateDeleteAll.mutate() }
  }
  const handleMore = () => { if (hasNextPage) { fetchNextPage() } }

  return (
    <div className="mt-[60px]">
      <div className="fixed flex justify-end items-center w-full h-[48px] px-[16px] bg-p-white">
        <button onClick={handleDeleteAll} className="text-12 text-gray3">전체삭제</button>
      </div>
      <div className="pt-[48px] bg-p-white">
        {!!alarms
          ? <>
            {alarms.pages.map((item) => (
              item.content.map((v: AlarmProps) => (
                <div key={v.alarmId}>
                  <AlarmBlock data={v} handleDelete={handleDelete} router={router} />
                </div>
              ))
            ))}
          </>
          : <></>
        }
      </div>
      {hasNextPage ? <MoreButton onClick={handleMore} /> : <></>}
    </div>
  );
};