import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth.store'

export const Route = createFileRoute('/')({
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
  return <div>Hello "/"!</div>
}
