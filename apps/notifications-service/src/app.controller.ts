import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { AppService, type NotificationType } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('task.created')
  async handleTaskCreated(@Payload() data: NotificationType) {
    await this.appService.createNotification(data)
  }
}
