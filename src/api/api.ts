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

export function add_contact(first_name: string, last_name: string, contact_role: string, created_by: string, email: string): Promise<Response> {
  const response =  API.post('hpdAPI', '/add_contact', {
    'responseType': 'json',
    'body': {
      first_name: first_name,
      last_name: last_name,
      contact_role: contact_role,
      created_by: created_by,
      email: email
    }
 })

 return response
}
