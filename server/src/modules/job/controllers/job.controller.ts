import { Request, Response, NextFunction } from 'express';
import Job from '../models/job.model';
import { jobValidationSchema } from '../validators/job.validator';
import {
  BadRequestError,
  NotFoundError,
} from '../../../utils/errors/http.error';
import { formatJoiError } from '../../../utils/errors/errorFormatter';
import { SuccessResponse } from '../../../utils/successResponse';

export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = jobValidationSchema.validate(req.body, {
      abortEarly: false, // Collect all validation errors
    });

    if (error) {
      const formattedErrors = formatJoiError(error); // Transform errors here
      throw new BadRequestError('Validation failed', {
        code: 'INVALID_PARAMS',
        fields: formattedErrors,
      });
    }

    // Create a new job using the validated data
    const newJob = new Job(value);
    await newJob.save();

   return  SuccessResponse(res, newJob);
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};


export const listJobs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {   
  try{
    const jobs = await Job.find();
    if (!jobs) {
      throw new NotFoundError('No jobs found');
    }
    return SuccessResponse(res, jobs);
  }catch(err){  
    next(err); // Pass the error to the error handler
  }
}