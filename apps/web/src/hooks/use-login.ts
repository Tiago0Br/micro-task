import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { loginRequest } from '@/http/login'

export const loginSchema = z.object({
  email: z.email({ error: 'E-mail inválido' }),
  password: z.string().min(6, { error: 'A senha deve ter no mínimo 6 caracteres' })
})

export type LoginFormValues = z.infer<typeof loginSchema>

export function useLogin() {
  const navigate = useNavigate()

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onLoginFormSubmit({ email, password }: LoginFormValues) {
    try {
      const { user } = await loginRequest({ email, password })

      toast.success(`Bem-vindo(a) ${user.name}`)

      navigate({ to: '/' })
    } catch (error) {
      console.log(error)
      toast.error('Login e/ou senha inválidos!')
    }
  }

  return {
    loginForm,
    onLoginFormSubmit
  }
}
