import { handleMore } from "@/hooks/useInCommon";
import { UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";
import { PropsWithChildren, ReactNode } from "react";
import { LoadingCircle, MoreButton } from ".";

interface ListProps extends PropsWithChildren { res: UseInfiniteQueryResult<InfiniteData<any, unknown>, Error>; }
export function ListWrapper({ res, skeleton, nodata, children }: ListProps & { skeleton: ReactNode; nodata: ReactNode; }) {
  if (res.isPending || res.isLoading) { return skeleton }
  else if (res.status !== 'success' || !res.data || res.data.pages[0].empty) { return nodata }
  return (<>
    {children}
    {res.hasNextPage && <MoreButton onClick={() => handleMore(res.hasNextPage, res.fetchNextPage)} />}
    {res.isFetchingNextPage && <LoadingCircle />}
  </>)
}