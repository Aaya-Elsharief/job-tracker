import { Router } from 'express';
import { createJob, deleteJob, listJobs, updateJob } from '../controllers/job.controller';
import { UserAuth } from '../../user/middleware/userAuth';

const jobRouter = Router();

jobRouter.post('/', UserAuth, createJob);
jobRouter.get('/', UserAuth, listJobs);
jobRouter.delete('/:id', UserAuth, deleteJob);
jobRouter.put('/:id', UserAuth, updateJob);

export default jobRouter;
