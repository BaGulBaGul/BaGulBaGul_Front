import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../api-config";

const fetchLoginInfo = async () => {
  const data = await fetch(`${API_BASE_URL}/api/user/info/my`, {credentials: 'include',})
  return data.json();
}
export default function useLoginInfo() {
  const { data, isLoading, isPending, isError } = useQuery({
    queryKey: ['loginData'], queryFn: fetchLoginInfo })
  if (!isError && !isPending && !!data) { return data.data; }
  else { return null; }
}