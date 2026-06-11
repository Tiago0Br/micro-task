import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Notification } from './entities/notification.entity'

export interface NotificationType {
  title: string
  userId: string
  taskId: string
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepo: Repository<Notification>
  ) {}

  async createNotification(data: NotificationType) {
    const notification = this.notificationsRepo.create({
      userId: data.userId,
      taskId: data.taskId,
      message: `A tarefa "${data.title}" foi criada com sucesso!`
    })

    await this.notificationsRepo.save(notification)
    console.log(`Notificação salva no banco para o usuário ${data.userId}`)

    return notification
  }
}
