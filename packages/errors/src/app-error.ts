import { ErrorCodes, type ErrorCodeType } from './error-codes.js'

export class AppError extends Error {
  public readonly statusCode: number
  public readonly code: ErrorCodeType
  public readonly details?: unknown

  constructor(
    message: string,
    code: ErrorCodeType = ErrorCodes.INTERNAL_SERVER_ERROR,
    statusCode: number = 500,
    details?: unknown
  ) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.statusCode = statusCode
    this.details = details
    Object.setPrototypeOf(this, AppError.prototype)
  }
}
