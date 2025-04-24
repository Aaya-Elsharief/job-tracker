import { Router } from 'express';
import { createJob } from '../controllers/job.controller';

const jobRouter = Router();

jobRouter.post('/', createJob);

export default jobRouter;
