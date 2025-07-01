import { useListWithPageE } from "@/hooks/useInCommon";
import { Divider, ListProps, ListWrapper, RListProps, SkeletonList } from "@/components/common";
import { BlockBodyAD, BlockBodyN, BlockWrapper, NoData } from "@/components/common/block";

export function UserPostList({ value, me, userinfo }: { value: 0 | 1, me: boolean, userinfo: any }) {
  const qKey = me ? ['my-posts', value] : ['user', userinfo?.id, value]
  const apiURL = `/api/event${value === 0 ? '?type=PARTY' : '/recruitment?'}&size=10&sort=createdAt,desc&username=${userinfo?.nickname}`
  console.log(userinfo)
  const posts = useListWithPageE(apiURL, qKey, !!userinfo && !!userinfo.nickname)

  const NoDataBlock = () => (
    <>{me ?
      value === 0
        ? <NoData text1="아직 작성된 게시물이 없어요." text2='나만의 파티를 만들어보세요!' buttonText='파티글 작성하기' buttonLink='/write?w=p' />
        : <NoData text1="아직 작성된 게시물이 없어요." text2='바글바글의 인기 게시물을 구경해보세요!' buttonText='페스티벌 인기순 보러가기' buttonLink='/?sort=likeCount%2Cdesc' />
      : value === 1
        ? <NoData text1="아직 유저의 게시물이 없어요." text2='바글바글의 인기 게시물을 구경해보세요!' buttonText='파티글 인기순 보러가기' buttonLink='/?sort=likeCount%2Cdesc&tab_id=2' />
        : <NoData text1="아직 유저의 게시물이 없어요." text2='바글바글의 인기 게시물을 구경해보세요!' buttonText='페스티벌 인기순 보러가기' buttonLink='/?sort=likeCount%2Cdesc' />
    }</>
  )

  return (
    <ListWrapper res={posts} skeleton={<SkeletonList type='POST' opt={value === 0 ? 'EVT' : 'RCT'} />}
      nodata={<NoDataBlock />}>
      <div className='bg-p-white'>
        {posts.data?.pages.map((post) => (
          post.content.map((item: ListProps | RListProps, idx: number) => (
            <div key={`post-${idx}`}>
              {idx === 0 ? <></> : <Divider />}
              {value === 0
                ? <UserPostBlockE item={item as ListProps} />
                : <UserPostBlockR item={item as RListProps} />
              }
            </div>
          ))
        ))}
      </div>
    </ListWrapper>
  )
}

function UserPostBlockE({ item }: { item: ListProps }) {
  return (
    <BlockWrapper url={`/event/${item.event.eventId}`} wrapStyle='p-[16px]'
      blockThumb={<img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={item.post.headImageUrl ?? '/default_list_thumb3x.png'} />}>
      <BlockBodyAD title={item.post.title} startDate={item.event.startDate} endDate={item.event.endDate} address={item.event.abstractLocation}
        head={item.event.type === 'PARTY' ? { current: item.event.currentHeadCount, max: item.event.maxHeadCount } : undefined} />
    </BlockWrapper>
  )
}

function UserPostBlockR({ item }: { item: RListProps }) {
  return (
    <BlockWrapper url={`/recruitment/${item.recruitment.recruitmentId}`} wrapStyle='p-[16px]'>
      <BlockBodyN title={item.post.title} startDate={item.recruitment.startDate} endDate={item.recruitment.endDate} name={'tmp name for event'} />
    </BlockWrapper>
  )
}