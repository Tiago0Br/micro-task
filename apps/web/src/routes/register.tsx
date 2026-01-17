import { createFileRoute, Link } from '@tanstack/react-router'
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
import { useRegister } from '@/hooks/use-register'

function RegisterPage() {
  const { registerForm, onRegisterFormSubmit } = useRegister()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-87.5">
        <CardHeader>
          <CardTitle>Cadastrar</CardTitle>
          <CardDescription>Cadastre-se para começar a criar suas tarefas</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...registerForm}>
            <form
              onSubmit={registerForm.handleSubmit(onRegisterFormSubmit)}
              className="space-y-4"
            >
              <FormField
                control={registerForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome Completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
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
                control={registerForm.control}
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
                Cadastrar
              </Button>
            </form>
          </Form>

          <span className="mt-2 text-sm">
            Já possui conta?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </span>
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/register')({
  component: RegisterPage,
  head: () => ({
    meta: [{ title: 'Cadastro | MicroTask' }]
  })
})
