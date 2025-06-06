import HttpStatus from 'http-status';
import { ErrorCodes } from '../responses';

interface Feedback {
  code: string;
  message: {
    en: string;
    ar: string;
  };
  fields?: Record<string, any>;
}

export class HttpError extends Error {
  public statusCode: number;
  public code: string;
  public feedback: Feedback;

  constructor(
    statusCode: number,
    code: string,
    message: string,
    feedback: Feedback,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.feedback = feedback;
  }
}

export class BadRequestError extends HttpError {
  constructor(fields: Record<string, any>) {
    const base = ErrorCodes.INVALID_PARAMS;
    const feedback: Feedback = {
      code: base.code,
      message: base.message,
      fields,
    };
    super(HttpStatus.BAD_REQUEST, base.code, base.message.en, feedback);
  }
}

export class NotFoundError extends HttpError {
  constructor() {
    const base = ErrorCodes.NOT_FOUND;
    const feedback: Feedback = {
      code: base.code,
      message: base.message,
    };
    super(HttpStatus.NOT_FOUND, base.code, base.message.en, feedback);
  }
}

export class NoDataFoundError extends HttpError {
  constructor() {
    const base = ErrorCodes.NO_DATA_FOUND;
    const feedback: Feedback = {
      code: base.code,
      message: base.message,
    };
    super(HttpStatus.NOT_FOUND, base.code, base.message.en, feedback);
  }
}

export class UnauthorizedError extends HttpError {
  constructor() {
    const base = ErrorCodes.UNAUTHORIZED;
    const feedback: Feedback = {
      code: base.code,
      message: base.message,
    };
    super(HttpStatus.UNAUTHORIZED, base.code, base.message.en, feedback);
  }
}

export class ForbiddenError extends HttpError {
  constructor() {
    const base = ErrorCodes.FORBIDDEN;
    const feedback: Feedback = {
      code: base.code,
      message: base.message,
    };
    super(HttpStatus.FORBIDDEN, base.code, base.message.en, feedback);
  }
}

export class InternalServerError extends HttpError {
  constructor() {
    const base = ErrorCodes.INTERNAL_SERVER_ERROR;
    const feedback: Feedback = {
      code: base.code,
      message: base.message,
    };
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      base.code,
      base.message.en,
      feedback,
    );
  }
}
