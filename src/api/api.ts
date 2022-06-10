import { API } from "aws-amplify"

export type Response = {
  message: string
}

/*
 * contact API
 */

export function get_contacts(): Promise<Response> {
  const response = API.post("hpdAPI", "/get_contacts", {
    responseType: "json",
  })

  return response
}

export function add_contact(first_name: string, last_name: string, contact_role: string, created_by: string, email: string, contact_number_default: string, contact_number_type_default: string): Promise<Response> {
  const response = API.post("hpdAPI", "/add_contact", {
    responseType: "json",
    body: {
      first_name: first_name,
      last_name: last_name,
      contact_role: contact_role,
      created_by: created_by,
      email: email,
      contact_number_default: contact_number_default,
      contact_number_type_default: contact_number_type_default,
    },
  })

  return response
}

export function get_contact_by_id(id: number): Promise<Response> {
  const response = API.post("hpdAPI", "/get_contact_by_id", {
    responseType: "json",
    body: {
      id: id,
    },
  })

  return response
}

export function remove_contact(id: number): Promise<Response> {
  const response = API.put("hpdAPI", "/remove_contact", {
    responseType: "json",
    body: {
      id: id,
    },
  })

  return response
}

export function update_contact(first_name: string, last_name: string, contact_role: string, created_by: string, email: string, contact_number_default: string, contact_number_type_default: string, id: number): Promise<Response> {
  const response = API.put("hpdAPI", "/update_contact", {
    responseType: "json",
    body: {
      first_name: first_name,
      last_name: last_name,
      contact_role: contact_role,
      created_by: created_by,
      email: email,
      contact_number_default: contact_number_default,
      contact_number_type_default: contact_number_type_default,
      id: id,
    },
  })

  return response
}

/*
 * contact_info API
 */

export function get_contact_info(id: number): Promise<Response> {
  const response = API.post("hpdAPI", "/get_contact_info", {
    responseType: "json",
    body: {
      id: id,
    },
  })

  return response
}

export function add_contact_info(contact_number: string, contact_number_type: string, id: number): Promise<Response> {
  const response = API.post("hpdAPI", "/add_contact_info", {
    responseType: "json",
    body: {
      contact_number: contact_number,
      contact_number_type: contact_number_type,
      //
      id: id,
    },
  })

  return response
}

export function update_contact_info(contact_number: string, contact_number_type:string, contact_id: number) {
  const response = API.put("hpdAPI", "/update_contact_info", {
    responseType: "json",
    body: {
      contact_number: contact_number,
      contact_number_type: contact_number_type,
      //
      contact_id: contact_id,
    },
  })

  return response
}

export function remove_contact_info(contact_id: number): Promise<Response> {
  const response = API.put("hpdAPI", "/remove_contact_info", {
    responseType: "json",
    body: {
      //
      contact_id: contact_id,
    },
  })

  return response
}
