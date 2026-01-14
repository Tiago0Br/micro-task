import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Task } from './task.entity'

@Entity({ schema: 'tasks' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  content: string

  @Column()
  userId: string

  @ManyToOne(
    () => Task,
    (task) => task.comments,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'taskId' })
  task: Task

  @Column()
  taskId: string

  @CreateDateColumn()
  createdAt: Date
}
