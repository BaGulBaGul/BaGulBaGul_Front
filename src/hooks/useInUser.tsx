import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { fetchFromURLWithPage, fetchFromURL, mutateForURL } from '@/service/ApiService';
import { useRouter } from 'next/navigation';

export const useUserInfo = (userId: number) => {
  return useQuery({
    queryKey: ['user', userId], queryFn: () => fetchFromURL(`/api/user/info/${userId}`, false)
  })
}

export const useSignout = () => {
  const queryClient = useQueryClient()
  const router = useRouter();
  return useMutation({
    mutationFn: () => mutateForURL(`/api/user/logout`, 'GET'),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['login-user'] })
      router.replace('/signin')
    },
    onError: () => alert('로그아웃을 실패했습니다. 다시 시도해주세요.')
  })
}