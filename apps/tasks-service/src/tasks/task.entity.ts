import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Comment } from './comment.entity'

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE'
}

@Entity({ schema: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column()
  deadline: Date

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.LOW
  })
  priority: TaskPriority

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO
  })
  status: TaskStatus

  @Column()
  creatorId: string

  @Column('simple-array', { nullable: true })
  assigneeIds: string[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(
    () => Comment,
    (comment) => comment.task
  )
  comments: Comment[]
}
