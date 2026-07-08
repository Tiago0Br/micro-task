import { ConflictException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import bcrypt from 'bcryptjs'
import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest'
import { User } from '../users/entities/user.entity.js'
import { AuthService } from './auth.service.js'

describe('AuthService', () => {
  let service: AuthService
  let mockUsersRepository: {
    findOne: Mock
    create: Mock
    save: Mock
  }
  let mockJwtService: {
    sign: Mock
  }

  beforeEach(async () => {
    mockUsersRepository = {
      findOne: vi.fn(),
      create: vi.fn(),
      save: vi.fn()
    }

    mockJwtService = {
      sign: vi.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository
        },
        {
          provide: JwtService,
          useValue: mockJwtService
        }
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('register', () => {
    it('should successfully register a new user', async () => {
      const dto = {
        email: 'test@example.com',
        fullName: 'Test User',
        password: 'password123'
      }

      mockUsersRepository.findOne.mockResolvedValue(null)

      const hashedPassword = 'hashedPassword'
      vi.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt')
      vi.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword)

      const userToSave = {
        id: '1',
        email: dto.email,
        fullName: dto.fullName,
        passwordHash: hashedPassword,
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-01-01T00:00:00Z')
      }

      mockUsersRepository.create.mockReturnValue(userToSave)
      mockUsersRepository.save.mockResolvedValue(userToSave)

      const result = await service.register(dto)

      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
        where: { email: dto.email }
      })
      expect(bcrypt.genSalt).toHaveBeenCalled()
      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 'salt')
      expect(mockUsersRepository.create).toHaveBeenCalledWith({
        email: dto.email,
        fullName: dto.fullName,
        passwordHash: hashedPassword
      })
      expect(mockUsersRepository.save).toHaveBeenCalledWith(userToSave)

      expect(result).toEqual({
        id: '1',
        email: dto.email,
        full_name: dto.fullName,
        created_at: '2023-01-01T00:00:00.000Z',
        updated_at: '2023-01-01T00:00:00.000Z'
      })
    })

    it('should throw ConflictException if email is already in use', async () => {
      const dto = {
        email: 'test@example.com',
        fullName: 'Test User',
        password: 'password123'
      }

      mockUsersRepository.findOne.mockResolvedValue({ id: '1', email: dto.email })

      await expect(service.register(dto)).rejects.toThrow(ConflictException)
      await expect(service.register(dto)).rejects.toThrow('E-mail já cadastrado.')
    })
  })

  describe('login', () => {
    it('should return a token and user payload on successful login', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123'
      }

      const user = {
        id: '1',
        email: loginDto.email,
        fullName: 'Test User',
        passwordHash: 'hashedPassword'
      }

      mockUsersRepository.findOne.mockResolvedValue(user)
      vi.spyOn(bcrypt, 'compare').mockResolvedValue(true)
      mockJwtService.sign.mockReturnValue('jwt-token')

      const result = await service.login(loginDto)

      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
        where: { email: loginDto.email }
      })
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, user.passwordHash)
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: user.id,
        email: user.email
      })

      expect(result).toEqual({
        access_token: 'jwt-token',
        user: {
          id: user.id,
          email: user.email,
          name: user.fullName
        }
      })
    })

    it('should throw UnauthorizedException if user is not found', async () => {
      const loginDto = {
        email: 'notfound@example.com',
        password: 'password123'
      }

      mockUsersRepository.findOne.mockResolvedValue(null)

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException)
      await expect(service.login(loginDto)).rejects.toThrow('Credenciais inválidas.')
    })

    it('should throw UnauthorizedException if password does not match', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'wrongpassword'
      }

      const user = {
        id: '1',
        email: loginDto.email,
        passwordHash: 'hashedPassword'
      }

      mockUsersRepository.findOne.mockResolvedValue(user)
      vi.spyOn(bcrypt, 'compare').mockResolvedValue(false)

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException)
    })
  })
})
