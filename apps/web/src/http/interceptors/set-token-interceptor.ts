import type { InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth.store'

export function setTokenInterceptor(config: InternalAxiosRequestConfig) {
  const token = useAuthStore.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}
