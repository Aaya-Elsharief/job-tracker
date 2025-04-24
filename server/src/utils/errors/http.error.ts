import  HttpStatus  from "http-status";


export class HttpError extends Error {
  public statusCode: number;
  public code: string;
  public details?: any;

  constructor(statusCode: number, code: string, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string, fields?: any) {
    super(HttpStatus.BAD_REQUEST, 'INVALID_PARAMS', message, fields);
  }
}

export class NotFoundError extends HttpError {
  constructor(message?: string) {
    super(HttpStatus.NOT_FOUND, 'NOT_FOUND', message || HttpStatus["404_MESSAGE"]);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED', message);
  }
}