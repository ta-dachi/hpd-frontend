export interface Contact {
  id: number
  contact_role: string
  created_by: string
  created_on: string
  first_name: string
  last_name: string
  updated_on: string
}

export interface ContactInfo extends Contact {
  contact_number: string,
  contact_id: number,
  contact_number_type,
}