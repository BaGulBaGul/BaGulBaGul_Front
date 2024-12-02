import { API_BASE_URL } from "../api-config";

interface Options { headers?: Headers; url: string; method: string; body?: any; credentials: RequestCredentials }
export async function call(api: string, method: string, request?: any, headers?: 'file') {
  let options: Options = {
    headers: new Headers({ "Content-Type": "application/json", }),
    url: API_BASE_URL + api, method: method,
    credentials: 'include',
  };
  if (!!request) {
    if (headers === 'file') { options.body = request }
    else { options.body = JSON.stringify(request); }
  }
  if (headers === 'file' && !!options.headers) { options.headers.delete('Content-Type') }

  return await fetch(options.url, options).then(async (response) => {
    if (response.status === 200) { return response.json(); }
    return response.text().then(text => { throw new Error(text) })
  })
}

export const fetchFromURLWithPage = async (apiURL: string, { pageParam }: any) => {
  console.log('fetchFromURLWithPage-  ', apiURL)
  console.log('apiURL: ', apiURL);
  console.log('pageParam: ', pageParam);
  const data = await fetch(`${API_BASE_URL}${apiURL}&page=${pageParam}`, { credentials: 'include' })
  const json = await data.json();
  console.log(json.data)
  return json.data;
}
export const fetchFromURL = async (apiURL: string, cred: boolean, throwIfNull?: boolean) => {
  console.log('fetchFromURL-  ', apiURL)
  const data = cred ? await fetch(`${API_BASE_URL}${apiURL}`, { credentials: 'include' }) : await fetch(`${API_BASE_URL}${apiURL}`)
  const json = await data.json();
  if (!!throwIfNull && json.data === null) { throw new Error }
  return json.data;
}
export const mutateForURL = async (apiURL: string, method: string, body?: any) => {
  let options: Options = { url: `${API_BASE_URL}${apiURL}`, headers: new Headers({ "Content-Type": "application/json", }), method: method, credentials: 'include' }
  if (body) { options.body = JSON.stringify(body); }
  const data = await fetch(options.url, options)
  const json = await data.json()
  console.log(json)
  return json.data;
}

export const mutateForURLJson = async (apiURL: string, method: string, body?: any) => {
  let options: Options = { url: `${API_BASE_URL}${apiURL}`, headers: new Headers({ "Content-Type": "application/json", }), method: method, credentials: 'include' }
  if (body) { options.body = JSON.stringify(body); }
  const data = await fetch(options.url, options)
  const json = await data.json()
  return json;
}

export async function isSigned(cookies?: any) {
  try {
    const res = await fetch(
      API_BASE_URL + "/api/user/info/my", {
      headers: new Headers({ "Content-Type": "application/json", "Cookie": `Access_Token=${cookies}` }),
      method: "GET", credentials: 'include',
    });
    const json = await res.json();
    console.log('json ', json.errorCode);
    return json.errorCode;
  } catch (error) {
    console.log("catch error", error);
    return error;
  }
}