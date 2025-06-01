import jobRouter from './modules/job/router/job.router';
import userRouter from './modules/user/router/user.router';
import { asyncRouter } from './utils/handlers/';

const router = asyncRouter();


router.use('/job', jobRouter);
router.use('/user', userRouter)

export default router;
