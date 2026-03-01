export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly code: string,
    public readonly isOperational = true,
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 400, 'VALIDATION_ERROR', true, context);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 500, 'DATABASE_ERROR', false, context);
  }
}