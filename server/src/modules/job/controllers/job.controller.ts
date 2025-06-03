import { Response, NextFunction } from 'express';
import Job from '../models/job.model';
import { jobValidationSchema } from '../validators/job.validator';
import {
  BadRequestError,
  NotFoundError,
  formatJoiError,
} from '../../../utils/errors/';
import {
  ErrorCodes,
  ErrorMessages,
  SuccessMessages,
  SuccessResponse,
} from '../../../utils/responses/';

export const createJob = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = jobValidationSchema.validate(req.body, {
      abortEarly: false, // Collect all validation errors
    });

    if (error) {
      const formattedErrors = formatJoiError(error); // Transform errors here
      throw new BadRequestError(formattedErrors);
    }

    // Create a new job using the validated data
    const newJob = new Job({ ...value, userId: req.user.id });
    await newJob.save();

    return SuccessResponse(res, newJob);
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};

export const listJobs = async (req: any, res: Response, next: NextFunction) => {
  try {
    const jobs = await Job.find({ userId: req.user.id, deletedAt: null });
    if (!jobs) {
      throw new NotFoundError();
    }
    return SuccessResponse(res, jobs);
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};

export const deleteJob = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findOneAndUpdate(
      { _id: jobId },
      { deletedAt: Date.now() },
    );
    if (!job) {
      throw new NotFoundError();
    }
    return SuccessResponse(res, {
      message: SuccessMessages.deletedSuccessfully,
    });
  } catch (err) {
    return next(err);
  }
};
