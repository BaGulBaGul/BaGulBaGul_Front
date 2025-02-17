import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFromURL } from "@/service/ApiService";

export default function useLoginInfo() {
  const queryClient = useQueryClient()
  let loginData = queryClient.getQueryData(['login-user'])
  return useQuery({
    queryKey: ['login-user'],
    queryFn: () => fetchFromURL('/api/user/info/my', true),
    refetchInterval: false,
    // enabled: !loginData
  })
  // if (!!loginData) { return { isLoading: false, data: loginData } }
  // else {
  //   return useQuery({
  //     queryKey: ['login-user'],
  //     queryFn: () => fetchFromURL('/api/user/info/my', true),
  //     refetchInterval: false,
  //     // enabled: !loginData
  //   })
  // }
}