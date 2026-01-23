import { createFileRoute, redirect, useNavigate, useParams } from '@tanstack/react-router'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowLeftIcon, BadgeIcon, CalendarIcon, ClockIcon, EditIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Task } from '@/http/get-tasks'
import { useAuthStore } from '@/stores/auth.store'

export const Route = createFileRoute('/_private/tasks/$taskId')({
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated

    if (!isAuthenticated) {
      throw redirect({
        to: '/login'
      })
    }
  },
  head: () => ({
    meta: [{ title: 'Detalhes | MicroTask' }]
  }),
  component: TaskDetailPage
})

function TaskDetailPage() {
  const { taskId } = useParams({ from: '/_private/tasks/$taskId' })
  const navigate = useNavigate()

  const isLoading = false
  const task: Task = {
    id: '1',
    title: 'Tarefa',
    createdAt: '2026-12-01',
    deadline: '2026-12-01',
    priority: 'LOW',
    status: 'IN_PROGRESS',
    description: 'Descrição da tarefa'
  }

  if (isLoading) return <div className="p-8">Carregando detalhes...</div>
  if (!task) return <div className="p-8">Tarefa não encontrada.</div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate({ to: '/' })}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> Voltar
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Detalhes da Tarefa</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl">{task.title}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <BadgeIcon>{task.status}</BadgeIcon>
                  <BadgeIcon>{task.priority}</BadgeIcon>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <EditIcon className="h-4 w-4 mr-2" /> Editar
              </Button>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2 text-gray-700">Descrição</h3>
              <p className="text-gray-600 whitespace-pre-wrap">
                {task.description ?? 'Sem descrição fornecida.'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comentários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-500 py-8 border-2 border-dashed rounded-lg">
                <p>Nenhum comentário ainda.</p>
                <Button variant="link" className="mt-2">
                  Adicionar comentário
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500 uppercase">
                Informações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Prazo</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(task.deadline), "dd 'de' MMMM, yyyy", {
                      locale: ptBR
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Criado em</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(task.createdAt), 'dd/MM/yyyy HH:mm')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
