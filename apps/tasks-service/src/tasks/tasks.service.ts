import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTaskDto } from './dtos/create-task.dto'
import { UpdateTaskDto } from './dtos/update-task.dto'
import { Task } from './entities/task.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) {}

  async create(dto: CreateTaskDto, userId: string) {
    const task = this.tasksRepository.create({
      title: dto.title,
      description: dto.description,
      deadline: dto.deadline,
      priority: dto.priority,
      creatorId: userId
    })

    await this.tasksRepository.save(task)

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

  async delete(id: string) {
    await this.tasksRepository.delete(id)
  }
}
