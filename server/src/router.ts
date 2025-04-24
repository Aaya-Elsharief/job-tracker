import jobRouter from './modules/job/router/job.router';
import { asyncRouter } from './utils/asyncRouter';

const router = asyncRouter();


router.use('/job', jobRouter);


export default router;
