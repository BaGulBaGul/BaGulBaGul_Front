import { LoadingSkeleton, LoadingCircle, MoreButton, NoEvent, Divider, ListProps, TabBlockProps } from "@/components/common"
import { EventBlock } from "./EventBlock"
import { WriteFab } from "@/components/common/WriteFab"

export const MainTabBlock = (props: TabBlockProps) => {
  // if (props.isLoading && props.page.current === 0) { return <LoadingSkeleton /> }
  // else if (props.isLoading && props.page.current > 0) { return <LoadingCircle /> }
  if (props.status === 'success') {
    return (
      <div className='bg-p-white'>
        {!!props.events && !props.events.pages[0].empty
          ? <>
            {props.events.pages.map((event) => (
              event.content.map((item: ListProps, idx: any) => (
                <div key={`event-${idx}`}>
                  {idx === 0 ? <></> : <Divider />}
                  <EventBlock data={item} />
                </div>
              ))
            ))}
            {props.hasNextPage ? <MoreButton onClick={props.handleMore} /> : <></>}
          </>
          : <NoEvent text1="찾는 행사가 없어요." text2="지금 인기 있는 페스티벌을 만나보세요." buttonText={"페스티벌 인기순 보러가기"} />
        }
        {props.opt !== 1 ? <></> : <WriteFab opt='p' />}
      </div>
    )
  }
}