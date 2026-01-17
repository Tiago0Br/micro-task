import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'

function RootLayout() {
  return (
    <>
      <HeadContent />
      <Toaster closeButton richColors position="top-center" />
      <Outlet />
    </>
  )
}

export const Route = createRootRoute({ component: RootLayout })
