import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import type { LoggedUser } from 'src/auth/jwt.strategy'
import { Repository } from 'typeorm'
import { CreateTaskDto } from './dtos/create-task.dto'
import { UpdateTaskDto } from './dtos/update-task.dto'
import { Task } from './entities/task.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
    @Inject('NOTIFICATIONS_SERVICE') private readonly client: ClientProxy
  ) {}

  async create(dto: CreateTaskDto, user: LoggedUser) {
    const task = this.tasksRepository.create({
      title: dto.title,
      description: dto.description,
      deadline: dto.deadline,
      priority: dto.priority,
      creatorId: user.userId
    })

    await this.tasksRepository.save(task)

    this.client.emit('task.created', {
      taskId: task.id,
      title: task.title,
      userId: user.userId,
      email: user.email
    })

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      priority: task.priority,
      status: task.status,
      createdAt: task.createdAt
    }
  }

  async update(id: string, dto: UpdateTaskDto) {
    await this.tasksRepository.update(id, {
      title: dto.title,
      description: dto.description,
      deadline: dto.deadline,
      priority: dto.priority
    })
  }

  getAll() {
    return this.tasksRepository.find()
  }

  async getById(id: string) {
    const task = await this.tasksRepository.findOneBy({ id })

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    return task
  }

  async delete(id: string) {
    await this.tasksRepository.delete(id)
  }
}
