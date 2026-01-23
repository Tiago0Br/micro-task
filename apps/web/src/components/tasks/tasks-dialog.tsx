import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { createTaskRequest } from '@/http/create-task'
import type { Task } from '@/http/get-tasks'
import { updateTaskRequest } from '@/http/update-task'
import { queryClient } from '@/lib/query-client'
import { TaskForm, type TaskFormValues } from './tasks-form'

interface TaskDialogProps {
  trigger: React.ReactNode
  taskData?: Task
}

export function TaskDialog({ trigger, taskData }: TaskDialogProps) {
  const [open, setOpen] = useState(false)
  const isUpdate = taskData !== undefined

  const { mutate: createTaskFn, isPending: isRegisterPending } = useMutation({
    mutationFn: async (data: TaskFormValues) =>
      createTaskRequest({
        ...data,
        deadline: new Date(data.deadline).toISOString()
      }),
    onSuccess: () => {
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Tarefa criada com sucesso!')
    },
    onError: (error) => {
      console.error('Erro ao criar tarefa:', error)
      toast.error('Falha ao tentar criar tarefa! Tente novamente em breve.')
    }
  })

  const { mutate: updateTaskFn, isPending: isUpdatePending } = useMutation({
    mutationFn: async (data: TaskFormValues) =>
      updateTaskRequest({
        id: taskData?.id as string,
        data: {
          ...data,
          deadline: new Date(data.deadline).toISOString()
        }
      }),
    onSuccess: () => {
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Tarefa atualizada com sucesso!')
    },
    onError: (error) => {
      console.error('Erro ao criar tarefa:', error)
      toast.error('Falha ao tentar atualizar a tarefa! Tente novamente em breve.')
    }
  })

  function handleTaskSubmit(data: TaskFormValues) {
    if (!isUpdate) {
      createTaskFn(data)
      return
    }

    updateTaskFn(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>{!isUpdate ? 'Nova' : 'Atualizar'} Tarefa</DialogTitle>
          <DialogDescription>
            {!isUpdate
              ? 'Adicione uma nova tarefa à sua lista.'
              : 'Atualize os dados da sua tarefa.'}
          </DialogDescription>
        </DialogHeader>

        <TaskForm
          onSubmit={handleTaskSubmit}
          defaultValues={taskData}
          isLoading={isRegisterPending || isUpdatePending}
        />
      </DialogContent>
    </Dialog>
  )
}
