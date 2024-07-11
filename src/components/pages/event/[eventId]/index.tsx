'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation'
import SubHeader from '@/components/layout/subHeader';
import { useEffectDetail, applyLike, typeString } from '@/service/Functions';
import { LoadingSkeleton, Detail, DetailProps } from '@/components/common';
import { call } from '@/service/ApiService';

const index = () => {
  const [isLoading, setLoading] = useState(true)
  const params = useParams()
  const [data, setData] = useState<DetailProps>()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState<number>()
  const [saved, setSaved] = useState(false)
  // * 임시 로그인여부 파악용
  const [loginfo, setLoginfo] = useState(false)

  // * 캘린더 추가됐는지 여부 체크 추가 필요
  useEffectDetail(`/api/event/${params.eventId}`, `/api/event/${params.eventId}/ismylike`, setData, setLoading, setLiked, setLikeCount, setLoginfo, setSaved, params.eventId)

  const handleLike = () => {
    applyLike(loginfo, liked, `/api/event/${params.eventId}/like`, setLiked, setLikeCount)
  }
  const handleCalendar = () => {
    if (loginfo) {
      if (!saved) {
        call(`/api/user/calendar/event/${params.eventId}`, "POST", null)
          .then((response) => {
            if (response.errorCode === 'C00000') {
              setSaved(true)
              console.log('캘린더에 추가됨')
            }
          }).catch((error) => console.error(error));
      } else {
        call(`/api/user/calendar/event/${params.eventId}`, "DELETE", null)
          .then((response) => {
            if (response.errorCode === 'C00000') {
              setSaved(false)
              console.log('캘린더에서 제외됨')
            }
          }).catch((error) => console.error(error));
      }
    }
  }

  return (
    <>
      <SubHeader name={data ? typeString[data.event.type as string] : ''} />
      <div className='flex flex-col w-full'>
        {isLoading
          ? <LoadingSkeleton type='DTLE' />
          : data && Object.keys(data).length > 0
            ? <Detail opt='EVT' data={data} liked={liked} likeCount={likeCount} handleLike={handleLike} saved={saved} handleCalendar={handleCalendar} /> : <></>
        }
      </div>
    </>
  )
}
export default index;