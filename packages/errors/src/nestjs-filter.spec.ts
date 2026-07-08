import type { ArgumentsHost } from '@nestjs/common'
import { HttpException, HttpStatus } from '@nestjs/common'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'
import { AppError } from './app-error.js'
import { ErrorCodes } from './error-codes.js'
import { GlobalExceptionFilter } from './nestjs-filter.js'

describe('GlobalExceptionFilter', () => {
  let filter: GlobalExceptionFilter

  beforeEach(() => {
    filter = new GlobalExceptionFilter()
  })

  const mockResponse = () => {
    const res: Record<string, Mock> = {}
    res.status = vi.fn().mockReturnValue(res)
    res.json = vi.fn().mockReturnValue(res)
    return res
  }

  const mockArgumentsHost = (res: Record<string, Mock>): ArgumentsHost => {
    return {
      switchToHttp: vi.fn().mockReturnValue({
        getResponse: () => res,
        getRequest: () => ({ url: '/test-url' }),
        getNext: vi.fn()
      }),
      getArgs: vi.fn(),
      getArgByIndex: vi.fn(),
      switchToRpc: vi.fn(),
      switchToWs: vi.fn(),
      getType: vi.fn()
    } as unknown as ArgumentsHost
  }

  it('should handle AppError correctly', () => {
    const res = mockResponse()
    const host = mockArgumentsHost(res)
    const error = new AppError('Not found', ErrorCodes.NOT_FOUND, 404, { id: 1 })

    filter.catch(error, host)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 404,
        message: 'Not found',
        code: ErrorCodes.NOT_FOUND,
        details: { id: 1 },
        path: '/test-url'
      })
    )
  })

  it('should handle HttpException correctly', () => {
    const res = mockResponse()
    const host = mockArgumentsHost(res)
    const error = new HttpException('Forbidden', HttpStatus.FORBIDDEN)

    filter.catch(error, host)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.FORBIDDEN)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Forbidden',
        path: '/test-url'
      })
    )
  })

  it('should handle generic Error correctly', () => {
    const res = mockResponse()
    const host = mockArgumentsHost(res)
    const error = new Error('Generic error')

    filter.catch(error, host)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Generic error',
        code: ErrorCodes.INTERNAL_SERVER_ERROR,
        path: '/test-url'
      })
    )
  })
})
