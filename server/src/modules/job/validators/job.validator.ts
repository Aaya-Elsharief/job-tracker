import Joi from 'joi';
import { JobStatus } from '../utils/job.enum';

export const jobValidationSchema = Joi.object({
  role: Joi.string().required(),
  dateOfApplication: Joi.date().required(),
  link: Joi.string().uri().required(),
  company: Joi.string().required(),
  status: Joi.string()
    .valid(...Object.values(JobStatus))
    .required(),
});
