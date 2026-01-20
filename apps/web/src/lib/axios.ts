import axios from 'axios'
import { env } from '@/env'
import { checkErrorCodeInterceptor } from '@/http/interceptors/check-error-code-interceptor'
import { setTokenInterceptor } from '@/http/interceptors/set-token-interceptor'

export const api = axios.create({
  baseURL: env.VITE_API_URL
})

api.interceptors.request.use(setTokenInterceptor)
api.interceptors.response.use((response) => response, checkErrorCodeInterceptor)
