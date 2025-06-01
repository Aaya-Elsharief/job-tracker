import { Router } from 'express';
import { createUser, getUser, loginUser } from '../controllers';
import { UserAuth } from '../middleware/userAuth';

const userRouter = Router();

userRouter.post('/register', createUser);
userRouter.post('/login', loginUser);
userRouter.get('', UserAuth, getUser);

export default userRouter;
