import { Tab, Tabs, ThemeProvider } from '@mui/material';
import { ListProps, LoadingSkeleton, MoreButton, RListProps } from '@/components/common';
import { tabTheme } from '@/components/common/styles/Themes';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { MyPostBlock, UserPostBlock } from '.';

export function UserPostTabs(props: {value:0|1; handleChange: any}) {
  return (
    <div className='fixed top-[60px] w-full bg-p-white z-10'>
      <ThemeProvider theme={tabTheme}>
        <Tabs value={props.value} onChange={props.handleChange} className='items-center min-h-0 px-[16px] py-[10px]'>
          <Tab label="파티" />
          <Tab label="모집글" />
        </Tabs>
      </ThemeProvider>
    </div>
  )
}

export function UserPostTab(props: { me: boolean; posts: UseInfiniteQueryResult<InfiniteData<any, unknown>, Error>, opt: 'EVT' | 'RCT' }) {
  let posts = props.posts
  const handleMore = () => { if (posts.hasNextPage) { posts.fetchNextPage() } }
  if (posts.isLoading) { return (<LoadingSkeleton type='EVT' />) }
  return (
    <>{!!posts.data && !posts.data.pages[0].empty
      ? <div className='flex flex-col w-full'>
        {posts.data.pages.map((p) => (
          p.content.map((item: ListProps | RListProps, idx: number) => (
            props.me ? <MyPostBlock opt={props.opt} data={item} key={`like-${idx}`} /> : <UserPostBlock opt={props.opt} data={item} key={`like-${idx}`} />
          ))
        ))}
        {posts.hasNextPage ? <MoreButton onClick={handleMore} /> : <></>}
      </div>
      : <></>
    }</>
  )
}