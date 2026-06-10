import { api } from '@/lib/axios'
import type { Task } from './get-tasks'

export async function getTaskByIdRequest(id: string) {
  const response = await api.get<Task>(`/tasks/${id}`)
  return response.data
}
