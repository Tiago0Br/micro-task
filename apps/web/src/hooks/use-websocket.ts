import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { io, type Socket } from 'socket.io-client'
import { toast } from 'sonner'
import { env } from '@/env'
import { useAuthStore } from '@/stores/auth.store'

export function useWebSocket() {
  const user = useAuthStore((state) => state.user)
  const [socket, setSocket] = useState<Socket | null>(null)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!user?.id) return
    const socketInstance = io(env.VITE_WEBSOCKET_URL, {
      query: { userId: user.id },
      transports: ['websocket']
    })

    setSocket(socketInstance)

    socketInstance.on('connect', () => {
      console.log('🟢 Conectado ao WebSocket de Notificações!')
    })

    socketInstance.on('new_notification', (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })

      toast('Nova Tarefa', {
        description: data.message,
        action: {
          label: 'Ver',
          onClick: () => navigate({ to: `/tasks/${data.taskId}` })
        }
      })
    })

    socketInstance.on('disconnect', () => {
      console.log('🔴 Desconectado do WebSocket')
    })

    return () => {
      socketInstance.disconnect()
    }
  }, [user?.id, navigate, queryClient])

  return socket
}
