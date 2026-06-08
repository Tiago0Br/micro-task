import { api } from '@/lib/axios'

interface DeleteTaskRequestParams {
  id: string
}

export async function deleteTaskRequest({ id }: DeleteTaskRequestParams) {
  await api.delete(`/tasks/${id}`)
}
