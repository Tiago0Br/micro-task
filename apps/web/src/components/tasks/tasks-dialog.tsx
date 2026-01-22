import { useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { createTaskRequest } from '@/http/create-task'
import { queryClient } from '@/lib/query-client'
import { TaskForm, type TaskFormValues } from './tasks-form'

export function CreateTaskDialog() {
  const [open, setOpen] = useState(false)

  const { mutate: createTaskFn, isPending } = useMutation({
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nova Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Nova Tarefa</DialogTitle>
          <DialogDescription>Adicione uma nova tarefa à sua lista.</DialogDescription>
        </DialogHeader>

        <TaskForm onSubmit={(data) => createTaskFn(data)} isLoading={isPending} />
      </DialogContent>
    </Dialog>
  )
}
