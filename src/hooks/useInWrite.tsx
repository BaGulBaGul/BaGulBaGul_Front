import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { fetchFromURLWithPage, fetchFromURL, mutateForURL, mutateForURLJson } from '@/service/ApiService';
import { useRouter } from 'next/navigation';

export const useWrite = (origin: 'event' | 'recruitment', edit?: number) => {
  const router = useRouter();
  return useMutation({
    mutationFn: (props: { apiURL: string, body: Object }) => {
      if (!!edit) { return mutateForURLJson(`${props.apiURL}/${edit}`, 'PATCH', props.body) }
      return mutateForURLJson(props.apiURL, 'POST', props.body)
    },
    onSuccess: data => {
      if (data.errorCode === 'C00000') {
        alert('성공적으로 게시되었습니다.')
        router.replace(!!edit ? `/${origin}/${edit}` : origin === 'event' ? `/event/${data.data.eventId}` : `/recruitment/${data.data.recruitmentId}`)
      }
      else { alert('게시를 실패했습니다. 다시 시도해주세요.') }
    },
    onError: () => alert('게시를 실패했습니다. 다시 시도해주세요.')
  })
}

// export const useUploadImage = (tmpImages: string[], tmpKeys: number[]) => {
//   return useMutation({
//     mutationFn: (formData: FormData) => { return mutateForURL(`/api/upload/image`, 'POST', formData, 'file') },
//     onSuccess: data => {
//       if (data.errorCode === 'C00000') {
//         tmpImages.push(data.data.url);
//         tmpKeys.push(data.data.resourceId);
//       }
//     }
//     onError: () => alert('이미지 업로드를 실패했습니다. 다시 시도해주세요.')
//   })
// }