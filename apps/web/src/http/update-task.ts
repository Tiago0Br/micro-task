import { api } from '@/lib/axios'
import type { Task } from './get-tasks'

interface UpdateTaskRequestData {
  id: string
  data: Omit<Task, 'id' | 'status' | 'createdAt'>
}

export async function updateTaskRequest({ id, data }: UpdateTaskRequestData) {
  const response = await api.put<Task>(`/tasks/${id}`, data)
  return response.data
}
