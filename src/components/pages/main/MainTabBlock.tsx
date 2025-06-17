import { handleMore } from "@/hooks/useInCommon"
import { SkeletonList, LoadingCircle, MoreButton, WriteFab, Divider, ListProps, TabBlockProps } from "@/components/common"
import { BlockBodyAD, BlockContainer, BlockWrapper, NoData } from "@/components/common/block"
import { detailDataP } from "@/components/common/Data"

export const MainTabBlock = (props: TabBlockProps) => {
  const data = detailDataP
  if (props.events.isPending || props.events.isLoading) { return <SkeletonList thumb={true} tag={true} /> }
  else if (props.events.status === 'success') {
    return (
      <div className='bg-p-white'>
        {!!props.events && !props.events.data.pages[0].empty
          ? <>
            {props.events.data.pages.map((event) => (
              event.content.map((item: ListProps, idx: any) => (
                <div key={`event-${idx}`}>
                  {idx === 0 ? <></> : <Divider />}
                  <BlockContainer tags={item.post.tags}>
                    <BlockWrapper url={`/event/${item.event.eventId}`} wrapStyle='p-[16px] pb-[10px]'
                      blockThumb={<img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={item.post.headImageUrl ?? '/default_list_thumb3x.png'} />}>
                      <BlockBodyAD title={item.post.title} startDate={item.event.startDate} endDate={item.event.endDate} address={item.event.abstractLocation}
                        writer={item.post.writer} head={item.event.type === 'PARTY' ? { current: item.event.currentHeadCount, max: item.event.maxHeadCount } : undefined} />
                    </BlockWrapper>
                  </BlockContainer>
                </div>
              ))
            ))}
            {props.events.hasNextPage ? <MoreButton onClick={() => handleMore(props.events.hasNextPage, props.events.fetchNextPage)} /> : <></>}
            {props.events.isFetchingNextPage ? <LoadingCircle /> : <></>}
          </>
          : <NoData text1="찾는 행사가 없어요." text2="지금 인기 있는 페스티벌을 만나보세요." buttonText="페스티벌 인기순 보러가기" buttonLink="/?sort=likeCount%2Cdesc" />
        }
        {props.opt !== 1 ? <></> : <WriteFab opt='p' />}
      </div>
    )
  }
}