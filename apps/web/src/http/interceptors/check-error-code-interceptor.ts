import { isAxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth.store'

export function checkErrorCodeInterceptor(error: unknown) {
  if (isAxiosError(error) && error.response?.status === 401) {
    useAuthStore.getState().logout()
    window.location.href = '/login'
  }
  return Promise.reject(error)
}
