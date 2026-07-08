import { describe, expect, it } from 'vitest'
import { AppError } from './app-error.js'
import { ErrorCodes } from './error-codes.js'

describe('AppError', () => {
  it('should create an error with default parameters', () => {
    const error = new AppError('Something went wrong')
    expect(error.message).toBe('Something went wrong')
    expect(error.code).toBe(ErrorCodes.INTERNAL_SERVER_ERROR)
    expect(error.statusCode).toBe(500)
    expect(error.details).toBeUndefined()
    expect(error.name).toBe('AppError')
    expect(error instanceof Error).toBe(true)
    expect(error instanceof AppError).toBe(true)
  })

  it('should create an error with custom parameters', () => {
    const details = { field: 'email', reason: 'invalid' }
    const error = new AppError(
      'Invalid email format',
      ErrorCodes.VALIDATION_ERROR,
      400,
      details
    )
    expect(error.message).toBe('Invalid email format')
    expect(error.code).toBe(ErrorCodes.VALIDATION_ERROR)
    expect(error.statusCode).toBe(400)
    expect(error.details).toBe(details)
  })
})
