import { call } from "@/service/ApiService";
import { useQuery } from "@tanstack/react-query";

export default function useLoginInfo() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['loginData'],
    queryFn: () => call('/api/user/info/my', "GET", null),
  })

  if (!isError && !isPending && !!data) { return data.data; }
  else { return null; }
}