import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../api-config";

const fetchLoginInfo = async () => {
  const data = await fetch(`${API_BASE_URL}/api/user/info/my`, { credentials: 'include', })
  if (data.ok) { return data.json(); }
  else { return null }
}
export default function useLoginInfo() {
  const queryClient = useQueryClient()
  let loginData = queryClient.getQueryData(['login-user'])
  if (!!loginData) { console.log('1) cache : ', loginData); return loginData }
  else {
    console.log('login-user()')
    const { data, isLoading, isPending, isError } = useQuery({ queryKey: ['login-user'], queryFn: fetchLoginInfo })
    if (!isError && !isPending && !!data) { console.log('2) new data : ', data.data); return data.data; }
  }
  return null;
}