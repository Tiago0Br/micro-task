import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'

function RootLayout() {
  return (
    <>
      <HeadContent />
      <Outlet />
    </>
  )
}

export const Route = createRootRoute({ component: RootLayout })
