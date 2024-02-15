import axios from "axios";
import { API_BASE_URL } from "../api-config";

// export async function call(api:string, method:string, request?:any) {
//   interface Options { url: string; method: string; body?: string; }
//   let options: Options = {
//     url: API_BASE_URL + api,
//     method: method
//   };

//   if (request) { options.body = request; }

//   return axios(options.url, options).then(async (response) => {
//     console.log(`&&& ${response.status}`)
//     if (response.status === 200) {
//       return response.data;
//     }
//     return response.status;
//   })
// }

export async function call(api:string, method:string, request?:any) {
  interface Options { headers: Headers; url: string; method: string; body?: string; credentials: RequestCredentials}
  let options: Options = {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    url: API_BASE_URL + api,
    method: method,
    credentials: 'include',
  };

  if (request) {
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options).then(async (response) => {
    console.log(`&&& ${response.status}`)
    if (response.status === 200) {
      return response.json();
    }
    return response.text().then(text => { throw new Error(text) })
  })
}