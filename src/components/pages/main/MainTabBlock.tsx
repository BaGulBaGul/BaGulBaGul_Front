import { SkeletonList, LoadingCircle, MoreButton, NoData, WriteFab, Divider, ListProps, TabBlockProps } from "@/components/common"
import { EventBlock } from "./EventBlock"
import { handleMore } from "@/hooks/useInCommon"

export const MainTabBlock = (props: TabBlockProps) => {
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
                  <EventBlock data={item} />
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