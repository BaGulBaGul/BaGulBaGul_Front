import { typeString } from '@/service/Functions';
import { LoadingSkeleton } from '@/components/common';
import SubHeader from '@/components/layout/subHeader';
import { Detail } from '@/components/pages/detail';
import useLoginInfo from '@/hooks/useLoginInfo';
import { useAddLike, useAddSave, useDetailInfo, useDetailLike, useDetailSave } from '@/hooks/useInDetail';

export function DetailPage(props: { origin: 'event' | 'event/recruitment'; postId: any; }) {
  const userinfo = useLoginInfo()

  const { data: data, isLoading: isLoadingD, isError: isErrorD } = useDetailInfo(props.origin, props.postId)
  const { data: liked, isLoading: isLoadingL, isError: isErrorL } = useDetailLike(props.origin, props.postId, userinfo)
  const { data: saved, isLoading: isLoadingS, isError: isErrorS } = useDetailSave(props.origin, props.postId, userinfo)

  const mutateLike = useAddLike(props.origin, props.postId, liked)
  const handleLike = () => { if (!!userinfo) { mutateLike.mutate() } }
  const mutateSave = useAddSave(props.origin, props.postId, saved)
  const handleCalendar = () => { if (!!userinfo) { mutateSave.mutate() } }

  if (isLoadingD) {
    return (<>{props.origin === 'event' ? <LoadingSkeleton type={'DTLE'} /> : <LoadingSkeleton type={'DTLR'} />}</>)
  }
  // if (isErrorD) {}
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