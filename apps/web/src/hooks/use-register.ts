import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { registerRequest } from '@/http/register'

export const registerSchema = z.object({
  fullName: z.string().min(3, { error: 'O nome deve ter pelo menos 3 caracteres' }),
  email: z.email({ error: 'E-mail inválido' }),
  password: z.string().min(1, { error: 'A senha é obrigatória' })
})

export type RegisterFormValues = z.infer<typeof registerSchema>

export function useRegister() {
  const navigate = useNavigate()

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    }
  })

  async function onRegisterFormSubmit({ fullName, email, password }: RegisterFormValues) {
    try {
      await registerRequest({ fullName, email, password })

      toast.success('Usuário cadastrado com sucesso!')

      navigate({ to: '/login' })
    } catch (error) {
      console.log(error)
      toast.error('E-mail já cadastrado!')
    }
  }

  return {
    registerForm,
    onRegisterFormSubmit
  }
}
