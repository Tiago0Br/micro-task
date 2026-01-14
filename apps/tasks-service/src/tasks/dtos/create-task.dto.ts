import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength
} from 'class-validator'
import { TaskPriority } from '../entities/task.entity'

export class CreateTaskDto {
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @MinLength(5, { message: 'O título da tarefa deve ter pelo menos 5 caracteres' })
  title: string

  @IsString()
  description: string

  @IsDateString({}, { message: 'Prazo deve ser uma data válida' })
  deadline: string

  @IsEnum(TaskPriority, {
    message: 'Prioridade inválida.'
  })
  priority: TaskPriority

  @IsArray()
  @IsUUID('4', { each: true, message: 'Cada responsável deve ser um ID válido' })
  @IsOptional()
  assigneeIds?: string[]
}
