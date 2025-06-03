import { Router } from 'express';
import { createJob, deleteJob, listJobs } from '../controllers/job.controller';
import { UserAuth } from '../../user/middleware/userAuth';

const jobRouter = Router();

jobRouter.post('/', UserAuth, createJob);
jobRouter.get('/', UserAuth, listJobs);
jobRouter.delete('/:id', UserAuth, deleteJob);
export default jobRouter;
