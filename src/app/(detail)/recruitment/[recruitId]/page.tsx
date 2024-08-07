'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useEffectDetail, applyLike } from '@/service/Functions';
import { LoadingSkeleton } from '@/components/common';
import SubHeader from '@/components/layout/subHeader';
import { Detail } from '@/components/pages/detail';

export default function Page() {
  const [isLoading, setLoading] = useState(true)
  const params = useParams()
  const [data, setData] = useState<any>({})
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState<number>()
  // * 임시 로그인여부 파악용
  const [loginfo, setLoginfo] = useState(false)

  useEffectDetail(`/api/event/recruitment/${params.recruitId}`, `/api/event/recruitment/${params.recruitId}/ismylike`, setData, setLoading, setLiked, setLikeCount, setLoginfo)

  const handleLike = () => {
    applyLike(loginfo, liked, `/api/event/recruitment/${params.recruitId}/like`, setLiked, setLikeCount)
  }

  return (
    <>
      <SubHeader name='모집글' />
      <div className='flex flex-col w-full'>
        {isLoading
          ? <LoadingSkeleton type='DTLR' />
          : data && Object.keys(data).length > 0
            ? <Detail opt='RCT' data={data} liked={liked} likeCount={likeCount} handleLike={handleLike} /> : <></>
        }
      </div>
    </>
  );
}