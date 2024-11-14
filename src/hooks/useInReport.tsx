import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFromURLWithPage, mutateForURL } from '@/service/ApiService';

export const useReport = (type: 'comment' | 'comment-child' | 'event' | 'recruitment', setValue: any, setOpen: any) => {
  return useMutation({
    mutationFn: (body: Object) => {
      console.log('-> ', body)
      return mutateForURL(`/api/report/${type}`, 'POST', body)
    },

    onSuccess: () => {
      alert('제출되었습니다.')
      setValue(undefined);
      setOpen(false);
    },
    onError: () => alert('알림 삭제를 실패했습니다. 다시 시도해주세요.')
  })
}