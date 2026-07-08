import { Test, TestingModule } from '@nestjs/testing'
import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest'
import type { LoggedUser } from '../auth/jwt.strategy.js'
import type { CreateTaskDto } from './dtos/create-task.dto.js'
import type { UpdateTaskDto } from './dtos/update-task.dto.js'
import { TasksController } from './tasks.controller.js'
import { TasksService } from './tasks.service.js'

describe('TasksController', () => {
  let controller: TasksController
  let mockTasksService: {
    create: Mock
    update: Mock
    getAll: Mock
    getById: Mock
    delete: Mock
  }

  beforeEach(async () => {
    mockTasksService = {
      create: vi.fn(),
      update: vi.fn(),
      getAll: vi.fn(),
      getById: vi.fn(),
      delete: vi.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService
        }
      ]
    }).compile()

    controller = module.get<TasksController>(TasksController)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const mockUser: LoggedUser = {
    userId: 'user-123',
    email: 'user@example.com'
  }

  describe('create', () => {
    it('should call TasksService.create and return the result', async () => {
      const dto = { title: 'Test Task' } as unknown as CreateTaskDto
      const expectedResult = { id: 'task-1', ...dto }

      mockTasksService.create.mockResolvedValue(expectedResult)

      const result = await controller.create(dto, mockUser)

      expect(mockTasksService.create).toHaveBeenCalledWith(dto, mockUser)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('update', () => {
    it('should call TasksService.update', async () => {
      const dto = { title: 'Updated Task' } as unknown as UpdateTaskDto
      const id = 'task-1'

      await controller.update(id, dto, mockUser)

      expect(mockTasksService.update).toHaveBeenCalledWith(id, dto)
    })
  })

  describe('getAll', () => {
    it('should call TasksService.getAll and return the result', async () => {
      const expectedResult = [{ id: 'task-1' }]

      mockTasksService.getAll.mockResolvedValue(expectedResult)

      const result = await controller.getAll(mockUser)

      expect(mockTasksService.getAll).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getById', () => {
    it('should call TasksService.getById and return the result', async () => {
      const expectedResult = { id: 'task-1' }
      const id = 'task-1'

      mockTasksService.getById.mockResolvedValue(expectedResult)

      const result = await controller.getById(id, mockUser)

      expect(mockTasksService.getById).toHaveBeenCalledWith(id)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('delete', () => {
    it('should call TasksService.delete', async () => {
      const id = 'task-1'

      await controller.delete(id, mockUser)

      expect(mockTasksService.delete).toHaveBeenCalledWith(id)
    })
  })
})
