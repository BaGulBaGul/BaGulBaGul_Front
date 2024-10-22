import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFromURLWithPage, mutateForURL } from '@/service/ApiService';

export const useDeleteAlarm = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (alarmId: number) => mutateForURL(`/api/user/alarm/${alarmId}`, 'DELETE'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alarms'] }),
    onError: () => alert('알림 삭제를 실패했습니다. 다시 시도해주세요.')
  })
}