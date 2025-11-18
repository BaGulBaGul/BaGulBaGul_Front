'use client';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { fetchFromURLWithPage, fetchFromURL, mutateForURL, mutateForURLJson } from '@/service/ApiService';

export const useAddOrganizer = (closeDialog: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: Object) => { return mutateForURLJson(`/api/admin/user/amehuser/`, 'POST', body) },
    onSuccess: data => {
      if (data.errorCode === 'C00000') {
        alert('주최자가 추가되었습니다.')
        queryClient.refetchQueries({ queryKey: ['organizers'] })
        closeDialog()
      }
      else { alert('주최자 추가를 실패했습니다. 다시 시도해주세요.') }
    },
    onError: () => alert('주최자 추가를 실패했습니다. 다시 시도해주세요.')
  })
}