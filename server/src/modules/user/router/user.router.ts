import { Router } from "express";
import { createUser } from "../controllers/user.controller";

const userRouter =  Router();

userRouter.post('/register', createUser)

export default userRouter