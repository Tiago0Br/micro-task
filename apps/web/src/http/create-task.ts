import { api } from '@/lib/axios'
import type { Task } from './get-tasks'

type CreateTaskRequestBody = Omit<Task, 'id' | 'status' | 'createdAt'>

export async function createTaskRequest(data: CreateTaskRequestBody) {
  const response = await api.post<Task>('/tasks', data)
  return response.data
}
