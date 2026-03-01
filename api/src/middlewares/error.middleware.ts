// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Known operational error
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status:  'error',
      message: err.message,
    });
  }

  // Unknown error — don't leak details in production
  console.error('Unexpected error:', err);
  return res.status(500).json({
    status:  'error',
    message: process.env.NODE_ENV === 'production'
      ? 'Something went wrong'
      : err.message,
  });
};