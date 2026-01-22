import { api } from '@/lib/axios'

export type Task = {
  id: string
  title: string
  description?: string
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  deadline: string
  createdAt: string
}

type GetAllTasksResponse = Task[]

export async function getTasksRequest() {
  const response = await api.get<GetAllTasksResponse>('/tasks')
  return response.data
}
