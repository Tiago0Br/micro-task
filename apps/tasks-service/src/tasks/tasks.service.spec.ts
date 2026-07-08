import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest'
import type { LoggedUser } from '../auth/jwt.strategy.js'
import type { CreateTaskDto } from './dtos/create-task.dto.js'
import type { UpdateTaskDto } from './dtos/update-task.dto.js'
import { Task } from './entities/task.entity.js'
import { TasksService } from './tasks.service.js'

describe('TasksService', () => {
  let service: TasksService
  let mockTasksRepository: {
    create: Mock
    save: Mock
    update: Mock
    find: Mock
    findOneBy: Mock
    delete: Mock
  }
  let mockClientProxy: {
    emit: Mock
  }

  beforeEach(async () => {
    mockTasksRepository = {
      create: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      find: vi.fn(),
      findOneBy: vi.fn(),
      delete: vi.fn()
    }

    mockClientProxy = {
      emit: vi.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTasksRepository
        },
        {
          provide: 'NOTIFICATIONS_SERVICE',
          useValue: mockClientProxy
        }
      ]
    }).compile()

    service = module.get<TasksService>(TasksService)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const mockUser: LoggedUser = {
    userId: 'user-123',
    email: 'user@example.com'
  }

  describe('create', () => {
    it('should create a task and emit a notification event', async () => {
      const dto = {
        title: 'New Task',
        description: 'Task description',
        deadline: '2025-12-31T23:59:59.000Z',
        priority: 'high'
      }

      const createdTask = {
        id: 'task-1',
        ...dto,
        creatorId: mockUser.userId,
        status: 'pending',
        createdAt: new Date('2023-01-01T00:00:00.000Z')
      }

      mockTasksRepository.create.mockReturnValue(createdTask)
      mockTasksRepository.save.mockResolvedValue(createdTask)

      const result = await service.create(dto as unknown as CreateTaskDto, mockUser)

      expect(mockTasksRepository.create).toHaveBeenCalledWith({
        title: dto.title,
        description: dto.description,
        deadline: dto.deadline,
        priority: dto.priority,
        creatorId: mockUser.userId
      })

      expect(mockTasksRepository.save).toHaveBeenCalledWith(createdTask)

      expect(mockClientProxy.emit).toHaveBeenCalledWith('task.created', {
        taskId: createdTask.id,
        title: createdTask.title,
        userId: mockUser.userId,
        email: mockUser.email
      })

      expect(result).toEqual({
        id: createdTask.id,
        title: createdTask.title,
        description: createdTask.description,
        deadline: createdTask.deadline,
        priority: createdTask.priority,
        status: createdTask.status,
        createdAt: createdTask.createdAt
      })
    })
  })

  describe('update', () => {
    it('should update a task', async () => {
      const dto = {
        title: 'Updated Task',
        description: 'Updated description',
        deadline: '2026-01-01T00:00:00.000Z',
        priority: 'low'
      }

      await service.update('task-1', dto as unknown as UpdateTaskDto)

      expect(mockTasksRepository.update).toHaveBeenCalledWith('task-1', {
        title: dto.title,
        description: dto.description,
        deadline: dto.deadline,
        priority: dto.priority
      })
    })
  })

  describe('getAll', () => {
    it('should return all tasks', async () => {
      const tasks = [{ id: 'task-1', title: 'Task 1' }]
      mockTasksRepository.find.mockResolvedValue(tasks)

      const result = await service.getAll()

      expect(mockTasksRepository.find).toHaveBeenCalled()
      expect(result).toEqual(tasks)
    })
  })

  describe('getById', () => {
    it('should return a task if found', async () => {
      const task = { id: 'task-1', title: 'Task 1' }
      mockTasksRepository.findOneBy.mockResolvedValue(task)

      const result = await service.getById('task-1')

      expect(mockTasksRepository.findOneBy).toHaveBeenCalledWith({ id: 'task-1' })
      expect(result).toEqual(task)
    })

    it('should throw NotFoundException if task is not found', async () => {
      mockTasksRepository.findOneBy.mockResolvedValue(null)

      await expect(service.getById('non-existent')).rejects.toThrow(NotFoundException)
    })
  })

  describe('delete', () => {
    it('should delete a task', async () => {
      await service.delete('task-1')

      expect(mockTasksRepository.delete).toHaveBeenCalledWith('task-1')
    })
  })
})
