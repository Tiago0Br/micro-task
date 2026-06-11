import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

@Controller()
export class AppController {
  @EventPattern('task.created')
  handleTaskCreated(@Payload() data: any) {
    console.log('🔔 NOVA NOTIFICAÇÃO RECEBIDA:')
    console.log(`Tarefa: ${data.title}`)
    console.log(`Para o usuário: ${data.userId}`)
  }
}
