import { Body, Controller, Post } from '@nestjs/common'
import { CreateTaskDto } from './dtos/create-task.dto'
import { TasksService } from './tasks.service'

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() body: CreateTaskDto) {
    return this.tasksService.create(body)
  }
}
