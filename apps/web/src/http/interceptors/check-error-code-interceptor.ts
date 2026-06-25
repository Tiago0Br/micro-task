import { ErrorCodes } from '@repo/errors'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth.store'

export function checkErrorCodeInterceptor(error: unknown) {
  if (isAxiosError(error) && error.response) {
    const { status, data } = error.response

    if (data?.code === ErrorCodes.UNAUTHORIZED || status === 401) {
      if (!window.location.pathname.includes('/login')) {
        useAuthStore.getState().logout()
        toast.error('Sessão expirada. Por favor, faça login novamente.')
        window.location.href = '/login'
      }
    } else {
      const message = data?.message || 'Ocorreu um erro inesperado.'
      if (Array.isArray(message)) {
        toast.error(message[0])
      } else {
        toast.error(message)
      }
    }
  } else if (error instanceof Error) {
    toast.error(error.message)
  }

  return Promise.reject(error)
}
