import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFromURLWithPage, mutateForURLJson } from '@/service/ApiService';

export const useReport = (type: 'comment' | 'comment-child' | 'event' | 'recruitment', updateValue: (newValue: any) => void, closeDialog: () => void, openAlert: () => void) => {
  return useMutation({
    mutationFn: (body: Object) => { return mutateForURLJson(`/api/report/${type}`, 'POST', body) },
    onSuccess: data => {
      if (data.errorCode === 'C00000') {
        alert('제출되었습니다.')
        updateValue(undefined);
        closeDialog();
      } else if (data.errorCode === 'C10000') {
        alert(`${data.message} 다시 시도해주세요.`)
      } else if (data.errorCode === 'RPT00000') {
        updateValue(undefined);
        closeDialog();
        openAlert();
      }
    },
    onError: () => alert('신고 제출을 실패했습니다. 다시 시도해주세요.')
  })
}