import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/http.error';
import HttpStatus from 'http-status';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  if (err instanceof HttpError) {
    // Format the error response
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      status: false,
      error: err.code,
      data: {},
      feedback: {
        message: err.message,
        ...(err.details && { ...err.details }),
      },
    });
  }

  // Handle unknown errors
  return res.status(500).json({
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    status: false,
    error: 'InternalServerError',
    data: {},
    feedback: {
      message: HttpStatus['500_MESSAGE'],
    },
  });
};
