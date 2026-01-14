import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTaskDto } from './dtos/create-task.dto'
import { Task } from './entities/task.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) {}

  async create(dto: CreateTaskDto) {
    const task = this.tasksRepository.create({
      title: dto.title,
      description: dto.description,
      deadline: dto.deadline,
      priority: dto.priority
    })

    await this.tasksRepository.save(task)

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      deadline: task.deadline.toISOString(),
      priority: task.priority,
      status: task.status
    }
  }
}
