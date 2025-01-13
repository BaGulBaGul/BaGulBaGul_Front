import { typeString } from '@/service/Functions';
import SubHeader from '@/components/layout/subHeader';
import { Detail } from '@/components/pages/detail';
import useLoginInfo from '@/hooks/useLoginInfo';
import { useAddLike, useAddSave, useDetailInfo, useDetailLike, useDetailSave } from '@/hooks/useInDetail';
import { SkeletonDetail } from '@/components/common';

export function DetailPage(props: { origin: 'event' | 'event/recruitment'; postId: any; }) {
  const userinfo = useLoginInfo().data

  const { data: data, isLoading: isLoadingD, isError: isErrorD } = useDetailInfo(props.origin, props.postId)
  const { data: liked } = useDetailLike(props.origin, props.postId, userinfo)
  const { data: saved } = useDetailSave(props.origin, props.postId, userinfo)

  const mutateLike = useAddLike(props.origin, props.postId, liked)
  const handleLike = () => { if (!!userinfo) { mutateLike.mutate() } }
  const mutateSave = useAddSave(props.origin, props.postId, saved)
  const handleCalendar = () => { if (!!userinfo) { mutateSave.mutate() } }

  if (isLoadingD) { return (<SkeletonDetail map={props.origin === 'event'} />) }
  return (
    <>{props.origin === 'event'
      ? <>
        <SubHeader name={data ? typeString[data.event.type as string] : ''} />
        {data && Object.keys(data).length > 0
          ? <Detail opt='EVT' data={data} liked={liked} likeCount={data.post.likeCount} handleLike={handleLike} saved={saved} handleCalendar={handleCalendar} /> : <></>
        }
      </>
      : <>
        <SubHeader name='모집글' />
        {data && Object.keys(data).length > 0
          ? <Detail opt='RCT' data={data} liked={liked} likeCount={data.post.likeCount} handleLike={handleLike} saved={saved} handleCalendar={handleCalendar} /> : <></>
        }
      </>
    }</>
  );
}