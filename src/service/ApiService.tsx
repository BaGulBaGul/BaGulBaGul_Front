import axios from "axios";
import { API_BASE_URL } from "../api-config";

export async function call(api:string, method:string, request?:any) {
  interface Options { url: string; method: string; body?: string; }
  let options: Options = {
    url: API_BASE_URL + api,
    method: method
  };

  if (request) { options.body = request; }

  return axios(options.url, options).then(async (response) => {
    console.log(`&&& ${response.status}`)
    if (response.status === 200) {
      return response.data;
    }
    return response.status;
  })
}