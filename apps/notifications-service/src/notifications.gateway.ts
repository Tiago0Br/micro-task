import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private activeConnections = new Map<string, string>()

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string

    if (userId) {
      this.activeConnections.set(userId, client.id)
      console.log(`🟢 Usuário ${userId} conectou (Socket: ${client.id})`)
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string
    if (userId) {
      this.activeConnections.delete(userId)
      console.log(`🔴 Usuário ${userId} desconectou`)
    }
  }

  sendNotificationToUser(userId: string, payload: unknown) {
    const socketId = this.activeConnections.get(userId)

    if (socketId) {
      this.server.to(socketId).emit('new_notification', payload)
      console.log(`⚡ Notificação enviada em tempo real para ${userId}`)
    } else {
      console.log(`💤 Usuário ${userId} está offline. Verá a notificação depois.`)
    }
  }
}
