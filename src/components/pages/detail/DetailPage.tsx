'use client';
import { useState } from 'react';
import { call } from '@/service/ApiService';
import { useEffectDetail, applyLike, typeString } from '@/service/Functions';
import { LoadingSkeleton, DetailProps, RDetailProps } from '@/components/common';
import SubHeader from '@/components/layout/subHeader';
import { Detail } from '@/components/pages/detail';

export function DetailPage(props: { origin: 'event' | 'event/recruitment'; postId: any; }) {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<DetailProps | RDetailProps>()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState<number>()
  const [saved, setSaved] = useState(false)
  // * 임시 로그인여부 파악용
  const [loginfo, setLoginfo] = useState(false)

  useEffectDetail(props.origin, props.postId, setData, setLoading, setLiked, setLikeCount, setLoginfo, setSaved)

  const handleLike = () => {
    applyLike(loginfo, liked, `/api/${props.origin}/${props.postId}/like`, setLiked, setLikeCount)
  }
  const handleCalendar = () => {
    if (loginfo) {
      let urlRoot = props.origin === 'event' ? 'event' : 'recruitment'
      if (!saved) {
        call(`/api/user/calendar/${urlRoot}/${props.postId}`, "POST", null)
          .then((response) => {
            if (response.errorCode === 'C00000') {
              setSaved(true)
              console.log('캘린더에 추가됨')
            }
          }).catch((error) => console.error(error));
      } else {
        call(`/api/user/calendar/${urlRoot}/${props.postId}`, "DELETE", null)
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
    <>{
      props.origin === 'event'
        ? <>
          <SubHeader name={data ? typeString[(data as DetailProps).event.type as string] : ''} />
          <div className='flex flex-col w-full'>
            {isLoading ? <LoadingSkeleton type={'DTLE'} />
              : data && Object.keys(data).length > 0
                ? <Detail opt='EVT' data={data} liked={liked} likeCount={likeCount} handleLike={handleLike} saved={saved} handleCalendar={handleCalendar} /> : <></>
            }
          </div>
        </>
        : <>
          <SubHeader name='모집글' />
          <div className='flex flex-col w-full'>
            {isLoading ? <LoadingSkeleton type={'DTLR'} />
              : data && Object.keys(data).length > 0
                ? <Detail opt='RCT' data={data} liked={liked} likeCount={likeCount} handleLike={handleLike} saved={saved} handleCalendar={handleCalendar} /> : <></>
            }
          </div>
        </>
    }</>
  );
}