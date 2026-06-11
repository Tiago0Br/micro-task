import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  userId: string

  @Column()
  taskId: string

  @Column()
  message: string

  @Column({ default: false })
  read: boolean

  @CreateDateColumn()
  createdAt: Date
}
