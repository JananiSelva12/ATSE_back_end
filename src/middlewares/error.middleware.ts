import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';
// import AppError from '@/utils/appError';

export const ErrorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  error.status = error.status || 'error';
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });

  logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${error.status}, Message:: ${error.message}`);
};
