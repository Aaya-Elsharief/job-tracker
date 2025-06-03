import Joi from 'joi';
import { JobStatus } from '../utils/job.enum';

export const updateJobSchema = Joi.object({
  role: Joi.string().optional(),
  dateOfApplication: Joi.date().optional(),
  link: Joi.string().uri().optional(),
  company: Joi.string().optional(),
  status: Joi.string()
    .valid(...Object.values(JobStatus))
    .optional(),
})