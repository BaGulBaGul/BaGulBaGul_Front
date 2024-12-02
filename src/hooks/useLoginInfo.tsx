import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFromURL } from "@/service/ApiService";

export default function useLoginInfo() {
  const queryClient = useQueryClient()
  let loginData = queryClient.getQueryData(['login-user'])
  return useQuery({
    queryKey: ['login-user'],
    queryFn: () => fetchFromURL('/api/user/info/my', true),
    // enabled: !loginData
  })
}