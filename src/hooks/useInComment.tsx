import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mutateForURL } from '@/service/ApiService';
import { Dispatch, RefObject, SetStateAction } from 'react';

export const useModify = (url: string, qKey: any, mdfRef: React.RefObject<HTMLInputElement>, setTarget: any, setOpenM: any) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => mutateForURL(url, 'PATCH', { 'content': mdfRef.current!.value }),
    onSuccess: () => {
      setTarget(undefined);
      setOpenM(false);
      queryClient.invalidateQueries({ queryKey: qKey })
    }
  })
}

export const useModifyR = (url: string, qKey: any, mdfRef: React.RefObject<HTMLDivElement>, setTarget: any, setOpenM: any) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (replying: boolean) => mutateForURL(url, 'PATCH', { "content": mdfRef.current!.innerText, "replyTargetUserId": replying ? null : 0 }),
    onSuccess: () => {
      setTarget(undefined);
      setOpenM(false);
      queryClient.invalidateQueries({ queryKey: qKey })
    }
  })
}

export const useDeleteComment = (url: string, qKey: any) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => mutateForURL(url, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qKey })
    }
  })
}

export const useNewComment = (url: string, qKey: any, cmtRef: RefObject<HTMLInputElement>) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => mutateForURL(url, 'POST', { 'content': cmtRef.current!.value }),
    onSuccess: () => {
      if (cmtRef.current) { cmtRef.current.value = '' }
      queryClient.invalidateQueries({ queryKey: qKey })
    }
  })
}

export const useNewReply = (url: string, qKey: any, replyRef?: any, mentionRef?: any, target?: any, setMentioning?: Dispatch<SetStateAction<boolean>>) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => {
      if (mentionRef.current && target) {
        console.log('mention: ', mentionRef.current.innerText, target.id)
        return mutateForURL(url, 'POST', { "content": mentionRef.current.innerText, "replyTargetPostCommentChildId": target.id })
      } else {
        console.log('reply: ', replyRef.current.value)
        return mutateForURL(url, 'POST', { "content": replyRef.current.value })
      }
    },
    onSuccess: () => {
      if (mentionRef.current) { mentionRef.current.innerText = '' }
      if (replyRef.current) { replyRef.current.value = '' }
      if (!!setMentioning) { setMentioning(false) }
      queryClient.invalidateQueries({ queryKey: qKey })
    }
  })
}