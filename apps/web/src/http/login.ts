import { api } from '@/lib/axios'

interface LoginRequestBody {
  email: string
  password: string
}

interface LoginResponseBody {
  access_token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export async function loginRequest(data: LoginRequestBody) {
  const response = await api.post<LoginResponseBody>('/auth/login', data)
  return response.data
}
