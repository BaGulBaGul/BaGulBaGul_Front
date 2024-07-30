import { API_BASE_URL } from "../api-config";

export async function call(api: string, method: string, request?: any, cookie?: string) {
  interface Options { headers: Headers; url: string; method: string; body?: string; credentials: RequestCredentials }
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

// export async function isSigned(setProfileURL?: any) {
//   // const response = await call('/api/user/info', "GET", null)

//   // response.try(

//   // )
//   // catch(() => { console.log('** isSigned: ', response.errorCode) })

//   // if (response.errorCode === 'C00000') {
//   //   console.log('isSigned: C00000 : ', response.data)
//   // } else {
//   //   console.log('isSigned: ', response.errorCode)
//   // }
//   call('/api/user/info', "GET", null)
//     .then((response) => {
//       if (response.errorCode === 'C00000') {
//         console.log('** isSigned: ', response.data)
//         if (setProfileURL) {
//           setProfileURL(response.data.imageURI)
//         }
//       }
//     }).catch((error) => { return null });
// }