import { Router } from 'express';
import { createJob, listJobs } from '../controllers/job.controller';

const jobRouter = Router();

jobRouter.post('/', createJob);
jobRouter.get('/', listJobs)

export default jobRouter;
