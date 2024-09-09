import { TabBlockProps, LoadingSkeleton, LoadingCircle, MoreButton, NoEvent, Divider } from "@/components/common"
import { setPageInfo } from "@/service/Functions"
import { EventBlock } from "./EventBlock"
import { WriteFab } from "@/components/common/WriteFab"

export const MainTabBlock = (props: TabBlockProps) => {
  const handleMore = () => { setPageInfo(props.page, props.setPage, props.page.current + 1, props.params, props.setParams) }
  if (props.isLoading && props.page.current === 0) { return <LoadingSkeleton /> }
  else if (props.isLoading && props.page.current > 0) { return <LoadingCircle /> }
  else {
    return (
      <div className='bg-p-white'>
        {props.events.length > 0
          ? <>
            {props.events.map((post, idx) => (
              <div key={`event-${idx}`}>
                {idx === 0 ? <></> : <Divider />}
                <EventBlock data={post} router={props.router} />
              </div>
            ))}
            {props.page.total > 1 && props.page.current + 1 < props.page.total
              ? <MoreButton onClick={handleMore} /> : <></>
            }
          </>
          : <NoEvent text1="찾는 행사가 없어요." text2="지금 인기 있는 페스티벌을 만나보세요." buttonText={"페스티벌 인기순 보러가기"} />
        }
        {props.opt !== 1 ? <></> : <WriteFab opt='p' />}
      </div>
    )
  }
}