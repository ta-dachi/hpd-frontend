export interface Contact {
  id: number
  contact_role: string
  created_by: string
  created_on: string
  first_name: string
  last_name: string
  email: string
  updated_on: string
  contact_number_default: string,
  contact_number_type_default: string
}

export interface ContactInfo {
  contact_number: string,
  contact_id: number,
  contact_number_type,
  id: number,
  created_by: string,
  created_on: string,
  updated_by: string,
  updated_on: string
}