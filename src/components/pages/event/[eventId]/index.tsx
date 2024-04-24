'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation'
import SubHeader from '@/components/layout/subHeader';
import { useEffectDetail, applyLike } from '@/service/Functions';
import { LoadingSkeleton, Detail } from '@/components/common';

const index = () => {
  const [isLoading, setLoading] = useState(true)
  const params = useParams()
  const [data, setData] = useState<any>({})
  const [liked, setLiked] = useState(false)
  // * 임시 로그인여부 파악용
  const [loginfo, setLoginfo] = useState(false)

  type typeType = { [key: string]: string; }
  const typeString: typeType = { 'FESTIVAL': '페스티벌', 'LOCAL_EVENT': '지역행사', 'PARTY': '파티' }

  useEffectDetail(`/api/event/${params.eventId}`, `/api/event/${params.eventId}/ismylike`, setData, setLoading, setLiked, setLoginfo)

  const handleLike = () => {
    applyLike(loginfo, liked, `/api/event/${params.eventId}/like`, setLiked)
  }

  return (
    <>
      <SubHeader name={data ? typeString[data.type as string] : ''} />
      <div className='flex flex-col w-full'>
        {isLoading
          ? <LoadingSkeleton type='DTLE' />
          : Object.keys(data).length > 0
            ? <Detail opt='EVT' data={data} eventId={params.eventId} liked={liked} handleLike={handleLike} /> : <></>
        }
      </div>
    </>
  )
}
export default index;