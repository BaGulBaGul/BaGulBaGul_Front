import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { fetchFromURLWithPage, fetchFromURL, mutateForURL } from '@/service/ApiService';

export const useUserInfo = (userId: number) => {
  return useQuery({ 
    queryKey: ['user', userId], queryFn: () => fetchFromURL(`/api/user/info/${userId}`, false) })
}

export const useUserPosts = (url: string, qKey: any, enabled: boolean ) => {
  return useInfiniteQuery({
    queryKey: qKey,
    queryFn: (pageParam) => fetchFromURLWithPage(url, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPageParam >= lastPage.totalPages - 1) { return undefined }
      return lastPageParam + 1
    }, enabled: enabled
  })
}

export const useDeletePost = (url: string, qKey: any) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => mutateForURL(url, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qKey })
    }
  })
}