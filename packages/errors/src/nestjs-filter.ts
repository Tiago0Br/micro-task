import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import type { Request, Response } from 'express'
import { AppError } from './app-error.js'
import { ErrorCodes } from './error-codes.js'

interface ErrorResponse {
  message?: string
  error?: string
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal server error'
    let code = ErrorCodes.INTERNAL_SERVER_ERROR as string
    let details: unknown

    if (exception instanceof AppError) {
      status = exception.statusCode
      message = exception.message
      code = exception.code
      details = exception.details
    } else if (exception instanceof HttpException) {
      status = exception.getStatus()
      const res = exception.getResponse()
      message =
        typeof res === 'string'
          ? res
          : (res as ErrorResponse).message || exception.message
      code = (res as ErrorResponse).error || ErrorCodes.BAD_REQUEST
      details = res
    } else if (exception instanceof Error) {
      message = exception.message
    }

    response.status(status).json({
      statusCode: status,
      message,
      code,
      details,
      timestamp: new Date().toISOString(),
      path: request.url
    })
  }
}
