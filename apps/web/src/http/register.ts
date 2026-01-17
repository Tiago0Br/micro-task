import { api } from '@/lib/axios'

interface RegisterRequestBody {
  fullName: string
  email: string
  password: string
}

export async function registerRequest(data: RegisterRequestBody) {
  await api.post('/auth/register', data)
}
