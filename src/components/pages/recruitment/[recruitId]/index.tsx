'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useEffectDetail, applyLike } from '@/service/Functions';
import { LoadingSkeleton, Detail } from '@/components/common';

const index = () => {
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

  if (isLoading) { return <LoadingSkeleton type='DTLR' /> }
  if (Object.keys(data).length > 0) { return <Detail opt='RCT' data={data} liked={liked} likeCount={likeCount} handleLike={handleLike} /> }
}
export default index;