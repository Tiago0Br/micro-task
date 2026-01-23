import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { deleteTaskRequest } from '@/http/delete-task'
import type { Task } from '@/http/get-tasks'
import { queryClient } from '@/lib/query-client'
import { TaskDialog } from './tasks-dialog'

export const TasksColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Título
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const variant =
        status === 'DONE' ? 'default' : status === 'IN_PROGRESS' ? 'secondary' : 'outline'
      return <Badge variant={variant}>{status}</Badge>
    }
  },
  {
    accessorKey: 'priority',
    header: 'Prioridade',
    cell: ({ row }) => {
      const priority = row.getValue('priority') as string
      const color =
        priority === 'URGENT'
          ? 'bg-red-500'
          : priority === 'HIGH'
            ? 'bg-orange-500'
            : 'bg-blue-500'
      return <Badge className={`${color} text-white hover:${color}`}>{priority}</Badge>
    }
  },
  {
    accessorKey: 'deadline',
    header: 'Prazo',
    cell: ({ row }) => {
      const date = new Date(row.getValue('deadline'))
      return <div className="text-sm text-gray-500">{format(date, 'dd/MM/yyyy')}</div>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const task = row.original

      async function handleDeleteTask() {
        await deleteTaskRequest({ id: task.id })
        toast.success('Tarefa removida com sucesso')
        queryClient.invalidateQueries({ queryKey: ['tasks'] })
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <TaskDialog
              trigger={
                <button
                  type="button"
                  className="w-full flex text-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded-md"
                >
                  Editar
                </button>
              }
              taskData={task}
            />
            <DropdownMenuItem className="text-red-600" onClick={handleDeleteTask}>
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
