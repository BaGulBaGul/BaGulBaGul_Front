import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFromURL, mutateForURL, mutateForURLJson } from '@/service/ApiService';
import { originText } from './useInCommon';
import { useRouter } from 'next/navigation';

export const useDetailInfo = (origin: 'event' | 'event/recruitment', postId: any) => {
  return useQuery({
    queryKey: [originText(origin), postId, 'data'],
    queryFn: () => fetchFromURL(`/api/${origin}/${postId}`, false)
  })
}

export const useDetailLike = (origin: 'event' | 'event/recruitment', postId: any, userinfo: any) => {
  return useQuery({
    queryKey: [originText(origin), postId, 'liked'],
    queryFn: () => fetchFromURL(`/api/${origin}/${postId}/ismylike`, true),
    select: data => data.myLike, enabled: !!userinfo
  })
}

export const useDetailSave = (origin: 'event' | 'event/recruitment', postId: any, userinfo: any) => {
  return useQuery({
    queryKey: [originText(origin), postId, 'saved'],
    queryFn: () => fetchFromURL(`/api/user/calendar/${originText(origin)}/${postId}/exists`, true),
    select: data => data.exists, enabled: !!userinfo
  })
}

export const useAddLike = (origin: 'event' | 'event/recruitment', postId: any, liked: boolean) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => mutateForURL(`/api/${origin}/${postId}/like`, liked ? 'DELETE' : 'POST'),
    onSuccess: data => {
      queryClient.setQueryData([originText(origin), postId, 'liked'], (old: any) => { return { myLike: !old.myLike } })
      queryClient.setQueryData([originText(origin), postId, 'data'],
        (old: any) => { return { ...old, post: { ...old.post, likeCount: data.likeCount } } })
    }
  })
}

export const useAddSave = (origin: 'event' | 'event/recruitment', postId: any, saved: boolean) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => mutateForURL(`/api/user/calendar/${originText(origin)}/${postId}`, saved ? 'DELETE' : 'POST'),
    onSuccess: () => {
      queryClient.setQueryData([originText(origin), postId, 'saved'], (old: any) => { return { exists: !old.exists } })
    }
  })
}

export const useDeletePost = (origin: 'event' | 'event/recruitment', postId: number) => {
  const router = useRouter();
  return useMutation({
    mutationFn: () => { return mutateForURLJson(`/api/${origin}/${postId}`, 'DELETE') },
    onSuccess: data => {
      if (data.errorCode === 'C00000') {
        alert('성공적으로 삭제되었습니다.')
        router.back()
      } else {alert('삭제하지 못했습니다. 다시 시도해주세요.')}
    }
  })
}