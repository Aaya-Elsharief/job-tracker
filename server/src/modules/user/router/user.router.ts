import { Router } from 'express';
import { createUser, getUser, loginUser } from '../controllers';
import { UserAuth } from '../middleware/userAuth';
import { forgetPassword } from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/register', createUser);
userRouter.post('/login', loginUser);
userRouter.get('', UserAuth, getUser);
userRouter.post('/forgetPassword', forgetPassword);
    
export default userRouter;
