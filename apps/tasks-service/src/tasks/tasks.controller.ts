import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/auth/current-user-decorator'
import type { LoggedUser } from 'src/auth/jwt.strategy'
import { CreateTaskDto } from './dtos/create-task.dto'
import { TasksService } from './tasks.service'

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: CreateTaskDto, @CurrentUser() user: LoggedUser) {
    const { userId } = user
    return this.tasksService.create(body, userId)
  }
}
