import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { fetchFromURLWithPage, fetchFromURL, mutateForURL } from '@/service/ApiService';

export const useUserInfo = (userId: number) => {
  return useQuery({ 
    queryKey: ['user', userId], queryFn: () => fetchFromURL(`/api/user/info/${userId}`, false) })
}