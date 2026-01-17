import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.url()
})

const result = envSchema.safeParse(import.meta.env)

if (!result.success) {
  console.error(result.error.message)
  throw new Error('Invalid environment variables')
}

export const env = result.data
