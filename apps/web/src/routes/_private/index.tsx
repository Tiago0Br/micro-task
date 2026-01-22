import { createFileRoute, redirect } from '@tanstack/react-router'
import { TasksColumns } from '@/components/tasks/tasks-columns'
import { CreateTaskDialog } from '@/components/tasks/tasks-dialog'
import { DataTable } from '@/components/ui/data-table'
import { useTasks } from '@/hooks/use-tasks'
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
  const { tasks, isTasksLoading } = useTasks()

  if (!isTasksLoading && !tasks) {
    return <div>Nenhuma tarefa cadastrada</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tarefas</h2>
          <p className="text-muted-foreground">Gerencie suas atividades diárias</p>
        </div>
        <CreateTaskDialog />
      </div>

      <DataTable columns={TasksColumns} data={tasks ?? []} />
    </div>
  )
}
