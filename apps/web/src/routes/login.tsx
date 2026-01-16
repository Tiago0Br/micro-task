import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const loginSchema = z.object({
  email: z.email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
})

export type LoginFormValues = z.infer<typeof loginSchema>

function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(_: LoginFormValues) {}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-87.5">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Acesse suas tarefas</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/login')({
  component: LoginPage,
  head: () => ({
    meta: [{ title: 'Login | MicroTask' }]
  })
})
