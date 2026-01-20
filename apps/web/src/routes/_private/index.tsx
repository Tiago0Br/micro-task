import { createFileRoute, redirect } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { type Task, TasksColumns } from '@/components/tasks/tasks-columns'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { useAuthStore } from '@/stores/auth.store'

export const Route = createFileRoute('/_private/')({
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated

    if (!isAuthenticated) {
      throw redirect({
        to: '/login'
      })
    }
  },
  head: () => ({
    meta: [{ title: 'Tarefas | MicroTask' }]
  }),
  component: IndexPage
})

function IndexPage() {
  const tasks: Task[] = [
    {
      id: '68194dc9-3fa7-4651-85b4-5d5674b0913d',
      title: 'Tarefa do Tiago',
      description: 'Descrição da tarefa',
      deadline: '2026-01-18T03:00:00.000Z',
      priority: 'LOW',
      status: 'TODO',
      createdAt: '2026-01-15T02:32:27.651Z'
    },
    {
      id: 'cceaa7ce-82e5-422c-8a99-b38d2b74d06e',
      title: 'Nova tarefa do Tiaguinho burro demais',
      description: 'Descrição da tarefa',
      deadline: '2026-01-18T03:00:00.000Z',
      priority: 'LOW',
      status: 'TODO',
      createdAt: '2026-01-15T02:33:34.107Z'
    },
    {
      id: 'bc29f044-28bd-4e7d-92dc-5a2512f2f64c',
      title: 'eu me odeio',
      description: 'Descrição da tarefa',
      deadline: '2026-01-18T03:00:00.000Z',
      priority: 'LOW',
      status: 'TODO',
      createdAt: '2026-01-16T00:57:03.658Z'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tarefas</h2>
          <p className="text-muted-foreground">Gerencie suas atividades diárias</p>
        </div>
        <Button>
          <PlusIcon className="mr-2 size-4" /> Nova Tarefa
        </Button>
      </div>

      <DataTable columns={TasksColumns} data={tasks} />
    </div>
  )
}
