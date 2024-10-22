import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { fetchFromURLWithPage, mutateForURL } from '@/service/ApiService';

export const originText = (origin: 'event' | 'event/recruitment') => { return origin === 'event' ? 'event' : 'recruitment' }

export const handleMore = (hasNextPage:boolean, fetchNextPage: any) => { if (hasNextPage) { fetchNextPage() } }

export const useDelete = (url: string, qKey: any, msg: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => mutateForURL(url, 'DELETE'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: qKey }),
    onError: () => alert(`${msg} 삭제를 실패했습니다. 다시 시도해주세요.`)
  })
}

export const useListWithPage = (url: string, qKey: any) => {
  return useInfiniteQuery({
    queryKey: qKey,
    queryFn: (pageParam) => fetchFromURLWithPage(url, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPageParam >= lastPage.totalPages - 1) { return undefined }
      return lastPageParam + 1
    }
  })
}

export const useListWithPageE = (url: string, qKey: any, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: qKey,
    queryFn: (pageParam) => fetchFromURLWithPage(url, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPageParam >= lastPage.totalPages - 1) { return undefined }
      return lastPageParam + 1
    }, enabled: enabled,
  })
}