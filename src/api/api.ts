import { API } from "aws-amplify";

export type Response = {
  message: string
}

export function get_contacts(): Promise<Response> {
  const response =  API.post('hpdAPI', '/get_contacts', {
    'responseType': 'json',
 })

 return response
}