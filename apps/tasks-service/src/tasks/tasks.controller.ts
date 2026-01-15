import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/auth/current-user-decorator'
import type { LoggedUser } from 'src/auth/jwt.strategy'
import { ValidationPipe } from 'src/http/validation.pipe'
import { CreateTaskDto } from './dtos/create-task.dto'
import { UpdateTaskDto } from './dtos/update-task.dto'
import { TasksService } from './tasks.service'

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body(new ValidationPipe()) body: CreateTaskDto,
    @CurrentUser() user: LoggedUser
  ) {
    const { userId } = user
    return this.tasksService.create(body, userId)
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) body: UpdateTaskDto,
    @CurrentUser() _: LoggedUser
  ) {
    await this.tasksService.update(id, body)
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll(@CurrentUser() _: LoggedUser) {
    return this.tasksService.getAll()
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() _: LoggedUser) {
    await this.tasksService.delete(id)
  }
}
