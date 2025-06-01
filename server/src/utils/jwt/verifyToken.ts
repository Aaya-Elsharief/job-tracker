import { Secret, verify } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const {JWT_SECRET : JWT_SECRET}  = process.env;

const verifyToken = async(token: string) => {
    return await verify(token, JWT_SECRET as Secret)
}

export default verifyToken;