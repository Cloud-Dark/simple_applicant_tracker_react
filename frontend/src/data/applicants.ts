import axios from 'axios'

export interface Applicant {
  id: number
  name: string
  email: string
  role: string
  status: string
  phone?: string
  experience?: number
  location?: string
  photo?: string
}

const API_URL = 'http://localhost:3000/applicants'

export const fetchLocations = async (): Promise<string[]> => {
  const res = await axios.get(`${API_URL}/location`)
  return ['All', ...res.data]
}

export const fetchRoles = async (): Promise<string[]> => {
  const res = await axios.get(`${API_URL}/role`)
  return ['All', ...res.data]
}

export const fetchStatuses = async (): Promise<string[]> => {
  const res = await axios.get(`${API_URL}/status`)
  return ['All', ...res.data]
}
