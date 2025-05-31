// utils/errorFormatter.ts

import Joi from 'joi';
import { ErrorMessages } from '../responses/errorMessages';

export const formatJoiError = (joiError: Joi.ValidationError) => {
  const formattedErrors: any = {};

  joiError.details.forEach((detail) => {
    const field = detail.path[0] as string;
    const errorType = detail.type.split('.')[1] || detail.type; // e.g., "required"

    if (formattedErrors[field]) {
      formattedErrors[field].push(
        ErrorMessages[errorType as keyof typeof ErrorMessages], // Map to your { en, ar } object
      );
    } else {
      formattedErrors[field] = [
        ErrorMessages[errorType as keyof typeof ErrorMessages], // Map to your { en, ar } object
      ];
    }
  });

  return formattedErrors;
};
