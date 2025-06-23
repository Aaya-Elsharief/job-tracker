import { Response, NextFunction } from 'express';
import Job from '../models/job.model';
import { jobValidationSchema, updateJobSchema } from '../validators/';
import {
  BadRequestError,
  NotFoundError,
  formatJoiError,
} from '../../../utils/errors/';
import { SuccessMessages, SuccessResponse } from '../../../utils/responses/';

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
    const {
      search,
      status,
      company,
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = '-1',
    } = req.query;

    // Build filters
    const filters: any = {
      userId: req.user.id,
      deletedAt: null,
    };

    if (status) filters.status = status;
    if (company)
      filters.company = { $regex: escapeRegex(company), $options: 'i' };

    if (search) {
      const safeSearch = escapeRegex(search);
      filters.$or = [
        { title: { $regex: safeSearch, $options: 'i' } },
        { company: { $regex: safeSearch, $options: 'i' } },
        { description: { $regex: safeSearch, $options: 'i' } },
        {role : { $regex: safeSearch, $options: 'i' } },
      ];
    }

    // Build sort object
    const sortObj: any = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const jobs = await Job.find(filters)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .sort(sortObj);

    const total = await Job.countDocuments(filters);

    return SuccessResponse(res, {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
      jobs,
    });
  } catch (err) {
    next(err);
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

export const updateJob = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.id;
    const { error, value } = updateJobSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw new BadRequestError(formatJoiError(error));
    }

    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId, deletedAt: null },
      value,
      { new: true },
    );

    if (!updatedJob) {
      throw new NotFoundError();
    }

    return SuccessResponse(res, updatedJob);
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};
export const escapeRegex = (text: string): string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
