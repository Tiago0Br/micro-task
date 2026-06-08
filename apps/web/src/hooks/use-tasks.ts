import { useQuery } from '@tanstack/react-query'
import { getTasksRequest } from '@/http/get-tasks'

export function useTasks() {
  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasksRequest
  })

  return {
    tasks,
    isTasksLoading
  }
}
