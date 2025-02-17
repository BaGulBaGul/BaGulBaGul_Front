import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { fetchFromURLWithPage, fetchFromURL, mutateForURL, mutateForURLJson } from '@/service/ApiService';
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

export const useEditProfile = () => {
  const queryClient = useQueryClient()
  const router = useRouter();
  return useMutation({
    mutationFn: (body: Object) => { return mutateForURLJson(`/api/user/info/my`, 'PATCH', body) },
    onSuccess: data => {
      if (data.errorCode === 'C00000') {
        alert('회원정보가 수정되었습니다.')
        queryClient.refetchQueries({ queryKey: ['login-user'] })
        router.back()
      }
      else { alert('회원정보 수정을 실패했습니다. 다시 시도해주세요.') }
    },
    onError: () => alert('회원정보 수정을 실패했습니다. 다시 시도해주세요.')
  })
}