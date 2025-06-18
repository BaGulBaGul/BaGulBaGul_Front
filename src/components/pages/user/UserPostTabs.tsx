import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { handleMore } from '@/hooks/useInCommon';
import { ListProps, LoadingCircle, MoreButton, RListProps, SkeletonList } from '@/components/common';
import { NoData } from '@/components/common/block';
import { MyPostBlock, UserPostBlock } from '.';

export function UserPostTab(props: { me: boolean; posts: UseInfiniteQueryResult<InfiniteData<any, unknown>, Error>; opt: 'EVT' | 'RCT' }) {
  if (props.posts.isPending || props.posts.isLoading) { return (<SkeletonList type='POST' opt={props.opt} />) }
  return (
    <>{!!props.posts.data && !props.posts.data.pages[0].empty
      ? <div className='flex flex-col w-full'>
        {props.posts.data.pages.map((p) => (
          p.content.map((item: ListProps | RListProps, idx: number) => (
            props.me ? <MyPostBlock opt={props.opt} data={item} key={`like-${idx}`} /> : <UserPostBlock opt={props.opt} data={item} key={`like-${idx}`} />
          ))
        ))}
        {props.posts.hasNextPage ? <MoreButton onClick={() => handleMore(props.posts.hasNextPage, props.posts.fetchNextPage)} /> : <></>}
        {props.posts.isFetchingNextPage ? <LoadingCircle /> : <></>}
      </div>
      : <>{props.me ?
        props.opt === 'EVT'
          ? <NoData text1="아직 작성된 게시물이 없어요." text2='나만의 파티를 만들어보세요!' buttonText='파티글 작성하기' buttonLink='/write?w=p' />
          : <NoData text1="아직 작성된 게시물이 없어요." text2='바글바글의 인기 게시물을 구경해보세요!' buttonText='페스티벌 인기순 보러가기' buttonLink='/?sort=likeCount%2Cdesc' />
        : props.opt === 'EVT'
          ? <NoData text1="아직 유저의 게시물이 없어요." text2='바글바글의 인기 게시물을 구경해보세요!' buttonText='파티글 인기순 보러가기' buttonLink='/?sort=likeCount%2Cdesc&tab_id=2' />
          : <NoData text1="아직 유저의 게시물이 없어요." text2='바글바글의 인기 게시물을 구경해보세요!' buttonText='페스티벌 인기순 보러가기' buttonLink='/?sort=likeCount%2Cdesc' />
      }</>
    }
    </>
  )
}