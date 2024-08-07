import { API_BASE_URL } from "../api-config";

interface Options { headers: Headers; url: string; method: string; body?: string; credentials: RequestCredentials }
export async function call(api: string, method: string, request?: any, cookie?: string) {
  let options: Options = {
    headers: cookie === undefined ? new Headers({ "Content-Type": "application/json", })
      : new Headers({ "Content-Type": "application/json", "Cookie": `Access_Token=${cookie}` }),
    url: API_BASE_URL + api, method: method,
    credentials: 'include',
  };

  if (request) {
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options).then(async (response) => {
    if (response.status === 200) {
      return response.json();
    }
    return response.text().then(text => { throw new Error(text) })
  })
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