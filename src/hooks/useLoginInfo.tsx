import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../api-config";
import Cookies from 'js-cookie'

const fetchLoginInfo = async () => {
  const data = await fetch(`${API_BASE_URL}/api/user/info/my`, { credentials: 'include', })
  if (data.ok) { return data.json(); }
  else { return null }
}
export default function useLoginInfo() {
  if (Cookies.get('Access_Token')) {
    const { data, isLoading, isPending, isError } = useQuery({ queryKey: ['loginData'], queryFn: fetchLoginInfo })
    if (!isError && !isPending && !!data) { return data.data; }
  }
  return null;
}